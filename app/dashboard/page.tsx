'use client'

import PrivateRoute from "@/components/auth/private-route"

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Bienvenido al Resumen</h1>
        {/* Aquí irán los gráficos, tablas, etc */}
      </div>
    </PrivateRoute>
  )
}