'use client'

import { useState } from "react"
import { DateRange, Range } from "react-date-range"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import es from "date-fns/locale/es"
import { RangeKeyDict } from "react-date-range";
export function DateRangePickerDropdown({
  onChange
}: {
  onChange: (range: { startDate: Date; endDate: Date }) => void
}) {
  const [open, setOpen] = useState(false)
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    }
  ])

  const handleSelect = (ranges: RangeKeyDict) => {
    const selected = ranges.selection
    const current = range[0]
  
    const newStartDate = selected.startDate
    const newEndDate = selected.endDate
  
    const finalEndDate = (current.endDate && newStartDate && newStartDate.getTime() === newEndDate?.getTime())
      ? current.endDate
      : newEndDate
  
    const newRange: Range = {
      startDate: newStartDate,
      endDate: finalEndDate,
      key: "selection"
    }
  
    setRange([newRange])
  
    if (newStartDate && finalEndDate) {
      onChange({ startDate: newStartDate, endDate: finalEndDate })
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="bg-corporate-white text-corporate-dark border-2 border-corporate-slate font-raleway ">
          <CalendarIcon className="mr-2 h-3 w-3" />
          {format(range[0].startDate!, "dd/MM/yyyy")} - {format(range[0].endDate!, "dd/MM/yyyy")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-1 shadow-lg border border-corporate-slate z-50 font-raleway" align="end">
        <DateRange
          ranges={range}
          onChange={handleSelect}
          maxDate={new Date()} 
          moveRangeOnFirstSelection={false}
          rangeColors={["#0f766e"]}
          months={1}
          direction="horizontal"
          locale={es}
        />
      </PopoverContent>
    </Popover>
  )
}
