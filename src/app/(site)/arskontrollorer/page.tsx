import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { getCountyFromPostalCode } from '@/utils/counties';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ClipboardText } from '@phosphor-icons/react/dist/ssr';
import InspectorDirectory, { Inspector } from './InspectorDirectory';

export const metadata = {
    title: 'Finn Årskontrollør | B-Zero Racing',
    description: 'Finn teknisk årskontrollør tilknyttet Norges Bilsportforbund for din B-Zero racerbil i ditt fylke.',
};

export default function InspectorsPage() {
    // Read and parse CSV
    const csvFilePath = path.join(process.cwd(), 'public', 'arskontrollorer.csv');
    const fileContent = fs.readFileSync(csvFilePath, 'utf-8');

    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
    }) as Record<string, string>[];

    // Group by county
    const groupedData: Record<string, Inspector[]> = {};

    records.forEach((record: Record<string, string>) => {
        const poststedTokens = record['Postnr. / Sted'].split(' ');
        const rawZip = poststedTokens[0] || '';
        const county = getCountyFromPostalCode(rawZip);

        if (!groupedData[county]) {
            groupedData[county] = [];
        }

        groupedData[county].push({
            navn: record['Navn'],
            epost: record['E-post'],
            mobil: record['Mobil'],
            adresse: record['Adresse'],
            poststed: record['Postnr. / Sted'],
            nbf: record['NBF'],
            klubb: record['Klubb'],
        });
    });

    return (
        <div className="bg-slate-100 min-h-screen">
            {/* Header Section */}
            <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
                <Image
                    src="/teknisk-c1.avif"
                    alt="B-Zero Hero"
                    fill
                    className="object-cover object-center z-0 opacity-20 mix-blend-luminosity"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-b from-slate-900/50 via-slate-900/80 to-slate-900 z-0" />

                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <ClipboardText size={64} className="text-brand-red mx-auto mb-6" />
                    <h1 className="text-2xl md:text-4xl font-conthrax uppercase tracking-wider mb-6">
                        Årskontrollører
                    </h1>
                    <p className="text-xl text-slate-300 font-light leading-relaxed">
                        Alle biler i B-Zero må være utstyrt med vognbok og lisens.
                        Finn din nærmeste tekniske årskontrollør tilknyttet Norges Bilsportforbund i listen under for å avtale inspeksjon av bilen (oppdatert juni 2026)
                    </p>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
                <Link href="/reglement" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-sm border border-slate-200 text-slate-700 font-conthrax text-sm tracking-wider uppercase transition-all hover:bg-slate-50 hover:border-slate-300 group mb-10">
                    <ArrowLeft weight="bold" className="transition-transform group-hover:-translate-x-1" /> Tilbake til reglement
                </Link>

                <InspectorDirectory groupedData={groupedData} />
            </div>
        </div>
    );
}
