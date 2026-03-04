'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FlagCheckered, FilePdf, CheckCircle, MapPin, MagnifyingGlass, CalendarPlus } from "@phosphor-icons/react";
import type { Race } from '@/app/sesonger/page';

interface SeasonDoc {
    _id: string;
    year: number;
    documents?: {
        title: string;
        fileUrl: string;
    }[];
}

interface RaceListFilterProps {
    initialRaces: Race[];
    seasonDocs: SeasonDoc[];
}

export default function RaceListFilter({ initialRaces, seasonDocs }: RaceListFilterProps) {
    // State for filters
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<'all' | 'racing' | 'rally'>('all');
    const [hidePastRaces, setHidePastRaces] = useState(false);

    // Track if component has mounted to avoid hydration mismatch with localStorage
    const [isMounted, setIsMounted] = useState(false);

    // Map for easy lookup of season documents
    const seasonDocMap = seasonDocs.reduce((acc, doc) => {
        acc[doc.year] = doc;
        return acc;
    }, {} as Record<number, SeasonDoc>);

    // Load saved preferences from localStorage on mount
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
        const savedCategory = localStorage.getItem('bzero-race-category');
        const savedHidePast = localStorage.getItem('bzero-hide-past');


        if (savedCategory === 'all' || savedCategory === 'racing' || savedCategory === 'rally') {
            setCategoryFilter(savedCategory);
        }
        if (savedHidePast === 'true') {
            setHidePastRaces(true);
        }
    }, []);

    // Save preferences to localStorage when they change
    useEffect(() => {
        if (!isMounted) return;
        localStorage.setItem('bzero-race-category', categoryFilter);
        localStorage.setItem('bzero-hide-past', hidePastRaces.toString());
    }, [categoryFilter, hidePastRaces, isMounted]);

    // Apply filters
    const filteredRaces = initialRaces.filter(race => {
        // 1. Hide Past Races Filter
        if (hidePastRaces) {
            const isPast = new Date(race.date) < new Date(new Date().setHours(0, 0, 0, 0));
            if (isPast) return false;
        }

        // 2. Category Filter
        if (categoryFilter !== 'all') {
            const raceCat = race.raceCategory || 'racing'; // Default to racing if not set
            if (raceCat !== categoryFilter) return false;
        }

        // 3. Search Query Filter
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            const matchTitle = race.title.toLowerCase().includes(query);
            const matchTrack = race.track?.name.toLowerCase().includes(query) || false;
            const matchYear = race.season.toString().includes(query);

            if (!matchTitle && !matchTrack && !matchYear) return false;
        }

        return true;
    });

    // Group the *filtered* races by season
    const groupedRaces = filteredRaces.reduce((acc, race) => {
        if (!acc[race.season]) {
            acc[race.season] = [];
        }
        acc[race.season].push(race);
        return acc;
    }, {} as Record<number, Race[]>);

    // Sort races WITHIN each season chronologically
    Object.keys(groupedRaces).forEach((seasonStr) => {
        const season = Number(seasonStr);
        groupedRaces[season].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });

    // Sort seasons descending (2026, 2025, etc.)
    const sortedSeasons = Object.keys(groupedRaces)
        .map(Number)
        .sort((a, b) => b - a);

    // Don't render until mounted to avoid hydration errors if localStorage diffs from server SSR
    if (!isMounted) {
        return <div className="animate-pulse space-y-16">
            <div className="h-24 bg-slate-900 rounded-2xl w-full"></div>
            <div className="h-[500px] bg-slate-900 rounded-2xl w-full"></div>
        </div>;
    }

    return (
        <div className="space-y-8">

            {/* Filter Controls */}
            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 p-2 md:p-4 -mx-4 rounded-3xl shadow-xl flex flex-col lg:flex-row gap-6 lg:items-center justify-between z-40">

                {/* Search */}
                <div className="relative flex-1 max-w-md">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <MagnifyingGlass size={20} className="text-slate-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Søk på tittel, bane eller år..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-950/50 border border-slate-700 text-slate-100 rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent placeholder-slate-500 transition-all font-light"
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-6 lg:items-center">
                    {/* Category Tabs */}
                    <div className="grid grid-cols-3 bg-slate-950/50 p-1.5 rounded-2xl border border-slate-700/50 relative">
                        <button
                            onClick={() => setCategoryFilter('all')}
                            className={`flex items-center justify-center px-2 sm:px-5 py-2.5 rounded-xl text-sm font-conthrax transition-all duration-300 relative z-10 ${categoryFilter === 'all' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            Alle
                        </button>
                        <button
                            onClick={() => setCategoryFilter('racing')}
                            className={`flex items-center justify-center px-2 sm:px-5 py-2.5 rounded-xl text-sm font-conthrax transition-all duration-300 relative z-10 ${categoryFilter === 'racing' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            Racing
                        </button>
                        <button
                            onClick={() => setCategoryFilter('rally')}
                            className={`flex items-center justify-center px-2 sm:px-5 py-2.5 rounded-xl text-sm font-conthrax transition-all duration-300 relative z-10 ${categoryFilter === 'rally' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            Rally
                        </button>

                        {/* Animated background pill component */}
                        <div
                            className="absolute inset-y-1.5 left-1.5 w-[calc(33.333%-4px)] bg-brand-red rounded-xl shadow-md transition-transform duration-300 ease-out z-0"
                            style={{
                                transform: `translateX(${categoryFilter === 'all' ? '0' :
                                    categoryFilter === 'racing' ? '100%' :
                                        '200%'
                                    })`
                            }}
                        />
                    </div>

                    {/* Past Races Toggle */}
                    <label className="flex items-center gap-3 cursor-pointer group select-none">
                        <div className="relative">
                            <input
                                type="checkbox"
                                className="sr-only"
                                checked={hidePastRaces}
                                onChange={(e) => setHidePastRaces(e.target.checked)}
                            />
                            <div className={`block w-14 h-8 rounded-full transition-colors duration-300 ${hidePastRaces ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                            <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out shadow-sm ${hidePastRaces ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </div>
                        <span className={`text-sm font-medium transition-colors ${hidePastRaces ? 'text-emerald-400' : 'text-slate-300 group-hover:text-slate-100'}`}>
                            Skjul gjennomførte
                        </span>
                    </label>

                    {/* Subscribe to Calendar */}
                    <div className="hidden sm:block w-px h-8 bg-slate-700/50"></div>

                    <a
                        href="/api/calendar"
                        title="Abonner på løpskalenderen fra B-Zero Racing"
                        className="flex items-center gap-2 px-4 py-2.5 bg-brand-red/10 hover:bg-brand-red text-brand-red hover:text-white border border-brand-red/30 rounded-xl transition-all font-medium text-sm group"
                    >
                        <CalendarPlus size={20} weight="fill" className="group-hover:scale-110 transition-transform" />
                        <span>Abonner på kalender</span>
                    </a>
                </div>
            </div>

            {/* Results */}
            {sortedSeasons.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 p-12 rounded-3xl text-center">
                    <FlagCheckered size={56} className="mx-auto text-slate-600 mb-6" />
                    <h3 className="text-2xl font-conthrax text-white mb-2">Ingen treff</h3>
                    <p className="text-slate-400 text-lg">
                        Prøv å justere filtrene eller søkeordet ditt.
                    </p>
                    {/* Clear filters button */}
                    {(searchQuery || categoryFilter !== 'all' || hidePastRaces) && (
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setCategoryFilter('all');
                                setHidePastRaces(false);
                            }}
                            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition-colors font-medium border border-slate-700 hover:border-slate-600"
                        >
                            Nullstill filtre
                        </button>
                    )}
                </div>
            ) : (
                <div className="space-y-16">
                    {sortedSeasons.map(season => (
                        <section key={season} className="relative w-full">
                            <h2 className="text-3xl md:my-6 md:-mx-4 bg-slate-900/90 backdrop-blur border border-slate-600 mb-6 flex flex-col md:flex-row md:items-center rounded-2xl justify-between gap-8 relative xl:sticky xl:top-[80px] z-30 p-4 shadow-lg isolate">
                                <span className="text-white font-conthrax w-fit">{season}</span>
                                {seasonDocMap[season]?.documents && seasonDocMap[season].documents.length > 0 ? (
                                    <div className="flex justify-end flex-wrap gap-4">
                                        {seasonDocMap[season].documents.map((doc: { title: string, fileUrl: string }) => (
                                            <a key={doc.fileUrl} href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:text-slate-200 bg-slate-600 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2">
                                                <FilePdf size={20} weight="fill" />
                                                {doc.title}
                                            </a>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-sm text-slate-400 italic mt-2 md:mt-0 md:pr-4">
                                        {season < new Date().getFullYear()
                                            ? "Beklager, vi mangler poengtabell for denne sesongen."
                                            : "Poengberegning kommer."}
                                    </div>
                                )}
                            </h2>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {groupedRaces[season].map(race => {
                                    const isPast = new Date(race.date) < new Date(new Date().setHours(0, 0, 0, 0));
                                    return (
                                        <div key={race._id} className="relative">
                                            {/* Anchor for linking from timeline */}
                                            <div id={race.slug.current} className="absolute -top-32" />
                                            <Link href={`/sesonger/${race.slug.current}`} className={`group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md hover:border-brand-red/50 transition-all duration-300 h-full ${isPast ? 'opacity-85' : ''}`}>
                                                <div className={`relative w-full aspect-4/3 bg-slate-100 overflow-hidden ${isPast ? 'grayscale-50' : ''}`}>
                                                    {isPast && (
                                                        <div className="absolute top-4 left-4 z-20 bg-slate-900/95 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md shadow-md border border-slate-700">
                                                            <CheckCircle size={14} weight="fill" className="text-emerald-500" /> Avsluttet
                                                        </div>
                                                    )}

                                                    {/* Track Logo Overlay */}
                                                    {race.track?.logo?.asset?.url && (
                                                        <div className="absolute top-3 right-3 z-20 w-24 h-12 bg-white shadow-xl rounded-xl p-2 flex items-center justify-center border border-slate-100">
                                                            <Image src={race.track.logo.asset.url} alt={race.track.name} fill className="object-contain p-1.5" />
                                                        </div>
                                                    )}

                                                    {/* Main Image or Track Thumbnail Fallback */}
                                                    {race.mainImage?.asset?.url ? (
                                                        <Image
                                                            src={race.mainImage.asset.url}
                                                            alt={race.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition duration-700"
                                                        />
                                                    ) : race.track?.thumbnail?.asset?.url ? (
                                                        <Image
                                                            src={race.track.thumbnail.asset.url}
                                                            alt={race.track.name}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition duration-700"
                                                        />
                                                    ) : (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-slate-200 text-slate-400">
                                                            <FlagCheckered size={48} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-6 relative overflow-hidden bg-white flex-1 flex flex-col justify-between">
                                                    {/* Background Track Map Watermark */}
                                                    {race.track?.trackMap?.asset?.url && (
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none z-0">
                                                            <div className="relative w-[150%] h-[150%]">
                                                                <Image
                                                                    src={race.track.trackMap.asset.url}
                                                                    alt={race.track.name}
                                                                    fill
                                                                    className="object-contain"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="relative z-10 flex flex-col h-full">
                                                        <div className="flex justify-between items-start mb-3 gap-2">

                                                            <div className="flex flex-col gap-1">
                                                                <time className="text-xs font-bold text-slate-500 tracking-wider uppercase block bg-slate-100 w-fit px-2 py-1 rounded-md">
                                                                    {(() => {
                                                                        const start = new Date(race.date);
                                                                        const end = race.endDate ? new Date(race.endDate) : null;
                                                                        const monthStr = start.toLocaleDateString('no-NB', { month: 'short' });

                                                                        if (end && start.getTime() !== end.getTime()) {
                                                                            if (start.getMonth() === end.getMonth()) {
                                                                                return `${start.getDate()}.–${end.getDate()}. ${monthStr}`;
                                                                            } else {
                                                                                const endMonthStr = end.toLocaleDateString('no-NB', { month: 'short' });
                                                                                return `${start.getDate()}. ${monthStr} - ${end.getDate()}. ${endMonthStr}`;
                                                                            }
                                                                        }
                                                                        return `${start.getDate()}. ${monthStr}`;
                                                                    })()}
                                                                </time>
                                                            </div>

                                                            {race.raceCategory === 'rally' ? (
                                                                <span className="text-[10px] font-conthrax uppercase tracking-wider bg-amber-500 text-slate-900 border border-amber-600 px-2.5 py-1 rounded-md shadow-sm">Rally</span>
                                                            ) : (
                                                                <span className="text-[10px] font-conthrax uppercase tracking-wider bg-slate-800 text-white border border-slate-700 px-2.5 py-1 rounded-md shadow-sm">Racing</span>
                                                            )}
                                                        </div>
                                                        <h3 className="text-xl font-conthrax text-slate-900 group-hover:text-brand-red transition-colors mb-4 line-clamp-2">
                                                            {race.title}
                                                        </h3>
                                                        <div className="mt-auto">
                                                            {race.track && (
                                                                <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
                                                                    <MapPin size={16} className="text-brand-red shrink-0" weight="fill" />
                                                                    <span className="truncate">{race.track.name}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </div>
            )}
        </div>
    );
}
