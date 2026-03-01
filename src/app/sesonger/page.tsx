import { getSeasons, getSeasonDocuments } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import { FlagCheckered, FilePdf, CheckCircle } from "@phosphor-icons/react/dist/ssr";

export const revalidate = 60; // Revalidate at most every 60 seconds

export interface Race {
    _id: string;
    title: string;
    slug: { current: string };
    season: number;
    date: string;
    endDate?: string;
    raceCategory?: 'racing' | 'rally';
    mainImage: {
        asset: {
            url: string;
        }
    } | null;
    track?: {
        name: string;
        slug: { current: string };
        logo?: { asset: { url: string } };
        trackMap?: { asset: { url: string } };
        thumbnail?: { asset: { url: string } };
        mapsLink?: string;
    };
}

interface SeasonDoc {
    _id: string;
    year: number;
    documents?: {
        title: string;
        fileUrl: string;
    }[];
}

// import YearTimeline from "@/components/YearTimeline";

export default async function SesongerPage() {
    const races: Race[] = await getSeasons();
    const seasonDocs: SeasonDoc[] = await getSeasonDocuments();

    // Map for easy lookup of season documents
    const seasonDocMap = seasonDocs.reduce((acc, doc) => {
        acc[doc.year] = doc;
        return acc;
    }, {} as Record<number, SeasonDoc>);

    // Gruppere løpene etter sesong
    const groupedRaces = races.reduce((acc, race) => {
        if (!acc[race.season]) {
            acc[race.season] = [];
        }
        acc[race.season].push(race);
        return acc;
    }, {} as Record<number, Race[]>);

    // Sorter løpene INNENFOR hver sesong i kronologisk rekkefølge (tidligst først)
    Object.keys(groupedRaces).forEach((seasonStr) => {
        const season = Number(seasonStr);
        groupedRaces[season].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });

    // Sorter sesonger nedadgående (f.eks 2026, 2025, etc.) for hovedlisten
    const sortedSeasons = Object.keys(groupedRaces)
        .map(Number)
        .sort((a, b) => b - a);

    // const currentYear = new Date().getFullYear();
    // const currentYearRaces = groupedRaces[currentYear] || [];

    return (
        <div className="max-w-6xl mx-auto px-6 py-12 pb-24">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-16 items-start">
                <div className="flex-1">
                    <h1 className="text-4xl font-conthrax text-slate-100 mb-8 uppercase border-b-4 border-brand-red inline-block pb-2">
                        Terminliste
                    </h1>
                    <p className="text-xl text-neutral-300 max-w-2xl">
                        Her finner du kommende og gjennomførte løp, fordelt på sesong. Gjenopplev sesongenes høydepunkter, les løpsrapportene og se alle bildene fra depotet og asfalten.
                    </p>
                </div>

                {/* Midlertidig skjult iht ønske fra bruker. Kalenderen er fortsatt tilgjengelig på Nyheter.
                {currentYearRaces.length > 0 && (
                    <div className="w-full lg:w-80 shrink-0">
                        <YearTimeline races={currentYearRaces} year={currentYear} />
                    </div>
                )}
                */}
            </div>

            {sortedSeasons.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
                    <FlagCheckered size={48} className="mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500 italic text-lg">Ingen løp registrert foreløpig. Det første flagget har ikke falt enda!</p>
                </div>
            ) : (
                <div className="space-y-16">
                    {sortedSeasons.map(season => (
                        <section key={season} className="relative w-full">
                            <h2 className="text-3xl md:my-6 md:-mx-4 bg-slate-900/90 backdrop-blur border border-slate-600 mb-6 flex flex-col flex-row md:items-center rounded-2xl justify-between gap-8 relative md:sticky md:top-[82px] z-30 p-4 shadow-lg">
                                <span className="text-white font-conthrax w-fit">{season}</span>
                                {seasonDocMap[season]?.documents && seasonDocMap[season].documents.length > 0 ? (
                                    <div className="flex justify-end flex-wrap gap-4">
                                        {seasonDocMap[season].documents.map((doc: { title: string, fileUrl: string }) => (
                                            <a key={doc.fileUrl} href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:text-slate-200 bg-slate-600 hover:bg-slate-700 px-2 py-1 rounded-lg transition-colors flex items-center gap-2">
                                                <FilePdf size={20} weight="fill" />
                                                {doc.title}
                                            </a>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-sm text-slate-400 italic md:pr-4 mt-2 md:mt-0 text-center md:text-right">
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
                                            <Link href={`/sesonger/${race.slug.current}`} className={`group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition h-full ${isPast ? 'opacity-85' : ''}`}>
                                                <div className={`relative w-full aspect-[4/3] bg-slate-100 overflow-hidden ${isPast ? 'grayscale-50' : ''}`}>
                                                    {isPast && (
                                                        <div className="absolute top-4 left-4 z-20 bg-slate-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-sm shadow-md border border-slate-700">
                                                            <CheckCircle size={14} weight="fill" className="text-emerald-500" /> Avsluttet
                                                        </div>
                                                    )}

                                                    {/* Track Logo Overlay */}
                                                    {race.track?.logo?.asset?.url && (
                                                        <div className="absolute top-2 right-2 z-20 w-24 h-12 bg-white shadow-md rounded-lg p-1.5 flex items-center justify-center">
                                                            <Image src={race.track.logo.asset.url} alt={race.track.name} fill className="object-contain p-1" />
                                                        </div>
                                                    )}

                                                    {/* Main Image or Track Thumbnail Fallback */}
                                                    {race.mainImage?.asset?.url ? (
                                                        <Image
                                                            src={race.mainImage.asset.url}
                                                            alt={race.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition duration-500"
                                                        />
                                                    ) : race.track?.thumbnail?.asset?.url ? (
                                                        <Image
                                                            src={race.track.thumbnail.asset.url}
                                                            alt={race.track.name}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition duration-500"
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
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] pointer-events-none z-0">
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

                                                    <div className="relative z-10">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <time className="text-sm font-bold text-slate-500 tracking-wider uppercase block">
                                                                {(() => {
                                                                    const start = new Date(race.date);
                                                                    const end = race.endDate ? new Date(race.endDate) : null;
                                                                    const monthStr = start.toLocaleDateString('no-NB', { month: 'long' });

                                                                    if (end && start.getTime() !== end.getTime()) {
                                                                        if (start.getMonth() === end.getMonth()) {
                                                                            // Same month: 12-14. september
                                                                            return `${start.getDate()}–${end.getDate()} ${monthStr}`;
                                                                        } else {
                                                                            // Different month: 30. august - 1. september
                                                                            const endMonthStr = end.toLocaleDateString('no-NB', { month: 'long' });
                                                                            return `${start.getDate()} ${monthStr} - ${end.getDate()} ${endMonthStr}`;
                                                                        }
                                                                    }

                                                                    // Single day
                                                                    return `${start.getDate()} ${monthStr}`;
                                                                })()}
                                                            </time>
                                                            {race.raceCategory === 'rally' ? (
                                                                <span className="text-[10px] font-conthrax uppercase tracking-wider bg-amber-500 text-slate-900 px-2 py-1 rounded">Rally</span>
                                                            ) : (
                                                                <span className="text-[10px] font-conthrax uppercase tracking-wider bg-slate-300 text-slate-600 px-2 py-1 rounded">Racing</span>
                                                            )}
                                                        </div>
                                                        <h3 className="text-xl font-conthrax text-slate-900 group-hover:text-brand-red transition-colors">
                                                            {race.title}
                                                        </h3>
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
