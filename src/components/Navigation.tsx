'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { List, X } from '@phosphor-icons/react'

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const [pendingPath, setPendingPath] = useState<string | null>(null)
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        // Nullstill pending tracking når pathname endrer seg (ny side lastet)
        const timeout = setTimeout(() => setPendingPath(null), 0);
        return () => clearTimeout(timeout);
    }, [pathname])

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

    const navLinks = [
        { name: 'Hjem', href: '/' },
        { name: 'Nyheter', href: '/nyheter' },
        { name: 'Terminliste', href: '/sesonger' },
        { name: 'Sjåfører', href: '/sjaforer' },
        { name: 'Kom i gang', href: '/kom-i-gang' },
        { name: 'Reglement', href: '/reglement' },
        { name: 'Om Oss', href: '/om-oss' },
    ]

    const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        // Ikke avbryt logikken for modifiserte klikk (cmd+klikk, etc)
        if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;

        // Unngå delay hvis vi allerede er på riktig side
        if (pathname === href) return

        e.preventDefault()
        setPendingPath(href)

        // Vent litt før selve siden endres for at animasjonen skal rekke å spille (200ms)
        setTimeout(() => {
            router.push(href)
            closeMenu()
        }, 0)
    }

    return (
        <>
            {/* Desktop Menu */}
            <nav className="hidden md:flex gap-6 text-sm tracking-wider items-center">
                {navLinks.map((link) => {
                    // Sjekk match på vanlig sti, eller om den klikkede stien (pending) matcher
                    const isCurrent = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))
                    const isActive = isCurrent || pendingPath === link.href

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleNavigation(e, link.href)}
                            className={`group relative py-1 transition-colors duration-300 ${isActive ? 'text-white' : 'text-neutral-300 hover:text-white'}`}
                        >
                            {link.name}
                            {/* Animated underline */}
                            <span
                                className={`absolute left-0 bottom-0 h-[2px] w-full bg-brand-red transition-opacity ease-in-out ${isActive
                                    ? 'opacity-100 duration-300'
                                    : 'opacity-0 duration-300 group-hover:duration-200 group-hover:opacity-100'
                                    }`}
                            />
                        </Link>
                    )
                })}
            </nav>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden text-white hover:text-brand-red transition p-2"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={28} /> : <List size={28} />}
            </button>

            {/* Mobile Menu Overlay */}
            <div
                className={`absolute top-full left-0 right-0 bg-black/80 backdrop-blur-md border-b-10 border-brand-red mt-[0px] shadow-2xl md:hidden transition-all duration-300 ease-in-out origin-top ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
                    }`}
            >
                <nav className="flex flex-col text-center divide-y divide-white/10 uppercase font-conthrax text-lg">
                    {navLinks.map((link) => {
                        const isCurrent = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href))
                        const isActive = isCurrent || pendingPath === link.href

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleNavigation(e, link.href)}
                                className={`relative p-6 transition-colors duration-300 overflow-hidden ${isActive ? 'text-white' : 'text-neutral-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <span className="relative z-10">{link.name}</span>
                                {/* Animated active background and border */}
                                <span
                                    className={`absolute inset-0 bg-white/5 border-l-4 border-brand-red transition-opacity duration-300 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'
                                        }`}
                                />
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </>
    )
}
