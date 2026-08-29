'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { adminApi, type BusinessSummary, type DeviceSummary, type CreateDevicePayload } from '@/lib/adminApi'
import { AdminShell } from '../../_components/AdminShell'
import { DeviceQrModal } from '@/components/DeviceQrModal'
import { QrCode, ExternalLink } from 'lucide-react'

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
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4'>
      <div className='bg-white border border-[#E7E5E4] rounded-3xl p-8 w-full max-w-md shadow-2xl'>
        <h2 className='text-xl font-extrabold text-[#111827] mb-5 tracking-tight'>Nuevo dispositivo</h2>
        {error && <div className='bg-red-50 border border-red-200 text-red-700 text-sm px-3.5 py-2.5 rounded-xl mb-4'>{error}</div>}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div><label className='block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-1.5'>Etiqueta (ej: Mesa 1)</label>
            <input required value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
              className='w-full bg-[#FBFBF9] border border-[#E7E5E4] rounded-xl px-4 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#18181B]' placeholder='Mesa 1' /></div>
          <div><label className='block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-1.5'>URL de destino</label>
            <input required type='url' value={form.destinationUrl} onChange={e => setForm(f => ({ ...f, destinationUrl: e.target.value }))}
              className='w-full bg-[#FBFBF9] border border-[#E7E5E4] rounded-xl px-4 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#18181B]' placeholder='https://g.page/r/.../review' /></div>
          <div><label className='block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-1.5'>Tipo de modelo</label>
            <select value={form.modelType} onChange={e => setForm(f => ({ ...f, modelType: e.target.value }))}
              className='w-full bg-[#FBFBF9] border border-[#E7E5E4] rounded-xl px-3 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#18181B]'>
              {MODEL_TYPES.map(m => <option key={m} value={m}>{m}</option>)}</select></div>
          <div className='flex gap-3 pt-2'>
            <button type='button' onClick={onClose} className='flex-1 py-2.5 rounded-xl border border-[#E7E5E4] text-[#78716C] hover:text-[#111827] hover:bg-[#F3EFE6] text-sm font-semibold transition-colors'>Cancelar</button>
            <button type='submit' disabled={loading} className='flex-1 py-2.5 rounded-xl bg-[#18181B] hover:bg-[#27272A] text-white font-bold disabled:opacity-50 text-sm transition-colors shadow-sm'>{loading ? 'Creando...' : 'Crear'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function DeviceRow({
  device,
  onUpdate,
  onViewQr,
}: {
  device: DeviceSummary
  onUpdate: (d: DeviceSummary) => void
  onViewQr: (d: DeviceSummary) => void
}) {
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
    <tr className='border-b border-[#E7E5E4] last:border-b-0 hover:bg-[#F3EFE6]/40 transition-colors'>
      <td className='px-5 py-3.5'>
        <p className='font-bold text-[#111827] text-sm'>{device.label}</p>
        <p className='text-xs text-[#78716C] capitalize'>{device.modelType}</p>
      </td>
      <td className='px-4 py-3.5'>
        <code className='text-xs bg-[#F3EFE6] border border-[#E5DFD3] px-2.5 py-1 rounded-lg text-[#18181B] font-mono font-bold'>
          {device.token}
        </code>
      </td>
      <td className='px-4 py-3.5 max-w-xs'>
        {editing ? (
          <div className='flex gap-2'>
            <input value={url} onChange={e => setUrl(e.target.value)} className='flex-1 bg-white border border-[#18181B] rounded-lg px-2.5 py-1 text-xs text-[#111827] focus:outline-none' autoFocus />
            <button onClick={saveUrl} disabled={saving} className='text-xs font-bold text-green-700 hover:text-green-800 px-2'>{saving ? '...' : 'OK'}</button>
            <button onClick={() => { setUrl(device.destinationUrl); setEditing(false) }} className='text-xs text-[#78716C] hover:text-[#111827] px-1'>X</button>
          </div>
        ) : (
          <button onClick={() => setEditing(true)} className='text-xs text-[#78716C] hover:text-[#111827] text-left group w-full font-medium' title={device.destinationUrl}>
            <span className='truncate block max-w-[200px]'>{device.destinationUrl}</span>
            <span className='text-[#B45309] font-semibold opacity-0 group-hover:opacity-100 text-xs'> editar</span>
          </button>
        )}
      </td>
      <td className='px-4 py-3.5 text-center text-[#111827] font-bold text-sm'>{(device.interactionCount ?? 0).toLocaleString()}</td>
      <td className='px-4 py-3.5 text-center text-xs text-[#78716C] font-medium'>{device.lastScan ? new Date(device.lastScan).toLocaleDateString('es-ES') : '--'}</td>
      <td className='px-4 py-3.5 text-center'><button onClick={toggleStatus}><span className={device.status === 'active' ? 'inline-block w-2.5 h-2.5 rounded-full bg-[#16A34A]' : 'inline-block w-2.5 h-2.5 rounded-full bg-[#DC2626]'} /></button></td>
      <td className='px-4 py-3.5 text-right'>
        <div className='flex items-center justify-end gap-2'>
          <button
            onClick={() => onViewQr(device)}
            className='inline-flex items-center gap-1 text-xs bg-[#FBFBF9] hover:bg-[#F3EFE6] border border-[#E7E5E4] hover:border-[#D6D3D1] text-[#111827] px-2.5 py-1.5 rounded-lg transition-colors font-bold'
            title='Ver QR y descargar vector SVG para modelado 3D'
          >
            <QrCode size={13} className='text-[#B45309]' />
            <span>QR / SVG</span>
          </button>
          <a
            href={'/t/' + device.token + '?src=qr'}
            target='_blank'
            rel='noopener noreferrer'
            className='text-xs text-[#78716C] hover:text-[#111827] px-1.5 py-1'
            title='Probar enlace de redirección'
          >
            <ExternalLink size={13} />
          </a>
        </div>
      </td>
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
  const [selectedQrDevice, setSelectedQrDevice] = useState<DeviceSummary | null>(null)
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
      <div className='p-8 max-w-6xl'>
        <div className='flex items-center gap-2 text-sm text-[#78716C] mb-6 font-medium'>
          <Link href='/admin/businesses' className='hover:text-[#111827]'>Negocios</Link>
          <span>/</span>
          <span className='text-[#111827] font-semibold'>{business?.name ?? '...'}</span>
        </div>
        {error && <div className='bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-6'>{error}</div>}
        {resendSuccess && <div className='bg-green-50 border border-green-200 text-green-800 text-sm px-4 py-3 rounded-xl mb-6'>✅ {resendSuccess}</div>}
        {resendError && <div className='bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3 rounded-xl mb-6'>❌ {resendError}</div>}
        {loading ? (
          <div className='space-y-4 animate-pulse'>
            <div className='h-24 bg-white border border-[#E7E5E4] rounded-3xl' />
            <div className='h-48 bg-white border border-[#E7E5E4] rounded-3xl' />
          </div>
        ) : business ? (
          <>
            <div className='bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-7 mb-6 shadow-xs'>
              <div className='flex flex-col sm:flex-row sm:items-start justify-between gap-4'>
                <div>
                  <h1 className='text-2xl font-extrabold text-[#111827] tracking-tight'>{business.name}</h1>
                  <p className='text-sm text-[#78716C] mt-0.5'>{business.email}</p>
                </div>
                <div className='flex flex-wrap items-center gap-2'>
                  <span className={business.plan === 'pro' ? 'text-xs font-bold px-2.5 py-1 rounded-full bg-[#F3EFE6] border border-[#E5DFD3] text-[#B45309]' : 'text-xs font-medium px-2.5 py-1 rounded-full bg-[#FBFBF9] border border-[#E7E5E4] text-[#78716C]'}>{business.plan}</span>
                  <span className='text-xs font-medium px-2.5 py-1 rounded-full bg-[#FBFBF9] border border-[#E7E5E4] text-[#78716C] capitalize'>{business.sector}</span>
                  <span className={business.isActive ? 'text-xs font-bold px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200' : 'text-xs font-bold px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200'}>{business.isActive ? 'Activo' : 'Inactivo'}</span>
                  <button
                    onClick={handleResendAccess}
                    disabled={resending}
                    className='ml-2 inline-flex items-center gap-1.5 bg-[#FBFBF9] hover:bg-[#F3EFE6] border border-[#E7E5E4] text-[#111827] text-xs font-bold px-3 py-1.5 rounded-xl transition-colors disabled:opacity-50'
                    title='Generar nueva contraseña temporal y enviar email de acceso'
                  >
                    <span>{resending ? 'Enviando email...' : '✉️ Reenviar email de acceso'}</span>
                  </button>
                </div>
              </div>
              <div className='mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-[#E7E5E4]'>
                <div><p className='text-xs uppercase font-bold text-[#A8A29E]'>Dispositivos</p><p className='text-xl font-extrabold text-[#111827] mt-0.5'>{business.deviceCount ?? 0}</p></div>
                <div><p className='text-xs uppercase font-bold text-[#A8A29E]'>Escaneos totales</p><p className='text-xl font-extrabold text-[#111827] mt-0.5'>{(business.totalScans ?? 0).toLocaleString()}</p></div>
                <div><p className='text-xs uppercase font-bold text-[#A8A29E]'>Fecha de Alta</p><p className='text-sm text-[#78716C] font-semibold mt-1'>{new Date(business.createdAt).toLocaleDateString('es-ES')}</p></div>
              </div>
            </div>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-xl font-extrabold text-[#111827] tracking-tight'>Dispositivos NFC</h2>
              <button onClick={() => setShowModal(true)} className='bg-[#18181B] hover:bg-[#27272A] text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors shadow-sm cursor-pointer'>+ Nuevo dispositivo</button>
            </div>
            <div className='bg-white border border-[#E7E5E4] rounded-2xl overflow-hidden shadow-xs'>
              <table className='w-full text-sm'>
                <thead><tr className='border-b border-[#E7E5E4] bg-[#FBFBF9] text-[#78716C] text-xs uppercase tracking-wider font-semibold'>
                  <th className='text-left px-5 py-3.5'>Etiqueta</th><th className='text-left px-4 py-3.5'>Token</th>
                  <th className='text-left px-4 py-3.5'>URL destino</th><th className='text-center px-4 py-3.5'>Escaneos</th>
                  <th className='text-center px-4 py-3.5'>Último</th><th className='text-center px-4 py-3.5'>Estado</th><th className='px-4 py-3.5 text-right'>Acciones</th>
                </tr></thead>
                <tbody>
                  {devices.length === 0 && <tr><td colSpan={7} className='text-center py-10 text-[#78716C]'>Sin dispositivos. Crea el primero.</td></tr>}
                  {devices.map(d => (
                    <DeviceRow
                      key={d.id}
                      device={d}
                      onUpdate={u => setDevices(prev => prev.map(x => x.id === u.id ? u : x))}
                      onViewQr={selected => setSelectedQrDevice(selected)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}
      </div>
      {showModal && business && <CreateDeviceModal businessId={business.id} onClose={() => setShowModal(false)} onCreated={d => { setDevices(prev => [...prev, d]); setShowModal(false) }} />}
      {selectedQrDevice && (
        <DeviceQrModal
          device={selectedQrDevice}
          onClose={() => setSelectedQrDevice(null)}
        />
      )}
    </AdminShell>
  )
}

