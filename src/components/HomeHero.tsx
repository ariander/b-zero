'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export interface UpcomingRace {
    _id: string;
    title: string;
    slug: { current: string };
    date: string;
    raceCategory: 'racing' | 'rally';
    links?: { title: string, url: string, fileUrl?: string }[];
}

const kenBurnsAnimations = [
    'animate-slow-zoom-in',
    'animate-slow-pan-left',
    'animate-slow-zoom-in',
    'animate-slow-zoom-out',
    'animate-slow-pan-right',
    'animate-slow-zoom-in'
];

const heroImages = [
    '/hero-images/B-Zero Racing Gallery (1).jpg',
    '/hero-images/bzero-racing-gallery.jpg',
    '/hero-images/B-Zero Racing Gallery 6BZR231008.jpg',
    '/hero-images/B-Zero Racing Gallery 6BZR240901.jpg',
    '/hero-images/roger.jpg',
    '/hero-images/Gemini Generated Image (2).webp',
    '/hero-images/24hSPA191027-2517.jpeg',
    '/hero-images/C124h220522-063.jpg'
]

function calculateDaysRemaining(dateString: string) {
    const targetDate = new Date(dateString);
    const today = new Date();
    targetDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = targetDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

const RaceCard = ({ race, label, badgeClass }: { race: UpcomingRace | null, label: string, badgeClass: string }) => {
    if (!race) {
        return (
            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-5 rounded-2xl text-left flex-1 flex flex-col justify-center border-dashed">
                <div className="flex justify-between items-start mb-2 opacity-50">
                    <span className={`text-[10px] font-conthrax uppercase tracking-wider px-3 py-1 rounded-full ${badgeClass}`}>
                        Neste {label}
                    </span>
                </div>
                <p className="text-slate-400 font-medium italic text-sm">Ikke fastsatt enda.</p>
                <p className="text-slate-500 text-xs mt-1">Følg med for oppdateringer!</p>
            </div>
        );
    }

    const daysLeft = calculateDaysRemaining(race.date);
    let countdownText = `${daysLeft} DAGER`;
    if (daysLeft === 0) countdownText = "I DAG!";
    if (daysLeft === 1) countdownText = "I MORGEN!";

    return (
        <a href={`/sesonger/${race.slug.current}`} className="bg-black/60 backdrop-blur-sm border border-white/20 p-5 rounded-2xl text-left hover:bg-black/60 hover:border-brand-red transition duration-300 group flex-1">
            <div className="flex justify-between items-start mb-3">
                <span className={`text-[10px] font-conthrax uppercase tracking-wider px-3 py-1 rounded-full ${badgeClass}`}>
                    Neste {label}
                </span>
                <span className="text-brand-red font-conthrax font-black text-lg drop-shadow-md">
                    {countdownText}
                </span>
            </div>
            <h3 className="text-white font-conthrax group-hover:text-brand-red transition-colors text-xl line-clamp-1 mb-1">{race.title}</h3>
            <div className="text-slate-400 text-sm font-medium">
                {new Date(race.date).toLocaleDateString('no-NB', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
        </a>
    )
}

interface HomeHeroProps {
    upcomingRacing: UpcomingRace | null;
    upcomingRally: UpcomingRace | null;
}

export function HomeHero({ upcomingRacing, upcomingRally }: HomeHeroProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroImages.length)
        }, 5000) // Change image every 5 seconds
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="relative w-full py-6 md:h-[80vh] md:min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
            {/* Background Images */}
            {heroImages.map((src, index) => {
                const isActive = index === currentIndex;
                const isPrevious = index === (currentIndex - 1 + heroImages.length) % heroImages.length;
                const shouldAnimateZoom = isActive || isPrevious;
                const isReady = index !== 0 || isFirstImageLoaded;
                const animClass = kenBurnsAnimations[index % kenBurnsAnimations.length];

                return (
                    <Image
                        key={src}
                        src={src}
                        alt={`Racing moment ${index + 1}`}
                        fill
                        priority={index === 0}
                        onLoad={() => {
                            if (index === 0) setIsFirstImageLoaded(true);
                        }}
                        className={`object-cover transition-opacity duration-2000 ease-in-out ${isActive && isReady ? 'opacity-100' : 'opacity-0'} ${shouldAnimateZoom ? animClass : ''}`}
                    />
                );
            })}

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60 z-10" />

            {/* Hero Content */}
            <div className="relative z-20 text-center px-6 py-6 max-w-4xl mx-auto translate-y-2">
                <h1 className="mb-8 flex justify-center animate-fade-in-up-scale">
                    <span className="sr-only">B-Zero Racing / Rally</span>
                    <Image
                        src="/b-zero racing rally hero heading.svg"
                        alt="B-Zero Racing / Rally"
                        width={800}
                        height={200}
                        className="w-[90%] max-w-3xl drop-shadow-lg"
                        priority
                    />
                </h1>
                <p className="opacity-0 text-md md:text-2xl text-slate-200 mb-8 font-extralight max-w-4xl mx-auto drop-shadow-md animate-fade-in-up-scale [animation-delay:var(--delay-100)]">
                    Mestringsfølelse, adrenalin og tett racing. Norges råeste racing- og rallyklasse for Citroën C1, Peugeot 107 og Toyota Aygo.
                </p>
                <div className="flex flex-col sm:flex-row mb-20 gap-6 justify-center">
                    <a href="/kom-i-gang" className="bg-brand-red hover:brightness-120 hover:scale-105 active:scale-98 text-white font-conthrax font-bold px-8 py-4 pb-3 uppercase rounded-xl transition shadow-lg text-lg tracking-wide">
                        Bli Sjåfør
                    </a>
                    <a href="/reglement" className="bg-white/10 hover:bg-white/15 hover:scale-105 active:scale-98 backdrop-blur-lg border border-white/30 text-white font-conthrax uppercase font-bold px-8 py-4 pb-3 rounded-xl transition shadow-lg text-lg tracking-wide">
                        Les Reglement
                    </a>
                </div>

                {/* Upcoming Races Cards */}
                <div className="flex flex-col sm:flex-row gap-6 gap-y-4 justify-center max-w-3xl mx-auto w-full mt-12">
                    <RaceCard race={upcomingRacing} label="Race" badgeClass="bg-slate-300 text-slate-800" />
                    <RaceCard race={upcomingRally} label="Rally" badgeClass="bg-amber-500 text-slate-900" />
                </div>
            </div>
        </div>
    )
}
