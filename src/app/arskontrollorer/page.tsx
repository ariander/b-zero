import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { getCountyFromPostalCode } from '@/utils/counties';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, EnvelopeSimple, Phone, MapPin, ClipboardText } from '@phosphor-icons/react/dist/ssr';
import CountyNavigation from './CountyNavigation';

export const metadata = {
    title: 'Finn Årskontrollør | B-Zero Racing',
    description: 'Finn teknisk årskontrollør for din B-Zero racerbil i ditt fylke.',
};

interface Inspector {
    navn: string;
    epost: string;
    mobil: string;
    adresse: string;
    poststed: string;
}

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
        });
    });

    // Sort counties alphabetically
    const sortedCounties = Object.keys(groupedData).sort();

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
                    <h1 className="text-4xl md:text-5xl font-conthrax uppercase tracking-wider mb-6">
                        Årskontrollører
                    </h1>
                    <p className="text-xl text-slate-300 font-light leading-relaxed">
                        Alle biler i B-Zero må være utstyrt med vognbok og lisens.
                        Finn din nærmeste tekniske årskontrollør i listen under for å avtale inspeksjon av veltebur, redningsutstyr og bilens generelle tekniske stand.
                    </p>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
                <Link href="/reglement" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-sm border border-slate-200 text-slate-700 font-conthrax text-sm tracking-wider uppercase transition-all hover:bg-slate-50 hover:border-slate-300 group mb-10">
                    <ArrowLeft weight="bold" className="transition-transform group-hover:-translate-x-1" /> Tilbake til reglement
                </Link>

                <div className="grid lg:grid-cols-4 gap-12 items-start">
                    <CountyNavigation
                        counties={sortedCounties.map(county => ({
                            name: county,
                            count: groupedData[county].length,
                            id: county.toLowerCase().replace(/\s+/g, '-')
                        }))}
                    />

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-16">

                        {/* Rendering Counties */}
                        {sortedCounties.map(county => (
                            <section key={county} id={county.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-32">
                                <h2 className="text-2xl font-conthrax uppercase tracking-wider text-slate-900 border-b-2 border-slate-300 pb-3 mb-8 flex items-center gap-3">
                                    <MapPin size={28} className="text-brand-red" weight="duotone" />
                                    {county}
                                </h2>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {groupedData[county].map((inspector, idx) => (
                                        <div key={idx} className="bg-white rounded-lg p-6 shadow-md border border-slate-200 relative overflow-hidden group">
                                            {/* Accent Banner */}
                                            <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-400" />

                                            <h3 className="text-xl font-bold text-slate-900 mb-1">{inspector.navn}</h3>
                                            <p className="text-md text-slate-500 mb-6">{inspector.adresse}<br />{inspector.poststed}</p>

                                            <div className="space-y-3">
                                                <a href={`tel:${inspector.mobil.replace(/\s+/g, '')}`} className="flex items-center gap-3 text-slate-700 hover:text-brand-red transition-colors w-fit p-1 -m-1 rounded-md">
                                                    <div className="bg-slate-100 p-2 rounded-lg group-hover/btn:bg-red-50 text-slate-500">
                                                        <Phone size={18} weight="fill" />
                                                    </div>
                                                    <span className="font-medium tracking-wide">{inspector.mobil}</span>
                                                </a>
                                                <a href={`mailto:${inspector.epost}`} className="flex items-center gap-3 text-slate-700 hover:text-brand-red transition-colors w-fit p-1 -m-1 rounded-md">
                                                    <div className="bg-slate-100 p-2 rounded-lg group-hover/btn:bg-red-50 text-slate-500">
                                                        <EnvelopeSimple size={18} weight="fill" />
                                                    </div>
                                                    <span className="font-medium text-sm">{inspector.epost}</span>
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
