import Image from 'next/image'
import { Wrench } from '@phosphor-icons/react/dist/ssr'
import BuildGuideTabs from '@/components/BuildGuideTabs'

export const metadata = {
    title: 'Byggeguide - B-Zero Racing',
    description: 'Slik bygger du om en vanlig gatebil til en lisensklar løpsbil for B-Zero Racing og Rally.',
}

export default function ByggeguidePage() {
    return (
        <div className="bg-slate-100 min-h-screen">
            {/* Header Section */}
            <section className="bg-slate-900 text-white py-10 md:py-20 relative overflow-hidden">
                <Image
                    src="/C1-24h-190428-146.JPG"
                    alt="B-Zero Racing 24h"
                    fill
                    className="object-cover object-center z-0 opacity-20 mix-blend-luminosity"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-b from-slate-900/50 via-slate-900/80 to-slate-900 z-0" />

                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <Wrench size={64} className="text-brand-red mx-auto mb-6" />
                    <h1 className="text-2xl md:text-4xl font-conthrax uppercase tracking-wider mb-6">Byggeguide</h1>
                    <p className="text-xl text-slate-300 font-light leading-relaxed mb-6">
                        Slik forvandler du en hverdagshelt til en fullblods racerbil. Følg stegene for oppsett av veltebur, understell og sikkerhetsutstyr.
                    </p>
                </div>
            </section>

            {/* Main Content Area */}
            <main className="max-w-4xl mx-auto px-6 py-10 md:py-16 space-y-16">
                <section id="bygge-bil" className="scroll-mt-24">
                    <p className="text-lg text-slate-600 leading-relaxed font-light mb-8 max-w-3xl">
                        Bilen er fundamentet. Enten du kjører racing på asfalt eller kaster deg ut i grusen på rally, bygger alt på de enkle og lette &quot;trillingene&quot; – Citroën C1, Peugeot 107 og Toyota Aygo fra 2005-2014. Her finner du de viktigste detaljene om oppsettet.
                    </p>

                    <BuildGuideTabs />
                </section>
            </main>
        </div>
    )
}
