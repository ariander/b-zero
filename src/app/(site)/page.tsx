import Link from 'next/link'
import { ArrowRight, Info, RocketLaunch, CalendarCheck } from '@phosphor-icons/react/dist/ssr'
import { HomeHero } from '@/components/HomeHero'
import { getLatestPost, getUpcomingRaces } from '@/sanity/lib/client'
import Image from 'next/image'

export const revalidate = 60; // Revalidate at most every 60 seconds

export default async function Home() {
  const latestPost = await getLatestPost()
  const upcomingRaces = await getUpcomingRaces()

  return (
    <div className="bg-slate-100 min-h-screen">
      <HomeHero upcomingRacing={upcomingRaces?.racing} upcomingRally={upcomingRaces?.rally} />

      {/* Intro Cards Section */}
      <section className="max-w-6xl mx-auto px-6 py-6 md:py-20">
        <div className="grid md:grid-cols-3 gap-4 md:gap-8">
          <div className="group relative bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:-translate-y-1 hover:shadow-lg transition duration-300">
            <Link href="/reglement" className="absolute inset-0 z-10">
              <span className="sr-only">Les Reglement: Hva er B-Zero?</span>
            </Link>
            <Info size={48} weight="fill" className="text-slate-600 mb-6" />
            <h2 className="text-2xl text-slate-800 font-conthrax mb-3 transition-colors">Hva er B-Zero?</h2>
            <p className="text-slate-600 mb-6 relative z-0">Norges garantert billigste bilsportgren. Maksimer kjøregleden og adrenalinet med lette biler og tett racing på asfalt!</p>
            <span className="text-slate-600 font-bold flex items-center gap-2 group-hover:text-brand-red transition uppercase tracking-wider text-sm relative z-0">
              Les Reglement <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          <div className="group relative bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:-translate-y-1 hover:shadow-lg transition duration-300">
            <Link href="/sesonger" className="absolute inset-0 z-10">
              <span className="sr-only">Se Terminliste: Løp / Terminliste</span>
            </Link>
            <CalendarCheck size={48} weight="fill" className="text-slate-600 mb-6" />
            <h2 className="text-2xl text-slate-800 font-conthrax mb-3 transition-colors">Løp & Terminliste</h2>
            <p className="text-slate-600 mb-6 relative z-0">Følg med på når flagget faller neste gang, eller bla deg gjennom historikken og gallerier fra tidligere løp.</p>
            <span className="text-slate-600 font-bold flex items-center gap-2 group-hover:text-brand-red transition uppercase tracking-wider text-sm relative z-0">
              Se Terminliste <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
          </div>

          <div className="group relative bg-neutral-900 text-white p-8 rounded-3xl shadow-sm border border-slate-800 hover:-translate-y-1 hover:shadow-lg transition duration-300">
            <Link href="/kom-i-gang" className="absolute inset-0 z-10">
              <span className="sr-only">Slik gjør du det: Kom i gang</span>
            </Link>
            <RocketLaunch size={48} weight="fill" className="text-brand-red mb-6" />
            <h2 className="text-2xl font-conthrax mb-3 text-slate-200 group-hover:text-brand-red transition-colors">Kom i gang</h2>
            <p className="text-slate-200 mb-6 relative z-0">Alt du trenger å vite om å bygge bil, lisenser, utstyr og hvordan du kaster deg med i karusellen.</p>
            <span className="text-white font-bold flex items-center gap-2 group-hover:text-brand-red transition uppercase tracking-wider text-sm relative z-0">
              Slik gjør du det <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="bg-slate-200 py-12 md:py-20 border-y border-slate-300">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-3xl font-conthrax uppercase tracking-wider text-slate-800">Siste Nytt fra Depotet</h2>
            <Link href="/nyheter" className="hidden sm:flex text-slate-600 font-bold items-center gap-2 hover:text-slate-800 transition group uppercase tracking-wider text-sm">
              Se alle nyheter <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {latestPost ? (
            <Link href={`/nyheter/${latestPost.slug.current}`} className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-500 border border-slate-200">
              <div className="flex flex-col md:flex-row">
                {latestPost.mainImage?.asset?.url ? (
                  <div className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto overflow-hidden">
                    <Image
                      src={latestPost.mainImage.asset.url}
                      alt={latestPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-700"
                    />
                  </div>
                ) : (
                  <div className="w-full md:w-1/2 bg-slate-800 flex items-center justify-center p-12">
                    <Image src="/B-ZERO-logo.svg" alt="B-Zero" width={200} height={60} className="opacity-20" />
                  </div>
                )}
                <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
                  <time dateTime={latestPost.publishedAt} className="text-sm font-bold text-slate-500 tracking-widest uppercase mb-4 block">
                    {new Date(latestPost.publishedAt).toLocaleDateString('no-NB', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <h3 className="text-3xl md:text-4xl font-conthrax text-slate-800 mb-6 transition-colors">
                    {latestPost.title}
                  </h3>
                  <p className="text-slate-600 text-lg mb-8 line-clamp-3">
                    {latestPost.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-slate-600 font-bold uppercase tracking-wider group-hover:text-brand-red transition">
                    Les saken <ArrowRight weight="bold" className="group-hover:translate-x-2 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ) : (
            <div className="bg-white p-12 rounded-3xl text-center shadow-sm border border-slate-200">
              <p className="text-slate-500 italic text-lg">Akkurat nå er det stille i garasjen...</p>
            </div>
          )}

          <Link href="/nyheter" className="sm:hidden mt-8 text-blue-600 font-bold flex items-center justify-center gap-2 hover:text-blue-800 transition uppercase tracking-wider text-sm">
            Se alle nyheter <ArrowRight />
          </Link>
        </div>
      </section>

      {/* Partners / Sponsors Section */}
      <section className="py-24 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-xl font-conthrax uppercase tracking-wider text-slate-400 mb-12">I samarbeid med</h2>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 lg:gap-20">

          <Link href="https://www.glittertind.no/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-all duration-300">
            <Image src="/partners/glittertind.png" alt="Glittertind" width={200} height={80} className="object-contain max-h-12 md:max-h-16 w-auto" />
          </Link>

          <div className="hover:scale-110 transition-all duration-300 cursor-default">
            <Image src="/partners/innreguleringas.png" alt="Innregulering AS" width={220} height={80} className="object-contain max-h-12 md:max-h-16 w-auto bg-white/10 rounded-lg p-4" />
          </div>

          <Link href="https://www.nankang-tyre.com/en" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-all duration-300">
            <Image src="/partners/nankang.png" alt="Nankang Tyres" width={180} height={80} className="object-contain max-h-12 md:max-h-16 w-auto" />
          </Link>

          <Link href="https://rpcwebshop.no" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-all duration-300">
            <Image src="/partners/rpcwebshop.png" alt="RPC Webshop" width={180} height={80} className="object-contain max-h-12 md:max-h-16 w-auto" />
          </Link>

        </div>
      </section>

    </div>
  )
}
