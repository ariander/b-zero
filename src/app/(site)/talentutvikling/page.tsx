import Image from 'next/image'
import { RocketLaunch, CheckCircle, ArrowRight, EnvelopeSimple, FileText } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

export const metadata = {
    title: 'Talentutvikling med B-Zero',
    description: 'Les mer om hvordan B-Zero kan være et springbrett til en internasjonal karriere i bilsport.',
}

export default function TalentutviklingPage() {
    return (
        <div className="bg-slate-100 min-h-screen">
            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
                <Image
                    src="/hero-images/B-Zero Racing Gallery (1).jpg"
                    alt="Racerbil i fart"
                    fill
                    className="object-cover object-center z-0 opacity-40 mix-blend-luminosity"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-b from-slate-900/60 via-slate-900/80 to-slate-900 z-0" />

                <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                    <RocketLaunch size={64} weight="fill" className="text-amber-500 mx-auto mb-6" />
                    <h1 className="text-3xl md:text-4xl font-conthrax tracking-wider mb-6 text-slate-100 uppercase">
                        Talentutvikling med B-Zero
                    </h1>
                    <p className="text-xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto">
                        B-Zero er mer enn bare racing og rally – det kan være et springbrett til en internasjonal karriere i bilsport.
                    </p>
                </div>
            </section>

            {/* Main Content Area */}
            <main className="max-w-6xl mx-auto px-6 py-16">
                <div className="flex flex-col md:flex-row gap-12 lg:gap-20">

                    {/* Left Sidebar Table of Contents */}
                    <aside className="md:w-1/4 hidden md:block">
                        <nav className="sticky top-32 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="font-conthrax text-slate-900 mb-6 tracking-wider uppercase">Innhold</h3>
                            <ul className="space-y-4 text-sm font-semibold text-slate-500">
                                <li><a href="#introduksjon" className="hover:text-amber-500 transition block">Introduksjon</a></li>
                                <li><a href="#hvorfor-soke" className="hover:text-amber-500 transition block">Hvorfor søke fra B-Zero?</a></li>
                                <li><a href="#kriterier" className="hover:text-amber-500 transition block">Dette ser juryen etter</a></li>
                                <li><a href="#hjelp" className="hover:text-amber-500 transition block">Få hjelp med søknaden</a></li>
                            </ul>
                        </nav>
                    </aside>

                    {/* Article Content */}
                    <div className="md:w-3/4 space-y-20">

                        {/* 1. Introduksjon */}
                        <section id="introduksjon" className="scroll-mt-32">
                            <h2 className="text-2xl md:text-3xl font-conthrax tracking-wider text-slate-900 mb-6 border-b-2 border-amber-500 inline-block pb-2">Drømmer du om å bli Bilsporttalentet 2026? 🏎️🏆</h2>
                            <div className="prose prose-slate prose-lg max-w-none text-slate-700 font-light leading-relaxed">
                                <p>
                                    B-Zero er mer enn bare racing og rally – det kan være et springbrett til en internasjonal karriere i bilsport. Nå er søknadsportalen for <strong>Bilsporttalentet 2026</strong> åpen, og vi utfordrer våre juniorer til å satse!
                                </p>
                                <p>
                                    Bilsporttalentet er Norges mest prestisjefylte talentkonkurranse innen bilsport, og er åpen for utøvere fra og med det året de fyller 15 år til og med det året de fyller 21 år. Norsk Bilsport søker kandidater som har det lille ekstra, med den beste totalpakken av kjøreteknikk, fysisk form, mekanisk forståelse og evne til å presentere seg selv.
                                </p>
                                <p>
                                    Nå kan du søke om å bli en av <strong>fem finalister</strong> i Bilsporttalentet 2026. Finalen arrangeres på Vålerbanen og Gardermoen den 14. og 15. september, med <strong>søknadsfrist 17. august</strong>.
                                </p>
                                <p>
                                    De fem utvalgte finalistene får prøve seg i en rekke krevende øvelser. Vinneren blir offentliggjort på NBF sin galla til høsten, og stikker av med en premiepott på hele <strong>300 000 kroner</strong>.
                                </p>
                            </div>
                        </section>

                        {/* 2. Hvorfor søke */}
                        <section id="hvorfor-soke" className="scroll-mt-32">
                            <h2 className="text-2xl md:text-3xl font-conthrax tracking-wider text-slate-900 mb-6 border-b-2 border-amber-500 inline-block pb-2">Hvorfor søke fra B-Zero?</h2>
                            <div className="prose prose-slate prose-lg max-w-none text-slate-700 font-light leading-relaxed">
                                <p>
                                    Vi har allerede bevist at breddeidretten i B-Zero leverer eliteutøvere. Tidligere juniorer som Storm og Emil Gjerdrum har brukt erfaringen fra våre tette fighter til å markere seg nasjonalt.
                                </p>

                                <div className="mt-8 space-y-6">
                                    <div className="flex gap-4 items-start">
                                        <CheckCircle size={32} weight="fill" className="text-brand-red shrink-0 mt-1" />
                                        <div>
                                            <h3 className="font-conthrax text-lg text-slate-800 m-0 mb-2">Bredden trengs</h3>
                                            <p className="m-0">
                                                NBF ønsker søkere fra alle grener. Våre 2 juniorer i rally og 5-6 i racing er perfekte kandidater som viser mangfoldet i sporten.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 items-start">
                                        <CheckCircle size={32} weight="fill" className="text-brand-red shrink-0 mt-1" />
                                        <div>
                                            <h3 className="font-conthrax text-lg text-slate-800 m-0 mb-2">Lik startstrek</h3>
                                            <p className="m-0">
                                                I B-Zero lærer du å kjempe med likt utstyr. Det er her den rene kjøreteknikken din virkelig blir slipt.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 3. Kriterier */}
                        <section id="kriterier" className="scroll-mt-32">
                            <h2 className="text-2xl md:text-3xl font-conthrax tracking-wider text-slate-900 mb-6 border-b-2 border-amber-500 inline-block pb-2">Dette ser juryen etter</h2>
                            <div className="prose prose-slate prose-lg max-w-none text-slate-700 font-light leading-relaxed">
                                <p>
                                    For å bli plukket ut til den prestisjetunge finalen på Vålerbanen, må du vise progresjon i tre hovedkategorier:
                                </p>

                                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm my-8">
                                    <ol className="list-decimal list-inside space-y-4 m-0 font-semibold text-slate-800">
                                        <li><span className="font-conthrax ml-2">Kjøreferdigheter:</span> <span className="font-light text-slate-600 block mt-1 ml-6">Evnen til å håndtere bilen under press.</span></li>
                                        <li><span className="font-conthrax ml-2">Fysisk og mental styrke:</span> <span className="font-light text-slate-600 block mt-1 ml-6">Er du trent for å tåle en hel sesong?</span></li>
                                        <li><span className="font-conthrax ml-2">Kommunikasjon:</span> <span className="font-light text-slate-600 block mt-1 ml-6">Hvordan snakker du med media og samarbeidspartnere?</span></li>
                                    </ol>
                                </div>
                            </div>
                        </section>

                        {/* 4. Hjelp med søknaden */}
                        <section id="hjelp" className="scroll-mt-32">
                            <h2 className="text-2xl md:text-3xl font-conthrax tracking-wider text-slate-900 mb-6 border-b-2 border-amber-500 inline-block pb-2">Vi hjelper deg med søknaden!</h2>
                            <div className="prose prose-slate prose-lg max-w-none text-slate-700 font-light leading-relaxed">
                                <p>
                                    B-Zero Motorsport ønsker å se våre førere representert i finalen. Er du usikker på hvordan du skal sette opp søknaden eller hva du bør vektlegge?
                                </p>
                                <p>
                                    Ta kontakt med oss i teamet, så tar vi en gjennomgang av søknaden din og hjelper deg med å spisse innholdet.
                                </p>
                                <p className="mt-4">
                                    <a href="https://bilsport.no/na-kan-du-soke-pa-bilsporttalentet-2026/" target="_blank" rel="noreferrer" className="text-amber-600 hover:text-amber-700 font-medium underline underline-offset-4 transition-colors">
                                        Les mer hos Norsk Bilsport
                                    </a>
                                </p>
                            </div>

                            {/* Application Box */}
                            <div className="mt-12 mb-6 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 transition hover:border-amber-300">
                                <div className="flex items-center gap-6">
                                    <div className="bg-amber-50 p-4 rounded-full">
                                        <FileText size={40} className="text-amber-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-slate-900 font-conthrax tracking-wider text-lg mb-2">Send inn din søknad</h3>
                                        <p className="text-slate-500 text-sm font-light">
                                            Klar til å ta steget? Gå direkte til NBFs søknadsportal for Bilsporttalentet 2026.
                                        </p>
                                    </div>
                                </div>
                                <a
                                    href="https://bilsport.no/om-norsk-bilsport/talentutvikling/bilsporttalentet/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-full transition-colors flex items-center gap-2 whitespace-nowrap shadow-md focus:outline-hidden"
                                >
                                    Gå til søknad <ArrowRight weight="bold" />
                                </a>
                            </div>

                            {/* Call to Action Box */}
                            <div className="mt-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 transition hover:border-amber-300">
                                <div className="flex items-center gap-6">
                                    <div className="bg-amber-50 p-4 rounded-full">
                                        <EnvelopeSimple size={40} className="text-amber-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-slate-900 font-conthrax tracking-wider text-lg mb-2">Ta kontakt for hjelp</h3>
                                        <p className="text-slate-500 text-sm font-light">
                                            Vi er klare til å hjelpe deg med å spisse søknaden din. Send oss en melding!
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href="/om-oss"
                                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-full transition-colors flex items-center gap-2 whitespace-nowrap shadow-md focus:outline-hidden"
                                >
                                    Gå til kontakt <ArrowRight weight="bold" />
                                </Link>
                            </div>
                        </section>

                    </div>

                </div>
            </main>
        </div>
    )
}
