import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: 'EZ Cart',
  description: 'makes shopping easy',
  manifest: '/manifest.json',
  icons: {
    icon: '/image/pwa/icon_192.png',
  },
  openGraph: {
    title: "EZ Cart",
    description: "makes shopping easy",
    url: 'https://www.ripgrim.com/',
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
    description: "makes shopping easy",
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
        {children}
        <Toaster />
      </body>
    </html>
  )
}
