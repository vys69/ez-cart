"use client"

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const router = useRouter()

  const handleGoShopping = () => {
    router.push('/step/1')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold flex items-center">
          <Image
            src="/image/pwa/128.png"
            alt="EZ Cart Logo"
            width={64}
            height={64}
            className="inline-block"
          />
          <span>EZ Cart</span>
        </div>
        {/* <nav className="space-x-4">
          <Link href="#" className="text-sm text-gray-400 hover:text-white">Features</Link>
          <Link href="#" className="text-sm text-gray-400 hover:text-white">Pricing</Link>
          <Link href="#" className="text-sm text-gray-400 hover:text-white">Log in</Link>
        </nav> */}
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-6xl font-bold mb-4">
            Your shopping,<br />Made easy
          </h1>
          <p className="text-xl text-gray-400 mb-8">Smart shopping cart calculator for savvy shoppers</p>
          <Button size="lg" className="rounded-full bg-white text-black hover:bg-gray-200" onClick={handleGoShopping}>
            Start shopping smarter
          </Button>
          <p className="text-sm text-gray-400 mt-4">No registration required</p>
        </section>

        <section className="container mx-auto px-4 py-5">
          <div className="bg-black rounded-3xl p-8 relative overflow-hidden">
            <Image
              src="/image/landing/landing.png"
              alt="EZ Cart Screenshot"
              width={1600}
              height={1200}
              className="rounded-2xl shadow-2xl mx-auto"
            />
          </div>
        </section>

        <div className="h-[1px] bg-neutral-900 w-[90%] mx-auto" />

        <section className="container mx-auto px-4 py-10 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Precise totals with<br />your state&apos;s local sales tax
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            EZ Cart automatically applies the correct sales tax<br />for your state, ensuring accurate totals every time<br />(Currently available for USA only)
          </p>
          <Button size="lg" className="rounded-full bg-white text-black hover:bg-gray-200" onClick={handleGoShopping}>
            Calculate with confidence
          </Button>
          <p className="text-sm text-gray-400 mt-4">Supports all 50 states</p>
        </section>

        <section className="container mx-auto px-4 py-5">
          <div className="bg-black rounded-3xl p-8 relative overflow-hidden">
            <Image
              src="/image/landing/split.png"
              alt="EZ Cart Screenshot"
              width={533}
              height={400}
              className="rounded-2xl shadow-2xl mx-auto"
            />
          </div>
        </section> 
      </main>

      <div className="h-[1px] bg-neutral-900 w-[90%] mx-auto" />

      <footer className="container mx-auto px-4 py-10 text-center">
        <div className="flex justify-center space-x-4 text-sm text-gray-400">
          <Link href="/terms" className="hover:text-white">Terms of service</Link>
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  )
}