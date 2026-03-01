import { getDrivers } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { User } from "@phosphor-icons/react/dist/ssr";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60; // Revalidate at most every 60 seconds

export default async function DriversPage() {
    const drivers = await getDrivers();

    return (
        <div className="bg-neutral-950 min-h-screen">
            <div className="max-w-6xl mx-auto px-6 py-12 pb-24">
                <header className="mb-16">
                    <h1 className="text-3xl md:text-4xl font-conthrax text-slate-100 mb-6 uppercase tracking-wider">
                        Sjåfører <span className="text-brand-red block">& Team</span>
                    </h1>
                    <p className="text-xl md:text-xl text-neutral-300 font-normal max-w-3xl">
                        Hvem skjuler seg bak hjelmen? Bli kjent med førerne som kjemper om pallplassene i Norges jevneste racingklasse.
                    </p>
                </header>

                {drivers.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 mb-16">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {drivers.map((driver: any) => (
                            <Link
                                key={driver._id}
                                href={`/sjaforer/${driver.slug.current}`}
                                className="group relative bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-700 shadow-md hover:-translate-y-2 hover:shadow-2xl hover:border-neutral-500 transition-all duration-500 flex flex-col"
                            >
                                <div className="relative aspect-square overflow-hidden bg-neutral-800 flex-1 flex items-center justify-center">
                                    {driver.profileImage ? (
                                        <>
                                            <Image
                                                src={urlFor(driver.profileImage).width(600).height(600).url()}
                                                alt={driver.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition duration-700"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
                                        </>
                                    ) : (
                                        <>
                                            <User size={64} className="text-neutral-600 mb-8" />
                                            <div className="absolute inset-0 bg-linear-to-t from-neutral-900 via-transparent to-transparent" />
                                        </>
                                    )}

                                    {driver.startNumber && (
                                        <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-brand-red text-white py-0.5 md:py-1 transition-transform group-hover:scale-110 duration-500 px-2 pt-1 md:px-3 md:pt-2 font-conthrax rounded-full shadow-lg border border-red-500/50 flex flex-col items-center justify-center z-10">
                                            <span className="text-xl md:text-2xl leading-none">{driver.startNumber}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 pt-8 md:pt-12">
                                    <h2 className="text-lg md:text-2xl font-conthrax text-white mb-0.5 md:mb-1 group-hover:text-brand-red transition-colors drop-shadow-md">
                                        {driver.name}
                                    </h2>
                                    <p className="text-white/60 font-medium text-xs md:text-sm drop-shadow-md">
                                        {driver.carMake || "Ukjent bil"}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="bg-neutral-900 p-12 rounded-3xl text-center shadow-sm border border-neutral-800 mb-16">
                        <p className="text-slate-400 italic text-lg">Ingen sjåfører registrert på terminalen enda...</p>
                    </div>
                )}

                {/* Call to Action for Drivers */}
                <section className="bg-neutral-900 border-2 border-neutral-700 p-8 md:p-12 rounded-3xl shadow-xl flex flex-col items-center text-center">
                    <div className="bg-brand-red p-4 rounded-full text-white mb-6">
                        <User size={36} weight="fill" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-conthrax uppercase tracking-wider text-white mb-4">
                        Mangler du, eller teamet ditt her?
                    </h2>
                    <p className="text-neutral-300 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
                        Vi ønsker å vise frem alle som kjører i B-Zero! Send oss din sjåførprofil og bli med i oversikten.
                    </p>
                    <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 text-left w-full max-w-xl mb-8">
                        <h3 className="font-conthrax text-white uppercase tracking-widest mb-4">Dette trenger vi fra deg:</h3>
                        <ul className="text-neutral-300 space-y-2 list-disc list-inside">
                            <li>Navnet ditt (og evt. teamnavn)</li>
                            <li>Startnummer og debutår i Racing/Rally</li>
                            <li>Bil (Merke og modell)</li>
                            <li>En kort biografi om deg og gjerne en morsom historie!</li>
                            <li>Bildemateriell: Et portrettbilde og et bilde av bilen</li>
                        </ul>
                    </div>
                    <a
                        href="mailto:arild.andersen@gmail.com?subject=B-Zero%20Sj%C3%A5f%C3%B8rprofil&body=Hei!%0A%0AHer%20er%20min%20informasjon%20til%20sj%C3%A5f%C3%B8rsiden:%0A%0ANavn:%20%0AStartnummer:%20%0ABil:%20%0ADebut%C3%A5r:%20%0A%0ABiografi:%20%0A%0A(Husk%20%C3%A5%20legge%20ved%20et%20portrettbilde%20og%20et%20bilde%20av%20bilen!)"
                        className="bg-brand-red hover:bg-neutral-100 text-white hover:text-brand-red font-conthrax uppercase tracking-widest py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-brand-red/20 border-2 border-brand-red hover:border-white"
                    >
                        Send Inn På E-post
                    </a>
                </section>
            </div>
        </div>
    )
}
