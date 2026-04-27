import { RentalForm } from '@/components/RentalForm';
import Link from 'next/link';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';

export const metadata = {
    title: 'Lag Annonse - Leiebørs | B-Zero Racing',
    description: 'Legg ut din B-Zero for leie.',
};

export default function NyLeieborsAnnonsePage() {
    return (
        <div className="pb-24">
            <div className="bg-slate-900 pt-32 pb-16 px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red rounded-full mix-blend-screen filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                </div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <Link href="/leiebors" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-conthrax text-sm tracking-wider uppercase transition-all hover:bg-white/20 hover:border-white/40 group mb-6">
                        <ArrowLeft weight="bold" className="transition-transform group-hover:-translate-x-1" /> Tilbake til Leiebørsen
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-conthrax text-white uppercase tracking-wider mb-6 drop-shadow-md">
                        Ny Annonse
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                        Fyll ut skjemaet under for å legge ut bilen din. Annonsen blir lagret som et utkast og vil bli publisert av oss etter en rask gjennomgang.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 mt-12">
                <RentalForm />
            </div>
        </div>
    );
}
