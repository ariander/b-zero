'use client';

import { useState, useEffect } from 'react';
import { EnvelopeSimple } from '@phosphor-icons/react/dist/ssr';

export function InspectorEmail({ email }: { email: string }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const [user, domain] = email.split('@');

    if (!mounted) {
        return (
            <span className="flex items-center gap-3 text-slate-700 w-fit p-1 -m-1 rounded-md cursor-default">
                <div className="bg-slate-100 p-2 rounded-lg text-slate-500">
                    <EnvelopeSimple size={18} weight="fill" />
                </div>
                <span className="font-medium text-sm">{user} [at] {domain}</span>
            </span>
        );
    }

    return (
        <a href={`mailto:${email}`} className="flex items-center gap-3 text-slate-700 hover:text-brand-red transition-colors w-fit p-1 -m-1 rounded-md group/btn">
            <div className="bg-slate-100 p-2 rounded-lg group-hover/btn:bg-red-50 text-slate-500">
                <EnvelopeSimple size={18} weight="fill" />
            </div>
            <span className="font-medium text-sm">{email}</span>
        </a>
    );
}
