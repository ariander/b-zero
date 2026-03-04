import Image from 'next/image'
import { ArrowRight, Wrench, IdentificationBadge, ShieldCheck, Lightning, CalendarPlus, Link as LinkIcon, ShoppingCart } from '@phosphor-icons/react/dist/ssr'
import BuildGuideTabs from '@/components/BuildGuideTabs'

export const metadata = {
    title: 'Kom i gang - B-Zero Racing',
    description: 'Hvordan bygge bil, ta lisens, og skaffe riktig utstyr for å kjøre B-Zero Racing og Rally.',
}

export default function KomIGangPage() {
    return (
        <div className="bg-slate-100 min-h-screen">
            {/* Header Section */}
            <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
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
                    <h1 className="text-4xl md:text-5xl font-conthrax uppercase tracking-wider mb-6">Kom i gang</h1>
                    <p className="text-xl text-slate-300 font-light leading-relaxed">
                        Veien til startstreken er kortere enn du tror. Her er alt du trenger å vite om bygging av bil, lisenser, kjøreutstyr og praktiske rutiner for din første sesong.
                    </p>
                </div>
            </section>

            {/* Main Content Area */}
            <main className="max-w-4xl mx-auto px-6 py-10 md:py-16 space-y-16">

                {/* Quick Navigation Links */}
                <nav className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 sm:gap-4 border-b border-slate-200 pb-12 -mt-4">
                    <a href="#filosofi" className="w-full sm:w-auto text-center bg-white hover:border-purple-500 border border-transparent shadow-sm px-5 py-2.5 md:py-3 rounded-full text-sm font-conthrax uppercase tracking-wide text-slate-700 hover:text-purple-500 transition">Filosofi</a>
                    <a href="#bygge-bil" className="w-full sm:w-auto text-center bg-white hover:border-brand-red border border-transparent shadow-sm px-5 py-2.5 md:py-3 rounded-full text-sm font-conthrax uppercase tracking-wide text-slate-700 hover:text-brand-red transition">Bygge bil</a>
                    <a href="#lisenser" className="w-full sm:w-auto text-center bg-white hover:border-blue-500 border border-transparent shadow-sm px-5 py-2.5 md:py-3 rounded-full text-sm font-conthrax uppercase tracking-wide text-slate-700 hover:text-blue-500 transition">Lisenser</a>
                    <a href="#sikkerhetsutstyr" className="w-full sm:w-auto text-center bg-white hover:border-green-500 border border-transparent shadow-sm px-5 py-2.5 md:py-3 rounded-full text-sm font-conthrax uppercase tracking-wide text-slate-700 hover:text-green-500 transition">Utstyr</a>
                    <a href="#arshjulet" className="w-full sm:w-auto text-center bg-white hover:border-amber-500 border border-transparent shadow-sm px-5 py-2.5 md:py-3 rounded-full text-sm font-conthrax uppercase tracking-wide text-slate-700 hover:text-amber-500 transition">Årshjul</a>
                    <a href="#linker" className="w-full sm:w-auto text-center bg-white hover:border-slate-400 border border-transparent shadow-sm px-5 py-2.5 md:py-3 rounded-full text-sm font-conthrax uppercase tracking-wide text-slate-700 hover:text-slate-900 transition">Linker</a>
                </nav>

                {/* Section: Filosofi */}
                <section id="filosofi" className="scroll-mt-24">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-slate-900 p-3 rounded-xl shadow-md">
                            <Lightning size={32} weight="fill" className="text-purple-500" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-conthrax uppercase tracking-wider text-slate-900">Klassens Filosofi</h2>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 prose prose-slate max-w-none">
                        <p className="text-xl text-slate-700 leading-relaxed font-semibold mb-6">
                            &quot;Minst mulig skruing, mest mulig kjøring, og et fantastisk miljø i depotet.&quot;
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed font-light mb-6">
                            Fundamentet i B-Zero er bygget på ideen om ekstremt lave bygge- og driftskostnader. Ved å benytte biler som er mekanisk identiske, eliminerer vi utstyrsjaget som ofte preger annen bilsport. Fokuset flyttes rett tilbake på føreren. Det er ferdighetene bak rattet, evnen til å holde farten gjennom svingene og strategien på banen som avgjør hvem som vinner.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6 mt-8">
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-2 uppercase tracking-wide text-sm">Identiske Forutsetninger</h3>
                                <p className="text-slate-600 font-light text-sm">Bilen, motoren, dekkene og vekten er strengt regulert. Trimming er forbudt. Når utstyret er likt, er det marginene på banen som teller. Resultatet er Norges kanskje tetteste og jevneste racing.</p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <h3 className="font-bold text-slate-900 mb-2 uppercase tracking-wide text-sm">Samhold i Depotet</h3>
                                <p className="text-slate-600 font-light text-sm">I B-Zero konkurrerer vi beintøft ute på banen, men i depoet er vi én stor familie. Vi låner hverandre verktøy, deler tips og hjelper til hvis noen får problemer – fordi vi vil at alle skal stå på startstreken i neste heat.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: Bygge bil */}
                <section id="bygge-bil" className="scroll-mt-24">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-slate-900 p-3 rounded-xl shadow-md">
                            <Wrench size={32} className="text-brand-red" weight="fill" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-conthrax uppercase tracking-wider text-slate-900">Bygge en B-Zero</h2>
                    </div>

                    <p className="text-lg text-slate-600 leading-relaxed font-light mb-8 max-w-3xl">
                        Selve navet i klassen er bilene våre. Enten du kjører racing på asfalt eller kaster deg ut i grusen på rally, bygger alt på de enkle og lette &quot;trillingene&quot; – Citroën C1, Peugeot 107 og Toyota Aygo fra 2005-2014.
                    </p>

                    <BuildGuideTabs />
                </section>

                {/* Section: Lisenser */}
                <section id="lisenser" className="scroll-mt-24">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-slate-900 p-3 rounded-xl shadow-md">
                            <IdentificationBadge size={32} className="text-blue-500" weight="fill" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-conthrax uppercase tracking-wider text-slate-900">Lisenser du må ha</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Personlig Lisens */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col h-full">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Fører: Personlig lisens</h3>
                            <p className="text-slate-600 font-light mb-6 flex-1">For å kjøre løp trenger du en førerlisens for baneracing (eller evt. rally).</p>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-2">Hvordan</h4>
                                    <p className="text-slate-600 font-light text-sm">Du må være medlem i en bilsportklubb (f.eks. NMK, KNA). Deretter må du gjennomføre et lisenskurs (teori + praksis) og bestå en medisinsk undersøkelse hos fastlegen din.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-2">Hvorfor</h4>
                                    <p className="text-slate-600 font-light text-sm">Bilsport er farlig. NBF må garantere at du forstår flaggsignaler, oppførsel på banen og at du ikke har underliggende helseproblemer som gjør deg til en fare for andre i høye hastigheter. Lisensen inkluderer også ulykkesforsikring.</p>
                                </div>
                            </div>
                        </div>

                        {/* Vognlisens */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col h-full">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">Bil: Vognlisens</h3>
                            <p className="text-slate-600 font-light mb-6 flex-1">Bilen må ha sin egen identitet og godkjenning for å delta i løp.</p>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-2">Hvordan</h4>
                                    <p className="text-slate-600 font-light text-sm">Bilen må inspiseres av en autorisert teknisk årskontrollør. De utsteder en vognbok (bilens &quot;pass&quot;) som dokumenterer at veltebur, stoler og seler er montert i henhold til regelverket (B-Zero/FIA).</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-2">Hvorfor</h4>
                                    <p className="text-slate-600 font-light text-sm">Dette sikrer at ingen jukser med bilens spesifikasjoner, og at sikkerhetskonstruksjonen holder mål ved en rulling eller krasj. Teknisk kontroll hindrer at du eller andre stiller til start med livsfarlige feil.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: personlig utstyr */}
                <section id="sikkerhetsutstyr" className="scroll-mt-24">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-slate-900 p-3 rounded-xl shadow-md">
                            <ShieldCheck size={32} className="text-green-500" weight="fill" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-conthrax uppercase tracking-wider text-slate-900">Personlig Sikkerhetsutstyr</h2>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                        <p className="text-lg text-slate-600 leading-relaxed font-light mb-8">
                            Sikkerhetsutstyret ditt må være homologert (sertifisert) av FIA. Datostemplingen er avgjørende. Her finnes det ingen logiske argumenter for å spare penger.
                        </p>

                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm border-b pb-2">Krav til utstyr</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <ShieldCheck className="text-green-500 shrink-0 mt-1" weight="fill" />
                                        <span className="text-slate-600 font-light text-sm">FIA-godkjent kjøredress (ofte standard 8856-2018).</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <ShieldCheck className="text-green-500 shrink-0 mt-1" weight="fill" />
                                        <span className="text-slate-600 font-light text-sm">FIA-godkjent brannsikkert undertøy, balaklava, sokker.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <ShieldCheck className="text-green-500 shrink-0 mt-1" weight="fill" />
                                        <span className="text-slate-600 font-light text-sm">FIA-godkjente sko og hansker.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <ShieldCheck className="text-green-500 shrink-0 mt-1" weight="fill" />
                                        <span className="text-slate-600 font-light text-sm">FIA-godkjent hjelm godkjent for bil (med HANS-klips).</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <ShieldCheck className="text-green-500 shrink-0 mt-1" weight="fill" />
                                        <span className="text-slate-600 font-light text-sm">FIA-godkjent FHR-enhet (Frontal Head Restraint, oftest HANS-krage).</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-center">
                                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-2">Hvorfor er dette så viktig?</h4>
                                <p className="text-slate-600 font-light text-sm leading-relaxed">
                                    Brannutstyret gir deg dyrebare sekunder til å komme deg ut av et brennende vrak. FHR-enheten forhindrer at nakken din knekker av G-kreftene ved bråstopp i en kollisjon.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: Årshjulet */}
                <section id="arshjulet" className="scroll-mt-24">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-slate-900 p-3 rounded-xl shadow-md">
                            <CalendarPlus size={32} className="text-amber-500" weight="fill" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-conthrax uppercase tracking-wider text-slate-900">Årshjulet</h2>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                        <p className="text-lg text-slate-600 leading-relaxed font-light mb-8">
                            Bilsport krever at papirene er i orden. Slik ser den byråkratiske rutinen ut år for år:
                        </p>

                        <div className="relative border-l-2 border-slate-200 ml-4 space-y-12">

                            <div className="relative pl-8">
                                <div className="absolute w-4 h-4 bg-amber-500 rounded-full -left-[9px] top-1 outline-4 outline-white" />
                                <h3 className="font-bold text-slate-900 mb-2 uppercase tracking-wide">Januar / Februar</h3>
                                <p className="text-slate-600 font-light text-sm">
                                    Forny medlemskap i din lokale bilsportklubb og betal årskontingenten for den personlige lisensen din direkte hos NBF. Husk også å bestille eller fornye startnummeret ditt for klassen.
                                </p>
                            </div>

                            <div className="relative pl-8">
                                <div className="absolute w-4 h-4 bg-brand-red rounded-full -left-[9px] top-1 outline-4 outline-white" />
                                <h3 className="font-bold text-slate-900 mb-2 uppercase tracking-wide">Mars / April</h3>
                                <p className="text-slate-600 font-light text-sm">
                                    Gjennomfør &quot;Årskontroll&quot; av bilen. Bilen må sjekkes av en godkjent teknisk kontrollør <strong>hvert eneste år</strong> før du kan stille i ditt første løp for å få utstedt et riktig årskontrollmerke.
                                </p>
                            </div>

                            <div className="relative pl-8">
                                <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1 outline-4 outline-white" />
                                <h3 className="font-bold text-slate-900 mb-2 uppercase tracking-wide">Løpshelg!</h3>
                                <p className="text-slate-600 font-light text-sm">
                                    Du må alltid gjennom &quot;Teknisk kontroll&quot; på selve banen, hvor de dobbeltsjekker at utstyr og bil er greit før du slipper utpå asfalten. Merk: Legeattesten din må også fornyes med jevne mellomrom, avhengig av alderen din (sjekk NBFs tabell for intervaller).
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Linjer section */}
                <section id="linker" className="scroll-mt-24">
                    <div className="flex items-center gap-4 mb-8">
                        <LinkIcon size={32} className="text-slate-400" weight="bold" />
                        <h2 className="text-2xl md:text-3xl font-conthrax uppercase tracking-wider text-slate-900">Praktiske Linker</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <a href="https://bilsportboka.no" target="_blank" rel="noreferrer" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-brand-red transition group">
                            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-1 flex items-center gap-2">
                                Bilsportboka.no <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </h3>
                            <p className="text-slate-500 text-xs">Reglementsidene for Norsk Bilsport.</p>
                        </a>
                        <a href="/reglement" className="bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800 hover:border-brand-red transition group">
                            <h3 className="font-bold text-white text-sm uppercase tracking-wide mb-1 flex items-center gap-2">
                                Teknisk Reglement B-Zero <ArrowRight size={14} className="text-brand-red group-hover:translate-x-1 transition-transform" />
                            </h3>
                            <p className="text-slate-400 text-xs">Våre egne klasseregler for oppsett og justeringer.</p>
                        </a>
                    </div>

                    <div className="flex items-center gap-4 mt-20 mb-8">
                        <ShoppingCart size={32} className="text-brand-red" weight="fill" />
                        <h2 className="text-2xl md:text-3xl font-conthrax uppercase tracking-wider text-slate-900">Nettbutikker & Utstyr</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <a href="https://rpcwebshop.no/#!/b-zero" target="_blank" rel="noreferrer" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-brand-red transition group">
                            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-1 flex items-center gap-2">
                                RPC Webshop <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </h3>
                            <p className="text-slate-500 text-xs">Bestill deler, bur og utstyr direkte fra klassens leverandør.</p>
                        </a>
                        <a href="https://gundersenmotorsport.no/" target="_blank" rel="noreferrer" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-brand-red transition group">
                            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-1 flex items-center gap-2">
                                Gundersen Motorsport <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </h3>
                            <p className="text-slate-500 text-xs">Den mest kjente i Norge. De har &quot;alt&quot; og er eksperter på bilsportbokas krav. Godt utvalg av Sparco og OMP.</p>
                        </a>
                        <a href="https://stianmotorsport.no/" target="_blank" rel="noreferrer" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-brand-red transition group">
                            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-1 flex items-center gap-2">
                                Stian Sørlie Motorsport <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </h3>
                            <p className="text-slate-500 text-xs">Veldig bredt utvalg av både personlig utstyr (dresser, hjelmer) og teknisk utstyr (stoler, burpolstring). Ofte gode på Alpinestars.</p>
                        </a>
                        <a href="https://www.kollevold.no/" target="_blank" rel="noreferrer" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-brand-red transition group">
                            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-1 flex items-center gap-2">
                                Kollevold AS <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </h3>
                            <p className="text-slate-500 text-xs">Spesialister på rally og bane. Har et massivt lager av tekniske komponenter og personlig sikkerhetsutstyr.</p>
                        </a>
                        <a href="https://www.tk-sport.no/" target="_blank" rel="noreferrer" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-brand-red transition group">
                            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-1 flex items-center gap-2">
                                TK-Sport <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </h3>
                            <p className="text-slate-500 text-xs">Holder til i Hokksund. Ofte gode priser på pakkeløsninger (f.eks. komplett pakke med dress, sko og hansker).</p>
                        </a>
                        <a href="https://gasolin.no/" target="_blank" rel="noreferrer" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-brand-red transition group">
                            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-1 flex items-center gap-2">
                                Gasolin <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </h3>
                            <p className="text-slate-500 text-xs">Mest kjent for verktøy, men de har også et økende utvalg av racingutstyr som FIA-godkjent burpolstring og seter.</p>
                        </a>
                    </div>
                </section>
            </main>
        </div>
    )
}
