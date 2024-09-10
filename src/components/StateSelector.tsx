import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { states } from "@/helpers/states"

interface StateSelectorProps {
  onSelect: (state: string) => void
  selectedState: string | null
}

export default function StateSelector({ onSelect, selectedState }: StateSelectorProps) {
  return (
    <Select value={selectedState || undefined} onValueChange={onSelect}>
      <SelectTrigger className="w-full h-12 text-lg">
        <SelectValue placeholder="Select a state" />
      </SelectTrigger>
      <SelectContent>
        {states.map((state) => (
          <SelectItem key={state.name} value={state.name} className="text-lg">
            {state.name} <h6 className="text-sm text-gray-500">Sales tax: {state.taxRate}%</h6>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}