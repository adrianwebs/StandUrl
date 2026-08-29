'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { adminApi, type AdminStats } from '@/lib/adminApi'
import { AdminShell } from './_components/AdminShell'

function StatCard({ label, value, sub }: { label: string; value: number | string; sub?: string }) {
  return (
    <div className="bg-white border border-[#E7E5E4] rounded-2xl p-6 shadow-xs hover:shadow-sm transition-shadow">
      <p className="text-xs font-bold uppercase tracking-wider text-[#A8A29E] mb-1.5">{label}</p>
      <p className="text-3xl font-extrabold text-[#111827]">{value.toLocaleString()}</p>
      {sub && <p className="text-xs text-[#78716C] mt-1 font-medium">{sub}</p>}
    </div>
  )
}

export default function AdminDashboard() {
  const { token } = useAuth()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) return
    adminApi.getStats(token)
      .then(setStats)
      .catch(e => setError(e.message))
  }, [token])

  return (
    <AdminShell>
      <div className="p-8 max-w-6xl">
        <h1 className="text-2xl font-extrabold text-[#111827] mb-6 tracking-tight">Dashboard General</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        {!stats ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white border border-[#E7E5E4] rounded-2xl p-6 animate-pulse">
                <div className="h-3 w-24 bg-[#F3EFE6] rounded mb-3" />
                <div className="h-8 w-16 bg-[#F3EFE6] rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard label="Negocios totales" value={stats.totalBusinesses} sub={stats.activeBusinesses + ' activos'} />
            <StatCard label="Dispositivos" value={stats.totalDevices} sub={stats.activeDevices + ' activos'} />
            <StatCard label="Escaneos este mes" value={stats.totalScansMonth} />
            <StatCard label="Escaneos totales" value={stats.totalScansAllTime} />
            <StatCard label="Negocios activos" value={stats.activeBusinesses} />
            <StatCard label="Dispositivos activos" value={stats.activeDevices} />
          </div>
        )}
      </div>
    </AdminShell>
  )
}

