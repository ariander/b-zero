"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";

interface Driver {
    _id: string;
    name: string;
    slug: { current: string };
    startNumber: string;
    carMake: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    carImage: any;
    debutYear: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    profileImage: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    bio: any;
}

export default function PresentationSlider({ drivers }: { drivers: Driver[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Switch every 20 seconds
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % drivers.length);
        }, 20000);

        return () => clearInterval(interval);
    }, [drivers.length]);

    return (
        <div className="relative w-full h-full bg-black overflow-hidden select-none">
            {drivers.map((driver, index) => {
                const isActive = index === currentIndex;
                const isPrevious = index === (currentIndex - 1 + drivers.length) % drivers.length;
                const shouldAnimateZoom = isActive || isPrevious;

                return (
                    <div
                        key={driver._id}
                        className={`absolute inset-0 transition-opacity ease-in-out ${isActive
                            ? "opacity-100 z-10 duration-1000 delay-1000"
                            : "opacity-0 z-0 duration-1000 delay-0"
                            }`}
                    >
                        {/* Background Car Image */}
                        {driver.carImage ? (
                            <div
                                className={`absolute inset-0 w-full h-full transform origin-center ${shouldAnimateZoom ? "animate-slow-zoom" : ""
                                    }`}
                            >
                                <Image
                                    src={urlFor(driver.carImage).url()}
                                    alt={`Bilde av bilen til ${driver.name}`}
                                    fill
                                    className="object-cover opacity-40 blur-[2px]"
                                    priority={isActive}
                                />
                            </div>
                        ) : (
                            <div className="absolute inset-0 bg-neutral-900 opacity-80" />
                        )}

                        {/* Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/10 via-black/5 to-transparent" />
                        <div className="absolute inset-0 bg-linear-to-r from-black/10 via-transparent to-transparent" />

                        {/* Content Container */}
                        <div className="absolute inset-0 flex items-center justify-between px-20vw px-16 lg:px-32">

                            {/* Floating start number behind text on the left */}
                            {driver.startNumber && (isActive || isPrevious) && (
                                <div className={`absolute left-8 lg:left-4 top-1/2 -translate-y-1/2 z-10 opacity-[0.1] pointer-events-none ${shouldAnimateZoom ? "animate-slow-zoom" : ""}`}>
                                    <span className="text-[40rem] lg:text-[50rem] leading-none font-conthrax text-white">{driver.startNumber}</span>
                                </div>
                            )}

                            {/* Left Side: Info */}
                            <div className="flex-1 max-w-4xl text-white space-y-8 z-20">
                                <div>
                                    <h1 className="text-6xl lg:text-8xl font-conthrax text-white drop-shadow-lg mb-4 uppercase">
                                        {driver.name}
                                    </h1>
                                    <h2 className="text-3xl lg:text-4xl text-brand-red font-conthrax uppercase tracking-wider">
                                        {driver.carMake || "B-Zero Racer"}
                                    </h2>
                                </div>

                                <div className="flex gap-8 items-center pt-4">
                                    {driver.debutYear && (
                                        <div className="bg-neutral-800/80 backdrop-blur-md px-6 py-4 rounded-xl border border-neutral-700">
                                            <span className="block text-neutral-400 text-lg uppercase font-bold tracking-widest mb-1">Debutår</span>
                                            <span className="text-4xl font-conthrax text-white">{driver.debutYear}</span>
                                        </div>
                                    )}
                                    {driver.startNumber && (
                                        <div className="bg-brand-red/90 backdrop-blur-md px-6 py-4 rounded-xl border border-red-500">
                                            <span className="block text-red-200 text-lg uppercase font-bold tracking-widest mb-1">Startnummer</span>
                                            <span className="text-4xl font-conthrax text-white">#{driver.startNumber}</span>
                                        </div>
                                    )}
                                </div>

                                {driver.bio && (
                                    <div className="prose prose-xl prose-invert prose-p:text-neutral-200 prose-p:leading-relaxed max-w-3xl pt-8 line-clamp-6">
                                        <PortableText value={driver.bio} />
                                    </div>
                                )}
                            </div>

                            {/* Right Side: Portrait */}
                            <div className="relative w-1/3 h-[70vh] flex items-center justify-center z-20">
                                {driver.profileImage ? (
                                    <div className={`relative w-full h-full max-w-[600px] aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white transform origin-center ${shouldAnimateZoom ? "animate-slow-zoom" : ""}`}>
                                        <Image
                                            src={urlFor(driver.profileImage).width(800).height(1000).url()}
                                            alt={`Portrett av ${driver.name}`}
                                            fill
                                            className="object-cover"
                                            priority={isActive}
                                        />
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="absolute bottom-0 left-0 right-0 h-2 bg-neutral-900 z-30">
                            {isActive && (
                                <div className="h-full bg-brand-red animate-progress-bar" />
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
