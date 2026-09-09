import Image from 'next/image'
import { ArrowRight, Wrench, IdentificationBadge, ShieldCheck, Lightning, CalendarPlus, Link as LinkIcon, ShoppingCart, WarningIcon } from '@phosphor-icons/react/dist/ssr'
export const metadata = {
    title: 'Kom i gang - B-Zero Racing',
    description: 'Hvordan bygge bil, ta lisens, og skaffe riktig utstyr for å kjøre B-Zero Racing og Rally.',
}

export default function KomIGangPage() {
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
                    <h1 className="text-2xl md:text-4xl font-conthrax uppercase tracking-wider mb-6">Kom i gang</h1>
                    <p className="text-xl text-slate-300 font-light leading-relaxed mb-12">
                        Veien til startstreken er kortere enn du tror. Her er alt du trenger å vite om bygging av bil, lisenser, kjøreutstyr og praktiske rutiner for din første sesong.
                    </p>

                    {/* Promo Boxes i Hero */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                        {/* Promo 1: Leiebørs */}
                        <a href="/leiebors" className="group bg-linear-to-r from-blue-600/90 to-blue-800/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl text-white flex flex-col items-start justify-between gap-4 text-left border border-white/10 hover:scale-[1.02] transition-all cursor-pointer">
                            <div className="w-full">
                                <div className="flex items-center justify-between w-full mb-2">
                                    <h2 className="text-xl md:text-2xl font-conthrax uppercase tracking-wider drop-shadow-md">Prøve B-Zero?</h2>
                                    <ArrowRight size={24} weight="bold" className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </div>
                                <p className="text-blue-100 text-base md:text-lg pr-8">Finn ledig bil for sesongen, trening eller enkelte løp.</p>
                            </div>
                        </a>

                        {/* Promo 2: Talentutvikling */}
                        <a href="/talentutvikling" className="group bg-linear-to-r from-amber-500/90 to-amber-700/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl text-white flex flex-col items-start justify-between gap-4 text-left border border-white/10 hover:scale-[1.02] transition-all cursor-pointer">
                            <div className="w-full">
                                <div className="flex items-center justify-between w-full mb-2">
                                    <h2 className="text-xl md:text-2xl font-conthrax uppercase tracking-wider drop-shadow-md">Talentutvikling</h2>
                                    <ArrowRight size={24} weight="bold" className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </div>
                                <p className="text-amber-100 text-base md:text-lg pr-8">Er du Bilsporttalentet 2026? Les om talentutvikling her.</p>
                            </div>
                        </a>
                    </div>
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

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                        <p className="text-lg text-slate-600 leading-relaxed font-light mb-6 max-w-3xl">
                            Selve navet i klassen er bilene våre. Enten du kjører racing på asfalt eller kaster deg ut i grusen på rally, bygger alt på de enkle og lette &quot;trillingene&quot; – Citroën C1, Peugeot 107 og Toyota Aygo fra 2005-2014.
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed font-light mb-8 max-w-3xl">
                            Byggeprosessen er overkommelig for de fleste med litt skruerfaring, men det er strenge krav til sikkerhetsutstyr og oppsett. Vi har samlet alt du trenger å vite om demontering, sveising av bur, understell og særregler i en egen byggeguide.
                        </p>
                        <a href="/byggeguide" className="inline-flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white font-conthrax text-sm uppercase tracking-wider py-4 px-8 rounded-xl transition-colors shadow-sm">
                            Gå til byggeguiden <ArrowRight size={20} weight="bold" />
                        </a>
                    </div>
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
                                    <p className="text-slate-600 font-light text-sm">En autorisert teknisk årskontrollør må inspisere og godkjenne bilen. Kontrolløren utsteder en vognbok (bilens &quot;pass&quot;) som dokumenterer at veltebur, stoler og seler er montert riktig og trygt iht. regelverket (B-Zero/FIA).</p>
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
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mb-8">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Krav og gyldighet</h3>
                        <p className="text-lg text-slate-600 leading-relaxed font-light mb-4">
                            I nasjonal racing i Norge styres kravene til personlig utstyr og førerplass av{' '}
                            <a href="https://bilsportboka.no/kapittel/generelle-tekniske-bestemmelser/tekniske-sikkerhetsbestemmelser-for-rally-og-hastighetslop/" target="_blank" rel="noreferrer" className="text-brand-red underline underline-offset-2 hover:no-underline font-medium">
                                NBF Bilsportboka § 304
                            </a>{' '}
                            samt{' '}
                            <a href="/reglement" className="text-brand-red underline underline-offset-2 hover:no-underline font-medium">
                                Klassereglementet for B-Zero
                            </a>.
                        </p>
                        <p className="text-slate-600 leading-relaxed font-light">
                            Nasjonale klasser har enkelte særnorske lempinger på utløpsdato for stol for å holde kostnadene nede, mens kravene til hjelm, sikkerhetssele og brannsikkerhet er absolutte. Sikkerhetsutstyret ditt må være homologert (sertifisert) av FIA — datostemplingen er avgjørende, og her finnes det ingen logiske argumenter for å spare penger.
                        </p>
                    </div>

                    {/* Hurtigoversikt */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mb-8">
                        <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm border-b pb-2">Hurtigoversikt</h3>
                        <div className="overflow-x-auto -mx-2">
                            <table className="w-full text-left border-collapse min-w-[640px]">
                                <thead>
                                    <tr className="border-b-2 border-slate-200">
                                        <th className="px-2 py-3 text-xs font-bold uppercase tracking-wider text-slate-900">Utstyr</th>
                                        <th className="px-2 py-3 text-xs font-bold uppercase tracking-wider text-slate-900">Godkjent standard</th>
                                        <th className="px-2 py-3 text-xs font-bold uppercase tracking-wider text-slate-900">Nasjonal gyldighet (Norge)</th>
                                        <th className="px-2 py-3 text-xs font-bold uppercase tracking-wider text-slate-900">Kan kjøpes brukt / utgått?</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr>
                                        <td className="px-2 py-4 font-bold text-slate-900 text-sm align-top">Førerstol</td>
                                        <td className="px-2 py-4 text-slate-600 font-light text-sm align-top">FIA 8855-1999<br />FIA 8855-2021<br />FIA 8862-2009</td>
                                        <td className="px-2 py-4 text-slate-600 font-light text-sm align-top">10 år fra produksjonsår (+5 år utover «Not valid after»)</td>
                                        <td className="px-2 py-4 text-slate-600 font-light text-sm align-top">Ja (inntil 5 år etter merket dato)</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-4 font-bold text-slate-900 text-sm align-top">Sikkerhetssele</td>
                                        <td className="px-2 py-4 text-slate-600 font-light text-sm align-top">FIA 8853-2016<br />FIA 8853/98</td>
                                        <td className="px-2 py-4 text-slate-600 font-light text-sm align-top">Følger påtrykt utløpsdato («Not valid after»). B-Zero har IKKE utvidet gyldighet.</td>
                                        <td className="px-2 py-4 text-slate-600 font-light text-sm align-top">Nei (hvis utgått på dato). Ja (hvis innenfor dato).</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-4 font-bold text-slate-900 text-sm align-top">Kjøredress</td>
                                        <td className="px-2 py-4 text-slate-600 font-light text-sm align-top">FIA 8856-2000<br />FIA 8856-2018</td>
                                        <td className="px-2 py-4 text-slate-600 font-light text-sm align-top">Ingen utløpsdato på 8856-2000. 8856-2018 følger påtrykt dato.</td>
                                        <td className="px-2 py-4 text-slate-600 font-light text-sm align-top">Ja (hvis 8856-2000, ren og uskadet)</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-4 font-bold text-slate-900 text-sm align-top">Undertøy / sko / hansker</td>
                                        <td className="px-2 py-4 text-slate-600 font-light text-sm align-top">FIA 8856-2000<br />FIA 8856-2018</td>
                                        <td className="px-2 py-4 text-slate-600 font-light text-sm align-top">Ingen utløpsdato på 8856-2000. Må være 100% flammehemmende.</td>
                                        <td className="px-2 py-4 text-slate-600 font-light text-sm align-top">Ja (så lenge det er helt og uskadet)</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-4 font-bold text-slate-900 text-sm align-top">Hjelm</td>
                                        <td className="px-2 py-4 text-slate-600 font-light text-sm align-top">Snell SA2020 / SA2015<br />FIA 8859-2015<br />FIA 8860-2010 / 2018</td>
                                        <td className="px-2 py-4 text-slate-600 font-light text-sm align-top">Strengt iht. FIA Technical List 25. Ingen overtid eller unntak.</td>
                                        <td className="px-2 py-4 text-slate-600 font-light text-sm align-top">Nei / OBS (Snell SA2010 og eldre er forbudt)</td>
                                    </tr>
                                    <tr>
                                        <td className="px-2 py-4 font-bold text-slate-900 text-sm align-top">FHR / HANS</td>
                                        <td className="px-2 py-4 text-slate-600 font-light text-sm align-top">FIA 8858-2002<br />FIA 8858-2010</td>
                                        <td className="px-2 py-4 text-slate-600 font-light text-sm align-top">Ingen utløpsdato på kragen. Stropper må være hele.</td>
                                        <td className="px-2 py-4 text-slate-600 font-light text-sm align-top">Ja (så lenge kompositt og stropper er intakte)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Detaljerte krav per komponent */}
                    <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Detaljerte krav per komponent</h3>
                    <div className="space-y-6">
                        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
                            <h4 className="text-lg font-bold text-slate-900 mb-4">1. Førerstol</h4>
                            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Regelreferanse</p>
                                    <p className="text-slate-600 font-light text-sm">B-Zero Teknisk Reglement § 2.5 og{' '}
                                        <a href="https://bilsportboka.no/kapittel/generelle-tekniske-bestemmelser/tekniske-sikkerhetsbestemmelser-for-rally-og-hastighetslop/" target="_blank" rel="noreferrer" className="text-brand-red underline underline-offset-2 hover:no-underline">Bilsportboka § 304</a>.
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Standard</p>
                                    <p className="text-slate-600 font-light text-sm">FIA 8855-1999, FIA 8855-2021 eller FIA 8862-2009.</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Gyldighet i praksis</p>
                                    <p className="text-slate-600 font-light text-sm">Gyldig ut det 10. kalenderåret regnet fra produksjonsåret. En stol med standard 5 års internasjonal FIA-merking (f.eks. «Not valid after 2023») er lovlig i B-Zero ut 2028.</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Krav</p>
                                    <p className="text-slate-600 font-light text-sm">Skallet må være 100% fritt for krakeleringer, sprekker og skader etter kollisjon. Må monteres med godkjente stolfester i henhold til reglementet.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
                            <h4 className="text-lg font-bold text-slate-900 mb-4">2. Sikkerhetssele</h4>
                            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Regelreferanse</p>
                                    <p className="text-slate-600 font-light text-sm">B-Zero Teknisk Reglement og{' '}
                                        <a href="https://bilsportboka.no/kapittel/generelle-tekniske-bestemmelser/tekniske-sikkerhetsbestemmelser-for-rally-og-hastighetslop/" target="_blank" rel="noreferrer" className="text-brand-red underline underline-offset-2 hover:no-underline">Bilsportboka § 304</a>.
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Standard</p>
                                    <p className="text-slate-600 font-light text-sm">FIA 8853-2016 eller FIA 8853/98.</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Påkrevd konfigurasjon</p>
                                    <p className="text-slate-600 font-light text-sm">Kun 6-punktssele er tillatt i B-Zero. 4-punktsbelter (FIA 8854/98) og 5-punktsbelter er ikke tillatt.</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Gyldighet i praksis</p>
                                    <p className="text-slate-600 font-light text-sm">Følger påtrykt utløpsdato («Not valid after»). Merk at B-Zero <strong>ikke</strong> omfattes av unntaket for 5 års forlenget gyldighet på seler (slik som enkelte rallyklasser jf. Bilsportboka § 305q).</p>
                                </div>
                                <div className="md:col-span-2">
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Viktig ved innkjøp</p>
                                    <p className="text-slate-600 font-light text-sm">FIA har faset ut standarden 8853/98 (se FIA Technical List 24). For å sikre forutsigbarhet mot fremtidige regeloppdateringer i Bilsportboka anbefales det å velge FIA 8853-2016 (FIA Technical List 57) med 2&quot; skulderstropper for optimal passform mot FHR/HANS.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
                            <h4 className="text-lg font-bold text-slate-900 mb-4">3. Kjøredress og personlig bekledning</h4>
                            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Regelreferanse</p>
                                    <p className="text-slate-600 font-light text-sm">
                                        <a href="https://bilsportboka.no/kapittel/generelle-tekniske-bestemmelser/tekniske-sikkerhetsbestemmelser-for-rally-og-hastighetslop/" target="_blank" rel="noreferrer" className="text-brand-red underline underline-offset-2 hover:no-underline">Bilsportboka § 304</a>.
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Standard</p>
                                    <p className="text-slate-600 font-light text-sm">FIA 8856-2000 eller FIA 8856-2018.</p>
                                </div>
                                <div className="md:col-span-2">
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Gyldighet i praksis</p>
                                    <p className="text-slate-600 font-light text-sm">
                                        <strong>FIA 8856-2000:</strong> Har ingen utløpsdato. Kan brukes så lenge FIA-broderiet er leselig og dressen er hel, ren og uten rifter eller olje-/bensinsøl.<br />
                                        <strong>FIA 8856-2018:</strong> Har påtrykt utløpsår og er gyldig ut det angitte året.
                                    </p>
                                </div>
                                <div className="md:col-span-2">
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Undertøy, sko og hansker</p>
                                    <p className="text-slate-600 font-light text-sm">Balaklava, trøye, stillongs, sokker, sko og hansker skal alle være merket med FIA 8856-2000 eller 8856-2018. Vanlig superundertøy av syntetisk materiale (polyester/nylon) er strengt forbudt da det smelter ved brann.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
                            <h4 className="text-lg font-bold text-slate-900 mb-4">4. Hjelm</h4>
                            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Regelreferanse</p>
                                    <p className="text-slate-600 font-light text-sm">
                                        <a href="https://bilsportboka.no/kapittel/generelle-tekniske-bestemmelser/tekniske-sikkerhetsbestemmelser-for-rally-og-hastighetslop/" target="_blank" rel="noreferrer" className="text-brand-red underline underline-offset-2 hover:no-underline">Bilsportboka § 304</a> og FIA Technical List No. 25.
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Godkjente standarder</p>
                                    <p className="text-slate-600 font-light text-sm">Snell SA2020, Snell SA2015, FIA 8859-2015, FIA 8860-2010 / FIA 8860-2018.</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Gyldighet i praksis</p>
                                    <p className="text-slate-600 font-light text-sm">Det gis ingen nasjonal forlengelse på hjelmer. Snell SA2010, Snell SA2005 og eldre standarder er utgått og avvises blankt i teknisk kontroll, uavhengig av hjelmens tilstand.</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Krav til fester</p>
                                    <p className="text-slate-600 font-light text-sm">Hjelmen må ha fabrikkmonterte M6-terminaler for FHR (merket FIA 8858-2002 eller FIA 8858-2010).</p>
                                </div>
                            </div>

                            <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <WarningIcon size={22} weight="fill" className="text-red-600 shrink-0" />
                                    <h5 className="font-bold text-red-800 uppercase tracking-wider text-sm">Typiske bruktfeller</h5>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 shrink-0" />
                                        <span className="text-red-900 font-light text-sm"><strong>Britisk standard (BS 6658-85 Type A/FR):</strong> Kjennetegnes av et rødt, rundt merke (BSI Kitemark) på baksiden av hjelmen. Denne standarden er utgått, strøket av FIA og strengt forbudt. Hjelmen gir startnekt.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 shrink-0" />
                                        <span className="text-red-900 font-light text-sm"><strong>Snell SA2005 og SA2010:</strong> Hjelmer merket SA2010 (oransje/brun etikett inni fôret) eller SA2005 er ikke lenger tillatt. Kun Snell SA2015 og SA2020 er godkjente Snell-standarder.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 shrink-0" />
                                        <span className="text-red-900 font-light text-sm"><strong>MC- og karthjelmer:</strong> Hjelmer merket ECE 22.05 / 22.06 (MC), Snell M (motorsykkel) eller Snell K / CMR (karting) er ikke godkjente for racing med bil, da de mangler krav til brannsikkerhet og FHR/HANS-forankring.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
                            <h4 className="text-lg font-bold text-slate-900 mb-4">5. HANS / FHR (Frontal Head Restraint)</h4>
                            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Regelreferanse</p>
                                    <p className="text-slate-600 font-light text-sm">
                                        <a href="https://bilsportboka.no/kapittel/generelle-tekniske-bestemmelser/tekniske-sikkerhetsbestemmelser-for-rally-og-hastighetslop/" target="_blank" rel="noreferrer" className="text-brand-red underline underline-offset-2 hover:no-underline">Bilsportboka § 304</a> og FIA Technical List No. 29.
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Standard</p>
                                    <p className="text-slate-600 font-light text-sm">FIA 8858-2002 eller FIA 8858-2010.</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Gyldighet i praksis</p>
                                    <p className="text-slate-600 font-light text-sm">Ingen tidsbegrensning. Selve kragen går ikke ut på dato så lenge kompositt- eller plastmaterialet er fritt for sprekker, delaminering eller modifikasjoner.</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Krav til stropper (tethers)</p>
                                    <p className="text-slate-600 font-light text-sm">Stroppene som kobles til hjelmen må ha synlig FIA 8858-merking og være uten rifter eller slitasje. Skal alltid byttes etter en kraftig kollisjon.</p>
                                </div>
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
                            Bilsport krever at papirene er i orden. Her er den årlige sjekklisten din:
                        </p>

                        <div className="relative border-l-2 border-slate-200 ml-4 space-y-12">

                            <div className="relative pl-8">
                                <div className="absolute w-4 h-4 bg-amber-500 rounded-full -left-[9px] top-1 outline-4 outline-white" />
                                <h3 className="font-bold text-slate-900 mb-2 uppercase tracking-wide">Januar / Februar: Papirarbeid</h3>
                                <ul className="space-y-2 text-slate-600 font-light text-sm list-disc list-inside">
                                    <li>Betal årskontingenten til bilsportklubben din (f.eks. NMK, KNA).</li>
                                    <li>Forny den personlige lisensen din direkte hos NBF.</li>
                                    <li>Bestill eller forny startnummeret ditt for klassen.</li>
                                </ul>
                            </div>

                            <div className="relative pl-8">
                                <div className="absolute w-4 h-4 bg-brand-red rounded-full -left-[9px] top-1 outline-4 outline-white" />
                                <h3 className="font-bold text-slate-900 mb-2 uppercase tracking-wide">Mars / April: Årskontroll</h3>
                                <ul className="space-y-2 text-slate-600 font-light text-sm list-disc list-inside">
                                    <li>Få bilen godkjent av en teknisk årskontrollør for å få årets merke (påkrevd!).</li>
                                    <li>Gjennomfør EU-kontroll hvis bilen også skal brukes på veien.</li>
                                    <li>Sjekk om legeattesten din må fornyes (intervall avhenger av alder).</li>
                                </ul>
                            </div>

                            <div className="relative pl-8">
                                <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-1 outline-4 outline-white" />
                                <h3 className="font-bold text-slate-900 mb-2 uppercase tracking-wide">Løpshelg: Teknisk kontroll</h3>
                                <ul className="space-y-2 text-slate-600 font-light text-sm list-disc list-inside">
                                    <li>Møt opp til Teknisk kontroll på banen før du kjører utpå.</li>
                                    <li>Vis frem gyldig personlig lisens og vognlisens.</li>
                                    <li>Få sikkerhetsutstyret ditt sjekket av kontrollørene.</li>
                                </ul>
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
                        <a href="/tiltrekkingsmomenter" className="bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-800 hover:border-brand-red transition group">
                            <h3 className="font-bold text-white text-sm uppercase tracking-wide mb-1 flex items-center gap-2">
                                Tiltrekkingsmomenter <ArrowRight size={14} className="text-brand-red group-hover:translate-x-1 transition-transform" />
                            </h3>
                            <p className="text-slate-400 text-xs">Nm-verdier for bolter over hele bilen, med søk.</p>
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
                        <a href="https://www.facebook.com/JHLCages" target="_blank" rel="noreferrer" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-brand-red transition group">
                            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-1 flex items-center gap-2">
                                JH Linnerud <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </h3>
                            <p className="text-slate-500 text-xs">Spesialist på bygging og montering av sikkerhetsbur for bilsport. Ligger på Magnor.</p>
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
