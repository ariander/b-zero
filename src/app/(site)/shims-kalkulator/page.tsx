import { Ruler } from '@phosphor-icons/react/dist/ssr';
import ShimCalculator from './ShimCalculator';

export const metadata = {
    title: 'Shims-kalkulator | B-Zero Racing',
    description: 'Regn ut endring i toe og camber når du shimser navflensen på bakakselen, eller finn hvilke shims du trenger for å oppnå ønsket geometri.',
};

export default function ShimKalkulatorPage() {
    return (
        <div className="bg-slate-100 min-h-screen">
            <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-b from-slate-900/50 via-slate-900/80 to-slate-900 z-0" />
                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <Ruler size={64} className="text-brand-red mx-auto mb-6" />
                    <h1 className="text-2xl md:text-4xl font-conthrax uppercase tracking-wider mb-6">
                        Shims-kalkulator
                    </h1>
                    <p className="text-xl text-slate-300 font-light leading-relaxed">
                        Beregner endring i toe og camber når du shimser navflensen på bakakselen.
                        Sett fra hjulsiden, venstre hjul. Kjøreretning mot venstre.
                    </p>
                </div>
            </section>

            <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
                <ShimCalculator />
            </div>
        </div>
    );
}
