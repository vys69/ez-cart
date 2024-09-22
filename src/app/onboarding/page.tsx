"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import CountrySelector from "@/components/CountrySelector"
import StateSelector from "@/components/StateSelector"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, ArrowLeftIcon } from '@radix-ui/react-icons'

export default function Onboarding() {
  console.log('[Onboarding] Component rendered');
  const [step, setStep] = useState(0)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    console.log('useEffect triggered. Current step:', step);
    const storedCurrency = localStorage.getItem("currency");
    const storedState = localStorage.getItem("state");
    const storedCartItems = localStorage.getItem("cartItems");

    console.log('Stored values:', { storedCurrency, storedState, storedCartItems });

    if (step === 0) {
      console.log('Setting selected country:', storedCurrency);
      setSelectedCountry(storedCurrency);
    } else if (step === 1) {
      console.log('Setting selected country and state:', storedCurrency, storedState);
      setSelectedCountry(storedCurrency);
      setSelectedState(storedState);
    }

    // Remove the code that sets cartItems in localStorage
    if (storedCartItems) {
      console.log('Existing cart items found');
    } else {
      console.log('No existing cart items found');
    }
  }, [step]);

  const handleCountrySelect = (country: string) => {
    console.log('Country selected:', country);
    setSelectedCountry(country);
    console.log('Selected country state updated');
  }

  const handleStateSelect = (state: string) => {
    console.log('State selected:', state);
    setSelectedState(state);
  }

  const handleNext = () => {
    console.log('[Onboarding] Next button clicked. Current step:', step);
    if (step === 0 && selectedCountry) {
      console.log('[Onboarding] Setting currency in localStorage:', selectedCountry);
      localStorage.setItem("currency", selectedCountry);
      if (selectedCountry === 'USD') {
        console.log('[Onboarding] Moving to state selection step');
        setStep(1);
      } else {
        console.log('[Onboarding] Navigating to cart page');
        router.push('/cart');
      }
    } else if (step === 1 && selectedState) {
      console.log('[Onboarding] Setting state in localStorage:', selectedState);
      localStorage.setItem("state", selectedState);
      console.log('[Onboarding] Navigating to cart page');
      router.push('/cart');
    }
  };

  const handleBack = () => {
    console.log('Back button clicked. Current step:', step);
    if (step === 0) {
      console.log('Navigating to home page');
      router.push('/');
    } else if (step === 1) {
      console.log('Moving back to country selection step');
      setStep(0);
    }
  }

  const handleSkip = () => {
    console.log('Skip setup clicked');
    localStorage.setItem("setupSkipped", "true");
    console.log('Navigating to cart page');
    router.push('/cart');
  }

  return (
    <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md bg-transparent text-white border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white">
            {step === 0 ? "Select Your Country" : "Select Your State"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-6 text-center text-white">
            {step === 0
              ? "Select your country to view the sales tax rate for your location."
              : "Select your state to view the sales tax rate for your location."}
          </p>
          {step === 0 ? (
            <CountrySelector
              onSelect={(country: string) => {
                handleCountrySelect(country);
              }}
              selectedCountry={selectedCountry}
            />
          ) : (
            <StateSelector onSelect={handleStateSelect} selectedState={selectedState} />
          )}
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
          <span className="text-sm text-gray-400 mt-4 block text-center">
            By skipping, you won't be able to calculate sales taxes.
          </span>
        </CardContent>
      </Card>
    </div>
  )
}