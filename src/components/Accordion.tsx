'use client'

import { useState } from 'react'
import { CaretDown } from '@phosphor-icons/react'

interface AccordionItemProps {
    title: string
    children: React.ReactNode
    isOpen?: boolean
}

export function AccordionItem({ title, children, isOpen: defaultOpen = false }: AccordionItemProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    return (
        <div className="border border-slate-200 rounded-2xl mb-4 overflow-hidden bg-white shadow-sm transition-all hover:border-slate-300">
            <button
                className="w-full flex items-center justify-between p-5 text-left bg-slate-50 hover:bg-slate-100 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className="font-bold text-slate-900">{title}</span>
                <CaretDown
                    size={20}
                    className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
            >
                <div className="overflow-hidden">
                    <div className="p-6 border-t border-slate-100 text-slate-700 font-light [&_p]:mb-4 last:[&_p]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 last:[&_ul]:mb-0 [&_li]:mb-2 last:[&_li]:mb-0 [&_strong]:font-semibold [&_em]:italic">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
