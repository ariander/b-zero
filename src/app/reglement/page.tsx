import Link from 'next/link'
import Image from 'next/image'
import { FilePdf, Link as LinkIcon, ShieldCheck, Wrench, ArrowRight, Gavel, File } from '@phosphor-icons/react/dist/ssr'

export const metadata = {
    title: 'Reglement & Dokumenter - B-Zero Racing',
    description: 'Bilsportboka, teknisk reglement, lisenser og oversikt over godkjente deler.',
}

export default function ReglementPage() {
    return (
        <div className="bg-neutral-950 min-h-screen">
            <div className="max-w-6xl mx-auto px-6 py-12 pb-24">
                <h1 className="text-3xl md:text-4xl font-conthrax text-slate-100 mb-8 uppercase border-b-4 border-brand-red inline-block pb-2">
                    Reglement &amp; Dokumenter
                </h1>

                <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">

                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Teknisk Reglement */}
                        <section>
                            <h2 className="text-2xl font-conthrax uppercase tracking-wider text-slate-200 mb-6 flex items-center gap-3">
                                <Gavel size={28} className="text-brand-red" weight="fill" />
                                Regelverk &amp; Forskrifter
                            </h2>

                            <div className="bg-slate-100 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
                                <p className="text-slate-600 font-light mb-6">
                                    Å bygge en B-Zero bil krever at man leser seg opp på reglene. Vi er underlagt Norges Bilsportforbund (NBF), og tar utgangspunkt i det britiske C1-reglementet.
                                </p>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <a href="https://bilsportboka.no/kapittel/racing/teknisk-reglement-b-zero/" target="_blank" rel="noreferrer" className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-brand-red hover:bg-white transition group">
                                        <LinkIcon size={24} className="text-slate-400 group-hover:text-brand-red shrink-0 mt-1" />
                                        <div>
                                            <div className="flex flex-col items-start gap-1 mb-2">
                                                <h3 className="font-bold text-slate-900 text-sm">NBF B-Zero Reglement</h3>
                                                <span className="bg-brand-red/10 text-brand-red text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block">Bilsportboka.no</span>
                                            </div>
                                            <p className="text-xs text-slate-500">De norske særreglene og endringene for klassen B-Zero Racing.</p>
                                        </div>
                                    </a>

                                    <a href="https://c1racing.club/wp-content/uploads/2025/03/2025-C1-Racing-Series-Sporting-Technical-Regulations-PUBLISHED-09MAR2025-signed.pdf" target="_blank" rel="noreferrer" className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-white transition group">
                                        <FilePdf size={24} className="text-slate-400 group-hover:text-blue-500 shrink-0 mt-1" />
                                        <div>
                                            <div className="flex flex-col items-start gap-1 mb-2">
                                                <h3 className="font-bold text-slate-900 text-sm">UK C1 Racing Series Rules</h3>
                                                <span className="bg-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block">C1 Racing Club</span>
                                            </div>
                                            <p className="text-xs text-slate-500">2025 Base-reglementet for de tekniske spesifikasjonene på C1/Aygo/107.</p>
                                        </div>
                                    </a>

                                    <a href="https://bilsportboka.no/kapittel/generelle-tekniske-bestemmelser/tekniske-sikkerhetsbestemmelser-for-rally-og-hastighetslop/" target="_blank" rel="noreferrer" className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-brand-red hover:bg-white transition group">
                                        <LinkIcon size={24} className="text-slate-400 group-hover:text-brand-red shrink-0 mt-1" />
                                        <div>
                                            <div className="flex flex-col items-start gap-1 mb-2">
                                                <h3 className="font-bold text-slate-900 text-sm">§ 304 Gen. Sikkerhet</h3>
                                                <span className="bg-brand-red/10 text-brand-red text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block">Bilsportboka.no</span>
                                            </div>
                                            <p className="text-xs text-slate-500">Generelle tekniske sikkerhetsbestemmelser for rally og hastighetsløp.</p>
                                        </div>
                                    </a>

                                    <a href="https://bilsportboka.no/kapittel/racing/" target="_blank" rel="noreferrer" className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-brand-red hover:bg-white transition group">
                                        <LinkIcon size={24} className="text-slate-400 group-hover:text-brand-red shrink-0 mt-1" />
                                        <div>
                                            <div className="flex flex-col items-start gap-1 mb-2">
                                                <h3 className="font-bold text-slate-900 text-sm">Regelverk Asfaltracing</h3>
                                                <span className="bg-brand-red/10 text-brand-red text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block">Bilsportboka.no</span>
                                            </div>
                                            <p className="text-xs text-slate-500">Alle regler for kjøring på asfaltbane.</p>
                                        </div>
                                    </a>

                                    <a href="https://bilsportboka.no/kapittel/rally/" target="_blank" rel="noreferrer" className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-orange-500 hover:bg-white transition group">
                                        <LinkIcon size={24} className="text-slate-400 group-hover:text-orange-500 shrink-0 mt-1" />
                                        <div>
                                            <div className="flex flex-col items-start gap-1 mb-2">
                                                <h3 className="font-bold text-slate-900 text-sm">Regelverk Rally</h3>
                                                <span className="bg-orange-100 text-orange-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block">Bilsportboka.no</span>
                                            </div>
                                            <p className="text-xs text-slate-500">Alle regler for kjøring i rallyskogen.</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </section>

                        {/* Skikk og Bruk på banen */}
                        <section>
                            <h2 className="text-2xl font-conthrax uppercase tracking-wider text-slate-200 mb-6 flex items-center gap-3">
                                <ShieldCheck size={28} className="text-green-500" weight="fill" />
                                Skikk &amp; Bruk på Banen
                            </h2>

                            <div className="bg-slate-800 text-slate-300 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-700">
                                <h3 className="text-xl font-bold text-white mb-4">&quot;Gentlemannsracing&quot; i billige biler</h3>
                                <p className="font-light leading-relaxed mb-6">
                                    Selv om bilene er små, billige og går relativt tregt, betyr ikke det at vi kjører som om det er tivolibiler. Tvert imot. B-Zero Racing er <strong>&quot;non-contact&quot;</strong> motorsport. Vi kjører ekstremt tett (og ofte tre i bredden), men målet er alltid å levere bilen tilbake til depotet uten en skramme.
                                </p>
                                <p className="font-light leading-relaxed mb-6">
                                    Kjørekulturen vår bygger på gjensidig respekt. La kameraten din få plass i svingen. Er du ikke minst halvveis forbi (fangeren din er forbi dørstolpen hans) før dere treffer innstyringspunktet, så &quot;eier&quot; bilen foran sporet, og du må trekke deg! Dytting og bevisst &quot;dive-bombing&quot; tolereres ikke i det hele tatt.
                                </p>

                                <ul className="space-y-3 bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50">
                                    <li className="flex gap-3">
                                        <span className="text-green-500 font-bold shrink-0">1.</span>
                                        <span><strong>Gi rom.</strong> Press aldri en annen bil av banen eller ut på gresset.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-green-500 font-bold shrink-0">2.</span>
                                        <span><strong>Vær forutsigbar.</strong> Ikke gjør plutselige, irrasjonelle sporskifter i bremsesonen.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-green-500 font-bold shrink-0">3.</span>
                                        <span><strong>Respekter vakter og flagg.</strong> Flaggvaktene står der for din sikkerhet. Blått flagg? Slipp forbi. Gult flagg? Farten ned.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-green-500 font-bold shrink-0">4.</span>
                                        <span><strong>Rydd opp etter deg.</strong> Gjør du en stor feil og ødelegger for noen; ta ansvar, gå bort og si beklager i depotet etterpå. En ærlig prat løser nesten alt!</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* Byggedeler */}
                        <section>
                            <h2 className="text-2xl font-conthrax uppercase tracking-wider text-slate-200 mb-6 flex items-center gap-3">
                                <Wrench size={28} className="text-amber-500" weight="fill" />
                                Deler, Dekk &amp; Oppgraderinger
                            </h2>

                            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200">
                                <div className="w-full h-48 sm:h-64 md:h-80 relative bg-slate-100 border-b border-slate-200">
                                    <Image
                                        src="/B-Zero Racing Regulations.jpg"
                                        alt="C1 Full Racing Kit med bærebroer og deler"
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="p-6 md:p-8">
                                    <p className="text-slate-600 font-light mb-8">
                                        Klassen er strengt regulert for å holde kostnadene nede. Motor kan <strong>ikke</strong> trimmes. De fleste standarddeler må forbli standard fra fabrikk. Her er listen over det som spesifikt er påkrevd, og hva som er lov å bytte.
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div>
                                            <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                                                <ShieldCheck size={20} weight="fill" className="text-green-500" /> Spesifikt Påkrevd
                                            </h3>
                                            <ul className="space-y-3 font-light text-slate-600 text-sm">
                                                <li className="flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                                    <span>Godkjent <strong>Beskyttelsesbur</strong> (Sveiset eller skrudd) iht. NBF sine bestemmelser.</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                                    <span>Beskyttelsesplater under bil som beskytter bensintank og bremserør.</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                                    <span><strong>Enhetsdekk:</strong> Nankang AR-1 C1 Racing-spesifikasjon.</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                                    <span><strong>ECU Race Map:</strong> Bilens ECU (hjerne) må ha en race map installert, dette sikrer at bilen yter optimalt og at alle biler yter likt.</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                                    <span><strong>Påkrevde modifikasjoner:</strong> Strømbryter (kill switch), slepekroker foran/bak og lignende dekkes i detalj i vår <Link href="/kom-i-gang" className="text-blue-500 hover:text-blue-600 underline font-semibold">Byggeguide</Link>.</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                                                <Wrench size={20} weight="fill" className="text-amber-500" /> Anbefalte Oppgraderinger (Tillatt)
                                            </h3>
                                            <ul className="space-y-2 font-light text-slate-600 text-sm">
                                                <li className="flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                                    <span><strong>C1 Full Kit:</strong> Forsterkede forlengede bærearmer, forlengede drivaksler og forlengere til styrestagene.</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                                    <span><strong>Apex</strong> senkefjærer og <strong>KYB</strong> støtdempere.</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                                    <span>Utvidet styrenav (Rattnav / Boss) og sportsratt.</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                                    <span>Stålomspunnede bremseslanger (fritt valg av produsent).</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                                    <span>Polyurethane-foringer fra Powerflex til bærebroer foran, og bakre travers.</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar: Administrasjon & Byråkrati */}
                    <aside className="lg:col-span-1">
                        <div className="bg-slate-900 text-white p-6 rounded-3xl sticky top-24 shadow-lg border border-slate-800">
                            <h2 className="text-xl font-conthrax uppercase tracking-wider mb-6 flex items-center gap-3">
                                <File size={32} weight="fill" className="text-amber-500" /> Lisens &amp; Papirarbeid
                            </h2>

                            <p className="text-slate-400 font-light text-sm mb-6 leading-relaxed">
                                Bilsport krever litt papirarbeid. Du må ha gyldig medlemskap i en klubb, førerlisens og vognlisens! Alle avgifter og papirer styres gjennom Norsk Bilsport (NBF) og deres &quot;Min Bilsport&quot;-portal.
                            </p>

                            <div className="space-y-4">
                                <a href="https://portal.bilsport.no/selfservice/#a375421d-11b6-45e5-aee6-ad7d05731bff" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-slate-800 hover:bg-slate-700 rounded-xl transition group">
                                    <span className="font-bold text-sm text-slate-100">Innlogging: Min Bilsport</span>
                                    <ArrowRight className="text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                                </a>

                                <a href="https://bilsport.no/lisenser/" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-slate-800 hover:bg-slate-700 rounded-xl transition group">
                                    <span className="font-bold text-sm text-slate-100">Les om Bilsport lisenser</span>
                                    <ArrowRight className="text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                                </a>

                                <a href="https://bilsport.no/arrangorportal/nye-frittstaende-klubber/" target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-slate-800 hover:bg-slate-700 rounded-xl transition group">
                                    <span className="font-bold text-sm text-slate-100">Finn din Racing-klubb</span>
                                    <ArrowRight className="text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-800">
                                <h3 className="font-bold text-slate-200 text-sm uppercase tracking-wider mb-4">Årskontroll av Bilen</h3>
                                <div className="space-y-4">
                                    <a href="https://bilsport.no/wp-content/uploads/2026/01/Arskontrollor-Racing-Formelbil-Drifting-23.01.2026.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white transition group text-sm font-light">
                                        <FilePdf size={20} className="text-amber-500 group-hover:text-amber-400" />
                                        <span>Finn Årskontrollør i ditt fylke</span>
                                    </a>
                                    <a href="https://bilsport.no/wp-content/uploads/2024/04/3-Arskontroll-BC-RC-RAC-DI.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-white transition group text-sm font-light">
                                        <FilePdf size={20} className="text-red-500 group-hover:text-red-400" />
                                        <span>Last ned Årskontroll-skjema</span>
                                    </a>
                                </div>
                            </div>

                        </div>
                    </aside>

                </div>
            </div>
        </div>
    )
}
