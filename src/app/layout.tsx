import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import localFont from "next/font/local";
import PWAHandler from '@/components/PWAHandler';
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: 'EZ Cart',
  description: 'Your shopping, made easy',
  icons: {
    icon: [
      { url: '/image/meta/favicon.ico', sizes: 'any' },
      { url: '/image/meta/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/image/meta/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/image/meta/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/image/meta/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/image/meta/site.webmanifest',
  openGraph: {
    title: "EZ Cart",
    description: "Your shopping, made easy",
    url: 'https://coolstartupname.com/',
    siteName: "EZ Cart",
    type: 'website',
    images: [
      {
        url: 'https://raw.githubusercontent.com/vys69/ez-cart/refs/heads/master/public/image/ogimage.jpg',
        secureUrl: 'https://raw.githubusercontent.com/vys69/ez-cart/refs/heads/master/public/image/ogimage.jpg',
        width: 1200,
        height: 630,
        alt: 'Preview image for EZ Cart',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yesdavidgray',
    title: "EZ Cart",
    description: "Your shopping, made easy",
    creator: '@fuckgrimlabs',
    images: {
      url: 'https://raw.githubusercontent.com/vys69/ez-cart/refs/heads/master/public/image/ogimage.jpg',
      alt: 'Preview image for EZ Cart',
    }
  },
}

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans">
        <Analytics />
        <PWAHandler />
        {children}
        <Toaster />
      </body>
    </html>
  )
}