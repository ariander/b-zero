import { FacebookLogo, EnvelopeSimple, Phone } from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

export const metadata = {
    title: 'Om Oss - B-Zero Racing',
    description: 'Bli kjent med historien bak B-Zero og folkene bak klassen.',
}

export default function OmOssPage() {
    return (
        <div className="bg-slate-900 min-h-screen">
            <div className="max-w-6xl mx-auto px-6 py-12 pb-24">
                {/* Page Header matching Nyheter / Sesonger */}
                <h1 className="text-4xl font-conthrax text-slate-100 mb-8 uppercase border-b-4 border-brand-red inline-block pb-2">
                    Om Oss
                </h1>

                <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">

                    {/* Main Content: Historie */}
                    <div className="lg:col-span-2 order-2 lg:order-1">
                        <h2 className="text-2xl font-conthrax text-slate-200 mb-6">
                            Historien bak B-Zero
                        </h2>

                        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-200 prose prose-slate max-w-none">
                            <p className="text-xl text-slate-800 leading-relaxed font-semibold mb-6">
                                Den nye skandinaviske racingklassen B-Zero Racing har et ganske spesielt navn. Og det er selvfølgelig en artig historie bak det...
                            </p>

                            <p className="text-lg text-slate-600 leading-relaxed font-light mb-6">
                                For noen år siden bestemte gigantene Toyota, Citroën og Peugeot seg for å slå seg sammen for å bygge en liten, smart bil. Dette fellesprosjektet fikk kodenavnet &quot;B-Zero&quot;. Resultatet? Toyota Aygo, Citroën C1 og Peugeot 107. Tre biler, men under skallet er de nøyaktig samme bil! Selv navnet &quot;Aygo&quot; spiller på &quot;i-go&quot; – for å symbolisere frihet og mobilitet.
                            </p>

                            <p className="text-lg text-slate-600 leading-relaxed font-light mb-6">
                                Avgjørelsen om å bygge disse &quot;trillingene&quot; ble tatt 12. juli 2001, da sjefene for Toyota og PSA (Peugeot/Citroën) drakk kaffe og ble enige om å dele på utviklingskostnadene for en ny småbil. Nettopp dette prosjektet het B-Zero. Hver eneste bil, uansett merke på panseret, ble skrudd sammen på nøyaktig samme fabrikk i Kolin i Tsjekkia, og i 2005 rullet den første bilen ut portene.
                            </p>

                            <p className="text-lg text-slate-600 leading-relaxed font-light mb-8">
                                Da Aygo først kom på markedet kostet den fra rundt 70.000 kroner. Den største forskjellen på de tre bilene er i grunn bare logoene, frontfangeren og den lett gjenkjennelige bakluka i glass. Fabrikken pumpet ut hele 300.000 biler i året – 100.000 av hvert merke!
                            </p>

                            <div className="bg-slate-50 border-l-4 border-brand-red p-6 rounded-lg mt-8">
                                <h3 className="font-bold text-slate-900 mb-2 uppercase tracking-wide">Hva med selve racingklassen?</h3>
                                <p className="text-slate-600 font-light text-sm mb-4 leading-relaxed">
                                    B-Zero Racing er den nye innstegsklassen for asfalt- og rallykjøring i Skandinavia. I Storbritannia har de kjørt &quot;C1 Racing-Series&quot; med braksuksess i mange år, og ambisjonen vår er å ta med oss mye av den gode kulturen derfra.
                                </p>
                                <p className="text-slate-600 font-light text-sm leading-relaxed">
                                    Men i motsetning til britene, som kun kjører med 3-dørs Citroën C1, gjør vi det på skandinavisk vis: Siden bilene er identiske, tillater vi både Toyota Aygo, Peugeot 107 og Citroën C1 – og vi tillater 5-dørsutgavene, som det finnes mange flere av her hjemme! Vi bruker den første generasjonen bygget mellom 2005 og 2014, og har tilpasset det britiske regelverket for å passe perfekt for skandinaviske forhold.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Kontaktpersoner */}
                    <div className="lg:col-span-1 order-1 lg:order-2">
                        <h2 className="text-2xl font-conthrax text-slate-200 mb-6">
                            Kontaktpersoner
                        </h2>

                        <div className="space-y-6">

                            {/* Dan René Larsen */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition duration-300 group">
                                <div className="w-20 h-20 bg-slate-100 rounded-full mb-4 flex items-center justify-center overflow-hidden border-2 border-slate-200">
                                    <Image src="/DanReneLarsen.jpg" alt="Dan René Larsen" width={200} height={200} className="object-cover w-full h-full" />
                                </div>
                                <h3 className="text-xl font-conthrax text-slate-900 mb-1 transition-colors">Dan René Larsen</h3>
                                <p className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-4">Leder & Generell Kontakt</p>

                                <div className="space-y-3">
                                    <a href="mailto:dan.rene.larsen@live.no" className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition text-sm">
                                        <EnvelopeSimple size={20} className="text-slate-400" />
                                        <span className="truncate">dan.rene.larsen@live.no</span>
                                    </a>
                                    <a href="tel:+4793817745" className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition text-sm">
                                        <Phone size={20} className="text-slate-400" />
                                        <span>+47 93 81 77 45</span>
                                    </a>
                                </div>
                            </div>

                            {/* Jon Renström */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition duration-300 group">
                                <div className="w-20 h-20 bg-slate-100 rounded-full mb-4 flex items-center justify-center overflow-hidden border-2 border-slate-200">
                                    <Image src="/JonRenstrom.jpg" alt="Jon Renstrøm" width={200} height={200} className="object-cover w-full h-full" />
                                </div>
                                <h3 className="text-xl font-conthrax text-slate-900 mb-1 transition-colors">Jon Renstrøm</h3>
                                <p className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-4">Teknisk Leder</p>

                                <div className="space-y-3">
                                    <a href="mailto:jon.renstrom@gmail.com" className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition text-sm">
                                        <EnvelopeSimple size={20} className="text-slate-400" />
                                        <span className="truncate">jon.renstrom@gmail.com</span>
                                    </a>
                                    <a href="tel:+4793048706" className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition text-sm">
                                        <Phone size={20} className="text-slate-400" />
                                        <span>+47 93 04 87 06</span>
                                    </a>
                                </div>
                            </div>

                            {/* Facebook-link */}
                            <div className="pt-4">
                                <a href="https://www.facebook.com/bzeroracing" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#1864D9] text-white p-4 rounded-xl font-bold uppercase tracking-wider transition shadow-md hover:shadow-lg text-sm w-full">
                                    <FacebookLogo size={24} weight="fill" />
                                    Følg oss på Facebook
                                </a>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
