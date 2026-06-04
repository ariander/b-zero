'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { Users } from "@phosphor-icons/react";

export default function DriverListFilter({ initialDrivers }: { initialDrivers: any[] }) {
    const [showRacing, setShowRacing] = useState(true);
    const [showRally, setShowRally] = useState(true);

    const filteredDrivers = initialDrivers.filter(driver => {
        const cats = driver.categories || ['racing'];
        if (showRacing && cats.includes('racing')) return true;
        if (showRally && cats.includes('rally')) return true;
        return false;
    });

    return (
        <div>
            {/* Filter Controls */}
            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 p-4 px-6 rounded-3xl shadow-xl flex flex-col sm:flex-row gap-6 items-center mb-12 z-40 w-fit">
                <span className="text-slate-400 font-conthrax text-sm uppercase tracking-wider">Vis:</span>
                
                <label className="flex items-center gap-3 cursor-pointer group select-none">
                    <div className="relative">
                        <input
                            type="checkbox"
                            className="sr-only"
                            checked={showRacing}
                            onChange={(e) => setShowRacing(e.target.checked)}
                        />
                        <div className={`block w-12 h-7 rounded-full transition-colors duration-300 ${showRacing ? 'bg-brand-red' : 'bg-slate-700'}`}></div>
                        <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform duration-300 ease-in-out shadow-sm ${showRacing ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </div>
                    <span className={`text-sm font-medium transition-colors ${showRacing ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'}`}>
                        Racingsjåfører
                    </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group select-none">
                    <div className="relative">
                        <input
                            type="checkbox"
                            className="sr-only"
                            checked={showRally}
                            onChange={(e) => setShowRally(e.target.checked)}
                        />
                        <div className={`block w-12 h-7 rounded-full transition-colors duration-300 ${showRally ? 'bg-amber-500' : 'bg-slate-700'}`}></div>
                        <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform duration-300 ease-in-out shadow-sm ${showRally ? 'translate-x-5' : 'translate-x-0'}`}></div>
                    </div>
                    <span className={`text-sm font-medium transition-colors ${showRally ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'}`}>
                        Rallysjåfører & kartlesere
                    </span>
                </label>
            </div>

            {filteredDrivers.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 mb-16">
                    {filteredDrivers.map((driver) => (
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
                                        <Image
                                            src="/avatar.jpg"
                                            alt="Ukjent sjåfør"
                                            fill
                                            className="object-cover opacity-50 group-hover:opacity-75 transition duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
                                    </>
                                )}

                                {driver.startNumber && (
                                    <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-brand-red text-white py-0.5 md:py-1 transition-transform group-hover:scale-110 duration-500 px-2 pt-1 md:px-3 md:pt-2 font-conthrax rounded-full shadow-lg border border-red-500/50 flex flex-col items-center justify-center z-10">
                                        <span className="text-xl md:text-2xl leading-none">{driver.startNumber}</span>
                                    </div>
                                )}
                                
                                {/* Badges */}
                                <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10 flex flex-col gap-1">
                                    {(driver.categories || ['racing']).includes('racing') && (
                                        <span className="bg-slate-800/90 backdrop-blur text-white px-2 py-0.5 md:px-3 md:py-1 rounded-sm font-conthrax text-[8px] md:text-[10px] tracking-widest uppercase shadow-md border border-slate-700/50">
                                            Racing
                                        </span>
                                    )}
                                    {(driver.categories || []).includes('rally') && (
                                        <span className="bg-amber-500/90 backdrop-blur text-slate-900 px-2 py-0.5 md:px-3 md:py-1 rounded-sm font-conthrax text-[8px] md:text-[10px] tracking-widest uppercase shadow-md border border-amber-600/50">
                                            Rally
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 pt-8 md:pt-12">
                                <h2 className="text-md leading-tight md:text-2xl font-conthrax text-white mb-0.5 md:mb-1 group-hover:text-brand-red transition-colors drop-shadow-md">
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
                    <Users size={56} className="mx-auto text-slate-600 mb-6" />
                    <h3 className="text-2xl font-conthrax text-white mb-2">Ingen treff</h3>
                    <p className="text-slate-400 text-lg">Prøv å endre filtrene over.</p>
                </div>
            )}
        </div>
    );
}
