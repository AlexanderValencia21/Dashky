'use client'

import { DateRangePickerDropdown } from "@/components/ui/date-range-picker-dropdown";

export default function DashboardPage() {
  const handleDateChange = (range: { startDate: Date; endDate: Date }) => {
    console.log("Fechas seleccionadas:", range)
  }

  return (
    <div className=" flex justify-center w-full md:justify-end ">
      <DateRangePickerDropdown onChange={handleDateChange} />
    </div>
  )
}
