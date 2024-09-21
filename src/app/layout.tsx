import type { Metadata } from 'next';
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'EZ Cart',
  description: 'makes shopping easy',
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
