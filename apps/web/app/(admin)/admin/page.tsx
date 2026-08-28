'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { adminApi, type AdminStats } from '@/lib/adminApi'
import { AdminShell } from './_components/AdminShell'

function StatCard({ label, value, sub }: { label: string; value: number | string; sub?: string }) {
  return (
    <div className="bg-[#111] border border-[#222] rounded-xl p-6">
      <p className="text-sm text-[#888] mb-1">{label}</p>
      <p className="text-3xl font-bold text-[#FAFAFA]">{value.toLocaleString()}</p>
      {sub && <p className="text-xs text-[#555] mt-1">{sub}</p>}
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
      <div className="p-8">
        <h1 className="text-2xl font-bold text-[#FAFAFA] mb-6">Dashboard</h1>

        {error && (
          <div className="bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-sm px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {!stats ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-[#111] border border-[#222] rounded-xl p-6 animate-pulse">
                <div className="h-3 w-24 bg-[#222] rounded mb-3" />
                <div className="h-8 w-16 bg-[#222] rounded" />
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
