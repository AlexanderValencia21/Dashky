'use client'

import { DateRangePickerDropdown } from "@/components/ui/date-range-picker-dropdown";

export default function DashboardPage() {
  const handleDateChange = (range: { startDate: Date; endDate: Date }) => {
    console.log("Fechas seleccionadas:", range)
  }

  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between items-center md:items-center ">
    <h1 className="text-2xl font-bold font-raleway mb-2 text-center md:text-left w-full md:w-auto">
      Resumen
    </h1>
    <div className="w-full md:w-auto flex justify-center md:justify-end">
      <DateRangePickerDropdown onChange={handleDateChange} />
    </div>
  </div>
  )
}
