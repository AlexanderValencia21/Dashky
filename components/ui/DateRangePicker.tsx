"use client";

import { useState } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css"; // puedes personalizar luego con CSS

export default function DateRangePicker({
  onChange,
  initialRange,
}: {
  onChange: (range: { startDate: Date; endDate: Date }) => void;
  initialRange?: { startDate: Date; endDate: Date };
}) {
  const [range, setRange] = useState([
    {
      startDate: initialRange?.startDate || addDays(new Date(), -7),
      endDate: initialRange?.endDate || new Date(),
      key: "selection",
    },
  ]);

  const handleChange = (item: RangeKeyDict) => {
    const newRange = item.selection;
    setRange([
      {
        startDate: newRange.startDate ?? new Date(),
        endDate: newRange.endDate ?? new Date(),
        key: newRange.key ?? "selection",
      },
    ]);

    onChange({
      startDate: newRange.startDate ?? new Date(),
      endDate: newRange.endDate ?? new Date(),
    });
  };

  return (
    <DateRange
      editableDateInputs={true}
      onChange={handleChange}
      moveRangeOnFirstSelection={false}
      ranges={range}
      maxDate={new Date()}
      showMonthAndYearPickers
    />
  );
}
