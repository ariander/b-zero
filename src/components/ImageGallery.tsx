'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CaretLeft, CaretRight, FlagCheckered } from '@phosphor-icons/react/dist/ssr';

export function ImageGallery({ images, title, raceCategory }: { images: any[], title: string, raceCategory?: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const validImages = images?.filter(img => img?.asset?.url) || [];

    if (validImages.length === 0) return null;

    const nextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentIndex((prev) => (prev + 1) % validImages.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
    };

    return (
        <div className="relative h-72 md:h-96 w-full bg-slate-100 group overflow-hidden">
            <Image
                src={validImages[currentIndex].asset.url}
                alt={`${title} - Bilde ${currentIndex + 1}`}
                fill
                className="object-cover transition-transform duration-500"
            />

            {/* Navigasjonsknapper */}
            {validImages.length > 1 && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-brand-red text-white p-2 rounded-full opacity-0 md:opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm z-10"
                        aria-label="Forrige bilde"
                    >
                        <CaretLeft size={24} weight="bold" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-brand-red text-white p-2 rounded-full opacity-0 md:opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm z-10"
                        aria-label="Neste bilde"
                    >
                        <CaretRight size={24} weight="bold" />
                    </button>

                    {/* Stepper dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-black/30 px-3 py-2 rounded-full backdrop-blur-sm">
                        {validImages.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => { e.preventDefault(); setCurrentIndex(idx); }}
                                className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentIndex ? 'bg-brand-red scale-125' : 'bg-white/60 hover:bg-white'}`}
                                aria-label={`Gå til bilde ${idx + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}

            {raceCategory && (
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs md:text-sm font-conthrax uppercase tracking-wider shadow-md flex items-center gap-2 z-10">
                    <FlagCheckered size={16} />
                    {raceCategory === 'racing' ? 'Racing (Asfalt)' : raceCategory === 'rally' ? 'Rally' : 'Racing / Rally'}
                </div>
            )}
        </div>
    );
}
