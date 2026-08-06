import type { Metadata, Viewport } from 'next'
import DekktrykkApp from './DekktrykkApp'

export const metadata: Metadata = {
  title: 'Dekktrykk | B-Zero Racing',
  description: 'Logg dekktrykk rett etter stint. Offline, lagres kun lokalt på enheten.',
  manifest: '/dekktrykk-manifest.webmanifest',
  appleWebApp: {
    title: 'Dekktrykk',
    statusBarStyle: 'black-translucent',
    capable: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  viewportFit: 'cover',
  userScalable: false,
}

export default function DekktrykkPage() {
  return <DekktrykkApp />
}
