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
      <SelectTrigger className="w-full h-12 text-white border-[#383838] border-2 rounded-md">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent className="text-white text-lg bg-[#191919] border-[#383838] border-2 rounded-md">
        {countries.map((country) => (
          <SelectItem 
            key={country.currency} 
            value={country.currency}
            disabled={country.disabled}
            className="hover:bg-[#2a2a2a]"
          >
            {country.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}