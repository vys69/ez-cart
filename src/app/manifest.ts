import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'noplace',
    short_name: 'noplace',
    description: 'make new friends',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/image/pwa/icon_192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/image/pwa/icon_512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}