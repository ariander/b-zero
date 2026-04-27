import { DriverForm } from '@/components/DriverForm';
import Link from 'next/link';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';

export const metadata = {
    title: 'Registrer Sjåfør | B-Zero Racing',
    description: 'Bli med i oversikten over sjåfører i B-Zero Racing.',
};

export default function NySjaforPage() {
    return (
        <div className="pb-24 bg-neutral-950 min-h-screen">
            <div className="bg-neutral-900 pt-32 pb-16 px-6 relative overflow-hidden border-b border-neutral-800">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red rounded-full mix-blend-screen filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                </div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <Link href="/sjaforer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-conthrax text-sm tracking-wider uppercase transition-all hover:bg-white/20 hover:border-white/40 group mb-6">
                        <ArrowLeft weight="bold" className="transition-transform group-hover:-translate-x-1" /> Tilbake til sjåfører
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-conthrax text-white uppercase tracking-wider mb-6 drop-shadow-md">
                        Registrer Profil
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-300 leading-relaxed">
                        Mangler du i oversikten? Fyll ut skjemaet under for å bli lagt til på nettsiden. 
                        Profilen din blir publisert så fort vi har sett over den!
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 mt-12">
                <DriverForm />
            </div>
        </div>
    );
}
