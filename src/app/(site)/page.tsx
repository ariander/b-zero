import Link from 'next/link'
import { ArrowRight, Info, RocketLaunch, CalendarCheck } from '@phosphor-icons/react/dist/ssr'
import { HomeHero } from '@/components/HomeHero'
import { getLatestPosts, getUpcomingRaces, getCurrentYearRaces, getCalendarYear } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import YearTimeline from '@/components/YearTimeline'

export const revalidate = 3600; // Safety-net; ekte oppdateringer skjer via Sanity webhook (on-demand revalidation)

export default async function Home() {
  const latestPosts = await getLatestPosts(4)
  const upcomingRaces = await getUpcomingRaces()

  // Fetch and split target year's races (2027)
  const calendarYear = await getCalendarYear()
  const currentYearRaces = await getCurrentYearRaces(calendarYear)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const racingRaces = currentYearRaces.filter((r: any) => r.raceCategory === 'racing' || !r.raceCategory)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rallyRaces = currentYearRaces.filter((r: any) => r.raceCategory === 'rally')

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

      {/* Race Calendars Section */}
      <section className="bg-slate-900 py-10 md:py-14 border-y border-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
            <h2 className="text-2xl md:text-3xl font-conthrax uppercase tracking-wider text-white">Løpskalender {calendarYear}</h2>
            <Link href="/sesonger" className="text-slate-400 font-bold flex items-center gap-2 hover:text-white transition group uppercase tracking-wider text-sm">
              Full terminliste <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <YearTimeline races={racingRaces} year={calendarYear} title={`Racing ${calendarYear}`} hideSubheadings={true} compact />
            <YearTimeline races={rallyRaces} year={calendarYear} title={`Rally ${calendarYear}`} hideSubheadings={true} compact />
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="bg-slate-200 py-12 md:py-20 border-b border-slate-300">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-conthrax uppercase tracking-wider text-slate-800 mb-8 md:mb-10">Siste Nytt fra Depotet</h2>

          {latestPosts && latestPosts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {latestPosts.map((post: any, i: number) => {
                const featured = i === 0
                return (
                  <Link
                    key={post._id}
                    href={`/nyheter/${post.slug.current}`}
                    className={`group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 border border-slate-200 ${featured ? 'md:col-span-3 md:flex-row' : ''}`}
                  >
                    {post.mainImage?.asset?.url ? (
                      <div className={`relative w-full aspect-[16/10] overflow-hidden ${featured ? 'md:w-1/2 md:aspect-auto md:min-h-[360px]' : ''}`}>
                        <Image
                          src={urlFor(post.mainImage).width(featured ? 1200 : 800).auto('format').url()}
                          alt={post.title}
                          fill
                          sizes={featured ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 33vw, 100vw'}
                          priority={featured}
                          className="object-cover group-hover:scale-105 transition duration-700"
                          style={post.mainImage?.hotspot ? {
                            objectPosition: `${post.mainImage.hotspot.x * 100}% ${post.mainImage.hotspot.y * 100}%`
                          } : undefined}
                        />
                      </div>
                    ) : (
                      <div className={`w-full aspect-[16/10] bg-slate-800 flex items-center justify-center p-8 ${featured ? 'md:w-1/2 md:aspect-auto md:min-h-[360px]' : ''}`}>
                        <Image src="/B-ZERO-logo.svg" alt="B-Zero" width={featured ? 200 : 160} height={featured ? 60 : 48} className="opacity-20" unoptimized />
                      </div>
                    )}
                    <div className={`flex flex-col flex-1 ${featured ? 'p-6 md:p-12 md:w-1/2 md:justify-center' : 'p-6'}`}>
                      <time dateTime={post.publishedAt} className={`font-bold text-slate-500 tracking-widest uppercase block ${featured ? 'text-xs md:text-sm mb-3 md:mb-4' : 'text-xs mb-3'}`}>
                        {new Date(post.publishedAt).toLocaleDateString('no-NB', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      <h3 className={`font-conthrax text-slate-800 transition-colors ${featured ? 'text-lg md:text-3xl mb-3 md:mb-6' : 'text-lg mb-3 line-clamp-3'}`}>
                        {post.title}
                      </h3>
                      <p className={`text-slate-600 line-clamp-3 ${featured ? 'mb-6 md:text-lg md:mb-8' : 'mb-6'}`}>
                        {post.excerpt}
                      </p>
                      <span className={`inline-flex items-center gap-2 text-slate-600 font-bold uppercase tracking-wider text-sm group-hover:text-brand-red transition ${featured ? 'mt-auto md:mt-0' : 'mt-auto'}`}>
                        Les saken <ArrowRight weight="bold" className="group-hover:translate-x-2 transition-transform" />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl text-center shadow-sm border border-slate-200">
              <p className="text-slate-500 italic text-lg">Akkurat nå er det stille i garasjen...</p>
            </div>
          )}

          <div className="mt-8 flex justify-center md:justify-end">
            <Link href="/nyheter" className="text-slate-600 font-bold flex items-center gap-2 hover:text-brand-red transition group uppercase tracking-wider text-sm">
              Se alle nyheter <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partners / Sponsors Section */}
      <section className="py-24 max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-xl font-conthrax uppercase tracking-wider text-slate-400 mb-12">I samarbeid med</h2>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 lg:gap-20">

          <Link href="https://www.glittertind.no/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-all duration-300">
            <Image src="/partners/glittertind.avif" alt="Glittertind" width={320} height={200} className="object-contain max-h-16 md:max-h-20 w-auto" unoptimized />
          </Link>

          <div className="hover:scale-110 transition-all duration-300 cursor-default">
            <Image src="/partners/innreguleringas.avif" alt="Innregulering AS" width={220} height={80} className="object-contain max-h-14 md:max-h-20 w-auto bg-white/10 rounded-lg p-4" unoptimized />
          </div>

          <Link href="https://www.nankang-tyre.com/en" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-all duration-300">
            <Image src="/partners/nankang.avif" alt="Nankang Tyres" width={180} height={80} className="object-contain max-h-5 md:max-h-7 w-auto" unoptimized />
          </Link>

          <Link href="https://rpcwebshop.no" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-all duration-300">
            <Image src="/partners/rpcwebshop.avif" alt="RPC Webshop" width={180} height={80} className="object-contain max-h-8 md:max-h-13 w-auto" unoptimized />
          </Link>

        </div>
      </section>

    </div>
  )
}
