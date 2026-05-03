'use client';

import { useState, useEffect } from 'react';

export function ObfuscatedEmail({ 
    user, 
    domain, 
    className = "",
    children
}: { 
    user: string; 
    domain: string; 
    className?: string; 
    children?: React.ReactNode;
}) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const email = `${user}@${domain}`;

    if (!mounted) {
        // Return a non-clickable version for SSR/Bots
        return <span className={className}>{children || `${user} [at] ${domain}`}</span>;
    }

    return (
        <a href={`mailto:${email}`} className={className}>
            {children || email}
        </a>
    );
}
