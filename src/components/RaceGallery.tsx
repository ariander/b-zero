'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

interface GalleryProps {
    images: { asset: { _id: string, url: string }, alt?: string }[];
}

export function RaceGallery({ images }: GalleryProps) {
    const [index, setIndex] = useState(-1);

    if (!images || images.length === 0) return null;

    // Filter out invalid images
    const validImages = images.filter(img => img?.asset?.url);

    // Prepare slides for the lightbox
    const slides = validImages.map(img => ({
        src: img.asset.url,
        alt: img.alt || 'B-Zero Racing Gallery Image'
    }));

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {validImages.map((image, i) => (
                    <div
                        key={image.asset._id || i}
                        className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 group cursor-pointer border border-slate-600 shadow-sm hover:shadow-lg transition-all duration-300"
                        onClick={() => setIndex(i)}
                    >
                        <Image
                            src={image.asset.url}
                            alt={image.alt || `Galleri bilde ${i + 1}`}
                            fill
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover group-hover:scale-105 transition duration-500"
                            loading="lazy"
                        />
                        {/* Subtle overlay on hover */}
                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition duration-300 flex items-center justify-center">
                            <span className="opacity-0 group-hover:opacity-100 text-white bg-black/50 px-3 py-1 rounded-full text-sm font-semibold transition-opacity duration-300">
                                Forstørr
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <Lightbox
                index={index}
                open={index >= 0}
                close={() => setIndex(-1)}
                slides={slides}
                plugins={[Thumbnails, Zoom]}
                carousel={{ finite: slides.length <= 1 }}
                thumbnails={{ position: 'bottom', width: 120, height: 80, gap: 16 }}
            />
        </>
    );
}
