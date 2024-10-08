import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { states } from "@/helpers/states"

interface StateSelectorProps {
  onSelect: (state: string) => void
  selectedState: string | null
}

export default function StateSelector({ onSelect, selectedState }: StateSelectorProps) {
  return (
    <Select value={selectedState || undefined} onValueChange={onSelect}>
      <SelectTrigger className="w-full h-12 text-white border-[#383838] border-2 rounded-md">
        <SelectValue placeholder="Select a state" />
      </SelectTrigger>
      <SelectContent className="text-white text-lg bg-[#191919] border-[#383838] border-2 rounded-md">
        {states.map((state) => (
          <SelectItem key={state.name} value={state.name} className="">
            {state.name} <h6 className="align-center">Sales tax: {state.taxRate}%</h6>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}