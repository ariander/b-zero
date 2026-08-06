'use client';

import { useMemo, useState } from 'react';
import { MagnifyingGlass, X } from '@phosphor-icons/react/dist/ssr';
import type { Row, Section } from './data';
import { buildCorpus, fuzzyMatch } from './fuzzy';

interface Block {
    headerIdx: number | null;
    indices: number[];
}

function groupIntoBlocks(rows: Row[]): Block[] {
    const blocks: Block[] = [];
    let active: Block | null = null;
    rows.forEach((row, i) => {
        if (row.header) {
            if (active) blocks.push(active);
            active = { headerIdx: i, indices: [] };
        } else if (row.indent && active) {
            active.indices.push(i);
        } else {
            if (active) {
                blocks.push(active);
                active = null;
            }
            blocks.push({ headerIdx: null, indices: [i] });
        }
    });
    if (active) blocks.push(active);
    return blocks;
}

function getVisibleRowIndices(rows: Row[], rowMatch: boolean[]): Set<number> {
    const visible = new Set<number>();
    for (const block of groupIntoBlocks(rows)) {
        const headerMatched = block.headerIdx !== null && rowMatch[block.headerIdx];
        const childMatched = block.indices.some((i) => rowMatch[i]);
        if (!headerMatched && !childMatched) continue;
        if (block.headerIdx !== null) visible.add(block.headerIdx);
        if (headerMatched) {
            block.indices.forEach((i) => visible.add(i));
        } else {
            block.indices.forEach((i) => {
                if (rowMatch[i]) visible.add(i);
            });
        }
    }
    return visible;
}

export default function TorqueSearch({ sections }: { sections: Section[] }) {
    const [query, setQuery] = useState('');

    const results = useMemo(() => {
        const q = query.trim();
        if (!q) {
            return sections.map((section) => ({
                section,
                visible: true,
                titleMatch: false,
                rowMatch: section.rows.map(() => false),
                visibleRows: new Set(section.rows.map((_, i) => i)),
            }));
        }
        return sections.map((section) => {
            const titleMatch = fuzzyMatch(q, buildCorpus(section.title));
            const rowMatch = section.rows.map((row) => fuzzyMatch(q, buildCorpus(row.label)));
            const visibleRows = titleMatch
                ? new Set(section.rows.map((_, i) => i))
                : getVisibleRowIndices(section.rows, rowMatch);
            const visible = titleMatch || visibleRows.size > 0;
            return { section, visible, titleMatch, rowMatch, visibleRows };
        });
    }, [query, sections]);

    const visibleCount = results.filter((r) => r.visible).length;

    return (
        <div>
            <div className="max-w-xl mx-auto text-center px-4 sm:px-0">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                    Finn frem til riktig bolt
                </p>
                <div className="relative w-full rounded-lg border border-slate-200 bg-white shadow-md focus-within:ring-2 focus-within:ring-slate-300 focus-within:border-slate-300 transition-shadow">
                    <MagnifyingGlass size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Søk, f.eks. clutch, eksos eller bremser..."
                        className="w-full rounded-lg bg-transparent pl-12 pr-11 py-3.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    />
                    {query && (
                        <button
                            onClick={() => setQuery('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                            aria-label="Tøm søk"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>

                {query && (
                    <p className="text-sm text-slate-500 mt-3">
                        {visibleCount === 0
                            ? 'Ingen treff. Prøv et annet søkeord.'
                            : `${visibleCount} av ${sections.length} områder viser treff.`}
                    </p>
                )}
            </div>

            <div className="columns-1 md:columns-2 gap-6 mt-8">
                {results.filter((r) => r.visible).map(({ section, visibleRows }) => (
                    <div key={section.title} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6 break-inside-avoid">
                        <h2 className="font-conthrax uppercase tracking-wider text-lg border-b-2 pb-3 mb-3 text-slate-900 border-slate-200">
                            {section.title}
                        </h2>
                        <div className="divide-y divide-slate-100">
                            {section.rows.map((row, i) => {
                                if (!visibleRows.has(i)) return null;
                                return row.header ? (
                                    <div key={i} className="pt-3 pb-1 text-sm font-semibold text-slate-800">
                                        {row.label}
                                    </div>
                                ) : (
                                    <div
                                        key={i}
                                        className={`flex items-baseline justify-between gap-4 py-1.5 text-sm ${row.indent ? 'pl-4' : ''}`}
                                    >
                                        <span className="text-slate-600">
                                            {row.label}
                                        </span>
                                        <span className="font-conthrax text-slate-900 whitespace-nowrap">
                                            {row.value} {row.value?.includes('°') ? '' : 'Nm'}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
