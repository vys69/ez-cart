"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CountrySelector from '@/components/CountrySelector'
import StateSelector from '@/components/StateSelector'
import { Button } from "@/components/ui/button"

export default function StepHandler({ params }: { params: { id: string } }) {
  const router = useRouter()
  const stepId = parseInt(params.id)

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedState, setSelectedState] = useState<string | null>(null)

  useEffect(() => {
    const storedCurrency = localStorage.getItem("currency")
    const storedState = localStorage.getItem("state")

    if (stepId === 1) {
      setSelectedCountry(storedCurrency)
    } else if (stepId === 2) {
      setSelectedCountry(storedCurrency)
      setSelectedState(storedState)
    }
  }, [stepId])

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country)
  }

  const handleStateSelect = (state: string) => {
    setSelectedState(state)
  }

  const handleNext = () => {
    if (stepId === 1 && selectedCountry) {
      localStorage.setItem("currency", selectedCountry)
      if (selectedCountry === 'USD') {
        router.push('/step/2')
      } else {
        router.push('/cart')
      }
    } else if (stepId === 2 && selectedState) {
      localStorage.setItem("state", selectedState)
      router.push('/cart')
    }
  }

  const handleBack = () => {
    if (stepId === 1) {
      router.push('/')
    } else if (stepId === 2) {
      router.push('/step/1')
    }
  }

  return (
    <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md p-6 rounded-lg">
        <h1 className="text-lg mb-6 text-center text-white">
          {stepId === 1 ? "Select Your Country" : "Select Your State"}
        </h1>
        <p className="text-sm mb-6 text-center text-white">
          {stepId === 1 ? "Select your country to view the sales tax rate for your location." : "Select your state to view the sales tax rate for your location."}
        </p>
        {stepId === 1 ? (
          <CountrySelector onSelect={handleCountrySelect} selectedCountry={selectedCountry} />
        ) : (
          <StateSelector onSelect={handleStateSelect} selectedState={selectedState} />
        )}
        <div className="flex justify-between mt-6 gap-4">
          <Button 
            onClick={handleBack}
            className="bg-[#191919] text-white hover:bg-[#2a2a2a] flex-1 py-3 text-sm"
          >
            Back
          </Button>
          <Button 
            onClick={handleNext}
            className="bg-[#191919] text-white hover:bg-[#2a2a2a] flex-1 py-3 text-sm"
            disabled={stepId === 1 ? !selectedCountry : !selectedState}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}