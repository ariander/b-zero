'use client';

import { useEffect, useState } from 'react';

interface County {
    name: string;
    count: number;
    id: string;
}

interface Props {
    counties: County[];
}

export default function CountyNavigation({ counties }: Props) {
    const [activeId, setActiveId] = useState<string>(counties[0]?.id || '');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // Find visible entries
                // Use intersection ratio or simply the first one that is intersecting
                const intersecting = entries.filter((entry) => entry.isIntersecting);
                if (intersecting.length > 0) {
                    // Pick the one that is intersecting to update the active ID
                    setActiveId(intersecting[0].target.id);
                }
            },
            {
                // Trigger when the element is in the middle of the viewport
                rootMargin: '-20% 0px -40% 0px',
                threshold: 0,
            }
        );

        counties.forEach((county) => {
            const element = document.getElementById(county.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [counties]);

    // Handle scroll to element with offset to account for sticky headers
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            // Push state to browser history
            history.pushState(null, '', `#${id}`);

            // Fixed offset based on the header height
            const yOffset = -120; // 120px offset
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;

            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Sticky Sidebar Navigation (Desktop) */}
            <div className="lg:col-span-1 lg:sticky lg:top-32 space-y-2 hidden lg:block">
                <h3 className="text-sm font-conthrax text-slate-500 uppercase tracking-wider mb-4 px-3">
                    Velg Fylke
                </h3>
                {counties.map((county) => (
                    <a
                        key={`nav-${county.id}`}
                        href={`#${county.id}`}
                        onClick={(e) => handleScroll(e, county.id)}
                        data-active={activeId === county.id}
                        className="block w-full text-left px-4 py-3 rounded-xl hover:bg-white hover:text-brand-red hover:shadow-sm transition-all font-medium text-slate-700 data-[active=true]:bg-brand-red data-[active=true]:text-white group"
                    >
                        {county.name}
                        <span className="float-right text-xs opacity-50 bg-slate-200 px-2 py-0.5 rounded-full text-slate-800 group-data-[active=true]:bg-white/20 group-data-[active=true]:text-white group-data-[active=true]:opacity-100 transition-colors">
                            {county.count}
                        </span>
                    </a>
                ))}
            </div>

            {/* Mobile Navigation (Sticky) */}
            <div className="lg:hidden col-span-full sticky top-20 z-40 bg-slate-100/90 backdrop-blur-md flex overflow-x-auto py-4 gap-2 snap-x scrollbar-hide -mx-6 px-6 border-b border-slate-200 shadow-sm mb-4">
                {counties.map((county) => (
                    <a
                        key={`mob-nav-${county.id}`}
                        href={`#${county.id}`}
                        onClick={(e) => handleScroll(e, county.id)}
                        data-active={activeId === county.id}
                        className="shrink-0 snap-start bg-white border border-slate-200 px-5 py-2.5 rounded-full text-sm font-conthrax uppercase text-slate-700 hover:border-brand-red hover:text-brand-red whitespace-nowrap shadow-sm data-[active=true]:bg-brand-red data-[active=true]:text-white data-[active=true]:border-brand-red transition-all"
                    >
                        {county.name} ({county.count})
                    </a>
                ))}
            </div>
        </>
    );
}
