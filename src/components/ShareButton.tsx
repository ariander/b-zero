'use client';

import { FacebookLogo, ShareNetwork } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

interface ShareButtonProps {
    url: string;
    title: string;
}

export default function ShareButton({ url, title }: ShareButtonProps) {
    const [isMobileShareSupported, setIsMobileShareSupported] = useState(false);

    useEffect(() => {
        // Detect Web Share API support on the client side only for mobile/touch devices.
        // Desktop browsers (like Arc/Chrome/Safari on macOS) support navigator.share
        // but typically show a generic OS sharing popup instead of opening Facebook,
        // which is a poor user experience.
        if (typeof navigator !== 'undefined' && 'share' in navigator) {
            const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const hasTouch = window.matchMedia("(pointer: coarse)").matches;
            if (isMobileUA || hasTouch) {
                setIsMobileShareSupported(true);
            }
        }
    }, []);

    const handleShare = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isMobileShareSupported) {
            e.preventDefault();
            try {
                await navigator.share({
                    title: title,
                    url: url,
                });
            } catch (error) {
                // If it's a cancellation error (AbortError), do nothing.
                // Otherwise we can log it.
                if (error instanceof Error && error.name !== 'AbortError') {
                    console.error('Kunne ikke dele saken:', error);
                }
            }
        }
    };

    return (
        <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            onClick={handleShare}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 font-bold px-6 py-3 rounded-lg transition-colors shadow-sm cursor-pointer ${
                isMobileShareSupported
                    ? 'bg-brand-red hover:bg-red-600 text-white'
                    : 'bg-[#1877F2] hover:bg-[#1864D9] text-white'
            }`}
        >
            {isMobileShareSupported ? (
                <>
                    <ShareNetwork size={24} weight="fill" />
                    <span>Del nyhetssak</span>
                </>
            ) : (
                <>
                    <FacebookLogo size={24} weight="fill" />
                    <span>Del på Facebook</span>
                </>
            )}
        </a>
    );
}
