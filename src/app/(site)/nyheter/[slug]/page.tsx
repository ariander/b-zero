import { getPostBySlug } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import type { Metadata, ResolvingMetadata } from 'next';
import { CustomPortableText } from "@/components/CustomPortableText";

export const revalidate = 60; // Revalidate at most every 60 seconds

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const resolvedParams = await params;
    const post = await getPostBySlug(resolvedParams.slug);

    if (!post) {
        return {
            title: 'Nyhet ikke funnet | B-Zero Racing',
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const description = post.body?.filter((block: any) => block._type === 'block' && block.children).map((block: any) => block.children.map((child: any) => child.text).join('')).join(' ').substring(0, 160) || 'Les nyheten på B-Zero Racing.';

    const previousImages = (await parent).openGraph?.images || []
    const imageUrl = post.mainImage?.asset?.url

    return {
        title: `${post.title} | B-Zero Racing`,
        description: description + (description.length >= 160 ? '...' : ''),
        openGraph: {
            title: post.title,
            description: description + (description.length >= 160 ? '...' : ''),
            type: 'article',
            publishedTime: post.publishedAt,
            images: imageUrl ? [{ url: imageUrl }, ...previousImages] : previousImages,
        },
    }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const post = await getPostBySlug(resolvedParams.slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-neutral-950 pb-24">
            {/* Hero Section */}
            <div className="relative w-full h-[60vh] min-h-[400px] flex items-end justify-center -mb-12 z-0">
                {post.mainImage?.asset?.url ? (
                    <div className="absolute inset-0">
                        <Image
                            src={post.mainImage.asset.url}
                            alt={post.title}
                            fill
                            priority
                            className="object-cover"
                            style={
                                post.mainImage.hotspot
                                    ? {
                                        objectPosition: `${post.mainImage.hotspot.x * 100}% ${post.mainImage.hotspot.y * 100}%`,
                                    }
                                    : undefined
                            }
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-900/60 to-transparent bg-blend-multiply" />
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-slate-800" />
                )}

                <div className="relative z-20 w-full max-w-4xl mx-auto px-6 pb-12 mb-12">
                    <Link href="/nyheter" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-conthrax text-sm tracking-wider uppercase transition-all hover:bg-white/20 hover:border-white/40 group mb-6 relative z-30">
                        <ArrowLeft weight="bold" className="transition-transform group-hover:-translate-x-1" /> Alle nyheter
                    </Link>

                    <div className="flex items-center gap-3 text-brand-red font-conthrax text-xl md:text-2xl tracking-wider mb-2 drop-shadow-md">

                        <time dateTime={post.publishedAt}>
                            {new Date(post.publishedAt).toLocaleDateString('no-NB', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </time>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-conthrax text-white uppercase tracking-wider drop-shadow-lg">
                        {post.title}
                    </h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <section className="bg-white px-6 py-6 md:px-10 md:py-8 rounded-2xl shadow-sm border border-slate-200">
                    <div className="prose prose-slate max-w-none prose-headings:font-conthrax prose-headings:uppercase prose-p:text-lg prose-p:leading-relaxed">
                        <CustomPortableText value={post.body} />
                    </div>
                </section>

                {post.relatedRace && (
                    <div className="mt-12 bg-slate-900 rounded-2xl p-8 shadow-md border border-slate-800 text-center">
                        <h2 className="text-xl font-conthrax text-white uppercase tracking-wider mb-4">Gå til løpssiden</h2>
                        <p className="text-slate-400 mb-6">Denne artikkelen tilhører {post.relatedRace.title}. Gjennom løpssiden finner du resultater, galleri og all annen informasjon tilknyttet løpet.</p>
                        <Link href={`/sesonger/${post.relatedRace.slug.current}`} className="inline-flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white font-conthrax uppercase tracking-wider px-8 py-4 rounded-lg transition-colors shadow-sm">
                            Se løpsdetaljer
                        </Link>
                    </div>
                )}
            </div>
        </article>
    );
}
