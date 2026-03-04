import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { getCountyFromPostalCode } from '@/utils/counties';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, EnvelopeSimple, Phone, MapPin } from '@phosphor-icons/react/dist/ssr';
import BuildGuideTabs from '@/components/BuildGuideTabs'; // We could reuse tabs if it was flexible, but it's hardcoded to Racing/Rally. Let's make a custom tab UI.

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
    const csvFilePath = path.join(process.cwd(), 'public', 'Årskontrollører.csv');
    const fileContent = fs.readFileSync(csvFilePath, 'utf-8');

    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
    });

    // Group by county
    const groupedData: Record<string, Inspector[]> = {};

    records.forEach((record: any) => {
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
            {/* Header / Hero Section (matches Kom i Gang) */}
            <div className="bg-black text-white relative border-b-4 border-brand-red overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/C1-24h-190428-146.JPG"
                        alt="B-Zero Hero"
                        fill
                        priority
                        className="object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-black/90 mix-blend-multiply" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
                    <span className="text-brand-red font-conthrax text-sm tracking-widest uppercase mb-4 block">
                        B-Zero Racing Norge
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-conthrax uppercase tracking-wider mb-6 drop-shadow-lg">
                        Årskontrollører
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
                        Alle biler i B-Zero må være utstyrt med vognbok og lisens.
                        Finn din nærmeste tekniske årskontrollør i listen under for å avtale inspeksjon av veltebur, redningsutstyr og bilens generelle tekniske stand.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
                <Link href="/reglement" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white shadow-sm border border-slate-200 text-slate-700 font-conthrax text-sm tracking-wider uppercase transition-all hover:bg-slate-50 hover:border-slate-300 group mb-10">
                    <ArrowLeft weight="bold" className="transition-transform group-hover:-translate-x-1" /> Tilbake til reglement
                </Link>

                <div className="grid lg:grid-cols-4 gap-12 items-start">

                    {/* Sticky Sidebar Navigation */}
                    <div className="lg:col-span-1 lg:sticky lg:top-32 space-y-2 hidden lg:block">
                        <h3 className="text-sm font-conthrax text-slate-500 uppercase tracking-wider mb-4 px-3">Velg Fylke</h3>
                        {sortedCounties.map(county => (
                            <a
                                key={`nav-${county}`}
                                href={`#${county.toLowerCase().replace(/\s+/g, '-')}`}
                                className="block w-full text-left px-4 py-3 rounded-xl hover:bg-white hover:text-brand-red hover:shadow-sm transition-all font-medium text-slate-700 data-[active=true]:bg-brand-red data-[active=true]:text-white"
                            >
                                {county} <span className="float-right text-xs opacity-50 bg-slate-200 px-2 py-0.5 rounded-full text-slate-800">{groupedData[county].length}</span>
                            </a>
                        ))}
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-16">

                        {/* Mobile Navigation (Tabs alternative) */}
                        <div className="lg:hidden flex overflow-x-auto pb-4 gap-2 snap-x scrollbar-hide -mx-6 px-6">
                            {sortedCounties.map(county => (
                                <a
                                    key={`mob-nav-${county}`}
                                    href={`#${county.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="shrink-0 snap-start bg-white border border-slate-200 px-5 py-2.5 rounded-full text-sm font-conthrax uppercase text-slate-700 hover:border-brand-red hover:text-brand-red whitespace-nowrap shadow-sm"
                                >
                                    {county} ({groupedData[county].length})
                                </a>
                            ))}
                        </div>

                        {/* Rendering Counties */}
                        {sortedCounties.map(county => (
                            <section key={county} id={county.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-32">
                                <h2 className="text-2xl font-conthrax uppercase tracking-wider text-slate-900 border-b-2 border-brand-red pb-3 mb-8 flex items-center gap-3">
                                    <MapPin size={28} className="text-brand-red" weight="duotone" />
                                    {county}
                                </h2>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {groupedData[county].map((inspector, idx) => (
                                        <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                                            {/* Accent Banner */}
                                            <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-200 group-hover:bg-brand-red transition-colors" />

                                            <h3 className="text-lg font-bold text-slate-900 mb-1">{inspector.navn}</h3>
                                            <p className="text-sm text-slate-500 mb-6">{inspector.adresse}, {inspector.poststed}</p>

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
