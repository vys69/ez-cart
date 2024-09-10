"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const storedCurrency = localStorage.getItem("currency")
    const storedState = localStorage.getItem("state")

    if (!storedCurrency) {
      router.push('/step/1')
    } else if (!storedState) {
      router.push('/step/2')
    } else {
      router.push('/cart')
    }
  }, [router])

  const handleGoShopping = () => {
    const storedCurrency = localStorage.getItem("currency")
    const storedState = localStorage.getItem("state")

    if (!storedCurrency) {
      router.push('/step/1')
    } else if (!storedState) {
      router.push('/step/2')
    } else {
      router.push('/cart')
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-black">EZCart</h1>
      <Button 
        onClick={handleGoShopping}
        className="bg-black text-white hover:bg-gray-800 px-6 py-3 text-lg"
      >
        Go Shopping
      </Button>
    </div>
  )
}