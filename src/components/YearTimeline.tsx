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

export default function YearTimeline({ races, year }: { races: Race[], year: number }) {
    if (!races || races.length === 0) return null;

    const racingRaces = races.filter(r => r.raceCategory === 'racing' || !r.raceCategory);
    const rallyRaces = races.filter(r => r.raceCategory === 'rally');

    const renderTrack = (title: string, trackRaces: Race[], isRally: boolean) => {
        if (trackRaces.length === 0) return null;

        return (
            <div className="mb-8 last:mb-0">
                <h3 className="text-sm font-conthrax text-slate-300 mb-4 uppercase flex items-center justify-between gap-3">
                    {title}
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${isRally ? 'bg-amber-500 text-slate-900' : 'bg-slate-300 text-slate-600'}`}>
                        {trackRaces.length} LØP
                    </span>
                </h3>
                <div className="relative border-l-2 border-slate-700 ml-2 pl-6 space-y-5 pb-2">
                    {trackRaces.map((race) => {
                        const isPast = new Date(race.date) < new Date(new Date().setHours(0, 0, 0, 0));
                        const dotColor = isRally ? 'bg-amber-400 border-amber-900' : 'bg-brand-red border-red-950';
                        const textColor = isPast ? 'text-slate-500' : 'text-slate-200';

                        return (
                            <div key={race._id} className="relative group">
                                <Link href={`/sesonger/${race.slug.current}`} className="block">
                                    {/* Dot / Checkmark */}
                                    {isPast ? (
                                        <div className="absolute -left-[35px] top-[2px] bg-slate-900 z-10 text-emerald-500 transition-transform group-hover:scale-125 rounded-full">
                                            <CheckCircle size={20} weight="fill" />
                                        </div>
                                    ) : (
                                        <div className={`absolute -left-[33px] top-1 w-4 h-4 rounded-full border-2 z-10 transition-transform group-hover:scale-125 ${dotColor}`}></div>
                                    )}

                                    <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${textColor}`}>
                                        {(() => {
                                            const start = new Date(race.date);
                                            const startStr = `${start.getDate()}. ${start.toLocaleDateString('no-NB', { month: 'short' })}`;
                                            if (race.endDate && race.endDate !== race.date) {
                                                const end = new Date(race.endDate);
                                                if (start.getMonth() === end.getMonth()) {
                                                    return `${start.getDate()}.-${end.getDate()}. ${end.toLocaleDateString('no-NB', { month: 'short' })}`;
                                                }
                                                return `${start.getDate()}. ${start.toLocaleDateString('no-NB', { month: 'short' })} - ${end.getDate()}. ${end.toLocaleDateString('no-NB', { month: 'short' })}`;
                                            }
                                            return startStr;
                                        })()}
                                    </div>
                                    <div className={`text-sm font-conthrax line-clamp-2 ${isPast ? 'text-slate-600' : 'text-slate-400 group-hover:text-white'} transition-colors`}>
                                        {race.title}
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
                Løpskalender {year}
            </h2>
            <div className="relative z-10">
                {renderTrack("Racing", racingRaces, false)}
                {renderTrack("Rally", rallyRaces, true)}
            </div>
        </div>
    );
}
