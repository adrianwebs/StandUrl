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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white border border-[#E7E5E4] rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-extrabold text-[#111827] mb-5 tracking-tight">Nuevo negocio</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3.5 py-2.5 rounded-xl mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-1.5">Nombre del negocio</label>
            <input
              required
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full bg-[#FBFBF9] border border-[#E7E5E4] rounded-xl px-4 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#18181B]"
              placeholder="Cafetería El Sol"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-1.5">Email del cliente</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full bg-[#FBFBF9] border border-[#E7E5E4] rounded-xl px-4 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#18181B]"
              placeholder="cliente@negocio.com"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-1.5">Sector</label>
              <select
                value={form.sector}
                onChange={e => setForm(f => ({ ...f, sector: e.target.value }))}
                className="w-full bg-[#FBFBF9] border border-[#E7E5E4] rounded-xl px-3 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#18181B]"
              >
                {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-1.5">Plan</label>
              <select
                value={form.plan}
                onChange={e => setForm(f => ({ ...f, plan: e.target.value }))}
                className="w-full bg-[#FBFBF9] border border-[#E7E5E4] rounded-xl px-3 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#18181B]"
              >
                {PLANS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <p className="text-xs text-[#78716C]">
            Se enviará un email con la contraseña temporal al correo del cliente.
          </p>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-[#E7E5E4] text-[#78716C] hover:text-[#111827] hover:bg-[#F3EFE6] transition-colors text-sm font-semibold">
              Cancelar
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-[#18181B] hover:bg-[#27272A] text-white font-bold disabled:opacity-50 text-sm transition-colors shadow-sm">
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
      <div className="p-8 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">Negocios Registrados</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#18181B] hover:bg-[#27272A] text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors shadow-sm cursor-pointer"
          >
            + Nuevo negocio
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {feedback && (
          <div
            className={`text-sm px-4 py-3 rounded-xl mb-4 border ${
              feedback.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            {feedback.type === 'success' ? '✅ ' : '❌ '}
            {feedback.text}
          </div>
        )}

        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 bg-white border border-[#E7E5E4] rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#E7E5E4] rounded-2xl overflow-hidden shadow-xs">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E7E5E4] bg-[#FBFBF9] text-[#78716C] text-xs uppercase tracking-wider font-semibold">
                  <th className="text-left px-5 py-3.5">Negocio</th>
                  <th className="text-left px-4 py-3.5">Sector</th>
                  <th className="text-left px-4 py-3.5">Plan</th>
                  <th className="text-center px-4 py-3.5">Dispositivos</th>
                  <th className="text-center px-4 py-3.5">Escaneos</th>
                  <th className="text-center px-4 py-3.5">Estado</th>
                  <th className="px-4 py-3.5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {businesses.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-[#78716C]">
                      No hay negocios todavía
                    </td>
                  </tr>
                )}
                {businesses.map(b => (
                  <tr key={b.id} className="border-b border-[#E7E5E4] last:border-b-0 hover:bg-[#F3EFE6]/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <p className="font-bold text-[#111827]">{b.name}</p>
                      <p className="text-xs text-[#78716C]">{b.email}</p>
                    </td>
                    <td className="px-4 py-3.5 text-[#78716C] capitalize font-medium">{b.sector}</td>
                    <td className="px-4 py-3.5">
                      <span className={b.plan === 'pro' ? 'text-xs font-bold px-2.5 py-1 rounded-full bg-[#F3EFE6] border border-[#E5DFD3] text-[#B45309]' : 'text-xs font-medium px-2.5 py-1 rounded-full bg-[#FBFBF9] border border-[#E7E5E4] text-[#78716C]'}>
                        {b.plan}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center font-bold text-[#111827]">{b.deviceCount ?? 0}</td>
                    <td className="px-4 py-3.5 text-center font-bold text-[#111827]">{(b.totalScans ?? 0).toLocaleString()}</td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={b.isActive ? 'inline-block w-2.5 h-2.5 rounded-full bg-[#16A34A]' : 'inline-block w-2.5 h-2.5 rounded-full bg-[#DC2626]'} />
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleResendAccess(b)}
                          disabled={resendingId === b.id}
                          className="text-xs bg-[#FBFBF9] hover:bg-[#F3EFE6] text-[#78716C] hover:text-[#111827] border border-[#E7E5E4] px-2.5 py-1.5 rounded-lg transition-colors disabled:opacity-50 font-medium"
                          title="Reenviar email con nueva contraseña"
                        >
                          {resendingId === b.id ? '...' : '✉️ Reenviar'}
                        </button>
                        <Link
                          href={'/admin/businesses/' + b.id}
                          className="text-xs text-[#18181B] hover:text-[#B45309] font-bold px-2 py-1"
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

