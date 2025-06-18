// components/DataTableWithFilter.tsx
"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { DateRangePickerDropdown } from "./date-range-picker-dropdown";

type Header = {
  key: string;
  label: string;
};

type DateRange = {
  from: Date | null;
  to: Date | null;
};

type Props = {
  headers: Header[];
  data: Record<string, unknown>[];
  dateKey: string; // clave de la columna fecha (aunque no se muestre)
  rowsPerPage?: number;
};

export default function DataTable({
  headers,
  data,
  dateKey,
  rowsPerPage = 5,
}: Props) {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: null,
    to: null,
  });

  const [page, setPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!dateRange.from || !dateRange.to) return data;
    return data.filter((row) => {
      const rawDate = row[dateKey] as string | number | Date;
      const rowDate = new Date(rawDate);
      return rowDate >= dateRange.from! && rowDate <= dateRange.to!;
    });
  }, [data, dateRange, dateKey]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="p-4 space-y-4 border rounded-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-lg font-semibold">Filtrar por fechas:</h2>
        <DateRangePickerDropdown onChange={({ startDate, endDate }) =>
  setDateRange({ from: startDate, to: endDate })
} />
      </div>

      <div className="overflow-x-auto border rounded-md">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-muted">
            <tr>
              {headers.map((header) => (
                <th key={header.key} className="px-4 py-2 border text-corporate-white text-raleway">
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, i) => (
              <tr key={i} className="hover:bg-muted/50">
                {headers.map((header) => (
                  <td key={header.key} className="px-4 py-2 border">
                  {typeof row[header.key] === "number" ? (
                    (row[header.key] as number).toLocaleString("es-CO", {
                      style:
                        header.key.toLowerCase().includes("ventas") ||
                        header.key.toLowerCase().includes("costos") ||
                        header.key.toLowerCase().includes("utilidad")
                          ? "currency"
                          : "decimal", // o undefined
                      currency: "COP",
                    })
                  ) : (
                    String(row[header.key])
                  )}
                </td>
                ))}
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan={headers.length} className="text-center py-4">
                  No hay datos para el rango seleccionado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center gap-2">
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Anterior
        </Button>
        <span className="text-sm">{`Página ${page} de ${totalPages}`}</span>
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
