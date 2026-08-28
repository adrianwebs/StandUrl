'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { adminApi, type BusinessSummary, type DeviceSummary, type CreateDevicePayload } from '@/lib/adminApi'
import { AdminShell } from '../../_components/AdminShell'

const MODEL_TYPES = ['generico', 'pesa', 'tijeras', 'taza', 'plato']

function CreateDeviceModal({ businessId, onClose, onCreated }: { businessId: string; onClose: () => void; onCreated: (d: DeviceSummary) => void }) {
  const { token } = useAuth()
  const [form, setForm] = useState<CreateDevicePayload>({ label: '', destinationUrl: '', modelType: 'generico' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(''); setLoading(true)
    try { const d = await adminApi.createDevice(token!, businessId, form); onCreated(d) }
    catch (err: unknown) { setError(err instanceof Error ? err.message : 'Error'); setLoading(false) }
  }

  return (
    <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4'>
      <div className='bg-[#111] border border-[#222] rounded-2xl p-8 w-full max-w-md'>
        <h2 className='text-lg font-semibold text-[#FAFAFA] mb-5'>Nuevo dispositivo</h2>
        {error && <div className='bg-red-900/20 border border-red-500/30 text-red-400 text-sm px-3 py-2 rounded-lg mb-4'>{error}</div>}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div><label className='block text-sm text-[#888] mb-1'>Etiqueta (ej: Mesa 1)</label>
            <input required value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
              className='w-full bg-[#1A1A1A] border border-[#333] rounded-lg px-4 py-2.5 text-[#FAFAFA] focus:outline-none focus:border-[#F5A623]' placeholder='Mesa 1' /></div>
          <div><label className='block text-sm text-[#888] mb-1'>URL de destino</label>
            <input required type='url' value={form.destinationUrl} onChange={e => setForm(f => ({ ...f, destinationUrl: e.target.value }))}
              className='w-full bg-[#1A1A1A] border border-[#333] rounded-lg px-4 py-2.5 text-[#FAFAFA] focus:outline-none focus:border-[#F5A623]' placeholder='https://g.page/r/.../review' /></div>
          <div><label className='block text-sm text-[#888] mb-1'>Tipo de modelo</label>
            <select value={form.modelType} onChange={e => setForm(f => ({ ...f, modelType: e.target.value }))}
              className='w-full bg-[#1A1A1A] border border-[#333] rounded-lg px-3 py-2.5 text-[#FAFAFA] focus:outline-none focus:border-[#F5A623]'>
              {MODEL_TYPES.map(m => <option key={m} value={m}>{m}</option>)}</select></div>
          <div className='flex gap-3 pt-2'>
            <button type='button' onClick={onClose} className='flex-1 py-2.5 rounded-lg border border-[#333] text-[#888] hover:text-[#FAFAFA] text-sm'>Cancelar</button>
            <button type='submit' disabled={loading} className='flex-1 py-2.5 rounded-lg bg-[#F5A623] hover:bg-[#C47D0E] text-[#0A0A0A] font-bold disabled:opacity-50 text-sm'>{loading ? 'Creando...' : 'Crear'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function DeviceRow({ device, onUpdate }: { device: DeviceSummary; onUpdate: (d: DeviceSummary) => void }) {
  const { token } = useAuth()
  const [editing, setEditing] = useState(false)
  const [url, setUrl] = useState(device.destinationUrl)
  const [saving, setSaving] = useState(false)

  async function saveUrl() {
    if (url === device.destinationUrl) { setEditing(false); return }
    setSaving(true)
    try { const u = await adminApi.updateDevice(token!, device.id, { destinationUrl: url }); onUpdate(u); setEditing(false) }
    catch { setUrl(device.destinationUrl) } finally { setSaving(false) }
  }

  async function toggleStatus() {
    const s = device.status === 'active' ? 'inactive' : 'active'
    try { const u = await adminApi.updateDevice(token!, device.id, { status: s }); onUpdate(u) } catch { }
  }

  return (
    <tr className='border-b border-[#1A1A1A] hover:bg-[#1A1A1A] transition-colors'>
      <td className='px-5 py-3.5'><p className='font-medium text-[#FAFAFA] text-sm'>{device.label}</p><p className='text-xs text-[#555]'>{device.modelType}</p></td>
      <td className='px-4 py-3.5'><code className='text-xs bg-[#1A1A1A] border border-[#222] px-2 py-1 rounded text-[#F5A623] font-mono'>{device.token}</code></td>
      <td className='px-4 py-3.5 max-w-xs'>
        {editing ? (
          <div className='flex gap-2'>
            <input value={url} onChange={e => setUrl(e.target.value)} className='flex-1 bg-[#0A0A0A] border border-[#F5A623] rounded px-2 py-1 text-xs text-[#FAFAFA] focus:outline-none' autoFocus />
            <button onClick={saveUrl} disabled={saving} className='text-xs text-green-400 px-2'>{saving ? '...' : 'OK'}</button>
            <button onClick={() => { setUrl(device.destinationUrl); setEditing(false) }} className='text-xs text-[#888] px-1'>X</button>
          </div>
        ) : (
          <button onClick={() => setEditing(true)} className='text-xs text-[#888] hover:text-[#FAFAFA] text-left group w-full' title={device.destinationUrl}>
            <span className='truncate block max-w-[200px]'>{device.destinationUrl}</span>
            <span className='text-[#F5A623] opacity-0 group-hover:opacity-100 text-xs'> editar</span>
          </button>
        )}
      </td>
      <td className='px-4 py-3.5 text-center text-[#888] text-sm'>{(device.interactionCount ?? 0).toLocaleString()}</td>
      <td className='px-4 py-3.5 text-center text-xs text-[#555]'>{device.lastScan ? new Date(device.lastScan).toLocaleDateString('es-ES') : '--'}</td>
      <td className='px-4 py-3.5 text-center'><button onClick={toggleStatus}><span className={device.status === 'active' ? 'inline-block w-2.5 h-2.5 rounded-full bg-green-500' : 'inline-block w-2.5 h-2.5 rounded-full bg-red-500'} /></button></td>
      <td className='px-4 py-3.5 text-right'><a href={'/t/' + device.token + '?src=qr'} target='_blank' rel='noopener noreferrer' className='text-xs text-[#555] hover:text-[#F5A623]'>Probar</a></td>
    </tr>
  )
}

export default function BusinessDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { token } = useAuth()
  const [business, setBusiness] = useState<BusinessSummary | null>(null)
  const [devices, setDevices] = useState<DeviceSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState('')
  const [resending, setResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState('')
  const [resendError, setResendError] = useState('')

  useEffect(() => {
    if (!token || !id) return
    Promise.all([adminApi.getBusiness(token, id), adminApi.getDevices(token, id)])
      .then(([b, d]) => { setBusiness(b); setDevices(d) })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [token, id])

  async function handleResendAccess() {
    if (!business || !token) return
    const confirmed = window.confirm(
      `¿Deseas generar una nueva contraseña temporal y reenviar el email de acceso a "${business.email}"?`
    )
    if (!confirmed) return

    setResending(true)
    setResendSuccess('')
    setResendError('')
    try {
      const res = await adminApi.resendAccess(token, business.id)
      setResendSuccess(res.message || `Email de acceso reenviado con éxito a ${business.email}`)
      setTimeout(() => setResendSuccess(''), 5000)
    } catch (err: unknown) {
      setResendError(err instanceof Error ? err.message : 'Error al reenviar el email de acceso')
    } finally {
      setResending(false)
    }
  }

  return (
    <AdminShell>
      <div className='p-8'>
        <div className='flex items-center gap-2 text-sm text-[#555] mb-6'>
          <Link href='/admin/businesses' className='hover:text-[#F5A623]'>Negocios</Link>
          <span>/</span>
          <span className='text-[#888]'>{business?.name ?? '...'}</span>
        </div>
        {error && <div className='bg-red-900/20 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg mb-6'>{error}</div>}
        {resendSuccess && <div className='bg-green-900/30 border border-green-500/40 text-green-300 text-sm px-4 py-3 rounded-lg mb-6'>✅ {resendSuccess}</div>}
        {resendError && <div className='bg-red-900/30 border border-red-500/40 text-red-300 text-sm px-4 py-3 rounded-lg mb-6'>❌ {resendError}</div>}
        {loading ? (
          <div className='space-y-4 animate-pulse'>
            <div className='h-24 bg-[#111] border border-[#222] rounded-xl' />
            <div className='h-48 bg-[#111] border border-[#222] rounded-xl' />
          </div>
        ) : business ? (
          <>
            <div className='bg-[#111] border border-[#222] rounded-xl p-6 mb-6'>
              <div className='flex flex-col sm:flex-row sm:items-start justify-between gap-4'>
                <div>
                  <h1 className='text-xl font-bold text-[#FAFAFA]'>{business.name}</h1>
                  <p className='text-sm text-[#555] mt-0.5'>{business.email}</p>
                </div>
                <div className='flex flex-wrap items-center gap-2'>
                  <span className={business.plan === 'pro' ? 'text-xs font-medium px-2 py-1 rounded-full bg-[#F5A623]/10 text-[#F5A623]' : 'text-xs font-medium px-2 py-1 rounded-full bg-[#333] text-[#888]'}>{business.plan}</span>
                  <span className='text-xs font-medium px-2 py-1 rounded-full bg-[#333] text-[#888] capitalize'>{business.sector}</span>
                  <span className={business.isActive ? 'text-xs font-medium px-2 py-1 rounded-full bg-green-500/10 text-green-400' : 'text-xs font-medium px-2 py-1 rounded-full bg-red-500/10 text-red-400'}>{business.isActive ? 'Activo' : 'Inactivo'}</span>
                  <button
                    onClick={handleResendAccess}
                    disabled={resending}
                    className='ml-2 inline-flex items-center gap-1.5 bg-[#1F1F1F] hover:bg-[#2A2A2A] border border-[#333] hover:border-[#F5A623]/40 text-[#FAFAFA] hover:text-[#F5A623] text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50'
                    title='Generar nueva contraseña temporal y enviar email de acceso'
                  >
                    <span>{resending ? 'Enviando email...' : '✉️ Reenviar email de acceso'}</span>
                  </button>
                </div>
              </div>
              <div className='mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-[#1A1A1A]'>
                <div><p className='text-xs text-[#555]'>Dispositivos</p><p className='text-lg font-bold text-[#FAFAFA]'>{business.deviceCount ?? 0}</p></div>
                <div><p className='text-xs text-[#555]'>Escaneos totales</p><p className='text-lg font-bold text-[#FAFAFA]'>{(business.totalScans ?? 0).toLocaleString()}</p></div>
                <div><p className='text-xs text-[#555]'>Alta</p><p className='text-sm text-[#888]'>{new Date(business.createdAt).toLocaleDateString('es-ES')}</p></div>
              </div>
            </div>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-lg font-semibold text-[#FAFAFA]'>Dispositivos</h2>
              <button onClick={() => setShowModal(true)} className='bg-[#F5A623] hover:bg-[#C47D0E] text-[#0A0A0A] font-bold px-4 py-2 rounded-lg text-sm'>+ Nuevo dispositivo</button>
            </div>
            <div className='bg-[#111] border border-[#222] rounded-xl overflow-hidden'>
              <table className='w-full text-sm'>
                <thead><tr className='border-b border-[#222] text-[#555] text-xs uppercase'>
                  <th className='text-left px-5 py-3'>Etiqueta</th><th className='text-left px-4 py-3'>Token</th>
                  <th className='text-left px-4 py-3'>URL destino</th><th className='text-center px-4 py-3'>Escaneos</th>
                  <th className='text-center px-4 py-3'>Ultimo</th><th className='text-center px-4 py-3'>Estado</th><th className='px-4 py-3' />
                </tr></thead>
                <tbody>
                  {devices.length === 0 && <tr><td colSpan={7} className='text-center py-10 text-[#555]'>Sin dispositivos. Crea el primero.</td></tr>}
                  {devices.map(d => <DeviceRow key={d.id} device={d} onUpdate={u => setDevices(prev => prev.map(x => x.id === u.id ? u : x))} />)}
                </tbody>
              </table>
            </div>
          </>
        ) : null}
      </div>
      {showModal && business && <CreateDeviceModal businessId={business.id} onClose={() => setShowModal(false)} onCreated={d => { setDevices(prev => [...prev, d]); setShowModal(false) }} />}
    </AdminShell>
  )
}
