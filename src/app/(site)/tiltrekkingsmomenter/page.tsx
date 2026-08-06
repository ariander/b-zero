import Image from 'next/image';
import { Wrench, FilePdfIcon } from '@phosphor-icons/react/dist/ssr';
import { sections } from './data';
import TorqueSearch from './TorqueSearch';

export const metadata = {
    title: 'Tiltrekkingsmomenter | B-Zero Racing',
    description: 'Tiltrekkingsmomenter (Nm) for Citroën C1 — motor, girkasse, hjuloppheng, bremser og karosseri.',
};

export default function TiltrekkingsmomenterPage() {
    return (
        <div className="bg-slate-100 min-h-screen">
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
                    <Wrench size={64} className="text-brand-red mx-auto mb-6" />
                    <h1 className="text-2xl md:text-4xl font-conthrax uppercase tracking-wider mb-6">
                        Tiltrekkingsmomenter
                    </h1>
                    <p className="text-xl text-slate-300 font-light leading-relaxed">
                       Bruk momentnøkkel og sjekk alltid mot verkstedhåndboken ved tvil.
                    </p>
                    <p className="text-l text-slate-400 font-light leading-relaxed mt-2">Der det står f.eks. +90°, skal bolten trekkes til oppgitt Nm først, deretter vinkeltrekkes
                    videre det angitte gradantallet.</p>

                    <a
                        href="/B-Zero-Tiltrekkingsmomenter.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-8 inline-flex items-center gap-3 rounded-lg border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/30 transition-colors"
                    >
                        <FilePdfIcon size={22} className="text-brand-red" />
                        Last ned som PDF
                    </a>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
                <TorqueSearch sections={sections} />
            </div>
        </div>
    );
}
