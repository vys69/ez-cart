"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import StateSelector from "@/components/StateSelector"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, ArrowLeftIcon } from '@radix-ui/react-icons'
import { TaxRegion, usStates } from "@/helpers/taxes"

export default function Onboarding() {
  const [selectedStateName, setSelectedStateName] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedState = localStorage.getItem("state");

    if (storedState) {
      setSelectedStateName(storedState);
    }
  }, []);

  const handleStateChange = (stateName: string) => {
    setSelectedStateName(stateName);
  };

  const handleNext = () => {
    if (selectedStateName) {
      localStorage.setItem("state", selectedStateName);
      router.push('/cart');
    }
  };

  const handleBack = () => {
    router.push('/');
  }

  const handleSkip = () => {
    localStorage.setItem("setupSkipped", "true");
    router.push('/cart');
  }

  return (
    <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md bg-transparent text-white border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white">
            Select Your State
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-6 text-center text-white">
            Select your state to view the sales tax rate for your location.
          </p>
          <StateSelector onSelect={handleStateChange} selectedState={selectedStateName} />
          <div className="flex justify-between mt-6 gap-4">
            <Button
              onClick={handleBack}
              className="bg-[#202020] text-white hover:bg-[#2a2a2a] flex-1 py-3 text-sm"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" /> Back
            </Button>
            <Button
              onClick={handleNext}
              className="bg-[#202020] text-white hover:bg-[#2a2a2a] flex-1 py-3 text-sm"
              disabled={!selectedStateName}
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
          <span className="text-sm text-gray-400 mt-4 block text-center">
            By skipping, you won't be able to calculate sales taxes.
          </span>
        </CardContent>
      </Card>
    </div>
  )
}