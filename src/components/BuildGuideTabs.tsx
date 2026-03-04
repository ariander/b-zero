'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WarningCircle, Link as LinkIcon, ArrowRight, CheckCircle } from '@phosphor-icons/react';

export default function BuildGuideTabs() {
    // Add logic to read from URL hash (e.g., #bygge-bil?type=rally) or query param
    const [activeTab, setActiveTab] = useState<'racing' | 'rally'>('racing');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
        // Check URL for direct link to rally/racing
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const buildType = urlParams.get('bygge');

            if (buildType === 'rally' || buildType === 'racing') {
                setActiveTab(buildType);

                // Small delay to allow the page and component to fully render before scrolling
                setTimeout(() => {
                    const element = document.getElementById('bygge-guide-tabs');
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 300);
            }
        }
    }, []);

    // Change URL param without scrolling to top so user can share it
    const handleTabChange = (tab: 'racing' | 'rally') => {
        setActiveTab(tab);
        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.searchParams.set('bygge', tab);
            window.history.replaceState({}, '', url.toString());
        }
    };

    if (!isMounted) {
        return <div className="animate-pulse h-96 bg-slate-200 rounded-3xl w-full"></div>;
    }

    return (
        <div id="bygge-guide-tabs" className="space-y-8 scroll-mt-24">
            {/* Segment Controller */}
            <div className="flex justify-center mb-8">
                <div className="grid grid-cols-2 bg-slate-200 p-1.5 rounded-2xl relative w-full max-w-sm">
                    <button
                        onClick={() => handleTabChange('racing')}
                        className={`flex items-center justify-center px-5 py-3 rounded-xl text-sm font-conthrax transition-all duration-300 relative z-10 cursor-pointer ${activeTab === 'racing' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                            }`}
                    >
                        Racing
                    </button>
                    <button
                        onClick={() => handleTabChange('rally')}
                        className={`flex items-center justify-center px-5 py-3 rounded-xl text-sm font-conthrax transition-all duration-300 relative z-10 cursor-pointer ${activeTab === 'rally' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                            }`}
                    >
                        Rally
                    </button>

                    {/* Animated background pill component */}
                    <div
                        className="absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] bg-brand-red rounded-xl shadow-md transition-transform duration-300 ease-out z-0"
                        style={{
                            transform: `translateX(${activeTab === 'racing' ? '0' : 'calc(100% + 6px)'})`
                        }}
                    />
                </div>
            </div>

            {/* TAB CONTENTS */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 prose prose-slate max-w-none">

                {/* RACING TAB */}
                {activeTab === 'racing' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-slate-100 border-l-4 border-brand-red p-6 rounded-lg mb-8">
                            <h3 className="font-bold text-slate-900 mb-2 mt-0">Hovedforskjellen på Racing og Rally-oppsett</h3>
                            <p className="text-slate-700 mb-0">
                                Bilen i seg selv forblir svært lik, men rally krever et annet understellsoppsett (dempere/fjærer) for å håndtere hopp og grus, samt noen beskyttelsesplater under motoren. Buret må også tåle de spesifikke rally-kravene. Denne fanen tar for seg oppsett for <strong>Baneracing (Asfalt)</strong>. Rallybil må også være godkjent av biltilsynet for gatebruk og ha EU-kontroll. Bli inspirert for rally under Rally-fanen.
                            </p>
                        </div>

                        <div className="space-y-12 [&_p]:text-slate-700 [&_p]:leading-relaxed [&_li]:text-slate-700 [&_li]:leading-relaxed [&_strong]:text-slate-900">
                            {/* 1. Demontering */}
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3"><span className="bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span> Demontering og Forberedelser</h3>
                                <p>Det første steget er å fjerne alt unødvendig interiør fra bilen. Dette sparer vekt og klargjør kupeen for sveising av veltebur.</p>
                                <ul>
                                    <li>Fjern seter, matter, taktrekk og plastdeksler. Dashboardet kan bli stående, men må ofte tilpasses noe for at buret skal passere.</li>
                                    <li>Fjern lydisolering/asfaltmatter fra gulvet (bruk feks tørris og hammer, eller varmepistol og skrape).</li>
                                    <li>Sørg for at områdene der buret skal sveises inn i karosseriet er skrapt helt rene for lakk og tektyl.</li>
                                </ul>
                            </div>

                            {/* 2. Sikkerhetsbur */}
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3"><span className="bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span> Sikkerhetsbur (Veltebur)</h3>
                                <p>Sikkerhetsburet er bilens viktigste konstruksjon. Det beskytter sjåføren ved rundvelt og sidekollisjoner, samtidig som det stiver opp karosseriet betydelig.</p>
                                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded mb-4 mt-4">
                                    <h4 className="font-bold text-amber-900 flex items-center gap-2 mb-1 mt-0"><WarningCircle size={20} /> Viktig Norsk Regel!</h4>
                                    <p className="text-amber-800 text-sm mb-0">I Norge <strong>SKAL</strong> alle nybygde biler ha <strong>sveiset bur</strong> i henhold til NBF sitt reglement. (De aller første bilene som ble bygget i Norge benyttet skrudde bur som i britiske C1, og disse er unntatt regelen, men bygger du ny i dag: sveis!).</p>
                                </div>
                                <p>Anbefalt leverandør for bur og ferdige kit er RPC Webshop, som selger bur spesifikt utformet for disse bilene og disse reglene.</p>
                                <a href="/B-Zero%20Bur%20Installation.pdf" target="_blank" className="not-prose inline-flex items-center gap-2 px-4 py-2 mt-4 bg-slate-900 text-white font-semibold rounded hover:bg-slate-800 transition">
                                    <LinkIcon size={16} /> Se eksempel på burinstallasjon (PDF)
                                </a>
                            </div>

                            {/* 3. Norske særregler */}
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3"><span className="bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span> Norske særregler</h3>
                                <p>Regelverket vårt i Norge (B-Zero) er basert på det britiske C1-reglementet, men vi har noen praktiske tilpasninger for våre forhold. Følgende gjelder i Norge:</p>
                                <ul>
                                    <li><strong>Brannslukker:</strong> Ikke påkrevd! (Men hvis du først velger å montere en, <em>må</em> den være FIA-godkjent og montert iht. reglement).</li>
                                    <li><strong>&quot;C1 Racing radio receiver&quot;:</strong> Ikke påkrevd hos oss.</li>
                                    <li><strong>Katalysator:</strong> Denne kan du lovlig tømme (fjerne innmaten i).</li>
                                    <li><strong>Ekstra tåkelys bak (Rear fog light):</strong> Ikke påkrevd. Vi bruker det originale tåkelyset bilen er utstyrt med.</li>
                                    <li><strong>Bremseklosser:</strong> I Norge har vi fritt valg av bremseklosser! (I f.eks. UK må man benytte en spesifikk type).</li>
                                </ul>
                            </div>

                            {/* 4. Spesialdetaljer */}
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3"><span className="bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span> Påkrevde Spesialdetaljer & Beskyttelsesplater</h3>
                                <p>Bortsett fra veltebur, enhetsdekk og racingsete/sele, er det et par kritiske detaljer som MÅ monteres før løp:</p>

                                <h4 className="font-bold text-slate-900 mt-6 mb-2">Hovedstrømbryter / Kill Switch</h4>
                                <p>Det må monteres en hovedstrømbryter som kobler ut batteriet og stopper motoren (kutter tenning). Denne skal kunne opereres fra både innsiden (av fører i stolen) og utsiden av bilen via wire-trekk ved frontruta.</p>
                                <p><em>Tips for montering (Left Hand Drive):</em> Siden bilene våre er venstrerattede, er wire-trekket typisk plassert på venstre side foran frontruten. Sjekk PDF-en under for nøyaktig koblingsskjema for hvilke ledninger som skal kuttes og kobles mot motstanderen.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <Image src="/External-Master-Switch-Pulls-450x450.jpg" alt="Master Switch Pull" width={450} height={450} className="rounded-xl border border-slate-200" />
                                </div>
                                <a href="/B-Zero%20Hovedstr%C3%B8mbryter.pdf" target="_blank" className="not-prose inline-flex items-center gap-2 px-4 py-2 mt-4 mb-8 bg-slate-900 text-white font-semibold rounded hover:bg-slate-800 transition">
                                    <LinkIcon size={16} /> Guide: Montering av Hovedstrømbryter (PDF)
                                </a>

                                <h4 className="font-bold text-slate-900 mt-8 mb-2">Slepekroker (Tow hooks)</h4>
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
                            </div>

                            {/* 5. Førerstol */}
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3"><span className="bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span> Førerstol og Seler</h3>
                                <p>Førermiljøet må oppgraderes til FIA-godkjent standard.</p>
                                <ul>
                                    <li><strong>Stol:</strong> Monter en FIA-godkjent racingstol. Det er fritt frem for å montere stolen i bilens <strong>originale glideskinne</strong>, så lenge dette gjøres forsvarlig.</li>
                                    <li><strong>Seler:</strong> Det er <strong>påkrevd</strong> med en FIA-godkjent <strong>6-punkts sele</strong> (5-punkts sele er <em>ikke</em> tillatt!).</li>
                                    <li><strong>HANS / FHR:</strong> Hode- og nakkebeskyttelse (FHR / HANS-krage) er et absolutt krav i klassen.</li>
                                </ul>
                            </div>

                            {/* 6. Dekk etc */}
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3"><span className="bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">6</span> Dekk, Motor og Oppsett</h3>
                                <p>Bilene skal være mekanisk identiske for å holde kostnadene nede, men dette må du vite om oppsett:</p>
                                <ul>
                                    <li><strong>Dekk (Asfalt/Racing):</strong> I asfaltløp brukes klassens dedikerte Nankang enhetsdekk for asfalt. 14-tommer.</li>
                                    <li><strong>Motorstyring (ECU):</strong> Fra og med høsten 2026 er det regel på at bilens hjerne (ECU) <em>skal</em> flashes/omprogrammeres til et felles &quot;B-Zero Race Map&quot;. Kontakt RPC for dette.</li>
                                    <li><strong>Hulkil / Shims bakaksel:</strong> Selv om understellet ellers er standardisert, er det sterkt anbefalt å &quot;shimse ut&quot; bakakselen! Dette gjør man for å justere inn riktig hjulvinkel (camber/toe) bak for å få bilen til å sitte optimalt i svingene.</li>
                                </ul>
                            </div>

                            {/* 7. Understell */}
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3"><span className="bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">7</span> Understell: Bærebruer, Drivaksler og Senkefjærer</h3>
                                <p>En sentral del av ombyggingen for bedre kjøreegenskaper på bane (C1/B-Zero kit).</p>

                                <h4 className="font-bold text-slate-900 mt-6 mb-2">Senkefjærer (Lowering springs)</h4>
                                <p>Dette er en relativt enkel jobb. Det vanskeligste er å fjerne de fremre støtdemperbeina. De bakre fjærene kan byttes uten å fjerne bakakselen eller hjulnavene (men hvis du først har tenkt å legge inn camber-shims bak to-boltene der nede, gjør du det gjerne samtidig!)</p>
                                <p>For å løsne støtdemperbeinet foran, trenger du et verktøy (eller en tykk skrutrekker) for å bende opp låseklemmen. En M12-bolt filt ned i profil fungerer ofte utmerket.</p>

                                <h4 className="font-bold text-slate-900 mt-8 mb-2">Bærebruer og lengre drivaksler (Wishbones and Driveshafts)</h4>
                                <p>Klassens kit-bærebruer (&quot;wishbones&quot;) <em>skal</em> monteres sammen med de forlengede drivakslene. Framgangsmåten er følgende:</p>

                                <ol className="list-decimal pl-5 space-y-2 mt-2 mb-6 text-slate-700">
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
                            </div>

                        </div>
                    </div>
                )}

                {/* RALLY TAB */}
                {activeTab === 'rally' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-slate-100 border-l-4 border-emerald-500 p-6 rounded-lg mb-8 relative">
                            <span className="absolute top-6 right-6 text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-1 rounded hidden sm:inline-block">Revidert: Februar 2026</span>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                <h3 className="font-bold text-slate-900 m-0">B-Zero Rally: Råd og tips</h3>
                                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-1 rounded inline-block mt-2 sm:hidden w-max">Revidert: Februar 2026</span>
                            </div>
                            <p className="text-slate-700 mb-0">
                                Her finner du alt du trenger å vite om å bygge bil spesifikt for Rally, inkludert kostnadsoverslag, innkjøp av donorbil, enhetsdeler, og hva du bør bytte av slitedeler før du stiller til start.
                            </p>
                        </div>

                        <div className="space-y-12 [&_p]:text-slate-700 [&_p]:leading-relaxed [&_li]:text-slate-700 [&_li]:leading-relaxed [&_strong]:text-slate-900">
                            {/* Innkjøp av bil */}
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">Innkjøp av bil</h3>
                                <p>Lovlige biler (pr. 2026) er første generasjon av Toyota Aygo, Citroen C1 og Peugeot 107 t.o.m. årsmodell 2014, frem til overgang neste generasjon som skjedde i 2014. Prisene på aktuelle donorbiler kan variere fra ca 8-25 000 kr, avhengig av tilstand. Både to- og firedørs biler er tillatte.</p>
                                <p>Erfaring viser at alle tre bilmodeller fungerer godt, inkludert både to- og firedørs. Selv i baneracing, med svært små tidsmarginer, har de beste sjåførene kunnet vinne med alle biltyper. Merk at tilgangen på brukte karosserideler (særlig dører) er langt bedre på firedørs enn todørs. Så ikke nøl med å velge en fire-dørs bil.</p>
                                <p>Bil kjøpes vanligvis privat via annonser på finn.no. Det viktigste er normalt å se etter rust. Let videre om den du vurderte hadde mye rust. Legg heller noen tusenlapper ekstra i innkjøpet, fremfor å velge en opprustet donorbil. Lang kjørelengde er normalt mindre viktig bl.a. fordi mye slitedeler uansett bør byttes.</p>
                            </div>

                            {/* Kostnader og utlegg */}
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">Hva koster det å bygge bil?</h3>
                                <p className="mb-6">Dette er det vanligste spørsmålet vi får. Det korte svaret for ferdig lisensklar bil er at dette koster minimum:<br /><strong>Ca 65 000 kr</strong>, om du bygger selv (bistand anbefales om man ikke har erfaring).<br /><strong>Ca 95 000 - 115 000 kr</strong> om du setter bort hele jobben.<br />Begge summene er for løpsklar rallybil, inkludert donorbil (standardbil, ca 15 000 kr).</p>

                                <h4 className="font-bold text-slate-900 mt-8 mb-4">Aktuelle utlegg med prisanslag</h4>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm text-left text-slate-600 rounded-xl overflow-hidden shadow-sm border border-slate-200">
                                        <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                                            <tr>
                                                <th scope="col" className="px-4 py-3">Produkt</th>
                                                <th scope="col" className="px-4 py-3 text-right">Pris (ca)</th>
                                                <th scope="col" className="px-4 py-3 text-center">Påkrevd / Anbefalt</th>
                                                <th scope="col" className="px-4 py-3">Kommentar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-white border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">Sikkerhetsbur<br /><span className="text-xs text-slate-500 font-normal">Merk! Enhetlig utførelse både ift. rør/design og innfestninger</span></td>
                                                <td className="px-4 py-3 text-right whitespace-nowrap">9 900,-<br /><span className="text-xs text-slate-500">opp mot 25 000,-<br />ferdig fra spesialist</span></td>
                                                <td className="px-4 py-3 text-center"><CheckCircle size={20} className="text-emerald-500 mx-auto" /></td>
                                                <td className="px-4 py-3 text-xs">Rørsett fra RPCwebshop til 9900,- skal en sveise selv. Sterkt anbefalt å ikke spare penger her, kjøp kanskje et komplett ferdigmontert bur (fra feks Linnerud, ca 25 000kr).</td>
                                            </tr>
                                            <tr className="bg-slate-50 border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">Årskontroll og godkjenning</td>
                                                <td className="px-4 py-3 text-right">1 600,-</td>
                                                <td className="px-4 py-3 text-center"><CheckCircle size={20} className="text-emerald-500 mx-auto" /></td>
                                                <td className="px-4 py-3 text-xs">Statens Vegvesen. Godkjent kontrollør, kontakt NBF for din nærmeste.</td>
                                            </tr>
                                            <tr className="bg-white border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">EU-kontroll</td>
                                                <td className="px-4 py-3 text-right">1 000,-</td>
                                                <td className="px-4 py-3 text-center"><CheckCircle size={20} className="text-emerald-500 mx-auto" /></td>
                                                <td className="px-4 py-3 text-xs">Aut. verksted.</td>
                                            </tr>
                                            <tr className="bg-slate-50 border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">Vognlisens</td>
                                                <td className="px-4 py-3 text-right">1 350,-</td>
                                                <td className="px-4 py-3 text-center"><CheckCircle size={20} className="text-emerald-500 mx-auto" /></td>
                                                <td className="px-4 py-3 text-xs">NBF</td>
                                            </tr>
                                            <tr className="bg-white border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">Hovedstrømbryter og wire</td>
                                                <td className="px-4 py-3 text-right">550,-</td>
                                                <td className="px-4 py-3 text-center"><CheckCircle size={20} className="text-emerald-500 mx-auto" /></td>
                                                <td className="px-4 py-3 text-xs">Spesialforretning for motorsport.</td>
                                            </tr>
                                            <tr className="bg-slate-50 border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">Varseltrekant, 2stk</td>
                                                <td className="px-4 py-3 text-right">150,-</td>
                                                <td className="px-4 py-3 text-center"><CheckCircle size={20} className="text-emerald-500 mx-auto" /></td>
                                                <td className="px-4 py-3 text-xs">Biltema.</td>
                                            </tr>
                                            <tr className="bg-white border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">Panserlåser</td>
                                                <td className="px-4 py-3 text-right">200,-</td>
                                                <td className="px-4 py-3 text-center"><CheckCircle size={20} className="text-emerald-500 mx-auto" /></td>
                                                <td className="px-4 py-3 text-xs">Spesialforretning for motorsport.</td>
                                            </tr>
                                            <tr className="bg-slate-50 border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">Tauestropp og merker, 2stk</td>
                                                <td className="px-4 py-3 text-right">400,-</td>
                                                <td className="px-4 py-3 text-center"><CheckCircle size={20} className="text-emerald-500 mx-auto" /></td>
                                                <td className="px-4 py-3 text-xs">Spesialforretning for motorsport.</td>
                                            </tr>
                                            <tr className="bg-white border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">Brannslukker Sparco, 2stk.</td>
                                                <td className="px-4 py-3 text-right">2 200,-</td>
                                                <td className="px-4 py-3 text-center"><CheckCircle size={20} className="text-emerald-500 mx-auto" /></td>
                                                <td className="px-4 py-3 text-xs">Spesialforretning for motorsport.</td>
                                            </tr>
                                            <tr className="bg-slate-50 border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">Plater under bil, alu.</td>
                                                <td className="px-4 py-3 text-right">2 500,-</td>
                                                <td className="px-4 py-3 text-center"><CheckCircle size={20} className="text-emerald-500 mx-auto" /></td>
                                                <td className="px-4 py-3 text-xs">RPCwebshop eller lage selv.</td>
                                            </tr>
                                            <tr className="bg-white border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">Rallyplater under front, alu.</td>
                                                <td className="px-4 py-3 text-right">5 500,-</td>
                                                <td className="px-4 py-3 text-center text-xs text-brand-red font-bold">Klart Anbefalt</td>
                                                <td className="px-4 py-3 text-xs">RPCwebshop eller lage selv.</td>
                                            </tr>
                                            <tr className="bg-slate-50 border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">Stoler, 2stk.</td>
                                                <td className="px-4 py-3 text-right">7 000,-</td>
                                                <td className="px-4 py-3 text-center"><CheckCircle size={20} className="text-emerald-500 mx-auto" /></td>
                                                <td className="px-4 py-3 text-xs">Spesialforretning for motorsport.</td>
                                            </tr>
                                            <tr className="bg-white border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">6. pkt belter og plater, 2stk.</td>
                                                <td className="px-4 py-3 text-right">4 800,-</td>
                                                <td className="px-4 py-3 text-center"><CheckCircle size={20} className="text-emerald-500 mx-auto" /></td>
                                                <td className="px-4 py-3 text-xs">Spesialforretning for motorsport.</td>
                                            </tr>
                                            <tr className="bg-slate-50 border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">Stolfester, 2 stk.</td>
                                                <td className="px-4 py-3 text-right">1 600,-</td>
                                                <td className="px-4 py-3 text-center"><CheckCircle size={20} className="text-emerald-500 mx-auto" /></td>
                                                <td className="px-4 py-3 text-xs">Spesialforretning for motorsport.</td>
                                            </tr>
                                            <tr className="bg-white border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">Refleksvester, beltekniv, førstehjelpspakke, 2 stk.</td>
                                                <td className="px-4 py-3 text-right">500,-</td>
                                                <td className="px-4 py-3 text-center"><CheckCircle size={20} className="text-emerald-500 mx-auto" /></td>
                                                <td className="px-4 py-3 text-xs">Biltema eller spesialforretning for motorsport.</td>
                                            </tr>
                                            <tr className="bg-slate-50 border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">OK/SOS magnetskilt</td>
                                                <td className="px-4 py-3 text-right">400,-</td>
                                                <td className="px-4 py-3 text-center"><CheckCircle size={20} className="text-emerald-500 mx-auto" /></td>
                                                <td className="px-4 py-3 text-xs">Spesialforretning for motorsport.</td>
                                            </tr>
                                            <tr className="bg-white border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">RPC forhøyningsringer</td>
                                                <td className="px-4 py-3 text-right">2 000,-</td>
                                                <td className="px-4 py-3 text-center text-xs text-brand-red font-bold">Klart Anbefalt</td>
                                                <td className="px-4 py-3 text-xs">RPCwebshop.</td>
                                            </tr>
                                            <tr className="bg-slate-50 border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">Rattnav</td>
                                                <td className="px-4 py-3 text-right">1 350,-</td>
                                                <td className="px-4 py-3 text-center text-xs text-brand-red font-bold">Klart Anbefalt</td>
                                                <td className="px-4 py-3 text-xs">RPCwebshop.</td>
                                            </tr>
                                            <tr className="bg-white border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">Sportsratt (krever rattnav)</td>
                                                <td className="px-4 py-3 text-right">2 000,-</td>
                                                <td className="px-4 py-3 text-center text-xs text-slate-600 font-bold">Valgfritt</td>
                                                <td className="px-4 py-3 text-xs">Spesialforretning for motorsport.</td>
                                            </tr>
                                            <tr className="bg-slate-50 border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">Kartleserlampe</td>
                                                <td className="px-4 py-3 text-right">300,-</td>
                                                <td className="px-4 py-3 text-center text-xs text-slate-600 font-bold">Anbefalt</td>
                                                <td className="px-4 py-3 text-xs">Biltema eller spesialforretning for motorsport.</td>
                                            </tr>
                                            <tr className="bg-white border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">Ekstralys (led, lysplanke)</td>
                                                <td className="px-4 py-3 text-right">1 500,-</td>
                                                <td className="px-4 py-3 text-center text-xs text-slate-600 font-bold">Anbefalt</td>
                                                <td className="px-4 py-3 text-xs">Biltema.</td>
                                            </tr>
                                            <tr className="bg-slate-50 border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">B-Zero styreenhet</td>
                                                <td className="px-4 py-3 text-right">4 890,-</td>
                                                <td className="px-4 py-3 text-center text-xs font-bold text-slate-600">Påkrevd 31.08.26</td>
                                                <td className="px-4 py-3 text-xs">Kontakt RPC, enhet fra bil må innleveres.</td>
                                            </tr>
                                            {/* SUM Row */}
                                            <tr className="bg-slate-100 border-t-2 border-slate-300">
                                                <td className="px-4 py-3 font-bold text-slate-900 text-right">Sum (kun påkrevd utstyr)</td>
                                                <td className="px-4 py-3 font-bold text-slate-900 text-right whitespace-nowrap">39 040,-</td>
                                                <td colSpan={2}></td>
                                            </tr>
                                            <tr className="bg-slate-100">
                                                <td className="px-4 py-3 font-bold text-slate-900 text-right">Sum med oppgradert og anbefalt utstyr</td>
                                                <td className="px-4 py-3 font-bold text-slate-900 text-right whitespace-nowrap">51 690,-</td>
                                                <td colSpan={2}></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p className="text-xs text-slate-500 mt-2">* Hvordan man får bygget/montert sikkerhetsburet, samt valg av type stoler/belter og om man kjøper eller lager fremre skliplate selv vil bety en del for samlet sum. Summene ovenfor er basert på et tilnærmet minimum for godkjent løsning og utstyr.</p>
                            </div>

                            {/* Spesialdeler og RPC */}
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">Spesialdeler for B-Zero Rally</h3>
                                <ul className="space-y-3">
                                    <li><strong>Motor / ECU:</strong> Innen august 2026 må alle rallybiler ha lik styreenhet (samme som i baneracing). Disse er programmert via RPC, utført i England. Dette for å sikre at alle biler har lik effekt, samtidig som effekten økes noe fra standard.</li>
                                    <li><strong>Bukhøyde:</strong> Forhøyningsringer for økt «bukhøyde» finnes. Dette er klart anbefalt, særlig for vinterrally hvor veien kan bli sporete. Uten disse får man økt risiko for å miste bremseffekten (pga. manglende trykk på framhjulene). <em>Merk! Kun RPC-merkede ringer er lovlig for høyere bil. Dette for sikkerhet og likhet.</em></li>
                                    <li><strong>Beskyttelsesplater:</strong> Plate over bensintank og -rør er enhetsdeler. Platen under motor kan man også kjøpe ferdig til B-Zero, eller evt. lage og feste som man vil selv (ta kontakt med klassemiljøet for råd og tips!).</li>
                                </ul>
                                <div className="mt-4 p-4 border border-blue-200 bg-blue-50 rounded-xl">
                                    <p className="text-sm text-blue-900 m-0">Godkjente spesialdeler for klasse B-Zero, som også omfatter enhetsdekk, felger, plater, rattnav mm. finnes i nettbutikken: <a href="https://rpcwebshop.no" target="_blank" rel="noreferrer" className="font-bold underline">rpcwebshop.no</a></p>
                                </div>
                            </div>

                            {/* Slitedeleroversikt */}
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">Slitedeler - Hva bør byttes?</h3>
                                <p className="text-slate-700 mb-4">Det nest mest stilte spørsmålet vi får er; hva bytter dere av slitedeler når man bygger bil? Det korte svaret på dette er at <strong className="font-semibold text-slate-900">selv bytter vi det aller meste av slitedeler.</strong></p>
                                <p className="text-slate-700 mb-6">Årsaken til det er å være sikker på at vi ikke legger masse tid, penger og jobb for å stille til start i løp, for så å måtte bryte løpet pga. en billig slitedel som ryker fordi den var gammel og slitt. Bilen går imidlertid ikke fortere fordi deler ser nye og blanke ut, så her må man bruke skjønn.</p>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                    {/* Understell */}
                                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
                                        <h4 className="font-bold border-b border-slate-200 pb-2 mb-4 text-slate-800 uppercase tracking-wider text-sm">Understell</h4>
                                        <ul className="space-y-2 text-sm text-slate-600">
                                            <li className="flex justify-between gap-4"><span>Bærebruer (2stk)</span> <span className="text-right w-24 shrink-0">1 100,-</span></li>
                                            <li className="flex justify-between gap-4"><span>Stabstag foran</span> <span className="text-right w-24 shrink-0">350,-</span></li>
                                            <li className="flex justify-between gap-4"><span>Drivaksler (2stk)</span> <span className="text-right w-24 shrink-0">2 700,-</span></li>
                                            <li className="flex justify-between gap-4"><span>Standard fjærer (2stk)</span> <span className="text-right w-24 shrink-0">1 600,-</span></li>
                                            <li className="flex justify-between gap-4"><span>Støtdempere bak (2stk)</span> <span className="text-right w-24 shrink-0">1 780,-</span></li>
                                            <li className="flex justify-between gap-4"><span>Støtdempere foran (2stk)</span> <span className="text-right w-24 shrink-0">2 180,-</span></li>
                                            <li className="flex justify-between gap-4"><span>Foringer bakstilling</span> <span className="text-right w-24 shrink-0">340,-</span></li>
                                            <li className="flex justify-between gap-4 font-bold text-slate-800 mt-2 pt-2 border-t border-slate-200"><span>Sum</span> <span className="text-right w-24 shrink-0">10 050,-</span></li>
                                        </ul>
                                    </div>
                                    {/* Hjul og Bremser */}
                                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
                                        <h4 className="font-bold border-b border-slate-200 pb-2 mb-4 text-slate-800 uppercase tracking-wider text-sm">Hjul & Bremser</h4>
                                        <ul className="space-y-2 text-sm text-slate-600">
                                            <li className="flex justify-between gap-4"><span>Bremseklosser RPC</span> <span className="text-right w-24 shrink-0">1 390,-</span></li>
                                            <li className="flex justify-between gap-4"><span>Skiver foran (2stk)</span> <span className="text-right w-24 shrink-0">640,-</span></li>
                                            <li className="flex justify-between gap-4"><span>Tromler bak (2stk)</span> <span className="text-right w-24 shrink-0">560,-</span></li>
                                            <li className="flex justify-between gap-4"><span>Bremsesett bak</span> <span className="text-right w-24 shrink-0">835,-</span></li>
                                            <li className="flex justify-between gap-4"><span>Håndbrekk wire (2stk)</span> <span className="text-right w-24 shrink-0">520,-</span></li>
                                            <li className="flex justify-between gap-4"><span>Hjullager foran (2stk)</span> <span className="text-right w-24 shrink-0">976,-</span></li>
                                            <li className="flex justify-between gap-4"><span>Hjullager bak (2stk)</span> <span className="text-right w-24 shrink-0">1 556,-</span></li>
                                            <li className="flex justify-between gap-4 font-bold text-slate-800 mt-2 pt-2 border-t border-slate-200"><span>Sum</span> <span className="text-right w-24 shrink-0">6 477,-</span></li>
                                        </ul>
                                    </div>
                                    {/* Motor */}
                                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
                                        <h4 className="font-bold border-b border-slate-200 pb-2 mb-4 text-slate-800 uppercase tracking-wider text-sm">Motorrom</h4>
                                        <ul className="space-y-2 text-sm text-slate-600">
                                            <li className="flex justify-between gap-4"><span>Dynamo</span> <span className="text-right w-24 shrink-0">1 300,-</span></li>
                                            <li className="flex justify-between gap-4"><span>Radiator</span> <span className="text-right w-24 shrink-0">600,-</span></li>
                                            <li className="flex justify-between gap-4"><span>Clutch og utløserlager</span> <span className="text-right w-24 shrink-0">1 200,-</span></li>
                                            <li className="flex justify-between gap-4"><span>Vannpumpe m/reim</span> <span className="text-right w-24 shrink-0">835,-</span></li>
                                            <li className="flex justify-between gap-4"><span>Luftfilter</span> <span className="text-right w-24 shrink-0">150,-</span></li>
                                            <li className="flex justify-between gap-4"><span>Slanger</span> <span className="text-right w-24 shrink-0">250,-</span></li>
                                            <li className="flex justify-between gap-4"><span>Oljefilter</span> <span className="text-right w-24 shrink-0">200,-</span></li>
                                            <li className="flex justify-between gap-4"><span>Olje motor/gir</span> <span className="text-right w-24 shrink-0">1 000,-</span></li>
                                            <li className="flex justify-between gap-4"><span>Tennplugger (3 stk)</span> <span className="text-right w-24 shrink-0">120,-</span></li>
                                            <li className="flex justify-between gap-4"><span>Batteri</span> <span className="text-right w-24 shrink-0">900,-</span></li>
                                            <li className="flex justify-between gap-4 font-bold text-slate-800 mt-2 pt-2 border-t border-slate-200"><span>Sum</span> <span className="text-right w-24 shrink-0">6 555,-</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Dekk og felger */}
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">Felger og dekk for Rally</h3>
                                <div className="space-y-4">
                                    <p>I B-Zero skal alle kjøre på samme type dekk, avhengig av underlaget:</p>
                                    <ul className="space-y-2">
                                        <li><strong>Asfalt (Rally & Racing):</strong> 14-tommer enhetsdekk merket &quot;C1 Racing&quot; (levert av Nankang). Kjøres på valgfrie standard felger (stål/alu). Svært slitesterke. Kjøpes hos RPC Webshop.</li>
                                        <li><strong>Grus:</strong> 13-tommer Maxsport grus enhetsdekk. Krever enhetsfelger fra Braid (ca 2600kr stk). Braid-felgene tåler røffe forhold og kjøpes via RPC Webshop eller Kollevold. Grusdekk selges f.eks. hos Racesupport.no.</li>
                                        <li><strong>Snø / Vinterrally:</strong> 13-tommer Black Rocket enhets piggdekk med 4,5mm piggutstikk. Man benytter de samme 13-tommer Braid-felgene som på grus. Piggdekk med 7mm utstikk eller mer fases ut og er forbudt fra 2027. Kjøpes hos RPC eller Stian Sørlie Motorsport.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Personlig utstyr */}
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">Personlig kjøreutstyr</h3>
                                <p className="text-slate-700 mb-6">For å kjøre rally trenger man personlig kjøreutstyr. Dette er en engangsinvestering, som kan skaffes nytt eller brukt (pass på at det er godkjent utstyr!). Her er en oversikt med ca. priser (minimumspriser for nytt utstyr):</p>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm text-left text-slate-600 rounded-xl overflow-hidden shadow-sm border border-slate-200">
                                        <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                                            <tr>
                                                <th scope="col" className="px-4 py-3">Utstyr</th>
                                                <th scope="col" className="px-4 py-3 text-right">Pris (ca)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="bg-white border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">Kjøredress, trelags <span className="text-xs text-slate-500 font-normal">(med godkjent Fia-Standard)</span></td>
                                                <td className="px-4 py-3 text-right whitespace-nowrap">4 000,-</td>
                                            </tr>
                                            <tr className="bg-slate-50 border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">Brannhemmende undertøy, to deler <span className="text-xs text-slate-500 font-normal">(med godkjent Fia-Standard)</span></td>
                                                <td className="px-4 py-3 text-right whitespace-nowrap">1 200,-</td>
                                            </tr>
                                            <tr className="bg-white border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">Godkjente kjørehansker <span className="text-xs text-slate-500 font-normal">(med godkjent Fia-Standard)</span></td>
                                                <td className="px-4 py-3 text-right whitespace-nowrap">900,-</td>
                                            </tr>
                                            <tr className="bg-slate-50 border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">Hjelmer med intercom <span className="text-xs text-slate-500 font-normal">(med godkjent Fia-Standard)</span></td>
                                                <td className="px-4 py-3 text-right whitespace-nowrap">3 800,-</td>
                                            </tr>
                                            <tr className="bg-white border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">Intercomsentral</td>
                                                <td className="px-4 py-3 text-right whitespace-nowrap">2 400,-</td>
                                            </tr>
                                            <tr className="bg-slate-50 border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">HANS-krage <span className="text-xs text-slate-500 font-normal">(nakkebeskytter)</span></td>
                                                <td className="px-4 py-3 text-right whitespace-nowrap">2 500,-</td>
                                            </tr>
                                            <tr className="bg-white border-b border-slate-100">
                                                <td className="px-4 py-3 font-medium text-slate-900">Kjøresko til fører</td>
                                                <td className="px-4 py-3 text-right whitespace-nowrap">800,-</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-6 p-6 bg-slate-50 rounded-xl border border-slate-200">
                                    <p className="text-sm text-slate-700 leading-relaxed mb-4">Kravene til kjøredress, undertøy, hjelm og HANS-krave er like for fører og kartleser. Kartleser kan imidlertid ha vanlige sko/støvler av skinn el tilsvarende (velg brannhemmende materiale). Skoene må gå over ankelhøyde. Det er ingen krav til hansker for kartleser (pga. bla i papirer osv.) På vinteren anbefales skotrekk til å bruke over kjøresko når man er ute av bilen. Disse tas også med ut på etappene, i tilfelle man får stopp (det kan være minus 20, og bli en stund å vente uten varmekilder!). Husk i tillegg alltid varmt tøy (jakke og lue, og gjerne også noe mat/drikke) hele tiden i bilen på vinterløp!</p>
                                    <p className="text-sm text-slate-700 leading-relaxed m-0">Mye bra utstyr kan kjøpes brukt, ofte for halvparten av nypris eller lavere. Man kan også undersøke om noen har f.eks. kjøredress, hjelmer, HANS-Krage og/eller intercomsentral el. Man kan låne i startfasen, slik at man slipper å legge ut alle kostnader samtidig ved oppstart.</p>
                                </div>
                            </div>

                            {/* Innkjøpssteder liste */}
                            <div className="mt-8 border-t border-slate-200 pt-8">
                                <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">Rally-butikker & Samarbeidspartnere</h3>
                                <ul className="grid sm:grid-cols-2 gap-4 text-sm text-slate-600">
                                    <li><a href="https://rpcwebshop.no" target="_blank" rel="noreferrer" className="text-blue-600 font-bold hover:underline">RPC Webshop:</a> B-Zeros offisielle butikk i Halden. Reglementering, dekk, spesialdeler.</li>
                                    <li><a href="https://kollevold.no" target="_blank" rel="noreferrer" className="text-blue-600 font-bold hover:underline">Kollevold.no:</a> Braid felger (snø/grus) og utstyr. Holder til på Liertoppen.</li>
                                    <li><a href="https://racesupport.no" target="_blank" rel="noreferrer" className="text-blue-600 font-bold hover:underline">Racesupport.no:</a> Grusdekk for B-Zero Rally.</li>
                                    <li><a href="https://gundersenmotorsport.no" target="_blank" rel="noreferrer" className="text-blue-600 font-bold hover:underline">Gundersen Motorsport:</a> Personlig utstyr (FIA), Alnabru Oslo.</li>
                                    <li><a href="https://stiansorliemotorsport.no" target="_blank" rel="noreferrer" className="text-blue-600 font-bold hover:underline">Stian Sørlie Motorsport:</a> Utstyr og piggdekk, Spydeberg.</li>
                                    <li><a href="https://pedersen-racing.no" target="_blank" rel="noreferrer" className="text-blue-600 font-bold hover:underline">Pedersen Racing:</a> Motorsportutstyr, Sarpsborg.</li>
                                    <li><a href="https://www.tk-sport.no/" target="_blank" rel="noreferrer" className="text-blue-600 font-bold hover:underline">TK-Sport:</a> Utstyr til fører og bil, Hokksund.</li>
                                    <li><a href="https://grindenmotorsport.no" target="_blank" rel="noreferrer" className="text-blue-600 font-bold hover:underline">Grinden Motorsport:</a> Motorsportutstyr, Elverum.</li>
                                </ul>
                            </div>

                            {/* Kontaktpersoner */}
                            <div className="mt-8 border-t border-slate-200 pt-8">
                                <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">Kontaktpersoner B-Zero Rally</h3>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                        <p className="font-bold text-slate-900 mb-1 text-sm">Dan Rene Larsen</p>
                                        <p className="text-xs text-slate-600 mb-1">Tlf: 938 17 745</p>
                                        <a href="mailto:dan.rene.larsen@live.no" className="text-xs text-blue-600 hover:underline">dan.rene.larsen@live.no</a>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                        <p className="font-bold text-slate-900 mb-1 text-sm">Jon Renstrøm</p>
                                        <p className="text-xs text-slate-600 mb-1">Tlf: 930 48 706</p>
                                        <a href="mailto:jon.renstrom@gmail.com" className="text-xs text-blue-600 hover:underline">jon.renstrom@gmail.com</a>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                        <p className="font-bold text-slate-900 mb-1 text-sm">Lars Brænna</p>
                                        <p className="text-xs text-slate-600 mb-1">Tlf: 461 71 707</p>
                                        <a href="mailto:lars@vtkl.no" className="text-xs text-blue-600 hover:underline">lars@vtkl.no</a>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                        <p className="font-bold text-slate-900 mb-1 text-sm">Ståle Hovda</p>
                                        <p className="text-xs text-slate-600 mb-1">Tlf: 916 27 880</p>
                                        <a href="mailto:stale.hovda@gmail.com" className="text-xs text-blue-600 hover:underline">stale.hovda@gmail.com</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-6 flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-1">Se komplett liste på Teknisk Reglement</h4>
                    <p className="text-slate-700 text-sm">Byggingen er ferskvare, dobbeltsjekk alltid reglene på siden for Reglement og Dokumenter for oppgraderinger som er lovlige og forbudt.</p>
                </div>
                <Link href="/reglement" className="flex items-center justify-center p-3 bg-brand-red border border-transparent hover:bg-red-700 text-white rounded-full transition-colors ml-4 shrink-0 shadow-sm group">
                    <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

        </div >
    );
}
