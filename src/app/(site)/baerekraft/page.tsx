import Image from 'next/image'
import { Leaf, FileText, ArrowRight } from '@phosphor-icons/react/dist/ssr'

export const metadata = {
    title: 'Bærekraftig Racing - B-Zero',
    description: 'En whitepaper om bærekraft, upcycling og ressurseffektivitet i B-Zero.',
}

export default function BaerekraftPage() {
    return (
        <div className="bg-slate-100 min-h-screen">
            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2560&auto=format&fit=crop"
                    alt="Miljøvennlig skogsvei"
                    fill
                    className="object-cover object-center z-0 opacity-40 mix-blend-luminosity"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-b from-slate-900/60 via-slate-900/80 to-slate-900 z-0" />

                <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                    <Leaf size={64} weight="fill" className="text-green-500 mx-auto mb-6" />
                    <h1 className="text-3xl md:text-5xl font-conthrax tracking-wider mb-6 text-slate-100 uppercase">
                        Bærekraftig Racing
                    </h1>
                    <p className="text-xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto">
                        En vitenskapelig og miljøøkonomisk analyse av bærekraft, upcycling og ressurseffektivitet i moderne motorsport.
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
                                <li><a href="#introduksjon" className="hover:text-green-500 transition block">Introduksjon</a></li>
                                <li><a href="#livslopsanalyse" className="hover:text-green-500 transition block">Livsløpsanalyse (LCA)</a></li>
                                <li><a href="#kjoretoydynamikk" className="hover:text-green-500 transition block">Kjøretøydynamikk</a></li>
                                <li><a href="#termodynamikk" className="hover:text-green-500 transition block">Termodynamikk</a></li>
                                <li><a href="#stoyregulering" className="hover:text-green-500 transition block">Støyregulering</a></li>
                                <li><a href="#sosial-baerekraft" className="hover:text-green-500 transition block">Sosial bærekraft</a></li>
                                <li><a href="#integrering-i-norge" className="hover:text-green-500 transition block">Utbredelse i Norge</a></li>
                                <li><a href="#konklusjon" className="hover:text-green-500 transition block">Konklusjon</a></li>
                                <li><a href="#referanser" className="hover:text-green-500 transition block">Referanser</a></li>
                            </ul>
                        </nav>
                    </aside>

                    {/* Article Content */}
                    <div className="md:w-3/4 space-y-20">

                        {/* 1. Introduksjon */}
                        <section id="introduksjon" className="scroll-mt-32">
                            <h2 className="text-2xl md:text-3xl font-conthrax tracking-wider text-slate-900 mb-6 border-b-2 border-green-500 inline-block pb-2">Introduksjon til miljøutfordringen</h2>
                            <div className="prose prose-slate prose-lg max-w-none text-slate-700 font-light leading-relaxed">
                                <p>
                                    Motorsporten befinner seg i det tjueførste århundre i en kompleks og til tider paradoksal overgangsfase. Den tradisjonelle bilsporten, som i over hundre år har vært selve inkarnasjonen av teknologisk grensesprengning, hastighet og mekanisk lidenskap, konfronteres nå med globale klimamål, strenge regulatoriske miljøkrav og et fundamentalt skifte i samfunnets toleranse for karbonintensive aktiviteter.
                                </p>
                                <p>
                                    Utfordringene er mangedimensjonale: Det handler ikke utelukkende om de direkte utslippene fra fossilt brennstoff, men i like stor grad om det massive forbruket av spesialiserte slitedeler, støyforurensning som påvirker lokalsamfunn, og det enorme karbonfotavtrykket som genereres under produksjonen av dedikerte racerbiler. For å opprettholde sin sosiale lisens til å operere, har bilsportens styrende organer, inkludert Norges Bilsportforbund (NBF) og det internasjonale bilsportforbundet (FIA), iverksatt strategier for å redusere sportens miljøavtrykk.
                                </p>

                                <div className="my-10 rounded-2xl overflow-hidden shadow-md">
                                    <Image
                                        src="https://cdn.sanity.io/images/27g9u6ol/production/f21bb5c74e8c47748ffe21de6f459d7cb6bea7d6-1800x1200.jpg"
                                        alt="Upcycling og bærekraft i praksis"
                                        width={1800}
                                        height={1200}
                                        className="w-full h-auto object-cover max-h-fit"
                                    />
                                    <p className="bg-white p-3 text-sm text-slate-500 italic text-center">B-Zero representerer en sirkulærøkonomisk motreaksjon for å minimere karbonfotavtrykket.</p>
                                </div>

                                <p>
                                    Mange av de etablerte løsningene har vært av høyteknologisk art, med et særlig fokus på elektrifisering. Selv om elektriske kjøretøy (EV) eliminerer direkte utslipp fra eksosrøret, introduserer de nye utfordringer knyttet til utvinning av kritiske mineraler, resirkulering av batterier, og et formidabelt karbonfotavtrykk under selve produksjonen.
                                </p>
                                <p className="font-semibold text-slate-900">
                                    I denne brytningstiden representerer B-Zero en radikal og svært pragmatisk motreaksjon forankret i sirkulærøkonomi: upcycling av masseproduserte, eksisterende kjøretøy.
                                </p>
                            </div>
                        </section>

                        {/* 2. Livsløpsanalyse (LCA) */}
                        <section id="livslopsanalyse" className="scroll-mt-32">
                            <h2 className="text-2xl md:text-3xl font-conthrax tracking-wider text-slate-900 mb-6 border-b-2 border-green-500 inline-block pb-2">Livsløpsanalyse (LCA) og upcycling</h2>
                            <div className="prose prose-slate prose-lg max-w-none text-slate-700 font-light leading-relaxed">
                                <h3 className="font-conthrax text-lg text-slate-800 mt-8 mb-4">Det skjulte avtrykket fra bilproduksjon</h3>
                                <p>
                                    Produksjon av en moderne bil er en enormt ressurs- og energiintensiv prosess. Før et kjøretøy forlader samlebåndet, kreves det utvinning av jernmalm for stål, bauxitt for aluminium, og petrokjemikalier for plast. Stålindustrien alene anslås å stå for mellom 7 og 9 prosent av de globale CO2-utslippene.
                                </p>
                                <p>
                                    Når man analyserer tallene, fremtrer proporsjonene tydelig. Produksjonen av en standard personbil genererer et fotavtrykk på om lag 6,8 tonn CO2-ekvivalenter. For elbiler er tallet enda høyere på grunn av batteriproduksjonen (ofte opp mot 26 tonn CO2-ekvivalenter for store biler). Å bygge en ny racerbil betyr at man starter med en massiv karbongjeld.
                                </p>

                                <h3 className="font-conthrax text-lg text-slate-800 mt-8 mb-4">Sirkulærøkonomi i praksis: B-Zero-metoden</h3>
                                <p>
                                    I stedet for å bygge nye kjøretøy krever B-Zero-reglementet at man tar utgangspunkt i en eksisterende Citroën C1, Peugeot 107 eller Toyota Aygo produsert mellom 2005 og 2014. Karbonfotavtrykket fra produksjonen av disse bilene er for lengst amortisert over deres sivile levetid.
                                </p>
                                <p>
                                    Når et slikt kjøretøy konverteres til en B-Zero racerbil, <strong>nullstilles i realiteten kravet til inkorporert karbon</strong>. Bilen strippes for overflødig vekt, og de gjenbrukte delene (interiør, lykter, seter) selges på bruktmarkedet, noe som understøtter den bredere sirkulærøkonomien. B-Zero beviser at bevaring av eksisterende maskinvare kan være den mest effektive formen for bærekraft.
                                </p>

                                <div className="my-8">
                                    <div className="overflow-x-auto rounded-md border border-slate-200 shadow-sm mb-3">
                                        <table className="min-w-full bg-white text-sm text-left text-slate-600">
                                            <thead className="bg-slate-200 text-slate-800 font-bold uppercase">
                                                <tr>
                                                    <th className="px-6 py-4">Parameter / Utslippskilde</th>
                                                    <th className="px-6 py-4">Nybygd GT3 Racerbil</th>
                                                    <th className="px-6 py-4">Nybygd Elektrisk Racerbil</th>
                                                    <th className="px-6 py-4 text-green-700 bg-green-200">B-Zero (Upcycle 05-14)</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                <tr>
                                                    <td className="px-6 py-4 font-semibold text-slate-800">Råvareutvinning (Chassis)</td>
                                                    <td className="px-6 py-4">Høyt (Karbonfiber, stål, aluminium)</td>
                                                    <td className="px-6 py-4">Høyt (Aluminium, stål, plast)</td>
                                                    <td className="px-6 py-4 text-green-700 bg-green-50/50 font-medium">Null (Allerede produsert)</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-6 py-4 font-semibold text-slate-800">Råvareutvinning (Drivlinje)</td>
                                                    <td className="px-6 py-4">Høyt (Spesiallegeringer, titan)</td>
                                                    <td className="px-6 py-4">Ekstremt (Litium, kobolt, nikkel)</td>
                                                    <td className="px-6 py-4 text-green-700 bg-green-50/50 font-medium">Null (Standard 1KR-FE gjenbrukes)</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-6 py-4 font-semibold text-slate-800">Produksjonsutslipp (Estimat)</td>
                                                    <td className="px-6 py-4">&gt; 10 tonn CO2e</td>
                                                    <td className="px-6 py-4">&gt; 25 tonn CO2e</td>
                                                    <td className="px-6 py-4 text-green-700 bg-green-50/50 font-medium">&lt; 0.5 tonn CO2e (Kun veltebur/sikkerhet)</td>
                                                </tr>
                                                <tr>
                                                    <td className="px-6 py-4 font-semibold text-slate-800">Behov for resirkulering</td>
                                                    <td className="px-6 py-4">Kontinuerlig utskifting av dyre deler</td>
                                                    <td className="px-6 py-4">Problematisk batteriresirkulering</td>
                                                    <td className="px-6 py-4 text-green-700 bg-green-50/50 font-medium">Høy grad av delesalg fra donorbiler</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <p className="text-xs text-slate-500 italic px-2 text-left">Tabell 1: Sammenlignende analyse av inkorporert karbon (embedded carbon).</p>
                                </div>

                                <div className="my-10 rounded-2xl overflow-hidden shadow-md">
                                    <div className="relative w-full aspect-video bg-black">
                                        <iframe
                                            src="https://www.youtube.com/embed/J1KrnEfZd1Q?si=nxHtycJXGRY8zAUa"
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                            className="absolute top-0 left-0 w-full h-full"
                                        ></iframe>
                                    </div>
                                    <p className="bg-white p-3 text-sm text-slate-500 italic text-center">Løsningen i praksis: En C1 byggemaskin. Slik forvandles en utrangert småbil til en fullblods, ressurseffektiv B-Zero racerbil.</p>
                                </div>
                            </div>
                        </section>

                        {/* 3. Kjøretøydynamikk */}
                        <section id="kjoretoydynamikk" className="scroll-mt-32">
                            <h2 className="text-2xl md:text-3xl font-conthrax tracking-wider text-slate-900 mb-6 border-b-2 border-green-500 inline-block pb-2">Kjøretøydynamikk og dekkforbruk</h2>
                            <div className="prose prose-slate prose-lg max-w-none text-slate-700 font-light leading-relaxed">
                                <p>
                                    Dekk utgjør en av de mest problematiske komponentene i motorsportens kretsløp. Slitasjen frigjør mikroplast og partikkelstøv som forurenser naturen. I aerodynamisk avanserte og motorsterke klasser som GT3 river dekkene literally i stykker på mikroskopisk nivå for å gi grep. Et GT3-team i et 24-timersløp kan forbruke over tjue til tretti sett med dekk i løpet av en løpshelg.
                                </p>

                                <div className="my-10 rounded-2xl overflow-hidden shadow-md">
                                    <Image
                                        src="/Porsche 911 RSR Silverstone 2018.avif"
                                        alt="Porsche 911 RSR"
                                        width={1200}
                                        height={600}
                                        className="w-full h-auto object-cover max-h-96"
                                    />
                                    <p className="bg-white p-3 text-sm text-slate-500 italic text-center">Fravær av høyt effekt-uttak og aerodynamisk trykk sparer drastisk på slitedeler.</p>
                                </div>

                                <h3 className="font-conthrax text-lg text-slate-800 mb-4">B-Zero og Nankang AS1: Fysikken bak lang levetid</h3>
                                <p>
                                    B-Zero eliminerer dette problemet gjennom en radikal reduksjon i vekt, effekt og fravær av aerodynamisk marktrykk. Bilenes 1.0 liters motor leverer beskjedne 68 hestekrefter. Bilene kjøres på et strengt spesifisert enhetsdekk: Nankang AS1 (155/55-14), som i utgangspunktet er et gatedekk.
                                </p>
                                <p>
                                    Data fra faktiske løp er slående. I den britiske C1 Racing Club, som B-Zero-reglementet speiler tett , rapporteres det om dekkforbruk som er nesten uforståelig lavt for tradisjonelle motorsportsutøvere. Under ekstrem utholdenhetstesting, som i det prestisjetunge 24-timersløpet på Spa-Francorchamps, fullførte et team hele døgnet ved å bruke kun to sett med dekk. En hel racingsesong i C1-klassen, inkludert flere kortere utholdenhetsløp (3, 4 og 24 timer), forbruker i gjennomsnitt mellom tre og åtte sett med dekk totalt per bil for hele året. Dette betyr at en B-Zero bil gjennom en hel sesong bruker færre dekk enn en GT3-bil bruker under en enkelt kvalifiserings- og treningsdag. Denne drastiske reduksjonen i petrokjemisk forbruk gjør B-Zero til en av de overlegent mest bærekraftige plattformene for motorsport med forbrenningsmotor.
                                </p>

                                <div className="my-8">
                                    <div className="overflow-x-auto rounded-md border border-slate-200 shadow-sm mb-3">
                                        <table className="min-w-full bg-white text-sm text-left text-slate-600">
                                            <thead className="bg-slate-200 text-slate-800 font-bold uppercase">
                                                <tr>
                                                    <th className="px-6 py-4">Parameter for Slitasje</th>
                                                    <th className="px-6 py-4">GT3 / GT4 Racing (eks. Porsche 911)</th>
                                                    <th className="px-6 py-4 text-green-700 bg-green-200">B-Zero (Toyota Aygo / C1)</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                <tr className="">
                                                    <td className="px-6 py-4 font-semibold text-slate-800">Kjøretøyets masse og aerodynamikk</td>
                                                    <td className="px-6 py-4">Høy masse, ekstrem downforce</td>
                                                    <td className="px-6 py-4 bg-green-50/30 text-green-800">Lav masse (~850 kg), ingen aero</td>
                                                </tr>
                                                <tr className="">
                                                    <td className="px-6 py-4 font-semibold text-slate-800">Dekkdimensjon og type</td>
                                                    <td className="px-6 py-4">Svært brede, myke racing slicks (eks. Pirelli P Zero)</td>
                                                    <td className="px-6 py-4 bg-green-50/30 text-green-800">Smale 155/55-14 (Nankang AS1 gatedekk)</td>
                                                </tr>
                                                <tr className="">
                                                    <td className="px-6 py-4 font-semibold text-slate-800">Forbruk i sprintløp (helg)</td>
                                                    <td className="px-6 py-4">3 - 5 sett dekk per bil</td>
                                                    <td className="px-6 py-4 bg-green-50/30 text-green-800 font-semibold">1 sett holder over flere løpshelger</td>
                                                </tr>
                                                <tr className="">
                                                    <td className="px-6 py-4 font-semibold text-slate-800">Forbruk i 24-timersløp</td>
                                                    <td className="px-6 py-4">Ofte 20+ sett (80+ dekk)</td>
                                                    <td className="px-6 py-4 bg-green-50/30 text-green-800 font-semibold">2 sett (8 dekk)</td>
                                                </tr>
                                                <tr className="">
                                                    <td className="px-6 py-4 font-semibold text-slate-800">Bremseslitasje og partikkelutslipp</td>
                                                    <td className="px-6 py-4">Ekstrem, krever karbonkeramikk/store stålskiver</td>
                                                    <td className="px-6 py-4 bg-green-50/30 text-green-800">Minimal (Standard skiver holder hundrevis av mil)</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <p className="text-xs text-slate-500 italic px-2 text-left">Tabell 2: Kvantitativ og kvalitativ sammenligning av forbruket av slitedeler mellom tung aerodynamisk racing og lettvekts B-Zero-racing.</p>
                                </div>
                            </div>
                        </section>

                        {/* 4. Termodynamikk */}
                        <section id="termodynamikk" className="scroll-mt-32">
                            <h2 className="text-2xl md:text-3xl font-conthrax tracking-wider text-slate-900 mb-6 border-b-2 border-green-500 inline-block pb-2">Termodynamikk og drivstoff</h2>
                            <div className="prose prose-slate prose-lg max-w-none text-slate-700 font-light leading-relaxed">
                                <p>
                                    Moderne racerbiler benytter ofte svært rike drivstoffblandinger for å holde motoren avkjølt, noe som fører til skyhøye utslipp og forbruk (ofte 40 til 60 liter per 100 km).
                                </p>
                                <p>
                                    I B-Zero er motoren den viden anerkjente og driftssikre 1KR-FE-motoren (1.0 liter, naturlig aspirert). Reglementet slår kompromissløst fast at trimming er forbudt. Bilenes Motorstyreenhet (ECU) er plombert med fabrikkens strenge utslippskrav for gatebruk i behold.
                                </p>
                                <p>
                                    Empiriske data viser at bilene, selv når de kjøres med flat pedal på en lukket raceway, nøyer seg med i underkant av <strong>7 liter per 100 kilometer</strong>. De benytter helt standard drivstoff (pumpebensin), og unngår urene &quot;race fuels&quot; med syntetiske tilsetninger. Depotpåfyllingen benytter lekkasjesikre kanner (Tuff Jugs) som forsegles mot avdamping (VOC-utslipp).
                                </p>
                            </div>
                        </section>

                        {/* 5. Støy */}
                        <section id="stoyregulering" className="scroll-mt-32">
                            <h2 className="text-2xl md:text-3xl font-conthrax tracking-wider text-slate-900 mb-6 border-b-2 border-green-500 inline-block pb-2">Den akustiske økologien</h2>
                            <div className="prose prose-slate prose-lg max-w-none text-slate-700 font-light leading-relaxed">
                                <p>
                                    I B-Zero er den akustiske signaturen fundamentalt annerledes, noe som gjør klassen til et unikt miljøtiltak. Den tresylindrede 1KR-FE-motoren produserer i utgangspunktet et svært lavt lydtrykk. Ettersom reglementet ikke tillater modifikasjoner som øker motorens effekt, forblir eksosutløpet og lydsignaturen tett opp mot en standard gatebil. Faktiske støymålinger av B-Zero biler på banen ligger på under 80 desibel, noe som i racingsammenheng er oppsiktsvekkende lavt og med bred margin befinner seg under 100 dB-grensen.
                                </p>
                                <p>
                                    Den miljømessige gevinsten her er betydelig for baneanleggenes overlevelse. Fordi bilene er stillegående, spiser de ikke av banens "støykvote". Dette innebærer at anlegg som Vålerbanen eller Sokndal (Motorcenter Norway) kan arrangere store felt med B-Zero-biler – for eksempel løp med mange titalls biler som kjører utholdenhetsløp over flere timer – uten å forstyrre den støyfølsomme bebyggelsen i nærområdet. Denne akustiske diskresjonen sikrer at motorsport kan fungere i harmoni med sine omgivelser, reduserer antall naboklager, og demonstrerer en form for sosial og miljømessig bærekraft som er avgjørende for idrettens fremtidige legitimitet i Norge.
                                </p>

                                <div className="my-8">
                                    <div className="overflow-x-auto rounded-md border border-slate-200 shadow-sm mb-3">
                                        <table className="min-w-full bg-white text-sm text-left text-slate-600">
                                            <thead className="bg-slate-200 text-slate-800 font-bold uppercase">
                                                <tr>
                                                    <th className="px-6 py-4">Klasse / Aktivitet</th>
                                                    <th className="px-6 py-4">Typisk Støynivå (Kilde)</th>
                                                    <th className="px-6 py-4">Potensiell Miljøpåvirkning / Naboeffekt</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                <tr className="">
                                                    <td className="px-6 py-4 font-semibold text-slate-800">Uregulert Racing (F1, NASCAR)</td>
                                                    <td className="px-6 py-4">120 - 140+ dB</td>
                                                    <td className="px-6 py-4">Ekstrem hørselsskade, bærer flere kilometer</td>
                                                </tr>
                                                <tr className="">
                                                    <td className="px-6 py-4 font-semibold text-slate-800">Drifting / Rallycross (Åpen eksos)</td>
                                                    <td className="px-6 py-4">&gt; 100 dB (ofte overskredet)</td>
                                                    <td className="px-6 py-4">Høy støybelastning, krever strenge tidsrestriksjoner</td>
                                                </tr>
                                                <tr className="">
                                                    <td className="px-6 py-4 font-semibold text-slate-800">NBF Generell Grense (§303)</td>
                                                    <td className="px-6 py-4">Maks 100 dB</td>
                                                    <td className="px-6 py-4">Regulert nivå for nasjonale arrangementer</td>
                                                </tr>
                                                <tr className="bg-green-50/30">
                                                    <td className="px-6 py-4 font-semibold text-green-800">B-Zero (1KR-FE Motor)</td>
                                                    <td className="px-6 py-4 text-green-700 font-semibold">Under 80 dB</td>
                                                    <td className="px-6 py-4 text-green-700">Minimal, drukner raskt i bakgrunnsstøy, akseptert av naboer</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <p className="text-xs text-slate-500 italic px-2 text-left">Tabell 3: Sammenligning av akustiske fotavtrykk. Den logaritmiske desibelskalaen betyr at B-Zero representerer en brøkdel av lydenergien som frigjøres i tradisjonell motorsport.</p>
                                </div>
                            </div>
                        </section>

                        {/* 6. Sosial bærekraft */}
                        <section id="sosial-baerekraft" className="scroll-mt-32">
                            <h2 className="text-2xl md:text-3xl font-conthrax tracking-wider text-slate-900 mb-6 border-b-2 border-green-500 inline-block pb-2">Sosial bærekraft og demokrati</h2>
                            <div className="prose prose-slate prose-lg max-w-none text-slate-700 font-light leading-relaxed">
                                <p>
                                    Motorsport blir stadig dyrere, noe som stopper rekrutteringen. B-Zero er designet for å demokratisere sporten, hvor man ikke kan kjøpe seg til fordeler ved hjelp av teknologi. Det strenge regelverket mot modifikasjoner holder prisene på bakken, og sjåførens ferdigheter avgjør alt.
                                </p>
                                <p>
                                    Utholdenhetsformatet utdanner i tillegg førerne i <strong>mekanisk sympati</strong>: de drilles i å konsentrere seg om dekk, bremser og utstyr slik at bilene overlever mange times løp, noe som skaper et mentalt skifte bort fra bruk-og-kast-mentaliteten i tradisjonelle sprintløp.
                                </p>
                            </div>
                        </section>

                        {/* 7. Utbredelse i Norge */}
                        <section id="integrering-i-norge" className="scroll-mt-32">
                            <h2 className="text-2xl md:text-3xl font-conthrax tracking-wider text-slate-900 mb-6 border-b-2 border-green-500 inline-block pb-2">Den nasjonale spredningen</h2>
                            <div className="prose prose-slate prose-lg max-w-none text-slate-700 font-light leading-relaxed">
                                <p>
                                    Veksten i B-Zero beviser at både førere og organisasjoner tørster etter bærekraftige og budsjettvennlige alternativer. Sentrale aktører som Kongelig Norsk Automobilklub (KNA) og Norsk Motor Klubb (NMK) har omfavnet klassen helhjertet over hele landet, fra Motorcenter Norway i sør til Frøya Motorsportsenter i Midt-Norge.
                                </p>
                                <div className="bg-white border-l-4 border-green-500 p-6 my-8 rounded-md shadow-md">
                                    <h4 className="font-conthrax text-slate-900 text-lg mb-2">Fra bane til rallyskogen</h4>
                                    <p className="mb-0">
                                        Som et ekstremt bevis på ressursutnyttelse har B-Zero-konseptet også ekspandert til rallyskogen (B-Zero Rally). Med de eksakt samme bilene og minimal påbygging kan førere benytte plattformen over to utvidt forskjellige disipliner, noe som reduserer maskinparkbehovet vesentlig.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 8. Konklusjon */}
                        <section id="konklusjon" className="scroll-mt-32">
                            <h2 className="text-2xl md:text-3xl font-conthrax tracking-wider text-slate-900 mb-6 border-b-2 border-green-500 inline-block pb-2">Konklusjon</h2>
                            <div className="prose prose-slate prose-lg max-w-none text-slate-700 font-light leading-relaxed">
                                <p className="font-semibold text-xl text-slate-800">
                                    Norges Bilsportforbund har uttalt at man ønsker å gjøre norsk bilsport til verdens mest miljøvennlige idrett. B-Zero fremstår som selve gullstandarden for hvordan dette kan realiseres.
                                </p>
                                <p>
                                    Mens bilindustrien stirrer blindt mot litiumutvinning og massiv karbongjeld, upcycler B-Zero fullt fungerende småbiler med null inkorporert karbon. 7 liters bensinforbruk på løp, nesten ufattelig lang levetid på dekk, drastisk redusert partikkelutslipp og et lydnivå under 80 desibel vitner om en sirkulær genistrek.
                                </p>
                                <p>
                                    B-Zero beviser vitenskapelig og empirisk at den grønneste racerbilen, er den som allerede eksisterer.
                                </p>
                            </div>

                            {/* Call to Action Box */}
                            <div className="mt-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 transition hover:border-green-300">
                                <div className="flex items-center gap-6">
                                    <div className="bg-green-50 p-4 rounded-full">
                                        <FileText size={40} className="text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-slate-900 font-conthrax tracking-wider text-lg mb-2">Bærekraftsrapport</h3>
                                        <p className="text-slate-500 text-sm font-light">
                                            Bruk lenken til denne artikkelen for å opplyse lokalsamfunn, partnere og bilsport-forbund.
                                        </p>
                                    </div>
                                </div>
                                <a
                                    href="mailto:?subject=Bærekraft%20i%20Motorsport&body=Sjekk%20ut%20denne%20rapporten%20om%20bærekraft%20i%20B-Zero%3A%20https%3A%2F%2Fwww.bzero.no%2Fbaerekraft"
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-colors flex items-center gap-2 whitespace-nowrap shadow-md focus:outline-hidden"
                                >
                                    Del via E-post <ArrowRight weight="bold" />
                                </a>
                            </div>
                        </section>

                        {/* 9. Referanser */}
                        <section id="referanser" className="scroll-mt-32 pt-16 mt-16 border-t border-slate-200">
                            <h2 className="text-xl md:text-2xl font-conthrax tracking-wider text-slate-800 mb-6">Referanser</h2>
                            <ul className="space-y-3 text-xs md:text-sm text-slate-500 font-light list-decimal list-outside ml-4 max-w-3xl">
                                <li>Lifecycle emissions - Vehicle Emissions Star Rating (<a href="https://www.vesr.gov.au" target="_blank" rel="noreferrer" className="text-green-600 hover:underline">vesr.gov.au</a>)</li>
                                <li>The Environmental Impact of Car Manufacturing (<a href="https://mr-key.com" target="_blank" rel="noreferrer" className="text-green-600 hover:underline">mr-key.com</a>)</li>
                                <li>How sustainable materials are transforming EV production (<a href="https://www.coxautoinc.eu" target="_blank" rel="noreferrer" className="text-green-600 hover:underline">coxautoinc.eu</a>)</li>
                                <li>Miljø - Norsk bilsport (<a href="https://bilsport.no/om-norsk-bilsport/miljo/" target="_blank" rel="noreferrer" className="text-green-600 hover:underline">bilsport.no</a>)</li>
                                <li>BÆREKRAFT I NORSK BILSPORT (<a href="https://bilsport.no/wp-content/uploads/2025/06/BAEREKRAFT-I-NORSK-BILSPORT-RAPPORT-2024.pdf" target="_blank" rel="noreferrer" className="text-green-600 hover:underline">Norges Bilsportforbund rapport 2024</a>)</li>
                                <li>Veileder om behandling av støy - Motorsport (<a href="https://www.miljodirektoratet.no/ansvarsomrader/forurensning/stoy/for-myndigheter/veileder-om-behandling-av-stoy-i-arealplanlegging/stoykilder/10.6-motorsport" target="_blank" rel="noreferrer" className="text-green-600 hover:underline">Miljødirektoratet</a>)</li>
                                <li>The carbon footprint of electric vehicles (<a href="https://100percentrenewables.com.au" target="_blank" rel="noreferrer" className="text-green-600 hover:underline">100percentrenewables.com.au</a>)</li>
                                <li>The race to decarbonize electric-vehicle batteries (<a href="https://www.mckinsey.com" target="_blank" rel="noreferrer" className="text-green-600 hover:underline">mckinsey.com</a>)</li>
                                <li>C1 Racing Club Technical Regulations (<a href="https://c1racing.club" target="_blank" rel="noreferrer" className="text-green-600 hover:underline">c1racing.club</a>)</li>
                                <li>Toyota Circular Factory: Skal resirkulere 10 000 biler (<a href="https://toyotanews.no" target="_blank" rel="noreferrer" className="text-green-600 hover:underline">toyotanews.no</a>)</li>
                                <li>NBF Støyreguleringer: Nye emisjonsverdier for støy fra motorsportkjøretøyer</li>
                                <li>NBF Bilsportboka Teknisk reglement B-Zero 2024-2026 (<a href="https://bilsportboka.no" target="_blank" rel="noreferrer" className="text-green-600 hover:underline">bilsportboka.no</a>)</li>
                            </ul>
                        </section>
                    </div>

                </div>
            </main>
        </div>
    )
}
