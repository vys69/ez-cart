"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import CountrySelector from "@/components/CountrySelector"
import StateSelector from "@/components/StateSelector"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function Onboarding() {
  const [step, setStep] = useState(0)
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const router = useRouter()

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country)
  }

  const handleStateSelect = (state: string) => {
    setSelectedState(state)
  }

  const handleNext = () => {
    if (step === 0 && selectedCountry) {
      localStorage.setItem("currency", selectedCountry)
      setStep(1)
    } else if (step === 1 && selectedState) {
      localStorage.setItem("state", selectedState)
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {step === 0 ? "Select Your Country" : "Select Your State"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {step === 0 ? (
            <CountrySelector onSelect={handleCountrySelect} selectedCountry={selectedCountry} />
          ) : (
            <StateSelector onSelect={handleStateSelect} selectedState={selectedState} />
          )}
          <Button 
            className="w-full mt-6 h-12 text-lg"
            onClick={handleNext} 
            disabled={step === 0 ? !selectedCountry : !selectedState}
          >
            Next <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}