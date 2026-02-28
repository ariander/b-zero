import { getRaceBySlug } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Images, Notebook, Link as LinkIcon, CaretRight, CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { CustomPortableText } from "@/components/CustomPortableText";
import type { Metadata, ResolvingMetadata } from 'next';
import { RaceGallery } from "@/components/RaceGallery";

export const revalidate = 60; // Revalidate at most every 60 seconds

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const resolvedParams = await params;
    const race = await getRaceBySlug(resolvedParams.slug);

    if (!race) {
        return {
            title: 'Løp ikke funnet | B-Zero Racing',
        }
    }

    let description = 'Informasjon om løp for B-Zero Racing.';
    if (race.report) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        description = race.report?.filter((block: any) => block._type === 'block' && block.children).map((block: any) => block.children.map((child: any) => child.text).join('')).join(' ').substring(0, 160);
    } else if (race.track?.name) {
        description = `Løp på ${race.track.name} i sesong ${race.season}.`;
    }

    const previousImages = (await parent).openGraph?.images || []
    const imageUrl = race.mainImage?.asset?.url || race.track?.thumbnail?.asset?.url

    return {
        title: `${race.title} | B-Zero Racing`,
        description: description + (description.length >= 160 ? '...' : ''),
        openGraph: {
            title: race.title,
            description: description + (description.length >= 160 ? '...' : ''),
            images: imageUrl ? [imageUrl, ...previousImages] : previousImages,
        },
    }
}

