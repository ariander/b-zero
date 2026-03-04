'use client';

import { CalendarPlus } from "@phosphor-icons/react";

export default function SubscribeCalendarButton() {
    const handleSubscribe = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        // Construct the absolute URL based on current environment (localhost or production)
        const url = new URL('/api/calendar', window.location.origin);

        // Replace http/https with webcal so the OS automatically opens the default calendar app
        const webcalUrl = url.href.replace(/^https?:\/\//i, 'webcal://');

        // Trigger the webcal protocol
        window.location.href = webcalUrl;
    };

    return (
        <a
            href="/api/calendar" // Fallback for browsers without JS or webcal support
            onClick={handleSubscribe}
            title="Abonner på løpskalenderen fra B-Zero Racing"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-brand-red hover:bg-red-600 text-white rounded-xl transition-all font-medium text-sm shadow-md hover:shadow-lg group"
        >
            <CalendarPlus size={20} weight="fill" className="group-hover:scale-110 transition-transform" />
            <span>Legg til i kalender</span>
        </a>
    );
}
