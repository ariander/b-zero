import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

// Sanity webhook -> kalles kun når et dokument faktisk publiseres/endres.
// Setter cache for det dokumenttypen "stale" slik at neste besøk på siden
// henter fersk data, uten at vi må polle Sanity med kort revalidate-tid.
type WebhookPayload = {
    _type: string;
};

export async function POST(req: NextRequest) {
    try {
        const { isValidSignature, body } = await parseBody<WebhookPayload>(
            req,
            process.env.SANITY_REVALIDATE_SECRET
        );

        if (!isValidSignature) {
            return NextResponse.json(
                { message: 'Ugyldig signatur' },
                { status: 401 }
            );
        }

        if (!body?._type) {
            return NextResponse.json(
                { message: 'Mangler _type i webhook-payload' },
                { status: 400 }
            );
        }

        // Next 16 krever et cache-life-profilnavn her; 'max' invaliderer fullt ut.
        revalidateTag(body._type, 'max');

        return NextResponse.json({
            revalidated: true,
            tag: body._type,
            now: Date.now(),
        });
    } catch (error) {
        console.error('Revalidate webhook failed:', error);
        return NextResponse.json(
            { message: 'Feil ved revalidering', error: `${error}` },
            { status: 500 }
        );
    }
}
