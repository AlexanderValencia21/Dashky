'use client'
import DataTable from "@/components/ui/DataTable";
import { DateRangePickerDropdown } from "@/components/ui/date-range-picker-dropdown";const headers = [
  { key: "codigo", label: "Código producto" },
  { key: "cantidades", label: "Cantidades" },
  { key: "ventas", label: "Ventas" },
  { key: "costos", label: "Costos" },
  { key: "utilidad", label: "Utilidad" },
  { key: "mv", label: "MV" },
];

const data = [
  {
    codigo: "021-10",
    cantidades: 1490,
    ventas: 2874000,
    costos: 1590113.1,
    utilidad: 1283886.9,
    mv: "44.67%",
    fecha: new Date("2025-06-15"),
  },
  {
    codigo: "021-6",
    cantidades: 1487,
    ventas: 2301600,
    costos: 1405616.49,
    utilidad: 895983.51,
    mv: "38.93%",
    fecha: new Date("2025-06-16"),
  },
];
export default function DashboardPage() {
  const handleDateChange = (range: { startDate: Date; endDate: Date }) => {
    console.log("Fechas seleccionadas:", range)
  }

  return (
    <div className="w-full px-4 md:px-8 max-w-7xl mx-auto">
      {/* Título */}
      <h1 className="text-2xl font-bold font-raleway mb-4 text-left">Resumen</h1>
  
      {/* Date Picker */}
      <div className="mb-6 flex justify-start">
        <DateRangePickerDropdown onChange={handleDateChange} />
      </div>
  
      {/* Tabla */}
      <div className="w-full">
        <DataTable headers={headers} data={data} dateKey="fecha" />
      </div>
    </div>
  );
}
