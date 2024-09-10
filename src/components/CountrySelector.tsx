import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { countries } from '@/helpers/countries'

interface CountrySelectorProps {
  onSelect: (country: string) => void
  selectedCountry: string | null
}

export default function CountrySelector({ onSelect, selectedCountry }: CountrySelectorProps) {
  return (
    <Select onValueChange={onSelect} value={selectedCountry || undefined}>
      <SelectTrigger className="w-full h-12 text-black">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent className="text-black text-lg">
        {countries.map((country) => (
          <SelectItem 
            key={country.currency} 
            value={country.currency}
            disabled={country.disabled}
          >
            {country.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}