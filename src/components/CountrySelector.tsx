import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { countries } from "@/helpers/countries"

interface CountrySelectorProps {
  onSelect: (country: string) => void
  selectedCountry: string | null
}

export default function CountrySelector({ onSelect, selectedCountry }: CountrySelectorProps) {
  return (
    <RadioGroup onValueChange={onSelect} value={selectedCountry || undefined} className="space-y-4">
      {countries.map((country) => (
        <div key={country.name} className={`flex items-center space-x-3 ${country.disabled ? 'opacity-50' : ''}`}>
          <RadioGroupItem value={country.currency} id={country.name} disabled={country.disabled} className="w-6 h-6" />
          <Label htmlFor={country.name} className="flex-grow text-lg">{country.name}</Label>
          <span className="text-base text-gray-500">{country.currency}</span>
        </div>
      ))}
    </RadioGroup>
  )
}