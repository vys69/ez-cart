"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import CountrySelector from '@/components/CountrySelector'
import StateSelector from '@/components/StateSelector'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ChevronRight } from "lucide-react"

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
      if (!storedCurrency) {
        router.push('/step/1')
      } else {
        setSelectedCountry(storedCurrency)
        setSelectedState(storedState)
      }
    }
  }, [stepId, router])

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country)
  }

  const handleStateSelect = (state: string) => {
    setSelectedState(state)
  }

  const handleNext = () => {
    if (stepId === 1 && selectedCountry) {
      localStorage.setItem("currency", selectedCountry)
      router.push('/step/2')
    } else if (stepId === 2 && selectedState) {
      localStorage.setItem("state", selectedState)
      router.push('/cart')
    }
  }

  const handleBack = () => {
    if (stepId === 2) {
      localStorage.removeItem("currency")
      router.push('/step/1')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center p-4">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center">
          {stepId === 2 && (
            <Button variant="ghost" size="icon" onClick={handleBack} className="h-10 w-10 mr-2">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          )}
          <CardTitle className="text-2xl font-bold text-center flex-grow">
            {stepId === 1 ? "Select Your Country" : "Select Your State"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stepId === 1 && (
            <CountrySelector onSelect={handleCountrySelect} selectedCountry={selectedCountry} />
          )}
          {stepId === 2 && (
            <StateSelector onSelect={handleStateSelect} selectedState={selectedState} />
          )}
          <Button 
            className="w-full mt-6 h-12 text-lg"
            onClick={handleNext} 
            disabled={stepId === 1 ? !selectedCountry : !selectedState}
          >
            Next <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}