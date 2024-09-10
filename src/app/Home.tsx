"use client"

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()

  const handleGoShopping = () => {
    router.push('/step/1')
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-white">EZCart</h1>
      <Button 
        onClick={handleGoShopping}
        className="bg-[#191919] text-white hover:bg-[#2a2a2a] px-3 py-3 text-lg"
      >
        Go Shopping
      </Button>
    </div>
  )
}