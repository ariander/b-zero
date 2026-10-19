'use client';

import { useState, useMemo } from 'react';
import { MagnifyingGlass, XCircle, MapPin, Phone, Info } from '@phosphor-icons/react';
import { InspectorEmail } from '@/components/InspectorEmail';
import { findCountyForCity } from '@/utils/counties';
import CountyNavigation from './CountyNavigation';

export interface Inspector {
    navn: string;
    epost: string;
    mobil: string;
    adresse?: string;
    poststed: string;
    nbf?: string;
    klubb?: string;
}

interface Props {
    groupedData: Record<string, Inspector[]>;
}

export default function InspectorDirectory({ groupedData }: Props) {
    const [searchQuery, setSearchQuery] = useState('');

    // Compute total inspectors across all counties
    const totalInspectors = useMemo(() => {
        return Object.values(groupedData).reduce((sum, list) => sum + list.length, 0);
    }, [groupedData]);

    // Filter by search query with meta-search fallback for Norwegian cities
    const { filteredData, matchingCount, metaCityMatch } = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) {
            return {
                filteredData: groupedData,
                matchingCount: totalInspectors,
                metaCityMatch: null,
            };
        }

        const terms = query.split(/\s+/).filter(Boolean);
        const directResult: Record<string, Inspector[]> = {};
        let directCount = 0;

        // 1. Direct search on inspectors, county, poststed, etc.
        for (const [county, inspectors] of Object.entries(groupedData)) {
            const matches = inspectors.filter((inspector) => {
                return terms.every((term) => {
                    const matchesCounty = county.toLowerCase().includes(term);
                    const matchesName = inspector.navn.toLowerCase().includes(term);
                    const matchesPoststed = inspector.poststed.toLowerCase().includes(term);
                    const matchesKlubb = inspector.klubb?.toLowerCase().includes(term) ?? false;
                    const matchesAdresse = inspector.adresse?.toLowerCase().includes(term) ?? false;
                    return matchesCounty || matchesName || matchesPoststed || matchesKlubb || matchesAdresse;
                });
            });

            if (matches.length > 0) {
                directResult[county] = matches;
                directCount += matches.length;
            }
        }

        // If direct search gave results, return them
        if (directCount > 0) {
            return {
                filteredData: directResult,
                matchingCount: directCount,
                metaCityMatch: null,
            };
        }

        // 2. Meta-search fallback: If city is not in the list, check if it belongs to a Norwegian county
        const cityLookup = findCountyForCity(query);
        if (cityLookup && groupedData[cityLookup.county]) {
            const countyInspectors = groupedData[cityLookup.county];
            return {
                filteredData: { [cityLookup.county]: countyInspectors },
                matchingCount: countyInspectors.length,
                metaCityMatch: {
                    city: cityLookup.matchedCity,
                    county: cityLookup.county,
                },
            };
        }

        // 3. No matches found
        return {
            filteredData: {},
            matchingCount: 0,
            metaCityMatch: null,
        };
    }, [groupedData, searchQuery, totalInspectors]);

    const sortedCounties = useMemo(() => {
        return Object.keys(filteredData).sort();
    }, [filteredData]);

    return (
        <div className="w-full">
            {/* Search Bar */}
            <div className="mb-10 max-w-2xl">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <MagnifyingGlass size={22} weight="bold" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Søk etter navn, by eller fylke (f.eks. Oslo, Jon, Drammen)..."
                        className="w-full bg-white border border-slate-300 text-slate-900 pl-12 pr-11 py-3.5 rounded-2xl shadow-sm text-base placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-all"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                            aria-label="Tøm søkefelt"
                        >
                            <XCircle size={20} weight="fill" />
                        </button>
                    )}
                </div>

                {searchQuery.trim() && (
                    <div className="mt-3 flex items-center justify-between flex-wrap gap-2 text-sm text-slate-600 px-1">
                        <span>
                            {metaCityMatch ? (
                                <>
                                    Fant <strong>{matchingCount}</strong> {matchingCount === 1 ? 'kontrollør' : 'kontrollører'} i <strong>{metaCityMatch.county}</strong> (fylket for {metaCityMatch.city})
                                </>
                            ) : (
                                <>
                                    Fant <strong>{matchingCount}</strong> {matchingCount === 1 ? 'kontrollør' : 'kontrollører'} i <strong>{sortedCounties.length}</strong> {sortedCounties.length === 1 ? 'fylke' : 'fylker'}
                                </>
                            )}
                        </span>
                        <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="text-xs text-brand-red hover:underline font-semibold"
                        >
                            Nullstill søk
                        </button>
                    </div>
                )}
            </div>

            {/* Meta-search banner when city was resolved to county */}
            {metaCityMatch && (
                <div className="mb-8 p-4 px-5 bg-amber-50/80 border border-amber-200/80 rounded-2xl flex items-center gap-3 text-sm text-amber-900 max-w-2xl shadow-xs">
                    <Info size={22} className="text-amber-600 shrink-0" weight="fill" />
                    <div>
                        <p className="font-medium">
                            Ingen kontrollører har adresse direkte i <strong className="capitalize">{metaCityMatch.city}</strong>.
                        </p>
                        <p className="text-amber-800 text-xs mt-0.5">
                            Viser årskontrollører i <strong>{metaCityMatch.county}</strong>.
                        </p>
                    </div>
                </div>
            )}

            {/* If no matches found: FULL-WIDTH, CENTERED EMPTY STATE */}
            {sortedCounties.length === 0 ? (
                <div className="w-full bg-white rounded-3xl p-12 md:p-16 text-center border border-slate-200 shadow-sm mt-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-5 text-slate-400">
                        <MagnifyingGlass size={32} />
                    </div>
                    <h3 className="text-xl font-conthrax text-slate-800 mb-2">Ingen årskontrollører funnet</h3>
                    <p className="text-slate-500 max-w-md mx-auto mb-6 text-sm">
                        Ingen kontrollører eller fylker matchet søket ditt etter «{searchQuery}». Prøv å søke på et annet navn, en by eller fylke.
                    </p>
                    <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="bg-brand-red hover:brightness-110 text-white font-conthrax text-xs uppercase px-6 py-3 rounded-xl transition shadow"
                    >
                        Nullstill søk
                    </button>
                </div>
            ) : (
                /* Main Grid: Sidebar navigation + County Sections */
                <div className="grid lg:grid-cols-4 gap-12 items-start">
                    <CountyNavigation
                        counties={sortedCounties.map((county) => ({
                            name: county,
                            count: filteredData[county].length,
                            id: county.toLowerCase().replace(/\s+/g, '-'),
                        }))}
                    />

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-16">
                        {sortedCounties.map((county) => (
                            <section
                                key={county}
                                id={county.toLowerCase().replace(/\s+/g, '-')}
                                className="scroll-mt-32"
                            >
                                <h2 className="text-2xl font-conthrax uppercase tracking-wider text-slate-900 border-b-2 border-slate-300 pb-3 mb-8 flex items-center justify-between">
                                    <span className="flex items-center gap-3">
                                        <MapPin size={28} className="text-brand-red" weight="duotone" />
                                        {county}
                                    </span>
                                    <span className="text-xs font-sans font-medium text-slate-500 bg-slate-200 px-3 py-1 rounded-full normal-case">
                                        {filteredData[county].length} {filteredData[county].length === 1 ? 'kontrollør' : 'kontrollører'}
                                    </span>
                                </h2>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {filteredData[county].map((inspector, idx) => (
                                        <div
                                            key={`${inspector.navn}-${idx}`}
                                            className="bg-white rounded-lg p-6 shadow-md border border-slate-200 relative overflow-hidden group hover:border-slate-300 transition-colors"
                                        >
                                            {/* Accent Banner */}
                                            <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-400 group-hover:bg-brand-red transition-colors" />

                                            <h3 className="text-xl font-bold text-slate-900 mb-1">{inspector.navn}</h3>
                                            <p className="text-md text-slate-500 mb-4">
                                                {inspector.adresse && (
                                                    <>
                                                        {inspector.adresse}
                                                        <br />
                                                    </>
                                                )}
                                                {inspector.poststed}
                                            </p>

                                            <div className="mb-6 space-y-1">
                                                {inspector.klubb && (
                                                    <p className="text-sm text-slate-600">
                                                        <span className="font-semibold text-slate-700">Klubb:</span>{' '}
                                                        {inspector.klubb}
                                                    </p>
                                                )}
                                                {inspector.nbf && (
                                                    <p className="text-sm text-slate-600">
                                                        <span className="font-semibold text-slate-700">NBF Lisensnr:</span>{' '}
                                                        {inspector.nbf}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-3">
                                                <a
                                                    href={`tel:${inspector.mobil.replace(/\s+/g, '')}`}
                                                    className="flex items-center gap-3 text-slate-700 hover:text-brand-red transition-colors w-fit p-1 -m-1 rounded-md"
                                                >
                                                    <div className="bg-slate-100 p-2 rounded-lg text-slate-500">
                                                        <Phone size={18} weight="fill" />
                                                    </div>
                                                    <span className="font-medium tracking-wide">{inspector.mobil}</span>
                                                </a>
                                                <InspectorEmail email={inspector.epost} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
