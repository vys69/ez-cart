"use client"

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'
import { Spotlight } from "@/components/ui/Spotlight";
import { FlipWords } from "@/components/ui/flip-words";
import { FloatingNav } from "@/components/ui/floating-navbar";
import TwinklingGrid from "@/components/ui/TwinklingGrid";
import { LucideHome, Info, ArrowDownToLine } from "lucide-react";

export default function Home() {
  const router = useRouter()

  const handleGoShopping = () => {
    router.push('/cart')
  }

  const navItems = [
    {
      name: "Home",
      link: "#home",
      icon: <LucideHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "#about",
      icon: <Info className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Install App",
      link: "#install",
      icon: (
        <ArrowDownToLine className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const words = ["easy", "simple", "effortless"];
  const preciseSynoynms = ["Precise", "Accurate", "Exact"];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Spotlight
        className="spotlight animate-spotlight absolute top-0 left-0 w-full h-full z-[999999]"
        fill="white"
      />
      <FloatingNav className="bg-black border-1 border-white text-white" navItems={navItems} handleSmoothScroll={handleSmoothScroll} />
      <div id="home" className="relative z-10 min-h-screen bg-transparent text-white overflow-hidden">
        <header className="bg-transparent container mx-auto px-4 py-6 flex justify-between items-center relative z-10">
          <div className="w-full flex flex-row justify-between items-center">
            <div className="text-2xl font-bold flex items-center bg-transparent">
              <Image
                src="/image/pwa/128.png"
                alt="EZ Cart Logo"
                width={64}
                height={64}
                className="inline-block"
                draggable={false}
              />
              EZ Cart
            </div>
            <div className="flex flex-row">
              <Button size="lg" className="rounded-full bg-white text-black hover:bg-gray-200" onClick={handleGoShopping}>
                Go Shopping
              </Button>
            </div>
          </div>
        </header>

        <main className="relative z-10 transition-all duration-300">
          <section className="container mx-auto px-4 pt-20 pb-0 text-center">
            <h1 className="text-6xl font-bold mb-4">
              Your shopping,<br />made <FlipWords words={words} duration={2000} className='text-white' /> <br />
            </h1>
            <p className="text-xl text-gray-400 mb-8">Smart shopping cart calculator for savvy shoppers</p>
            <Button size="lg" className="rounded-full bg-white text-black hover:bg-gray-200" onClick={handleGoShopping}>
              Start shopping smarter
            </Button>
            <p className="text-sm text-gray-400 mt-4">No registration required</p>
          </section>

          <section className="container mx-auto px-4 py-10">
            <div className="bg-transparent rounded-3xl px-8 relative overflow-hidden">
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

          {/* <div className="h-[1px] bg-neutral-900 w-[90%] mx-auto" /> */}
{/* 
          <section id="about" className="container mx-auto px-4 pt-12 pb-0 text-center">
            <h2 className="text-4xl font-bold mb-4">
              <FlipWords words={preciseSynoynms} duration={2000} className='text-white' />totals with<br />your state&apos;s local sales tax
            </h2>
            <p className="text-xl text-gray-400">
              EZ Cart automatically applies the correct sales tax<br />for your state, ensuring accurate totals every time
            </p>
            <p className="text-sm text-gray-400 mt-4 mb-4">(Currently available for USA only)</p>
            <Button size="lg" className="rounded-full bg-white text-black hover:bg-gray-200" onClick={handleGoShopping}>
              Calculate with confidence
            </Button>
            <p className="text-sm text-gray-400 mt-4">Supports all 50 states</p>
          </section> */}

          {/* <section className="container mx-auto px-4 pt-10 pb-12">
            <div className="bg-black rounded-3xl p-8 relative overflow-hidden">
              <Image
                src="/image/landing/split.png"
                alt="EZ Cart Screenshot"
                width={533}
                height={400}
                className="rounded-2xl shadow-2xl mx-auto"
                draggable={false}
              />
            </div>
          </section> */}

          <div className="h-[1px] bg-neutral-900 w-[90%] mx-auto" />

          <section id="install" className="container mx-auto px-4 pt-16 pb-12 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Use EZ Cart Offline
            </h2>
            <p className="text-xl text-gray-400 mb-0">
              Install our app for a seamless shopping experience, even without internet
            </p>
            <div className="bg-transparent rounded-3xl py-0 px-8 relative overflow-hidden">
              <Image
                src="/image/landing/install-guide-transparent.png"
                alt="EZ Cart Screenshot"
                width={1600}
                height={1200}
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
            <Link href="https://github.com/vys69/ez-cart" className="hover:text-white">GitHub</Link>
          </div>
        </footer>
      </div>
      <TwinklingGrid className='fixed inset-0 z-0' />
    </div>
  )
}