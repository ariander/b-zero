import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, FacebookLogo, YoutubeLogo } from '@phosphor-icons/react/dist/ssr'
import { Navigation } from '@/components/Navigation'
// import { MerchBanner } from '@/components/MerchBanner'  // midlertidig skjult

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <header className="bg-black text-white py-4 shadow-md sticky top-0 z-50 border-b-[10px] border-brand-red">
          <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image
                src="/B-ZERO-logo.svg"
                alt="B-Zero Racing Logo"
                width={75}
                height={20}
                className="h-6 w-auto"
                unoptimized
              />
            </Link>
            <Navigation />
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
        {/* <MerchBanner /> */}{/* midlertidig skjult */}
        <footer className="bg-neutral-900 text-neutral-400 py-16 mt-auto border-t border-neutral-800">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-12 text-sm">
            <div className="md:col-span-2">
              <Link href="/">
                <Image
                  src="/B-ZERO-logo.svg"
                  alt="B-Zero Racing Logo"
                  width={200}
                  height={53}
                  className="h-6 w-auto mb-6 opacity-80 hover:opacity-100 transition-opacity"
                  unoptimized
                />
              </Link>
              <p className="max-w-sm text-neutral-500 leading-relaxed mb-8">
                Norges billigste og mest underholdende racing- og rallyklasse. Bygg en bil, still til start, og kjenn på ekte racingglede!
              </p>

              <div>
                <h3 className="text-white font-conthrax text-sm mb-4 uppercase tracking-wider">Verktøy</h3>
                <ul className="space-y-3 font-semibold">
                  <li><Link href="/arskontrollorer" className="hover:text-brand-red transition flex items-center gap-2"><ArrowRight size={14} className="text-neutral-600" /> Finn Årskontrollør</Link></li>
                  <li><Link href="/sunstrip" className="hover:text-brand-red transition flex items-center gap-2"><ArrowRight size={14} className="text-neutral-600" /> Solstripegenerator</Link></li>
                  <li><Link href="/skjerm" className="hover:text-brand-red transition flex items-center gap-2"><ArrowRight size={14} className="text-neutral-600" /> Stand/Skjermvisning</Link></li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-white font-conthrax text-lg mb-6 uppercase tracking-wider">Snarveier</h3>
              <ul className="space-y-4 font-semibold">
                <li><Link href="/kom-i-gang" className="hover:text-brand-red transition flex items-center gap-2"><ArrowRight size={14} className="text-neutral-600" /> Kom i gang</Link></li>
                <li><Link href="/leiebors" className="hover:text-brand-red transition flex items-center gap-2"><ArrowRight size={14} className="text-neutral-600" /> Prøv en B-Zero</Link></li>
                <li><Link href="/reglement" className="hover:text-brand-red transition flex items-center gap-2"><ArrowRight size={14} className="text-neutral-600" /> Teknisk Reglement</Link></li>
                <li><Link href="/baerekraft" className="hover:text-green-500 transition flex items-center gap-2"><ArrowRight size={14} className="text-neutral-600" /> Bærekraftig Racing</Link></li>
                <li><Link href="/sesonger" className="hover:text-brand-red transition flex items-center gap-2"><ArrowRight size={14} className="text-neutral-600" /> Terminliste</Link></li>
                <li><a href="https://rpcwebshop.no" target="_blank" rel="noreferrer" className="hover:text-brand-red transition flex items-center gap-2"><ArrowRight size={14} className="text-neutral-600" /> RPC Webshop</a></li>
                {/* <li><a href="https://bzero.myspreadshop.no" target="_blank" rel="noreferrer" className="hover:text-brand-red transition flex items-center gap-2"><ArrowRight size={14} className="text-neutral-600" /> B-Zero Merchandise</a></li> */}{/* midlertidig skjult */}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-conthrax text-lg mb-6 uppercase tracking-wider">Kontakt</h3>
              <p className="mb-4 text-neutral-200">
                Spørsmål om klassen eller regelverket?
              </p>
              <div className="flex flex-col gap-3 items-start">
                <a href="https://www.facebook.com/groups/bzermotorsport/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#1864c9] text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-sm">
                  <FacebookLogo size={20} weight="fill" />
                  Følg oss på Facebook
                </a>
                <a href="https://www.youtube.com/@bzeroracing" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#FF0000] hover:bg-[#cc0000] text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-sm">
                  <YoutubeLogo size={20} weight="fill" />
                  Følg oss på YouTube
                </a>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-6 mt-16 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600 font-medium">
            <p>© {new Date().getFullYear()} B-Zero Racing Norge. Med forbehold om feil.</p>
            <Link href="/studio" className="hover:text-neutral-400 transition mt-4 md:mt-0">Sanity Login</Link>
          </div>
        </footer>
    </>
  )
}
