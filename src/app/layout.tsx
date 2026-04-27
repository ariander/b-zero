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

export const metadata: Metadata = {
  metadataBase: new URL('https://www.b-zeroracing.com'),
  title: 'B-Zero Racing',
  description: 'Norges råeste og billigste racing- og rallyklasse.',
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
  themeColor: '#000000',
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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
