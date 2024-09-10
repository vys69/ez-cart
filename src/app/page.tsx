"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function generateStaticParams() {
  return [{}]
}

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

  return <div>Redirecting...</div>
}