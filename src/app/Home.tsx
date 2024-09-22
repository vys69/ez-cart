"use client"

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'
// import { LinearBlur } from "progressive-blur"
import { Spotlight } from "@/components/ui/Spotlight";
import { FlipWords } from "@/components/ui/flip-words";


export default function Home() {
  const router = useRouter()

  const handleGoShopping = () => {
    router.push('/step/1')
  }

  const words = ["easy", "simple", "effortless"];

  return (
    <>
        <Spotlight
          className="spotlight animate-spotlight absolute top-0 left-0 w-full h-full z-[999999] w-full"
          fill="white"
        />
      <div className="min-h-screen bg-black text-white overflow-hidden">
        <header className="container mx-auto px-4 py-6 flex justify-between items-center relative z-10">
          <div className="text-2xl font-bold flex items-center">
            <Image
              src="/image/pwa/128.png"
              alt="EZ Cart Logo"
              width={64}
              height={64}
              className="inline-block"
              draggable={false}
            />
            <span>EZ Cart</span>
          </div>
        </header>

        <main className="relative z-10 transition-all duration-300">
          <section className="container mx-auto px-4 pt-20 pb-0 text-center">
            <h1 className="text-6xl font-bold mb-4">
              Your shopping,<br />made<FlipWords words={words} duration={2000} className='text-white' /> <br />
            </h1>
            <p className="text-xl text-gray-400 mb-8">Smart shopping cart calculator for savvy shoppers</p>
            {/* <Button
              size="lg"
              className="h-12 animate-shimmer items-center justify-center
              rounded-full border border-neutral-800 bg-[linear-gradient(110deg,#000000,45%,#272727,55%,#000000)] 
              bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none 
              focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-white"
              onClick={handleGoShopping}
            >
              Start shopping smarter
            </Button> */}
            <Button size="lg" className="rounded-full bg-white text-black hover:bg-gray-200" onClick={handleGoShopping}>
              Start shopping smarter
            </Button>
            <p className="text-sm text-gray-400 mt-4">No registration required</p>
          </section>

          <section className="container mx-auto px-4 py-10">
            <div className="bg-black rounded-3xl px-8 relative overflow-hidden">
              {/* <LinearBlur
                side="bottom"
                steps={32}
                strength={4}
                tint="rgba(0, 0, 0, 1)"
                style={{
                  position: "absolute",
                  inset: 0,
                  height: "30%",
                  transform: "translateY(200%)",
                  pointerEvents: "none",
                }}
              />
              <LinearBlur
                side="top"
                steps={32}
                strength={4}
                tint="rgba(0, 0, 0, 1)"
                style={{
                  position: "absolute",
                  inset: 0,
                  height: "30%",
                  pointerEvents: "none",
                }}
              /> */}
              <Image
                src="/image/landing/landing.png"
                alt="EZ Cart Screenshot"
                width={1600}
                height={1200}
                className="rounded-2xl shadow-2xl mx-auto"
                draggable={false}
              />
            </div>
          </section>

          <div className="h-[1px] bg-neutral-900 w-[90%] mx-auto" />

          <section className="container mx-auto px-4 pt-12 pb-0 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Precise totals with<br />your state&apos;s local sales tax
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              EZ Cart automatically applies the correct sales tax<br />for your state, ensuring accurate totals every time<br />(Currently available for USA only)
            </p>
            <Button size="lg" className="rounded-full bg-white text-black hover:bg-gray-200" onClick={handleGoShopping}>
              Calculate with confidence
            </Button>
            <p className="text-sm text-gray-400 mt-4">Supports all 50 states</p>
          </section>

          <section className="container mx-auto px-4 pt-10 pb-10">
            <div className="bg-black rounded-3xl p-8 relative overflow-hidden">
              {/* <LinearBlur
                side="bottom"
                steps={16}
                strength={2}
                tint="rgba(0, 0, 0, 1)"
                style={{
                  position: "absolute",
                  inset: 0,
                  height: "30%",
                  transform: "translateY(220%)",
                  pointerEvents: "none",
                }}
              />
              <LinearBlur
                side="top"
                steps={32}
                strength={2}
                tint="rgba(0, 0, 0, 1)"
                style={{
                  position: "absolute",
                  inset: 0,
                  height: "30%",
                  pointerEvents: "none",
                }}
              /> */}
              <Image
                src="/image/landing/split.png"
                alt="EZ Cart Screenshot"
                width={533}
                height={400}
                className="rounded-2xl shadow-2xl mx-auto"
                draggable={false}
              />
            </div>
          </section>
        </main>

        <div className="h-[1px] bg-neutral-900 w-[90%] mx-auto" />

        <footer className="container mx-auto px-4 py-10 text-center relative z-10">
          <div className="flex justify-center space-x-4 text-sm text-gray-400">
            <Link href="/terms" className="hover:text-white">Terms of service</Link>
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
          </div>
        </footer>
      </div>
    </>
  )
}