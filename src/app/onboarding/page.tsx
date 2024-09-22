"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import CountrySelector from "@/components/CountrySelector"
import StateSelector from "@/components/StateSelector"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, ArrowLeftIcon } from '@radix-ui/react-icons'

export default function Onboarding() {
  const [step, setStep] = useState(0)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedCurrency = localStorage.getItem("currency")
    const storedState = localStorage.getItem("state")

    if (step === 0) {
      setSelectedCountry(storedCurrency)
    } else if (step === 1) {
      setSelectedCountry(storedCurrency)
      setSelectedState(storedState)
    }
  }, [step])

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country)
  }

  const handleStateSelect = (state: string) => {
    setSelectedState(state)
  }

  const handleNext = () => {
    if (step === 0 && selectedCountry) {
      localStorage.setItem("currency", selectedCountry)
      if (selectedCountry === 'USD') {
        setStep(1)
      } else {
        router.push('/cart')
      }
    } else if (step === 1 && selectedState) {
      localStorage.setItem("state", selectedState)
      router.push('/cart')
    }
  }

  const handleBack = () => {
    if (step === 0) {
      router.push('/')
    } else if (step === 1) {
      setStep(0)
    }
  }

  const handleSkip = () => {
    localStorage.setItem("setupSkipped", "true")
    router.push('/cart')
  }

  return (
    <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {step === 0 ? "Select Your Country" : "Select Your State"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-6 text-center">
            {step === 0 
              ? "Select your country to view the sales tax rate for your location." 
              : "Select your state to view the sales tax rate for your location."}
          </p>
          {step === 0 ? (
            <CountrySelector onSelect={handleCountrySelect} selectedCountry={selectedCountry} />
          ) : (
            <StateSelector onSelect={handleStateSelect} selectedState={selectedState} />
          )}
          <div className="flex justify-between mt-6 gap-4">
            <Button 
              onClick={handleBack}
              className="bg-[#191919] text-white hover:bg-[#2a2a2a] flex-1 py-3 text-sm"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" /> Back
            </Button>
            <Button 
              onClick={handleNext}
              className="bg-[#191919] text-white hover:bg-[#2a2a2a] flex-1 py-3 text-sm"
              disabled={step === 0 ? !selectedCountry : !selectedState}
            >
              Next <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <Button 
            onClick={handleSkip}
            className="w-full mt-4 bg-[#202020] text-white hover:bg-[#2a2a2a] flex-1 text-sm"
          >
            Skip setup <ArrowRightIcon className="w-4 h-4 ml-2" />
          </Button>
          <span className="text-sm text-white mt-4 block text-center">
            By skipping, you won&apos;t be able to calculate sales taxes.
          </span>
        </CardContent>
      </Card>
    </div>
  )
}