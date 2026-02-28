import { getDriverBySlug } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, User, CalendarCheck, Wrench, FlagCheckered } from "@phosphor-icons/react/dist/ssr";
import { CustomPortableText } from "@/components/CustomPortableText";

export const revalidate = 60; // Revalidate at most every 60 seconds
import { urlFor } from "@/sanity/lib/image";

export default async function DriverPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const driver = await getDriverBySlug(resolvedParams.slug);

    if (!driver) {
        notFound();
    }

    return (
        <article className="pb-24">
            {/* Header / Hero Section */}
            <div className="relative w-full h-[50vh] min-h-[400px] flex items-end justify-center -mb-12 z-0 overflow-hidden bg-neutral-900">
                {driver.carImage?.asset?._ref || driver.carImage?.asset?.url ? (
                    <div className="absolute inset-0">
                        <Image
                            src={driver.carImage.asset.url || urlFor(driver.carImage).url()}
                            alt={driver.carImage.alt || `Bilen til ${driver.name}`}
                            fill
                            priority
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/50 to-transparent bg-blend-multiply" />
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-slate-800" />
                )}

                {/* Gigantic Start Number Watermark */}
                {driver.startNumber && (
                    <div className="absolute inset-0 max-w-6xl mx-auto flex items-end justify-end p-6 md:p-12 z-0 pointer-events-none opacity-[0.6] mix-blend-overlay overflow-hidden">
                        <span className="text-[250px] md:text-[500px] font-conthrax tracking-tighter text-white leading-none whitespace-nowrap select-none md:translate-y-24 md:translate-x-12">
                            {driver.startNumber}
                        </span>
                    </div>
                )}

                <div className="relative z-20 w-full max-w-6xl mx-auto px-6 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="flex-1">
                        <Link href="/sjaforer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-conthrax text-sm tracking-wider uppercase transition-all hover:bg-white/20 hover:border-white/40 group mb-6 relative z-30">
                            <ArrowLeft weight="bold" className="transition-transform group-hover:-translate-x-1" /> Sjåfører & Team
                        </Link>

                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="bg-brand-red text-white px-3 py-1 rounded-sm font-conthrax text-xs tracking-widest uppercase shadow-md">
                                B-Zero Sjåfør
                            </span>
                            {driver.startNumber && (
                                <span className="bg-slate-800 text-white px-3 py-1 rounded-sm font-conthrax text-xs tracking-widest uppercase shadow-md border border-slate-700">
                                    Startnummer: {driver.startNumber}
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-conthrax text-white drop-shadow-xl leading-tight">
                            {driver.name}
                        </h1>
                    </div>

                    {/* Profile Image floating over the hero bottom edge */}
                    <div className="shrink-0 hidden md:block w-48 aspect-4/5 rounded-2xl overflow-hidden border-slate-900 shadow-xl bg-slate-800 relative z-20">
                        {driver.profileImage?.asset?._ref || driver.profileImage?.asset?.url ? (
                            <Image
                                src={driver.profileImage.asset.url || urlFor(driver.profileImage).width(400).height(500).url()}
                                alt={driver.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-100">
                                <User size={64} className="text-slate-300" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-3 gap-12 md:mt-12 relative z-10">

                {/* Mobile Profile Image (Visible only on small screens) */}
                <div className="md:hidden flex justify-center -mt-24 relative z-20 mb-4">
                    <div className="w-40 aspect-4/5 rounded-2xl overflow-hidden border-4 border-slate-900 shadow-xl bg-slate-800 relative">
                        {driver.profileImage?.asset?._ref || driver.profileImage?.asset?.url ? (
                            <Image
                                src={driver.profileImage.asset.url || urlFor(driver.profileImage).width(400).height(500).url()}
                                alt={driver.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-100">
                                <User size={48} className="text-slate-300" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Bio Section */}
                    <section className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex items-center gap-4 mb-8 border-b-2 border-slate-100 pb-4">
                            <div className="bg-blue-50 text-blue-600 p-3 rounded-xl hidden md:block">
                                <User size={28} weight="fill" />
                            </div>
                            <h2 className="text-3xl font-conthrax uppercase tracking-wider text-slate-900">
                                Om {driver.name.split(' ')[0]}
                            </h2>
                        </div>

                        {driver.bio ? (
                            <div className="prose prose-slate max-w-none prose-headings:font-conthrax prose-headings:uppercase prose-p:text-lg prose-p:leading-relaxed">
                                <CustomPortableText value={driver.bio} />
                            </div>
                        ) : (
                            <div className="bg-slate-50 border border-slate-100 p-8 rounded-xl text-center">
                                <p className="text-slate-500 italic text-lg opacity-80">
                                    Ingen biografi lagt til for sjåføren enda.
                                </p>
                            </div>
                        )}
                    </section>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    {/* Fast Facts Card */}
                    <section className="bg-slate-900 text-white p-8 rounded-2xl shadow-md">
                        <h2 className="text-2xl font-conthrax uppercase tracking-wider mb-8 text-white border-b border-slate-700 pb-4">
                            Sjåførinfo
                        </h2>

                        <div className="space-y-6">
                            {driver.carMake && (
                                <div className="flex items-start gap-4">
                                    <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-blue-400 shrink-0">
                                        <Wrench size={24} weight="fill" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Kjøretøy</h3>
                                        <p className="font-conthrax text-lg text-white">{driver.carMake}</p>
                                    </div>
                                </div>
                            )}

                            {driver.debutYear && (
                                <div className="flex items-start gap-4">
                                    <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-green-400 shrink-0">
                                        <CalendarCheck size={24} weight="fill" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Debutår</h3>
                                        <p className="font-conthrax text-lg text-white">{driver.debutYear}</p>
                                    </div>
                                </div>
                            )}

                            {driver.startNumber && (
                                <div className="flex items-start gap-4">
                                    <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-brand-red shrink-0">
                                        <FlagCheckered size={24} weight="fill" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Startnummer</h3>
                                        <p className="font-conthrax text-xl text-white">{driver.startNumber}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </article>
    );
}
