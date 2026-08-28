'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { adminApi, type BusinessSummary, type CreateBusinessPayload } from '@/lib/adminApi'
import { AdminShell } from '../_components/AdminShell'

const SECTORS = ['restaurante', 'gimnasio', 'peluqueria', 'otro']
const PLANS = ['free', 'pro']

function CreateBusinessModal({
  onClose,
  onCreated,
}: {
  onClose: () => void
  onCreated: (b: BusinessSummary) => void
}) {
  const { token } = useAuth()
  const [form, setForm] = useState<CreateBusinessPayload>({
    name: '', email: '', sector: 'otro', plan: 'free',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const b = await adminApi.createBusiness(token!, form)
      onCreated(b)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="bg-[#111] border border-[#222] rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-lg font-semibold text-[#FAFAFA] mb-5">Nuevo negocio</h2>

        {error && (
          <div className="bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-sm px-3 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-[#888] mb-1">Nombre del negocio</label>
            <input
              required
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg px-4 py-2.5 text-[#FAFAFA] focus:outline-none focus:border-[#F5A623]"
              placeholder="Cafetería El Sol"
            />
          </div>
          <div>
            <label className="block text-sm text-[#888] mb-1">Email del cliente</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg px-4 py-2.5 text-[#FAFAFA] focus:outline-none focus:border-[#F5A623]"
              placeholder="cliente@negocio.com"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-[#888] mb-1">Sector</label>
              <select
                value={form.sector}
                onChange={e => setForm(f => ({ ...f, sector: e.target.value }))}
                className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg px-3 py-2.5 text-[#FAFAFA] focus:outline-none focus:border-[#F5A623]"
              >
                {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-[#888] mb-1">Plan</label>
              <select
                value={form.plan}
                onChange={e => setForm(f => ({ ...f, plan: e.target.value }))}
                className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg px-3 py-2.5 text-[#FAFAFA] focus:outline-none focus:border-[#F5A623]"
              >
                {PLANS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <p className="text-xs text-[#555]">
            Se enviará un email con la contraseña temporal al correo del cliente.
          </p>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-[#333] text-[#888] hover:text-[#FAFAFA] transition-colors text-sm">
              Cancelar
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2.5 rounded-lg bg-[#F5A623] hover:bg-[#C47D0E] text-[#0A0A0A] font-bold disabled:opacity-50 text-sm transition-colors">
              {loading ? 'Creando...' : 'Crear negocio'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function BusinessesPage() {
  const { token } = useAuth()
  const [businesses, setBusinesses] = useState<BusinessSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState('')

  const [resendingId, setResendingId] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    if (!token) return
    adminApi.getBusinesses(token)
      .then(setBusinesses)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [token])

  function handleCreated(b: BusinessSummary) {
    setBusinesses(prev => [b, ...prev])
    setShowModal(false)
  }

  async function handleResendAccess(b: BusinessSummary) {
    if (!token) return
    const confirmed = window.confirm(`¿Reenviar email de acceso con nueva contraseña a "${b.email}"?`)
    if (!confirmed) return

    setResendingId(b.id)
    setFeedback(null)
    try {
      const res = await adminApi.resendAccess(token, b.id)
      setFeedback({ type: 'success', text: res.message || `Email enviado a ${b.email}` })
      setTimeout(() => setFeedback(null), 4000)
    } catch (err: unknown) {
      setFeedback({ type: 'error', text: err instanceof Error ? err.message : 'Error al enviar email' })
    } finally {
      setResendingId(null)
    }
  }

  return (
    <AdminShell>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#FAFAFA]">Negocios</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#F5A623] hover:bg-[#C47D0E] text-[#0A0A0A] font-bold px-4 py-2 rounded-lg text-sm transition-colors"
          >
            + Nuevo negocio
          </button>
        </div>

        {error && (
          <div className="bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {feedback && (
          <div
            className={`text-sm px-4 py-3 rounded-lg mb-4 border ${
              feedback.type === 'success'
                ? 'bg-green-900/30 border-green-500/40 text-green-300'
                : 'bg-red-900/30 border-red-500/40 text-red-300'
            }`}
          >
            {feedback.type === 'success' ? '✅ ' : '❌ '}
            {feedback.text}
          </div>
        )}

        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 bg-[#111] border border-[#222] rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="bg-[#111] border border-[#222] rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#222] text-[#555] text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3">Negocio</th>
                  <th className="text-left px-4 py-3">Sector</th>
                  <th className="text-left px-4 py-3">Plan</th>
                  <th className="text-center px-4 py-3">Dispositivos</th>
                  <th className="text-center px-4 py-3">Escaneos</th>
                  <th className="text-center px-4 py-3">Estado</th>
                  <th className="px-4 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {businesses.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-[#555]">
                      No hay negocios todavía
                    </td>
                  </tr>
                )}
                {businesses.map(b => (
                  <tr key={b.id} className="border-b border-[#1A1A1A] hover:bg-[#1A1A1A] transition-colors">
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-[#FAFAFA]">{b.name}</p>
                      <p className="text-xs text-[#555]">{b.email}</p>
                    </td>
                    <td className="px-4 py-3.5 text-[#888] capitalize">{b.sector}</td>
                    <td className="px-4 py-3.5">
                      <span className={b.plan === 'pro' ? 'text-xs font-medium px-2 py-1 rounded-full bg-[#F5A623]/10 text-[#F5A623]' : 'text-xs font-medium px-2 py-1 rounded-full bg-[#333] text-[#888]'}>
                        {b.plan}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center text-[#888]">{b.deviceCount ?? 0}</td>
                    <td className="px-4 py-3.5 text-center text-[#888]">{(b.totalScans ?? 0).toLocaleString()}</td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={b.isActive ? 'inline-block w-2 h-2 rounded-full bg-[#22C55E]' : 'inline-block w-2 h-2 rounded-full bg-[#EF4444]'} />
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleResendAccess(b)}
                          disabled={resendingId === b.id}
                          className="text-xs bg-[#181818] hover:bg-[#222] text-[#888] hover:text-[#FAFAFA] border border-[#282828] px-2.5 py-1 rounded transition-colors disabled:opacity-50"
                          title="Reenviar email con nueva contraseña"
                        >
                          {resendingId === b.id ? '...' : '✉️ Reenviar'}
                        </button>
                        <Link
                          href={'/admin/businesses/' + b.id}
                          className="text-xs text-[#F5A623] hover:text-[#C47D0E] font-medium px-2 py-1"
                        >
                          Ver →
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <CreateBusinessModal
          onClose={() => setShowModal(false)}
          onCreated={handleCreated}
        />
      )}
    </AdminShell>
  )
}
