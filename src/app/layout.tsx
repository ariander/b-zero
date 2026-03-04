import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { Navigation } from '@/components/Navigation'

const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo' })

const conthrax = localFont({
  src: './fonts/Conthrax-SemiBold.otf',
  variable: '--font-conthrax',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.b-zeroracing.com'),
  title: 'B-Zero Racing',
  description: 'Norges råeste og billigste racing- og rallyklasse.',
  openGraph: {
    title: 'B-Zero Racing',
    description: 'Norges råeste og billigste racing- og rallyklasse.',
    siteName: 'B-Zero Racing',
    images: [
      {
        url: '/C1-24h-190428-146.JPG',
        width: 1200,
        height: 630,
        alt: 'B-Zero Racing',
      }
    ],
    locale: 'nb_NO',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="no">
      <body className={`${archivo.variable} ${conthrax.variable} font-sans bg-slate-100 text-slate-800 min-h-screen flex flex-col`}>
        <header className="bg-black text-white py-4 shadow-md sticky top-0 z-50 border-b-[10px] border-brand-red">
          <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image
                src="/B-ZERO-logo.svg"
                alt="B-Zero Racing Logo"
                width={75}
                height={20}
                className="h-6 w-auto"
              />
            </Link>
            <Navigation />
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
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
                />
              </Link>
              <p className="max-w-sm text-neutral-500 leading-relaxed">
                Norges billigste og mest underholdende racing- og rallyklasse. Bygg en bil, still til start, og kjenn på ekte racingglede!
              </p>
            </div>

            <div>
              <h3 className="text-white font-conthrax text-lg mb-6 uppercase tracking-wider">Snarveier</h3>
              <ul className="space-y-4 font-semibold">
                <li><Link href="/kom-i-gang" className="hover:text-brand-red transition flex items-center gap-2"><ArrowRight size={14} className="text-neutral-600" /> Kom i gang</Link></li>
                <li><Link href="/reglement" className="hover:text-brand-red transition flex items-center gap-2"><ArrowRight size={14} className="text-neutral-600" /> Teknisk Reglement</Link></li>
                <li><Link href="/arskontrollorer" className="hover:text-brand-red transition flex items-center gap-2"><ArrowRight size={14} className="text-neutral-600" /> Finn Årskontrollør</Link></li>
                <li><Link href="/sesonger" className="hover:text-brand-red transition flex items-center gap-2"><ArrowRight size={14} className="text-neutral-600" /> Terminliste</Link></li>
                <li><Link href="/skjerm" className="hover:text-brand-red transition flex items-center gap-2"><ArrowRight size={14} className="text-neutral-600" /> Stand/Skjermvisning</Link></li>
                <li><a href="https://rpcwebshop.no" target="_blank" rel="noreferrer" className="hover:text-brand-red transition flex items-center gap-2"><ArrowRight size={14} className="text-neutral-600" /> RPC Webshop</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-conthrax text-lg mb-6 uppercase tracking-wider">Kontakt</h3>
              <p className="mb-4 text-neutral-200">
                Spørsmål om klassen eller regelverket?
              </p>
              <a href="https://www.facebook.com/groups/bzermotorsport/" target="_blank" rel="noreferrer" className="inline-block bg-[#1877F2] hover:bg-[#1864c9] text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-sm">
                Følg oss på Facebook
              </a>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-6 mt-16 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600 font-medium">
            <p>© {new Date().getFullYear()} B-Zero Racing Norge. Med forbehold om feil.</p>
            <Link href="/studio" className="hover:text-neutral-400 transition mt-4 md:mt-0">Sanity Login</Link>
          </div>
        </footer>
      </body>
    </html>
  )
}
