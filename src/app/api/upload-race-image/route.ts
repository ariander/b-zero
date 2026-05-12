import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

// Denne klienten krever skrivetilgang for å kunne laste opp filer og opprette dokumenter
const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN,
});

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('image') as File | null;
        const raceId = formData.get('raceId') as string | null;
        const submitterName = formData.get('submitterName') as string | null;

        if (!file || !raceId) {
            return NextResponse.json(
                { error: 'Missing required fields (image, raceId)' },
                { status: 400 }
            );
        }

        if (!process.env.SANITY_API_WRITE_TOKEN) {
            console.error("Missing SANITY_API_WRITE_TOKEN environment variable.");
            return NextResponse.json(
                { error: 'Serverfeil: Mangler konfigurasjon for opplasting.' },
                { status: 500 }
            );
        }

        // Sjekk at det faktisk er et bilde
        if (!file.type.startsWith('image/')) {
            return NextResponse.json(
                { error: 'Filen må være et bilde.' },
                { status: 400 }
            );
        }

        // 1. Last opp bildet til Sanity som en asset
        const asset = await writeClient.assets.upload('image', file, {
            filename: file.name,
        });

        // 2. Opprett et nytt submittedImage dokument som refererer til asset og løpet
        const document = await writeClient.create({
            _type: 'submittedImage',
            race: {
                _type: 'reference',
                _ref: raceId,
            },
            image: {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: asset._id,
                },
            },
            submitterName: submitterName || undefined,
            approved: false, // Må alltid godkjennes manuelt av administrator i Sanity
        });

        return NextResponse.json({ success: true, documentId: document._id }, { status: 201 });
    } catch (error) {
        console.error('Feil ved opplasting av bilde:', error);
        return NextResponse.json(
            { error: 'Det oppstod en feil under opplastingen.' },
            { status: 500 }
        );
    }
}
