import { getDrivers } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { User } from "@phosphor-icons/react/dist/ssr";
import DriverListFilter from "@/components/DriverListFilter";

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
                        Hvem skjuler seg bak hjelmene? Bli kjent med førerne og kartleserne som kjemper om pallplassene og etappeseirene i Norges jevneste racing- og rallyklasse.
                    </p>
                </header>

                <DriverListFilter initialDrivers={drivers} />

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
                        <h3 className="font-conthrax text-white uppercase tracking-widest mb-4">Finn frem dette før du starter:</h3>
                        <ul className="text-neutral-300 space-y-2 list-disc list-inside">
                            <li>Et godt portrettbilde av deg selv</li>
                            <li>Et bilde av bilen din</li>
                            <li>Din bilinformasjon, startnummer og debutår</li>
                            <li>En liten historie om deg og din reise i B-Zero!</li>
                        </ul>
                    </div>
                    <Link
                        href="/sjaforer/ny"
                        className="bg-brand-red hover:bg-neutral-100 text-white hover:text-brand-red font-conthrax uppercase tracking-widest py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-brand-red/20 border-2 border-brand-red hover:border-white"
                    >
                        Registrer Profil
                    </Link>
                </section>
            </div>
        </div>
    )
}
