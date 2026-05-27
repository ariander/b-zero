import Link from "next/link";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";

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
}

export default function YearTimeline({ races, year, title, hideSubheadings }: { races: Race[], year: number, title?: string, hideSubheadings?: boolean }) {
    if (!races || races.length === 0) return null;

    const racingRaces = races.filter(r => r.raceCategory === 'racing' || !r.raceCategory);
    const rallyRaces = races.filter(r => r.raceCategory === 'rally');

    const renderTrack = (title: string, trackRaces: Race[], isRally: boolean) => {
        if (trackRaces.length === 0) return null;

        return (
            <div className="mb-8 last:mb-0">
                {!hideSubheadings && (
                    <h3 className="text-sm font-conthrax text-slate-300 mb-4 uppercase flex items-center justify-between gap-3">
                        {title}
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${isRally ? 'bg-amber-500 text-slate-900' : 'bg-slate-300 text-slate-600'}`}>
                            {trackRaces.length} LØP
                        </span>
                    </h3>
                )}
                <div className="relative border-l-2 border-slate-700 ml-2 pl-6 space-y-5 pb-2">
                    {trackRaces.map((race) => {
                        const start = new Date(race.date);
                        start.setHours(0, 0, 0, 0);
                        const end = race.endDate ? new Date(race.endDate) : new Date(race.date);
                        end.setHours(23, 59, 59, 999);
                        const now = new Date();
                        
                        const isPast = now > end;
                        const isOngoing = now >= start && now <= end;

                        const dotColor = isOngoing 
                            ? 'bg-emerald-400 border-emerald-950 animate-pulse'
                            : isRally ? 'bg-amber-400 border-amber-900' : 'bg-brand-red border-red-950';
                        const textColor = isPast ? 'text-slate-500' : 'text-slate-200';

                        return (
                            <div key={race._id} className="relative group">
                                <Link href={`/sesonger/${race.slug.current}`} className="block">
                                    {/* Dot / Checkmark */}
                                    {isPast ? (
                                        <div className="absolute -left-[35px] top-[2px] bg-slate-900 z-10 text-emerald-500 transition-transform group-hover:scale-125 rounded-full">
                                            <CheckCircle size={20} weight="fill" />
                                        </div>
                                    ) : isOngoing ? (
                                        <div className="absolute -left-[35px] top-[2px] bg-slate-900 z-10 text-emerald-400 transition-transform group-hover:scale-125 rounded-full p-0.5 flex items-center justify-center">
                                            <span className="relative flex h-3.5 w-3.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
                                            </span>
                                        </div>
                                    ) : (
                                        <div className={`absolute -left-[33px] top-1 w-4 h-4 rounded-full border-2 z-10 transition-transform group-hover:scale-125 ${dotColor}`}></div>
                                    )}

                                    <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${textColor}`}>
                                        {(() => {
                                            const startVal = new Date(race.date);
                                            const startStr = `${startVal.getDate()}. ${startVal.toLocaleDateString('no-NB', { month: 'short' })}`;
                                            if (race.endDate && race.endDate !== race.date) {
                                                const endVal = new Date(race.endDate);
                                                if (startVal.getMonth() === endVal.getMonth()) {
                                                    return `${startVal.getDate()}.-${endVal.getDate()}. ${endVal.toLocaleDateString('no-NB', { month: 'short' })}`;
                                                }
                                                return `${startVal.getDate()}. ${startVal.toLocaleDateString('no-NB', { month: 'short' })} - ${endVal.getDate()}. ${endVal.toLocaleDateString('no-NB', { month: 'short' })}`;
                                            }
                                            return startStr;
                                        })()}
                                    </div>
                                    <div className={`text-sm font-conthrax line-clamp-2 ${isPast ? 'text-slate-600' : 'text-slate-400 group-hover:text-white'} transition-colors flex items-center gap-1.5 flex-wrap`}>
                                        <span>{race.title}</span>
                                        {isOngoing && (
                                            <span className="text-emerald-400 text-[10px] font-bold font-sans animate-pulse shrink-0 whitespace-nowrap bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800 uppercase tracking-wider">
                                                Pågår nå
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-slate-800 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            <h2 className="text-xl font-conthrax text-white mb-6 border-b border-slate-700 pb-3 relative z-10">
                {title || `Løpskalender ${year}`}
            </h2>
            <div className="relative z-10">
                {renderTrack("Racing", racingRaces, false)}
                {renderTrack("Rally", rallyRaces, true)}
            </div>
        </div>
    );
}
