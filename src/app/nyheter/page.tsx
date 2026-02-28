import { getPosts, getCurrentYearRaces } from "@/sanity/lib/client";
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Image as ImageIcon } from '@phosphor-icons/react/dist/ssr'
import { urlFor } from "@/sanity/lib/image";
import YearTimeline, { Race } from "@/components/YearTimeline";

export const revalidate = 60; // Revalidate at most every 60 seconds

// Define types based on our Sanity schema
interface Post {
    _id: string;
    title: string;
    slug: { current: string };
    publishedAt: string;
    excerpt: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mainImage?: any;
}

export default async function NyheterPage() {
    const posts: Post[] = await getPosts();
    // Use the Race interface for upcomingRaces to satisfy YearTimeline props
    const upcomingRaces: Race[] = await getCurrentYearRaces();

    // Group posts by year
    const groupedPosts = posts.reduce((acc: { [year: string]: Post[] }, post) => {
        const year = new Date(post.publishedAt).getFullYear().toString();
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(post);
        return acc;
    }, {});

    // Get sorted years (descending)
    const sortedYears = Object.keys(groupedPosts).sort((a, b) => parseInt(b) - parseInt(a));
    const currentYear = new Date().getFullYear();

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row gap-12">
                {/* Main Content: News */}
                <div className="flex-1">
                    <h1 className="text-4xl font-conthrax text-slate-100 mb-8 uppercase border-b-4 border-brand-red inline-block pb-2">
                        Siste Nytt
                    </h1>

                    {posts.length === 0 ? (
                        <p className="text-slate-500 italic bg-white p-6 rounded-xl border border-slate-200">Ingen nyheter publisert enda. Følg med!</p>
                    ) : (
                        <div className="space-y-16">
                            {sortedYears.map(year => (
                                <section key={year} className="relative w-full">
                                    <h2 className="text-3xl md:-mx-4 md:my-4  bg-slate-900/90 backdrop-blur border border-slate-600 mb-6 flex flex-col md:flex-row md:items-center rounded-2xl justify-between gap-4 relative md:sticky md:top-[82px] z-30 p-4 shadow-lg">
                                        <span className="text-white font-conthrax w-fit">{year}</span>
                                    </h2>
                                    <div className="space-y-6">
                                        {groupedPosts[year].map((post) => (
                                            <article key={post._id} className="group relative bg-white rounded-2xl shadow-sm border hover:shadow-md transition flex flex-col sm:flex-row overflow-hidden">
                                                <Link href={`/nyheter/${post.slug.current}`} className="absolute inset-0 z-10">
                                                    <span className="sr-only">Les hele saken: {post.title}</span>
                                                </Link>

                                                <div className="relative w-full sm:w-1/3 md:w-64 aspect-video sm:aspect-auto shrink-0 bg-slate-100 border-b sm:border-b-0 sm:border-r border-slate-200 overflow-hidden">
                                                    {post.mainImage?.asset?._id ? (
                                                        <Image
                                                            src={urlFor(post.mainImage).width(800).url()}
                                                            alt={post.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition duration-700"
                                                            style={post.mainImage?.hotspot ? {
                                                                objectPosition: `${post.mainImage.hotspot.x * 100}% ${post.mainImage.hotspot.y * 100}%`
                                                            } : undefined}
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                            <ImageIcon size={48} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 flex flex-col justify-center p-6 md:p-8">
                                                    <header className="mb-2">
                                                        <time dateTime={post.publishedAt} className="text-sm font-bold text-slate-500 tracking-wider uppercase">
                                                            {new Date(post.publishedAt).toLocaleDateString('no-NB', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </time>
                                                        <h3 className="text-2xl text-slate-900 font-conthrax mt-1 leading-tight group-hover:text-brand-red transition-colors">
                                                            {post.title}
                                                        </h3>
                                                    </header>
                                                    <p className="text-slate-600 mb-4 line-clamp-2">
                                                        {post.excerpt}
                                                    </p>
                                                    <div className="mt-auto">
                                                        <span className="inline-flex items-center gap-2 font-bold text-blue-600 group-hover:text-blue-800 transition text-sm uppercase tracking-wider">
                                                            Les hele saken <ArrowRight weight="bold" className="group-hover:translate-x-1 transition-transform" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sidebar: Events Calendar */}
                <aside className="hidden md:inline w-full md:w-80 shrink-0 sticky top-[82px] h-fit">
                    <YearTimeline races={upcomingRaces} year={currentYear} />
                </aside>
            </div>
        </div>
    );
}