export default async function RacePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const race = await getRaceBySlug(resolvedParams.slug);

    if (!race) {
        notFound();
    }

    return (
        <article className="pb-24">
            {/* Header / Hero Section */}
            <div className="relative w-full h-[50vh] min-h-[400px] flex items-end justify-center -mb-12 z-0">
                {race.mainImage?.asset?.url ? (
                    <div className="absolute inset-0">
                        <Image
                            src={race.mainImage.asset.url}
                            alt={race.title}
                            fill
                            priority
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/50 to-transparent bg-blend-multiply" />
                    </div>
                ) : race.track?.thumbnail?.asset?.url ? (
                    <div className="absolute inset-0">
                        <Image
                            src={race.track.thumbnail.asset.url}
                            alt={race.track.name}
                            fill
                            priority
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-slate-800" />
                )}

                <div className="relative z-20 w-full max-w-6xl mx-auto px-6 pb-12 mb-12">
                    <Link href="/sesonger" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-conthrax text-sm tracking-wider uppercase transition-all hover:bg-white/20 hover:border-white/40 group mb-6 relative z-30">
                        <ArrowLeft weight="bold" className="transition-transform group-hover:-translate-x-1" /> Terminliste
                    </Link>

                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="bg-brand-red text-white px-3 py-1 rounded-sm font-conthrax text-xs tracking-widest uppercase shadow-md">
                            Sesong {race.season}
                        </span>
                        {race.raceCategory === 'rally' ? (
                            <span className="bg-amber-500 text-slate-900 px-3 py-1 rounded-sm font-conthrax text-xs tracking-widest uppercase shadow-md">
                                Rally
                            </span>
                        ) : (
                            <span className="bg-slate-200 text-slate-800 px-3 py-1 rounded-sm font-conthrax text-xs tracking-widest uppercase shadow-md">
                                Racing
                            </span>
                        )}
                        <span className="flex items-center gap-2 text-neutral-300 font-conthrax text-sm tracking-wider ml-auto">
                            <CalendarBlank size={18} />
                            {(() => {
                                const start = new Date(race.date);
                                const end = race.endDate ? new Date(race.endDate) : null;
                                const monthStr = start.toLocaleDateString('no-NB', { month: 'long' });
                                const year = start.getFullYear();

                                if (end && start.getTime() !== end.getTime()) {
                                    if (start.getMonth() === end.getMonth()) {
                                        // Samme måned, f.eks 18-19 april 2026
                                        return `${start.getDate()}–${end.getDate()} ${monthStr} ${year}`;
                                    } else {
                                        // Ulik måned, f.eks 30 august - 1 september 2026
                                        const endMonthStr = end.toLocaleDateString('no-NB', { month: 'long' });
                                        return `${start.getDate()} ${monthStr} – ${end.getDate()} ${endMonthStr} ${end.getFullYear()}`;
                                    }
                                }

                                // Én dag
                                return `${start.getDate()} ${monthStr} ${year}`;
                            })()}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-conthrax text-white uppercase tracking-wider drop-shadow-lg">
                        {race.title}
                    </h1>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-3 gap-12 relative z-10">
                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-16">
                    {/* Race Report */}
                    {race.report && (
                        <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200">
                            <div className="flex items-center gap-4 mb-8 border-b-2 border-slate-100 pb-4">
                                <div className="bg-blue-50 text-blue-600 p-3 rounded-xl">
                                    <Notebook size={28} weight="fill" />
                                </div>
                                <h2 className="text-3xl font-conthrax uppercase tracking-wider text-slate-900">
                                    {new Date(race.date) > new Date() ? "Beskrivelse" : "Løpsrapport"}
                                </h2>
                            </div>
                            <div className="prose prose-slate max-w-none prose-headings:font-conthrax prose-headings:uppercase prose-p:text-lg prose-p:leading-relaxed">
                                <CustomPortableText value={race.report} />
                            </div>
                        </section>
                    )}

                    {/* Gallery Section */}
                    {race.gallery && race.gallery.length > 0 && (
                        <section>
                            <div className="flex items-center gap-4 mb-8 border-b-2 border-slate-200 pb-4">
                                <div className="bg-brand-red/10 text-brand-red p-3 rounded-xl">
                                    <Images size={28} weight="fill" />
                                </div>
                                <h2 className="text-3xl font-conthrax uppercase tracking-wider text-slate-900">Galleri ({race.gallery.length})</h2>
                            </div>
                            <RaceGallery images={race.gallery} />
                        </section>
                    )}
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8 lg:sticky lg:top-24 self-start">
                    {/* Track Section */}
                    {race.track && (
                        <section className="bg-slate-100 text-slate-800 p-4 rounded-2xl shadow-md">
                            <div className="flex flex-col items-center justify-center text-center">
                                {(race.track.trackMap?.asset?.url || race.track.logo?.asset?.url) && (
                                    <>
                                        {race.track.trackMap?.asset?.url && (
                                            <div className="relative w-full aspect-square mb-0">
                                                <Image src={race.track.trackMap.asset.url} alt={`Banekart ${race.track.name}`} fill className="object-contain" />
                                            </div>
                                        )}
                                        {race.track.logo?.asset?.url && (
                                            <div className="relative w-3/4 h-24 px-16 mb-4 shrink-0">
                                                <Image src={race.track.logo.asset.url} alt={race.track.name} fill className="object-contain" />
                                            </div>
                                        )}
                                    </>
                                )}

                                {!race.track.logo?.asset?.url && (
                                    <h2 className="text-2xl font-conthrax uppercase tracking-wider text-brand-red mb-6">{race.track.name}</h2>
                                )}

                                {race.track.mapsLink && !race.track.mapsLink.includes('<iframe') && (
                                    <div className="w-full mt-2">
                                        <a href={race.track.mapsLink} target="_blank" rel="noopener noreferrer" className="w-full bg-white hover:bg-slate-50 text-slate-800 font-bold py-3 px-4 rounded-xl transition border border-slate-300 hover:border-slate-400 uppercase font-conthrax tracking-wider text-xs flex items-center justify-center gap-2 shadow-sm">
                                            Finn veien til banen
                                        </a>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Links Section */}
                    {((race.links && race.links.length > 0) || new Date(race.date) > new Date()) && (
                        <section className="bg-slate-900 text-white p-8 rounded-2xl shadow-md">
                            <div className="flex items-center gap-4 mb-8 border-b border-slate-700 pb-4">
                                <LinkIcon size={28} weight="bold" className="text-brand-red" />
                                <h2 className="text-2xl font-conthrax uppercase tracking-wider">Lenker & Filer</h2>
                            </div>

                            {race.links && race.links.length > 0 ? (
                                <ul className="space-y-4">
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    {race.links.map((link: any, idx: number) => {
                                        const url = link.fileUrl || link.url || "#";
                                        const isFacebook = url.toLowerCase().includes('facebook.com');

                                        return (
                                            <li key={idx}>
                                                <a
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`flex items-center justify-between p-4 rounded-xl font-semibold transition group border ${isFacebook
                                                        ? 'bg-blue-600 hover:bg-blue-700 border-blue-500 hover:border-blue-400 text-white shadow-md'
                                                        : 'bg-slate-800 hover:bg-slate-700 border-slate-700 hover:border-slate-500'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3 overflow-hidden">
                                                        {isFacebook && (
                                                            <div className="bg-white text-blue-600 rounded-full p-1 shrink-0">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                                                                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path>
                                                                </svg>
                                                            </div>
                                                        )}
                                                        <span className="truncate pr-4">{link.title}</span>
                                                    </div>
                                                    <CaretRight weight="bold" className={`${isFacebook ? 'text-white' : 'text-brand-red'} group-hover:translate-x-1 transition-transform shrink-0`} />
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <div className="bg-slate-800 p-6 rounded-xl text-center">
                                    <p className="text-slate-400 font-medium">Mer informasjon kommer så fort vi har det</p>
                                </div>
                            )}

                            {race.relatedPosts && race.relatedPosts.length > 0 && (
                                <div className="mt-8 pt-8 border-t border-slate-700">
                                    <h3 className="text-lg font-conthrax uppercase tracking-wider text-slate-300 mb-6">Siste nyhetsartikler for dette løpet</h3>
                                    <ul className="space-y-4">
                                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                        {race.relatedPosts.map((post: any, idx: number) => (
                                            <li key={idx}>
                                                <Link
                                                    href={`/nyheter/${post.slug.current}`}
                                                    className="flex items-center justify-between bg-slate-800 hover:bg-slate-700 p-4 rounded-xl font-semibold transition group border border-slate-700 hover:border-slate-500"
                                                >
                                                    <span className="truncate pr-4 text-sm text-slate-100">{post.title}</span>
                                                    <CaretRight weight="bold" className="text-brand-red group-hover:translate-x-1 transition-transform shrink-0" />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </section>
                    )}
                </div>
            </div>

            {/* Full-width Map Section at bottom if it's an iframe */}
            {race.track?.mapsLink?.includes('<iframe') && (
                <div className="max-w-6xl mx-auto px-6 mt-16 w-full">
                    <h2 className="text-2xl font-conthrax uppercase tracking-wider text-slate-100 flex items-center gap-4 mb-6"><LinkIcon size={24} className="text-brand-red" /> Finn veien til {race.track.name}</h2>
                    <div
                        className="w-full h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-md border border-slate-700/50 [&>iframe]:w-full [&>iframe]:h-full transition-all duration-700"
                        dangerouslySetInnerHTML={{ __html: race.track.mapsLink }}
                    />
                </div>
            )}
        </article>
    );
}
