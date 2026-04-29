import type { Metadata, Viewport } from 'next'
import { Archivo } from 'next/font/google'
// Trigger Vercel build
import localFont from 'next/font/local'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'

const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo' })

const conthrax = localFont({
  src: './fonts/Conthrax-SemiBold.otf',
  variable: '--font-conthrax',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#000000',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bzero.no'),
  title: {
    default: 'B-Zero Racing & Rally | Norges billigste og råeste motorsport',
    template: '%s | B-Zero Racing'
  },
  description: 'B-Zero Racing og B-Zero Rally — Norges billigste og råeste bilsportsklasse. Citroën C1, Peugeot 107 og Toyota Aygo på bane og i skogen. Bli sjåfør i dag!',
  keywords: ['B-Zero', 'B-Zero Racing', 'B-Zero Rally', 'b zero', 'bzero', 'bilsport Norge', 'C1 racing', 'Citroën C1 racing', 'rimelig racing', 'motorsport Norge'],
  verification: {
    google: 'izTdgrppyMmmD0rxi2YdvnqU70LDoJjSeSpL9Q6ZMxg',
  },
  icons: {
    icon: '/b-zero-favicon.png',
    shortcut: '/b-zero-favicon.png',
    apple: '/b-zero-homescreen.png',
  },
  appleWebApp: {
    title: 'B-Zero Racing',
    statusBarStyle: 'default',
    capable: true,
  },
  openGraph: {
    title: 'B-Zero Racing',
    description: 'Norges råeste og billigste racing- og rallyklasse.',
    siteName: 'B-Zero Racing',
    url: 'https://www.bzero.no',
    images: [
      {
        url: 'https://www.bzero.no/hero-images/bzero-racing-gallery.jpg',
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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
