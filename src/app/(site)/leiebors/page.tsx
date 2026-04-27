import { getRentals } from '@/sanity/lib/client';
import { CustomPortableText } from '@/components/CustomPortableText';
import Image from 'next/image';
import Link from 'next/link';
import { EnvelopeSimple, Phone, CarProfile, CalendarBlank, Tag, Plus, FlagCheckered } from '@phosphor-icons/react/dist/ssr';
import { ImageGallery } from '@/components/ImageGallery';
import { ObfuscatedEmail } from '@/components/ObfuscatedEmail';

export const metadata = {
    title: 'Leiebørs | B-Zero Racing',
    description: 'Har du lyst til å prøve B-Zero? Her finner du biler og seter til leie for løp eller testing.',
};

export default async function LeieborsPage() {
    const rentals = await getRentals();

    return (
        <div className="bg-slate-100 min-h-screen pb-24">
            <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop"
                    alt="Racing Car"
                    fill
                    className="object-cover object-center z-0 opacity-20 mix-blend-luminosity"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-b from-slate-900/50 via-slate-900/80 to-slate-900 z-0" />
                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <CarProfile size={64} className="text-brand-red mx-auto mb-6" />
                    <h1 className="text-2xl md:text-4xl font-conthrax uppercase tracking-wider mb-6">Leiebørs</h1>
                    <p className="text-xl text-slate-300 font-light leading-relaxed mb-12">
                        Lyst til å prøve B-Zero? Her finner du biler og seter til leie for sesongen, enkeltløp eller testing.
                    </p>
                    <Link href="/leiebors/ny" className="inline-flex items-center gap-2 bg-brand-red hover:bg-red-700 text-white font-conthrax tracking-wider uppercase px-8 py-4 rounded-xl transition-all shadow-lg shadow-brand-red/20 hover:scale-105">
                        <Plus size={20} weight="bold" /> Lag annonse
                    </Link>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 mt-16">
                <h2 className="text-3xl font-conthrax text-slate-900 uppercase tracking-wider border-b border-slate-400 pb-4 mb-12">
                    Tilgjengelige Biler
                </h2>

                {rentals.length === 0 ? (
                    <div className="bg-slate-50 rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
                        <CarProfile size={64} className="mx-auto text-slate-400 mb-6" />
                        <h3 className="text-2xl font-conthrax uppercase tracking-wider text-slate-800 mb-2">Ingen biler ute til leie akkurat nå</h3>
                        <p className="text-slate-600 text-lg">Kom tilbake senere, eller legg ut din egen bil hvis du har en ledig!</p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {rentals.map((rental: any) => (
                            <article key={rental._id} className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                                {rental.images && rental.images.length > 0 && (
                                    <ImageGallery images={rental.images} title={rental.title} raceCategory={rental.raceCategory} />
                                )}
                                <div className="p-4 md:p-10">
                                    <h3 className="text-2xl md:text-4xl font-conthrax uppercase tracking-wider text-slate-900 mb-6">{rental.title}</h3>

                                    <div className="flex flex-wrap gap-4 mb-8">
                                        {rental.carInfo && (
                                            <span className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-sm font-medium border border-slate-200">
                                                <CarProfile size={20} /> {rental.carInfo}
                                            </span>
                                        )}
                                        {rental.availability && (
                                            <span className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-medium border border-blue-100">
                                                <CalendarBlank size={20} /> {rental.availability}
                                            </span>
                                        )}
                                        {rental.price && (
                                            <span className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl text-sm font-medium border border-green-100">
                                                <Tag size={20} /> {rental.price}
                                            </span>
                                        )}
                                    </div>

                                    {rental.description && (
                                        <div className="prose prose-slate prose-lg max-w-none mb-10 border-l-4 border-slate-200 pl-6">
                                            <CustomPortableText value={rental.description} />
                                        </div>
                                    )}

                                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div>
                                            <h4 className="text-sm font-conthrax uppercase tracking-wider text-slate-500 mb-2">Kontakt Eier</h4>
                                            <p className="text-xl font-bold text-slate-900 mb-1">{rental.contactName}</p>
                                            {rental.contactPhone && (
                                                <a href={`tel:${rental.contactPhone}`} className="flex items-center gap-2 text-slate-600 hover:text-brand-red transition-colors font-medium">
                                                    <Phone size={20} /> {rental.contactPhone}
                                                </a>
                                            )}
                                        </div>
                                        <a
                                            href={`mailto:${rental.contactEmail}?subject=Interessert i å leie: ${rental.title}`}
                                            className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-red-600 text-white font-conthrax tracking-wider uppercase py-3 px-6 text-sm md:py-4 md:px-8 md:text-base rounded-xl transition-all shadow-lg hover:shadow-xl"
                                        >
                                            <EnvelopeSimple size={24} className="w-5 h-5 md:w-6 md:h-6" /> Send e-post
                                        </a>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                <div className="mt-16 bg-slate-200/50 rounded-2xl p-8 text-center text-slate-600 border border-slate-300">
                    <p>
                        Ønsker du å endre eller fjerne annonsen din? <br className="md:hidden" />
                        Send en epost til <ObfuscatedEmail user="arild.andersen" domain="gmail.com" className="font-semibold text-brand-red hover:underline" />.
                    </p>
                </div>
            </div>
        </div>
    );
}
