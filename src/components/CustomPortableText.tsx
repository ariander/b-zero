import { PortableText, type PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

const components: PortableTextComponents = {
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) {
                return null
            }
            return (
                <div className="my-8 rounded-xl overflow-hidden w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={urlFor(value).auto('format').url()}
                        alt={value.alt || 'Bilde'}
                        className="w-full h-auto"
                        style={
                            value.hotspot
                                ? {
                                    objectPosition: `${value.hotspot.x * 100}% ${value.hotspot.y * 100}%`,
                                }
                                : undefined
                        }
                    />
                </div>
            )
        },
        youtube: ({ value }: any) => {
            if (!value?.url) return null;

            let videoId = '';
            let startParam = '';

            try {
                const url = new URL(value.url);
                videoId = url.searchParams.get('v') || url.pathname.split('/').pop() || '';

                const t = url.searchParams.get('t');
                if (t) {
                    // YouTube uses '?start=SECONDS' for embeds
                    const parsedT = parseInt(t);
                    if (!isNaN(parsedT)) {
                        startParam = `?start=${parsedT}`;
                    }
                }
            } catch (e) {
                // Ignore invalid URLs
            }

            if (!videoId) return null;

            return (
                <div className="my-8 rounded-xl overflow-hidden w-full aspect-video shadow-lg">
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}${startParam}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full border-0"
                    />
                </div>
            )
        },
    },
    block: {
        h1: ({ children }) => <h1 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 mt-10 mb-4 normal-case">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-sans font-bold text-slate-900 mt-10 mb-4 normal-case">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl md:text-2xl font-sans font-semibold text-slate-900 mt-8 mb-3 normal-case">{children}</h3>,
        blockquote: ({ children }) => <blockquote className="border-l-4 border-brand-red pl-5 py-3 italic bg-slate-50 my-6 text-slate-700 rounded-r-lg">{children}</blockquote>,
        normal: ({ children }) => <p className="mb-6 text-slate-700 text-lg md:text-xl leading-relaxed">{children}</p>,
    },
    list: {
        bullet: ({ children }) => (
            <ul className="my-6 space-y-3 list-disc list-outside pl-6 text-slate-700 text-lg md:text-xl leading-relaxed">
                {children}
            </ul>
        ),
        number: ({ children }) => (
            <ol className="my-6 space-y-3 list-decimal list-outside pl-6 text-slate-700 text-lg md:text-xl leading-relaxed">
                {children}
            </ol>
        ),
    },
    listItem: {
        bullet: ({ children }) => (
            <li className="pl-1 leading-relaxed marker:text-brand-red">
                {children}
            </li>
        ),
        number: ({ children }) => (
            <li className="pl-1 leading-relaxed marker:font-bold marker:text-brand-red">
                {children}
            </li>
        ),
    },
    marks: {
        strong: ({ children }) => (
            <strong className="font-black text-slate-950 font-bold">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
        underline: ({ children }) => <span className="underline underline-offset-4">{children}</span>,
        'strike-through': ({ children }) => <span className="line-through">{children}</span>,
        code: ({ children }) => (
            <code className="bg-slate-100 text-brand-red px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
        ),
        link: ({ value, children }) => {
            const isExternal = (value?.href || '').startsWith('http');
            return (
                <a
                    href={value?.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="text-brand-red font-bold underline underline-offset-4 decoration-2 hover:text-red-700 transition-colors"
                >
                    {children}
                </a>
            );
        },
    },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CustomPortableText({ value, className }: { value: any; className?: string }) {
    return (
        <div className={`space-y-6 text-slate-700 leading-relaxed text-lg md:text-xl ${className || ''}`}>
            <PortableText value={value} components={components} />
        </div>
    )
}
