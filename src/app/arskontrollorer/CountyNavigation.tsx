'use client';

interface County {
    name: string;
    count: number;
    id: string;
}

interface Props {
    counties: County[];
}

export default function CountyNavigation({ counties }: Props) {
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
                        className="block w-full text-left px-4 py-3 rounded-xl hover:bg-slate-200 hover:text-brand-red hover:shadow-sm transition-all font-medium text-slate-700 group"
                    >
                        {county.name}
                        <span className="float-right text-xs opacity-50 bg-slate-200 group-hover:bg-slate-300 px-2 py-0.5 rounded-full text-slate-800 transition-colors">
                            {county.count}
                        </span>
                    </a>
                ))}
            </div>

            {/* Mobile Navigation (Tabs alternative) */}
            <div className="lg:hidden col-span-full flex overflow-x-auto pb-4 gap-2 snap-x scrollbar-hide -mx-6 px-6">
                {counties.map((county) => (
                    <a
                        key={`mob-nav-${county.id}`}
                        href={`#${county.id}`}
                        onClick={(e) => handleScroll(e, county.id)}
                        className="shrink-0 snap-start bg-white border border-slate-200 px-5 py-2.5 rounded-full text-sm font-conthrax uppercase text-slate-700 hover:border-brand-red hover:text-brand-red whitespace-nowrap shadow-sm transition-all"
                    >
                        {county.name} ({county.count})
                    </a>
                ))}
            </div>
        </>
    );
}
