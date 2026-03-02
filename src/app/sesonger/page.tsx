import { getSeasons, getSeasonDocuments } from "@/sanity/lib/client";
import RaceListFilter from "@/components/RaceListFilter";

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

export default async function SesongerPage() {
    // Fetch data on the server
    const races: Race[] = await getSeasons();
    const seasonDocs: SeasonDoc[] = await getSeasonDocuments();

    return (
        <div className="bg-neutral-950 min-h-screen">
            <div className="max-w-6xl mx-auto px-6 py-12 pb-24">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-8 items-start">
                    <div className="flex-1">
                        <h1 className="text-3xl md:text-4xl font-conthrax text-slate-100 mb-8 uppercase border-b-4 border-brand-red inline-block pb-2">
                            Terminliste
                        </h1>
                        <p className="text-xl text-neutral-300 max-w-2xl">
                            Her finner du kommende og gjennomførte løp, fordelt på sesong. Gjenopplev sesongenes høydepunkter, les løpsrapportene og se alle bildene fra depotet og asfalten.
                        </p>
                    </div>
                </div>

                {/* Pass data to Client Component for filtering and rendering */}
                <RaceListFilter initialRaces={races} seasonDocs={seasonDocs} />
            </div>
        </div>
    );
}
