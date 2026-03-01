import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Wrench, IdentificationBadge, ShieldCheck, Lightning, CalendarPlus, Link as LinkIcon, WarningCircle, ShoppingCart } from '@phosphor-icons/react/dist/ssr'
import { AccordionItem } from '@/components/Accordion'

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
            <main className="max-w-4xl mx-auto px-6 py-16 space-y-24">

                {/* Quick Navigation Links */}
                <nav className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 sm:gap-4 border-b border-slate-200 pb-12 -mt-4">
                    <a href="#filosofi" className="w-full sm:w-auto text-center bg-white hover:border-purple-500 border border-transparent shadow-sm px-5 py-2.5 md:py-3 rounded-full text-xs sm:text-sm font-conthrax uppercase tracking-wide text-slate-700 hover:text-purple-500 transition">Filosofi</a>
                    <a href="#bygge-bil" className="w-full sm:w-auto text-center bg-white hover:border-brand-red border border-transparent shadow-sm px-5 py-2.5 md:py-3 rounded-full text-xs sm:text-sm font-conthrax uppercase tracking-wide text-slate-700 hover:text-brand-red transition">Bygge bil</a>
                    <a href="#lisenser" className="w-full sm:w-auto text-center bg-white hover:border-blue-500 border border-transparent shadow-sm px-5 py-2.5 md:py-3 rounded-full text-xs sm:text-sm font-conthrax uppercase tracking-wide text-slate-700 hover:text-blue-500 transition">Lisenser</a>
                    <a href="#sikkerhetsutstyr" className="w-full sm:w-auto text-center bg-white hover:border-green-500 border border-transparent shadow-sm px-5 py-2.5 md:py-3 rounded-full text-xs sm:text-sm font-conthrax uppercase tracking-wide text-slate-700 hover:text-green-500 transition">Utstyr</a>
                    <a href="#arshjulet" className="w-full sm:w-auto text-center bg-white hover:border-amber-500 border border-transparent shadow-sm px-5 py-2.5 md:py-3 rounded-full text-xs sm:text-sm font-conthrax uppercase tracking-wide text-slate-700 hover:text-amber-500 transition">Årshjul</a>
                    <a href="#linker" className="w-full sm:w-auto text-center bg-white hover:border-slate-400 border border-transparent shadow-sm px-5 py-2.5 md:py-3 rounded-full text-xs sm:text-sm font-conthrax uppercase tracking-wide text-slate-700 hover:text-slate-900 transition">Linker</a>
                </nav>

                {/* Section: Filosofi */}
                <section id="filosofi" className="scroll-mt-24">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-slate-900 p-3 rounded-xl shadow-md">
                            <Lightning size={32} weight="fill" className="text-purple-500" />
                        </div>
                        <h2 className="text-3xl font-conthrax uppercase tracking-wider text-slate-900">Klassens Filosofi</h2>
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
                        <h2 className="text-3xl font-conthrax uppercase tracking-wider text-slate-900">Bygg en racerbil</h2>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 prose prose-slate max-w-none">
                        <p className="text-lg text-slate-600 leading-relaxed font-light mb-6">
                            Selve navet i klassen er bilene våre. Enten du kjører racing på asfalt eller kaster deg i grusen på rally, bygger alt på de enkle og lette &quot;trillingene&quot; – Citroën C1, Peugeot 107 og Toyota Aygo.
                        </p>
                        <div className="bg-slate-50 border-l-4 border-brand-red p-6 rounded-lg mb-8">
                            <h3 className="font-bold text-slate-900 mb-2">Hovedforskjellen på Racing og Rally-oppsett</h3>
                            <p className="text-slate-600 font-light text-sm">
                                Bilen i seg selv forblir svært lik, men rally krever et annet understellsoppsett (dempere/fjærer) for å håndtere hopp og grus, samt noen beskyttelsesplater under motoren. Buret må også tåle de spesifikke rally-kravene.
                            </p>
                        </div>
                        <div className="mt-8 space-y-4">
                            <AccordionItem title="1. Demontering og Forberedelser" isOpen={true}>
                                <p>Det første steget er å fjerne alt unødvendig interiør fra bilen. Dette sparer vekt og klargjør kupeen for sveising av veltebur.</p>
                                <ul>
                                    <li>Fjern seter, matter, taktrekk og plastdeksler. Dashboardet kan bli stående, men må ofte tilpasses noe for at buret skal passere.</li>
                                    <li>Fjern lydisolering/asfaltmatter fra gulvet (bruk feks tørris og hammer, eller varmepistol og skrape).</li>
                                    <li>Sørg for at områdene der buret skal sveises inn i karosseriet er skrapt helt rene for lakk og tektyl.</li>
                                </ul>
                            </AccordionItem>

                            <AccordionItem title="2. Sikkerhetsbur (Veltebur)">
                                <p>Sikkerhetsburet er bilens viktigste konstruksjon. Det beskytter sjåføren ved rundvelt og sidekollisjoner, samtidig som det stiver opp karosseriet betydelig.</p>
                                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded mb-4 mt-4">
                                    <h4 className="font-bold text-amber-900 flex items-center gap-2 mb-1"><WarningCircle size={20} /> Viktig Norsk Regel!</h4>
                                    <p className="text-amber-800 text-sm">I Norge <strong>SKAL</strong> alle nybygde biler ha <strong>sveiset bur</strong> i henhold til NBF sitt reglement. (De aller første bilene som ble bygget i Norge benyttet skrudde bur som i britiske C1, og disse er unntatt regelen, men bygger du ny i dag: sveis!).</p>
                                </div>
                                <p>Anbefalt leverandør for bur og ferdige kit er RPC Webshop, som selger bur spesifikt utformet for disse bilene og disse reglene.</p>
                                <a href="/B-Zero%20Bur%20Installation.pdf" target="_blank" className="inline-flex items-center gap-2 px-4 py-2 mt-4 bg-slate-900 text-white font-semibold rounded hover:bg-slate-800 transition">
                                    <LinkIcon size={16} /> Se eksempel på burinstallasjon (PDF)
                                </a>
                            </AccordionItem>

                            <AccordionItem title="3. Norske særregler (Hva du IKKE trenger eller fritt kan velge)">
                                <p>Regelverket vårt i Norge (B-Zero) er basert på det britiske C1-reglementet, men vi har noen praktiske tilpasninger for våre forhold. Følgende gjelder i Norge:</p>
                                <ul>
                                    <li><strong>Brannslukker:</strong> Ikke påkrevd! (Men hvis du først velger å montere en, <em>må</em> den være FIA-godkjent og montert iht. reglement).</li>
                                    <li><strong>&quot;C1 Racing radio receiver&quot;:</strong> Ikke påkrevd hos oss.</li>
                                    <li><strong>Katalysator:</strong> Denne kan du lovlig tømme (fjerne innmaten i).</li>
                                    <li><strong>Ekstra tåkelys bak (Rear fog light):</strong> Ikke påkrevd. Vi bruker det originale tåkelyset bilen er utstyrt med.</li>
                                    <li><strong>Bremseklosser:</strong> I Norge har vi fritt valg av bremseklosser! (I f.eks. UK må man benytte en spesifikk type).</li>
                                </ul>
                            </AccordionItem>

                            <AccordionItem title="4. Påkrevde Spesialdetaljer & Beskyttelsesplater">
                                <p>Bortsett fra veltebur, enhetsdekk og racingsete/sele, er det et par kritiske detaljer som MÅ monteres før løp:</p>

                                <h4 className="font-bold text-slate-900 mt-6 mb-2">Hovedstrømbryter / Kill Switch</h4>
                                <p>Det må monteres en hovedstrømbryter som kobler ut batteriet og stopper motoren (kutter tenning). Denne skal kunne opereres fra både innsiden (av fører i stolen) og utsiden av bilen via wire-trekk ved frontruta.</p>
                                <p><em>Tips for montering (Left Hand Drive):</em> Siden bilene våre er venstrerattede, er wire-trekket typisk plassert på venstre side foran frontruten. Sjekk PDF-en under for nøyaktig koblingsskjema for hvilke ledninger som skal kuttes og kobles mot motstanderen.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <Image src="/External-Master-Switch-Pulls-450x450.jpg" alt="Master Switch Pull" width={450} height={450} className="rounded-xl border border-slate-200" />
                                </div>
                                <a href="/B-Zero%20Hovedstr%C3%B8mbryter.pdf" target="_blank" className="inline-flex items-center gap-2 px-4 py-2 mt-4 mb-8 bg-slate-900 text-white font-semibold rounded hover:bg-slate-800 transition">
                                    <LinkIcon size={16} /> Guide: Montering av Hovedstrømbryter (PDF)
                                </a>

                                <h4 className="font-bold text-slate-900 mt-6 mb-2">Slepekroker (Tow hooks)</h4>
                                <p>Bilen må utstyres med tydelig markerte slepeløkker/kroker både foran og bak, slik at funksjonærene raskt kan trekke deg sikkerhet hvis du havner av banen. Plaststrips duger ikke her.</p>

                                <h4 className="font-bold text-slate-900 mt-8 mb-2">Beskyttelsesplate for bensintank (Fuel tank guard)</h4>
                                <p>I asfaltløp (racing) <em>skal</em> det monteres beskyttelsesplate for bensintanken.</p>
                                <div className="bg-slate-50 p-4 rounded mb-4 text-sm mt-2">
                                    <strong>Installasjon:</strong> Plasser beskyttelsen slik at den ligger over de langsgående skinnene. Du må kanskje justere litt på karosserikitten og brette ut kantene for å få den til å smette over skinnene. Den bakre kanten skal ligge tett inntil gummipluggen for reservehjulsbrønnen, men ikke dekke over den. Borr opp 2 x 6.3mm hull gjennom brønnhullet ved bruke beskytteren som guide. Fest med 2x M6 button head skruer og nyloc-muttere. Bor deretter 2 x 3.5mm hull inn i de langsgående skinnene (bruk igjen beskytteren som guide) og fest med de medfølgende selvborrende skruene.
                                </div>
                                <Image src="/Fuel Tank Protector.jpg" alt="Fuel Tank Protector" width={800} height={400} className="rounded-xl border border-slate-200" />

                                <h4 className="font-bold text-slate-900 mt-8 mb-2">Beskyttelsesplate for bremse- og bensinrør (Brake & fuel pipe guard)</h4>
                                <p>Påkrevd på asfalt! For Rally skal det i tillegg være plate i <em>hele</em> bilens lengde pluss beskyttelse under motor.</p>
                                <div className="bg-slate-50 p-4 rounded mb-4 text-sm mt-2">
                                    <strong>Installasjon (Racing):</strong> Plasser beskytteren slik at den dekker rørene rett etter de kommer ut fra motorrommet rett bak den fremre subframen. Fronten på beskytteren skrus i subframen med 2 gjenngeskruer (6mm self tappers). Bakparten skrus inn i den langsgående avstiveren på chassis med 2 skruer. Merk opp det første hullet nøye og bor med 4.8mm borr. Monter platen lett med den første skruen, og bruk deretter beskytteren som guide for å bore de tre siste hullene. Skru inn resten, og gå og ta deg en øl!
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Image src="/Brake Pipe Guard 1.jpg" alt="Brake Pipe Guard" width={500} height={350} className="rounded-xl border border-slate-200" />
                                    <Image src="/Brake Pipe Guard 2.jpg" alt="Brake Pipe Guard" width={500} height={350} className="rounded-xl border border-slate-200" />
                                </div>
                            </AccordionItem>

                            <AccordionItem title="5. Førerstol og Seler">
                                <p>Førermiljøet må oppgraderes til FIA-godkjent standard.</p>
                                <ul>
                                    <li><strong>Stol:</strong> Monter en FIA-godkjent racingstol. Det er fritt frem for å montere stolen i bilens <strong>originale glideskinne</strong>, så lenge dette gjøres forsvarlig.</li>
                                    <li><strong>Seler:</strong> Det er <strong>påkrevd</strong> med en FIA-godkjent <strong>6-punkts sele</strong> (5-punkts sele er <em>ikke</em> tillatt!).</li>
                                    <li><strong>HANS / FHR:</strong> Hode- og nakkebeskyttelse (FHR / HANS-krage) er et absolutt krav i klassen.</li>
                                </ul>
                            </AccordionItem>

                            <AccordionItem title="6. Dekk, Motor og Oppsett (Viktige tips)">
                                <p>Bilene skal være mekanisk identiske for å holde kostnadene nede, men dette må du vite om oppsett:</p>
                                <ul>
                                    <li><strong>Dekk (Asfalt/Racing):</strong> I asfaltløp (og asfaltrally) brukes klassens dedikerte Nankang enhetsdekk for asfalt.</li>
                                    <li><strong>Dekk (Rally på snø/grus):</strong> Her kreves det spesifikke rally-enhetsdekk og egne felger som tåler de røffere forholdene.</li>
                                    <li><strong>Motorstyring (ECU):</strong> Fra og med 2026 er det regel på at bilens hjerne (ECU) <em>skal</em> flashes/omprogrammeres til et felles &quot;B-Zero Race Map&quot;.</li>
                                    <li><strong>Hulkil / Shims bakaksel:</strong> Selv om understellet ellers er standardisert, er det sterkt anbefalt å &quot;shimse ut&quot; bakakselen! Dette gjør man for å justere inn riktig hjulvinkel (camber/toe) bak for å få bilen til å sitte optimalt i svingene.</li>
                                </ul>
                            </AccordionItem>

                            <AccordionItem title="7. Understell: Bærebruer, Drivaksler og Senkefjærer">
                                <p>En sentral del av ombyggingen for bedre kjøreegenskaper på bane (C1/B-Zero kit).</p>

                                <h4 className="font-bold text-slate-900 mt-6 mb-2">Senkefjærer (Lowering springs)</h4>
                                <p>Dette er en relativt enkel jobb. Det vanskeligste er å fjerne de fremre støtdemperbeina. De bakre fjærene kan byttes uten å fjerne bakakselen eller hjulnavene (men hvis du først har tenkt å legge inn camber-shims bak to-boltene der nede, gjør du det gjerne samtidig!)</p>
                                <p>For å løsne støtdemperbeinet foran, trenger du et verktøy (eller en tykk skrutrekker) for å bende opp låseklemmen. En M12-bolt filt ned i profil fungerer ofte utmerket.</p>

                                <h4 className="font-bold text-slate-900 mt-8 mb-2">Bærebruer og lengre drivaksler (Wishbones and Driveshafts)</h4>
                                <p>Klassens kit-bærebruer (&quot;wishbones&quot;) <em>skal</em> monteres sammen med de forlengede drivakslene. Framgangsmåten er følgende:</p>

                                <ol className="list-decimal pl-5 space-y-2 mt-2 mb-6 text-slate-700 font-light">
                                    <li>Tapp ut girkasseoljen.</li>
                                    <li>Fjern originale bærebruer og drivaksler. Vær veldig forsiktig så du ikke skader pakningene/simringene (seals) inn mot girkassehuset.</li>
                                    <li>Fjern den originale låsemutteren og ende-leddet på styrestaget (track rod). Skru den medfølgende tynne låsemutteren helt inn på gjengene. Kapp gjengepartiet på styrestaget slik at det står igjen nøyaktig <strong>18mm</strong> med gjenger (målt fra låsemutteren). En vinkelsliper med 1mm kutteskive er ypperlig til dette. Fjern låsemutteren igjen etter kappingen.</li>
                                    <li>Avfett styrestagsgjengene, de 2 tynne mutterne og de innvendige gjengene på &quot;forlengeren&quot; (extender). Skru den tynne låsemutteren inn til det gjenstår 10mm. Bruk Loctite gjengelåsing (Stud Lock) <em>foran og bak</em> den tynne mutteren. Skru mutteren nå helt inn. Skru styrestagsforlengeren helt inn mot bunn og stram låsemutteren hardt mot forlengeren. Målet er at denne forlengeren blir en permanent del av styrestaget ditt.</li>
                                    <li><strong>VIKTIG:</strong> Sjekk at du har riktige KYB (anbefalt) eller originale støtdempere (sjekk <a href="https://c1racing.club/wp-content/uploads/2025/03/2025-C1-Racing-Series-Sporting-Technical-Regulations-PUBLISHED-09MAR2025-signed.pdf" target="_blank" rel="noreferrer">reglement for produktnummer</a>).</li>
                                    <li>Monter de nye senkefjærene på demperbeina.</li>
                                    <li>Sett inn de nye <strong>forlengede drivakslene</strong> i girkassen. Pass spesielt godt på kopp-siden så ikke den innvendige pakningen rives i stykker under montering.</li>
                                    <li>Monter de nye forlengede bærebruene. Trekk til fremre pivot-bolt og de bakre festeboltene med <strong>100Nm</strong> moment.</li>
                                    <li>Styr enden av drivakselen inn i hjulnavet, og sentrer deretter bærekulens tap opp i navet. Sett på bærekulemutteren og trekk til med <strong>98Nm</strong> moment.</li>
                                    <li>Fest den store nav-mutteren for drivakselen, trekk denne til med massive <strong>216Nm</strong>, og slå inn kanten av mutteren inn i sporet på drivleddet for å låse den mekanisk.</li>
                                </ol>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Image src="/Right Wishbone Build Notes.jpg" alt="Right Wishbone" width={300} height={300} className="rounded-xl border border-slate-200" />
                                    <Image src="/Right Extended Driveshaft.jpg" alt="Extended Driveshaft" width={300} height={300} className="rounded-xl border border-slate-200" />
                                    <Image src="/Track Rod Extension 450.jpg" alt="Track Rod Extension" width={300} height={300} className="rounded-xl border border-slate-200" />
                                </div>
                            </AccordionItem>

                            <div className="mt-6 flex items-center justify-between bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-1">Se komplett liste på Teknisk Reglement</h4>
                                    <p className="text-slate-600 text-sm font-light">Byggingen er ferskvare, dobbeltsjekk alltid reglene på siden for Reglement og Dokumenter for oppgraderinger som er lovlige og forbudt.</p>
                                </div>
                                <Link href="/reglement" className="flex items-center justify-center p-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-900 rounded-full transition-colors ml-4 shrink-0 shadow-sm group">
                                    <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: Lisenser */}
                <section id="lisenser" className="scroll-mt-24">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-slate-900 p-3 rounded-xl shadow-md">
                            <IdentificationBadge size={32} className="text-blue-500" weight="fill" />
                        </div>
                        <h2 className="text-3xl font-conthrax uppercase tracking-wider text-slate-900">Lisenser du må ha</h2>
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
                        <h2 className="text-3xl font-conthrax uppercase tracking-wider text-slate-900">Personlig Sikkerhetsutstyr</h2>
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
                        <h2 className="text-3xl font-conthrax uppercase tracking-wider text-slate-900">Årshjulet</h2>
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
                        <h2 className="text-3xl font-conthrax uppercase tracking-wider text-slate-900">Praktiske Linker</h2>
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
                        <h2 className="text-3xl font-conthrax uppercase tracking-wider text-slate-900">Nettbutikker & Utstyr</h2>
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
