import type { Metadata } from 'next';
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'noplace',
  description: 'make new friends',
  manifest: '/manifest.json',
  icons: {
    icon: '/image/pwa/icon_192.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
