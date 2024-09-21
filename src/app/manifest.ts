import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EZ Cart',
    short_name: 'EZ Cart',
    description: 'makes shopping easy',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      { src: '/image/pwa/16.png', sizes: '16x16', type: 'image/png' },
      { src: '/image/pwa/20.png', sizes: '20x20', type: 'image/png' },
      { src: '/image/pwa/29.png', sizes: '29x29', type: 'image/png' },
      { src: '/image/pwa/32.png', sizes: '32x32', type: 'image/png' },
      { src: '/image/pwa/40.png', sizes: '40x40', type: 'image/png' },
      { src: '/image/pwa/50.png', sizes: '50x50', type: 'image/png' },
      { src: '/image/pwa/57.png', sizes: '57x57', type: 'image/png' },
      { src: '/image/pwa/58.png', sizes: '58x58', type: 'image/png' },
      { src: '/image/pwa/60.png', sizes: '60x60', type: 'image/png' },
      { src: '/image/pwa/64.png', sizes: '64x64', type: 'image/png' },
      { src: '/image/pwa/72.png', sizes: '72x72', type: 'image/png' },
      { src: '/image/pwa/76.png', sizes: '76x76', type: 'image/png' },
      { src: '/image/pwa/80.png', sizes: '80x80', type: 'image/png' },
      { src: '/image/pwa/87.png', sizes: '87x87', type: 'image/png' },
      { src: '/image/pwa/100.png', sizes: '100x100', type: 'image/png' },
      { src: '/image/pwa/114.png', sizes: '114x114', type: 'image/png' },
      { src: '/image/pwa/120.png', sizes: '120x120', type: 'image/png' },
      { src: '/image/pwa/128.png', sizes: '128x128', type: 'image/png' },
      { src: '/image/pwa/144.png', sizes: '144x144', type: 'image/png' },
      { src: '/image/pwa/152.png', sizes: '152x152', type: 'image/png' },
      { src: '/image/pwa/167.png', sizes: '167x167', type: 'image/png' },
      { src: '/image/pwa/180.png', sizes: '180x180', type: 'image/png' },
      { src: '/image/pwa/192.png', sizes: '192x192', type: 'image/png' },
      { src: '/image/pwa/256.png', sizes: '256x256', type: 'image/png' },
      { src: '/image/pwa/512.png', sizes: '512x512', type: 'image/png' },
      { src: '/image/pwa/1024.png', sizes: '1024x1024', type: 'image/png' },
    ],
  }
}