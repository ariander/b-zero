"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import { SlidersHorizontal, ArrowLeft } from "@phosphor-icons/react";

interface Driver {
    _id: string;
    name: string;
    slug: { current: string };
    startNumber: string;
    carMake: string;
    categories?: string[];
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
    
    // Filters and settings
    const [showRacing, setShowRacing] = useState(true);
    const [showRally, setShowRally] = useState(true);
    const [requireProfilePic, setRequireProfilePic] = useState(false);
    const [durationSecs, setDurationSecs] = useState(20);
    
    // UI state
    const [controlsVisible, setControlsVisible] = useState(false);

    // Apply filters
    const filteredDrivers = drivers.filter(d => {
        const cats = d.categories || ['racing'];
        
        // If driver has ONLY racing and we disabled racing
        if (!showRacing && cats.includes('racing') && !cats.includes('rally')) return false;
        // If driver has ONLY rally and we disabled rally
        if (!showRally && cats.includes('rally') && !cats.includes('racing')) return false;
        // If we disabled both
        if (!showRacing && !showRally) return false;
        
        if (requireProfilePic && !d.profileImage) return false;
        
        return true;
    });

    // Handle timer for slider
    useEffect(() => {
        if (filteredDrivers.length === 0) return;
        
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % filteredDrivers.length);
        }, durationSecs * 1000);

        return () => clearInterval(interval);
    }, [filteredDrivers.length, durationSecs]);

    // Handle array shrink bounds check
    useEffect(() => {
        if (filteredDrivers.length > 0 && currentIndex >= filteredDrivers.length) {
            setCurrentIndex(0);
        }
    }, [filteredDrivers.length, currentIndex]);

    // Handle mouse movement to show/hide controls and cursor
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const handleMouseMove = () => {
            setControlsVisible(true);
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setControlsVisible(false);
            }, 3000); // Hide after 3s of inactivity
        };
        
        // Trigger once on mount
        handleMouseMove();

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(timeout);
        };
    }, []);

    // Get the current driver
    const currentDriver = filteredDrivers.length > 0 ? filteredDrivers[currentIndex] : null;

    return (
        <div className={`relative w-full h-full bg-black overflow-hidden select-none ${controlsVisible ? 'cursor-default' : 'cursor-none'}`}>
            
            {/* Control Panel */}
            <div 
                className={`absolute top-8 left-8 z-50 bg-slate-900/90 backdrop-blur-xl border border-slate-700 p-6 rounded-2xl shadow-2xl transition-all duration-500 transform ${controlsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
                onMouseEnter={() => setControlsVisible(true)} // Keep alive while hovering panel
            >
                <div className="flex items-center gap-3 text-white mb-6 border-b border-slate-700 pb-4">
                    <SlidersHorizontal size={24} className="text-brand-red" />
                    <h3 className="font-conthrax uppercase tracking-wider">Presentasjonsinnstillinger</h3>
                </div>

                <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" checked={showRacing} onChange={e => setShowRacing(e.target.checked)} className="w-5 h-5 rounded border-slate-700 bg-slate-800 text-brand-red" />
                        <span className="text-slate-200">Vis Racingsjåfører</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" checked={showRally} onChange={e => setShowRally(e.target.checked)} className="w-5 h-5 rounded border-slate-700 bg-slate-800 text-amber-500" />
                        <span className="text-slate-200">Vis Rallysjåfører og kartlesere</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" checked={requireProfilePic} onChange={e => setRequireProfilePic(e.target.checked)} className="w-5 h-5 rounded border-slate-700 bg-slate-800 text-emerald-500" />
                        <span className="text-slate-200">Kun sjåfører med profilbilde</span>
                    </label>

                    <div className="pt-4 border-t border-slate-700/50">
                        <label className="block text-slate-300 text-sm mb-2">Visningstid pr. sjåfør: <strong className="text-white">{durationSecs} sekunder</strong></label>
                        <input 
                            type="range" 
                            min="5" 
                            max="60" 
                            step="5"
                            value={durationSecs} 
                            onChange={e => setDurationSecs(parseInt(e.target.value))}
                            className="w-full accent-brand-red cursor-pointer"
                        />
                    </div>
                </div>
                
                <div className="mt-6 pt-4 flex items-center justify-between border-t border-slate-700/50">
                    <span className="text-xs text-slate-500 italic">
                        Viser {filteredDrivers.length} av {drivers.length} profiler
                    </span>
                    <Link href="/" className="inline-flex items-center gap-2 text-xs font-conthrax uppercase tracking-wider text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors border border-slate-700">
                        <ArrowLeft size={14} weight="bold" />
                        Tilbake til forside
                    </Link>
                </div>
            </div>

            {filteredDrivers.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 space-y-4">
                    <span className="text-4xl font-conthrax">Ingen sjåfører matcher filteret</span>
                    <p className="text-slate-400">Beveg musen for å endre innstillinger.</p>
                </div>
            ) : (
                filteredDrivers.map((driver, index) => {
                    const isActive = index === currentIndex;
                    const isPrevious = index === (currentIndex - 1 + filteredDrivers.length) % filteredDrivers.length;
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
                                        <div className="flex items-center gap-4">
                                            <h2 className="text-3xl lg:text-4xl text-brand-red font-conthrax uppercase tracking-wider">
                                                {driver.carMake || "B-Zero Racer"}
                                            </h2>
                                            
                                            {/* Categories */}
                                            <div className="flex gap-2">
                                                {(driver.categories || ['racing']).includes('racing') && (
                                                    <span className="bg-slate-800 text-white border border-slate-700 px-3 py-1 rounded-sm font-conthrax text-xs tracking-widest uppercase shadow-md">
                                                        Racing
                                                    </span>
                                                )}
                                                {(driver.categories || []).includes('rally') && (
                                                    <span className="bg-amber-500 text-slate-900 border border-amber-600 px-3 py-1 rounded-sm font-conthrax text-xs tracking-widest uppercase shadow-md">
                                                        Rally
                                                    </span>
                                                )}
                                            </div>
                                        </div>
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
                                        <div className="prose prose-xl prose-invert prose-p:text-neutral-200 prose-p:leading-relaxed max-w-2xl pt-8 line-clamp-20">
                                            <PortableText value={driver.bio} />
                                        </div>
                                    )}
                                </div>

                                {/* Right Side: Portrait */}
                                <div className="relative w-1/3 h-[60vh] flex items-center justify-center z-20">
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
                                    <div 
                                        className="h-full bg-brand-red animate-progress-bar" 
                                        style={{ animationDuration: `${durationSecs}s` }} 
                                    />
                                )}
                            </div>
                        </div>
                    );
                })
            )}

            {/* Global Overlay: Logo, URL and QR */}
            <div className="absolute top-8 right-8 lg:top-12 lg:right-16 z-40 flex items-center gap-6 drop-shadow-lg opacity-90 transition-opacity">
                <div className="flex flex-col items-end gap-2">
                    <Image
                        src="/B-ZERO-logo.svg"
                        alt="B-Zero Racing"
                        width={240}
                        height={70}
                        className="brightness-0 invert h-10 lg:h-12 w-auto"
                    />
                    <span className="text-white font-conthrax text-sm lg:text-base tracking-widest uppercase opacity-80">
                        www.bzero.no
                    </span>
                </div>
                <div className="bg-white p-2 rounded-xl shadow-lg flex items-center justify-center shrink-0">
                    <Image
                        src="/qr.svg"
                        alt="QR Kode til B-Zero Racing"
                        width={80}
                        height={80}
                        className="w-16 h-16 lg:w-20 lg:h-20"
                    />
                </div>
            </div>
        </div>
    );
}
