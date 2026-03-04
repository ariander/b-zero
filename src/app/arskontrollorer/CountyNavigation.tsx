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
                        className="block w-full text-left px-4 py-3 rounded-xl hover:bg-white hover:text-brand-red hover:shadow-sm transition-all font-medium text-slate-700 group"
                    >
                        {county.name}
                        <span className="float-right text-xs opacity-50 bg-slate-200 group-hover:bg-slate-300 px-2 py-0.5 rounded-full text-slate-800 transition-colors">
                            {county.count}
                        </span>
                    </a>
                ))}
            </div>

            {/* Mobile Navigation (Dropdown) */}
            <div className="lg:hidden col-span-full mb-8 z-20">
                <label htmlFor="county-select" className="sr-only">Velg fylke</label>
                <div className="relative">
                    <select
                        id="county-select"
                        className="w-full appearance-none bg-white border border-slate-200 text-slate-700 py-3 pr-10 pl-4 rounded-xl font-conthrax uppercase text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-all"
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val) {
                                // Simulate anchor scroll
                                const element = document.getElementById(val);
                                if (element) {
                                    history.pushState(null, '', `#${val}`);
                                    const yOffset = -120;
                                    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
                                    window.scrollTo({ top: y, behavior: 'smooth' });
                                }
                                // Reset the select visually so it acts like a jump menu, or leave it to show current
                            }
                        }}
                    >
                        <option value="">-- Velg Fylke --</option>
                        {counties.map((county) => (
                            <option key={`mob-nav-${county.id}`} value={county.id}>
                                {county.name} ({county.count})
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </>
    );
}
