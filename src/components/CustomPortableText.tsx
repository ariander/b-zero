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
                <div className="my-8 rounded-xl overflow-hidden relative w-full h-96 bg-slate-100">
                    <Image
                        src={urlFor(value).url()}
                        alt={value.alt || 'Bilde'}
                        fill
                        className="object-cover"
                    />
                </div>
            )
        },
    },
    block: {
        // Ex. 1: customizing common block types
        h1: ({ children }) => <h1 className="text-4xl font-bold mb-4 mt-8">{children}</h1>,
        h2: ({ children }) => <h2 className="text-3xl font-bold mb-4 mt-8 text-slate-900">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-bold mb-3 mt-6 text-slate-900">{children}</h3>,
        blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-500 pl-4 py-2 italic bg-slate-50 my-6 text-slate-700">{children}</blockquote>,
        normal: ({ children }) => <p className="mb-6 text-slate-600 leading-relaxed font-light">{children}</p>,
    },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CustomPortableText({ value }: { value: any }) {
    return (
        <div className="space-y-6 text-slate-600 leading-relaxed font-light">
            <PortableText value={value} components={components} />
        </div>
    )
}
