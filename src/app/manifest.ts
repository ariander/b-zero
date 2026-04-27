import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'B-Zero Racing',
    short_name: 'B-Zero',
    description: 'Norges råeste og billigste racing- og rallyklasse.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/b-zero-favicon.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: '/b-zero-homescreen.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/b-zero-homescreen.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
