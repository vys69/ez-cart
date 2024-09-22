"use client"

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'
// import { LinearBlur } from "progressive-blur"
import { Spotlight } from "@/components/ui/Spotlight";
import { FlipWords } from "@/components/ui/flip-words";
import { FloatingNav } from "@/components/ui/floating-navbar";
import ShinyGrid from "@/components/ui/ShinyGrid";
import { LucideHome, Info, ArrowDownToLine } from "lucide-react";

export default function Home() {
  const router = useRouter()

  const handleGoShopping = () => {
    if (localStorage.getItem("setupSkipped")) {
      router.push('/cart')
    } else {
      router.push('/step/1')
    }
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
    <>
      <Spotlight
        className="spotlight animate-spotlight absolute top-0 left-0 w-full h-full z-[999999] w-full"
        fill="white"
      />
      <FloatingNav className="bg-black border-1 border-white text-white" navItems={navItems} handleSmoothScroll={handleSmoothScroll} />
      <div id="home" className="min-h-screen bg-black text-white overflow-hidden">
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
            <div className="bg-transparent rounded-3xl px-8 relative overflow-hidden">
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

          <section id="install" className="container mx-auto px-4 pt-2 pb-12 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Use EZ Cart Offline
            </h2>
            <p className="text-xl text-gray-400 mb-0">
              Install our app for a seamless shopping experience, even without internet
            </p>
            {/* <div className="flex justify-center space-x-16 mt-14">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Desktop</h3>
                <ol className="text-left list-decimal list-inside">
                  <li>Click the install icon in the address bar</li>
                  <li>Select 'Install' in the prompt</li>
                </ol>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Mobile</h3>
                <ol className="text-left list-decimal list-inside">
                  <li>Tap the share button</li>
                  <li>Select 'Add to Home Screen'</li>
                  <li>Tap 'Add' in the top right corner</li>
                </ol>
              </div>
            </div> */}
            <div className="bg-black rounded-3xl py-0 px-8 relative overflow-hidden">
              <Image
                src="/image/landing/install-guide.png"
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
          </div>
        </footer>
      </div>
      <ShinyGrid className='opacity-[0.3]' />
    </>
  )
}