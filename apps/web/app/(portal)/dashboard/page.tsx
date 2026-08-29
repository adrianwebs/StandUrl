'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import {
  clientApi,
  type BusinessProfile,
  type ClientStats,
  type ClientDevice,
} from '@/lib/clientApi'
import {
  QrCode,
  ExternalLink,
  Edit3,
  Check,
  X,
  Lock,
  LogOut,
  TrendingUp,
  TrendingDown,
  Smartphone,
  Sparkles,
  Copy,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Loader2,
  ShieldCheck,
  Layers,
  Flame,
} from 'lucide-react'
import { DeviceQrModal } from '@/components/DeviceQrModal'

import Logo from '@/components/Logo'

// Modal para cambiar contraseña
function ChangePasswordModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const { token } = useAuth()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  if (!isOpen) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (newPassword.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres.')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas nuevas no coinciden.')
      return
    }

    setLoading(true)
    try {
      await clientApi.changePassword(token!, { currentPassword, newPassword })
      setSuccess('¡Contraseña actualizada correctamente!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => {
        setSuccess('')
        onClose()
      }, 1800)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al cambiar la contraseña')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 text-[#111827] font-bold text-lg">
            <Lock size={20} className="text-[#B45309]" />
            <span>Cambiar contraseña</span>
          </div>
          <button
            onClick={onClose}
            className="text-[#78716C] hover:text-[#111827] transition-colors p-1.5 rounded-lg hover:bg-[#F3EFE6]"
          >
            <X size={18} />
          </button>
        </div>

        {error && (
          <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 text-sm px-3.5 py-2.5 rounded-xl mb-4">
            <AlertCircle size={17} className="shrink-0 mt-0.5 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-start gap-2.5 bg-green-50 border border-green-200 text-green-700 text-sm px-3.5 py-2.5 rounded-xl mb-4">
            <CheckCircle2 size={17} className="shrink-0 mt-0.5 text-green-600" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-1.5">
              Contraseña actual
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              className="w-full bg-[#FBFBF9] border border-[#E7E5E4] rounded-xl px-4 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#18181B] transition-colors"
              placeholder="••••••••••••"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-1.5">
              Nueva contraseña
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full bg-[#FBFBF9] border border-[#E7E5E4] rounded-xl px-4 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#18181B] transition-colors"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-1.5">
              Confirmar nueva contraseña
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full bg-[#FBFBF9] border border-[#E7E5E4] rounded-xl px-4 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#18181B] transition-colors"
              placeholder="Repite la nueva contraseña"
            />
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-[#E7E5E4] text-[#78716C] hover:text-[#111827] hover:bg-[#F3EFE6] transition-colors text-sm font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-[#18181B] hover:bg-[#27272A] text-white font-bold text-sm disabled:opacity-50 transition-colors shadow-sm"
            >
              {loading ? 'Guardando...' : 'Actualizar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Tarjeta interactiva de un dispositivo / Stand NFC
function DeviceCard({
  device,
  onUpdate,
}: {
  device: ClientDevice
  onUpdate: (updated: ClientDevice) => void
}) {
  const { token } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [newUrl, setNewUrl] = useState(device.destinationUrl)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [successToast, setSuccessToast] = useState(false)
  const [showQrModal, setShowQrModal] = useState(false)
  const [copiedToken, setCopiedToken] = useState(false)

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://standurl.com'
  const directLink = `${origin}/t/${device.token}`

  async function handleSaveUrl(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    let urlToSave = newUrl.trim()
    if (!urlToSave) {
      setError('La URL no puede estar vacía.')
      return
    }

    if (!urlToSave.startsWith('http://') && !urlToSave.startsWith('https://')) {
      urlToSave = 'https://' + urlToSave
      setNewUrl(urlToSave)
    }

    if (urlToSave === device.destinationUrl) {
      setIsEditing(false)
      return
    }

    setSaving(true)
    try {
      const updated = await clientApi.updateDevice(token!, device.id, {
        destinationUrl: urlToSave,
      })
      onUpdate(updated)
      setIsEditing(false)
      setSuccessToast(true)
      setTimeout(() => setSuccessToast(false), 3000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al guardar la URL')
    } finally {
      setSaving(false)
    }
  }

  function copyTokenLink() {
    navigator.clipboard.writeText(directLink)
    setCopiedToken(true)
    setTimeout(() => setCopiedToken(false), 2000)
  }

  return (
    <div className="bg-white border border-[#E7E5E4] hover:border-[#D6D3D1] rounded-3xl p-5 sm:p-6 transition-all shadow-sm hover:shadow-md flex flex-col justify-between">
      <div>
        {/* Cabecera de la tarjeta */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F3EFE6] border border-[#E5DFD3] flex items-center justify-center text-[#18181B] shadow-xs">
              <Smartphone size={20} />
            </div>
            <div>
              <h3 className="font-bold text-[#111827] text-base leading-tight">
                {device.label}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] font-mono uppercase bg-[#F3EFE6] border border-[#E5DFD3] text-[#78716C] px-2 py-0.5 rounded font-medium">
                  {device.modelType}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-green-700 font-semibold bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                  Activo
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowQrModal(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-[#111827] hover:text-black bg-[#F3EFE6] hover:bg-[#E5DFD3] border border-[#E5DFD3] px-3 py-1.5 rounded-xl transition-colors shadow-2xs"
            title="Ver código QR"
          >
            <QrCode size={14} className="text-[#B45309]" />
            <span>Ver QR</span>
          </button>
        </div>

        {/* URL de Destino (Configuración activa) */}
        <div className="bg-[#FBFBF9] border border-[#E7E5E4] rounded-2xl p-3.5 mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716C]">
              Destino actual (NFC + QR)
            </span>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1 text-xs text-[#B45309] hover:text-[#92400E] font-bold transition-colors"
              >
                <Edit3 size={12} />
                <span>Cambiar enlace</span>
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSaveUrl} className="space-y-2 mt-2">
              <input
                type="text"
                value={newUrl}
                onChange={e => setNewUrl(e.target.value)}
                placeholder="https://g.page/r/.../review o https://instagram.com/..."
                className="w-full bg-white border border-[#18181B] rounded-xl px-3 py-2 text-xs text-[#111827] focus:outline-none focus:ring-1 focus:ring-[#18181B]"
                autoFocus
              />
              {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#18181B] hover:bg-[#27272A] text-white font-bold text-xs disabled:opacity-50 transition-colors"
                >
                  {saving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                  <span>Guardar cambio</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNewUrl(device.destinationUrl)
                    setIsEditing(false)
                    setError('')
                  }}
                  className="px-3 py-1.5 rounded-lg border border-[#E7E5E4] text-[#78716C] hover:text-[#111827] hover:bg-[#F3EFE6] text-xs transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <span
                className="text-xs text-[#111827] font-medium truncate block max-w-[260px] sm:max-w-[320px]"
                title={device.destinationUrl}
              >
                {device.destinationUrl}
              </span>
              <a
                href={device.destinationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#78716C] hover:text-[#111827] p-1 transition-colors"
                title="Abrir destino en pestaña nueva"
              >
                <ExternalLink size={13} />
              </a>
            </div>
          )}

          {successToast && (
            <div className="flex items-center gap-1.5 text-xs text-green-700 font-semibold mt-2 pt-2 border-t border-[#E7E5E4]">
              <CheckCircle2 size={13} />
              <span>¡Enlace actualizado al instante en tu objeto NFC!</span>
            </div>
          )}
        </div>

        {/* Datos técnicos y prueba */}
        <div className="grid grid-cols-2 gap-2 text-xs text-[#78716C] pt-1">
          <div>
            <span className="block text-[10px] uppercase font-bold text-[#A8A29E]">Token Stand</span>
            <button
              onClick={copyTokenLink}
              className="font-mono font-semibold text-[#111827] hover:text-[#B45309] flex items-center gap-1 mt-0.5 group"
              title="Copiar enlace de redirección"
            >
              <span>{device.token}</span>
              {copiedToken ? (
                <Check size={11} className="text-green-600" />
              ) : (
                <Copy size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
          </div>
          <div className="text-right">
            <span className="block text-[10px] uppercase font-bold text-[#A8A29E]">Escaneos</span>
            <span className="font-extrabold text-[#111827] text-sm">
              {(device.interactionCount ?? 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Footer de la tarjeta con acción rápida */}
      <div className="mt-4 pt-3 border-t border-[#E7E5E4] flex items-center justify-between">
        <a
          href={`/t/${device.token}?src=qr`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#78716C] hover:text-[#111827] font-semibold flex items-center gap-1 transition-colors"
        >
          <span>Probar toque NFC / Escaneo QR</span>
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Modal QR */}
      {showQrModal && (
        <DeviceQrModal device={device} onClose={() => setShowQrModal(false)} />
      )}
    </div>
  )
}

export default function ClientDashboardPage() {
  const { token, name, logout, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  const [business, setBusiness] = useState<BusinessProfile | null>(null)
  const [stats, setStats] = useState<ClientStats | null>(null)
  const [devices, setDevices] = useState<ClientDevice[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [error, setError] = useState('')
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  const fetchData = useCallback(async () => {
    if (!token) return
    setLoadingData(true)
    setError('')
    try {
      const [profileRes, statsRes, devicesRes] = await Promise.all([
        clientApi.getMe(token),
        clientApi.getMyStats(token),
        clientApi.getMyDevices(token),
      ])
      setBusiness(profileRes)
      setStats(statsRes)
      setDevices(devicesRes)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al cargar los datos del panel')
    } finally {
      setLoadingData(false)
    }
  }, [token])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login')
      return
    }
    if (token) {
      fetchData()
    }
  }, [isLoading, isAuthenticated, token, router, fetchData])

  function handleLogout() {
    logout()
    router.replace('/login')
  }

  if (isLoading || (!isAuthenticated && !business)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFBF9]">
        <div className="w-8 h-8 border-2 border-[#18181B] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-[#111827] flex flex-col selection:bg-[#F3EFE6] selection:text-[#18181B]">
      {/* Top Navbar */}
      <header className="bg-[#FBFBF9]/90 backdrop-blur-md border-b border-[#E7E5E4] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="inline-flex items-center">
              <Logo variant="horizontal" theme="dark" height={26} />
            </Link>
            <span className="hidden sm:inline-block text-xs bg-[#F3EFE6] border border-[#E5DFD3] text-[#78716C] px-2.5 py-0.5 rounded-full font-semibold">
              Portal del Cliente
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111827] hover:text-black bg-white hover:bg-[#F3EFE6] border border-[#E7E5E4] px-3.5 py-2 rounded-xl transition-colors shadow-2xs"
            >
              <Lock size={13} className="text-[#B45309]" />
              <span className="hidden sm:inline">Cambiar contraseña</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#78716C] hover:text-red-600 bg-white hover:bg-red-50 border border-[#E7E5E4] hover:border-red-200 px-3.5 py-2 rounded-xl transition-colors"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Banner de Bienvenida */}
        <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#F3EFE6] rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#B45309] bg-[#F3EFE6] border border-[#E5DFD3] px-2.5 py-0.5 rounded-full">
                  <Sparkles size={11} /> {business?.plan ? `Plan ${business.plan}` : 'Cliente'}
                </span>
                {business?.sector && (
                  <span className="text-[11px] capitalize text-[#78716C] bg-[#FBFBF9] px-2.5 py-0.5 rounded-full border border-[#E7E5E4] font-medium">
                    {business.sector}
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
                {business?.name || name || 'Tu Negocio'}
              </h1>
              <p className="text-sm text-[#78716C] mt-1">
                Configura los destinos de tus stands y analiza el impacto de las reseñas en Google.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto bg-[#F3EFE6] border border-[#E5DFD3] px-4 py-2.5 rounded-2xl">
              <ShieldCheck size={18} className="text-green-600" />
              <div className="text-left">
                <p className="text-[10px] uppercase font-bold text-[#78716C]">Estado de la cuenta</p>
                <p className="text-xs font-bold text-green-700">Verificada y activa</p>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-2xl">
            <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Tarjetas de Métricas / Estadísticas */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#A8A29E] mb-3">
            Rendimiento e interacciones
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Escaneos este mes */}
            <div className="bg-white border border-[#E7E5E4] rounded-3xl p-5 shadow-xs hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between text-[#78716C] mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A8A29E]">Escaneos este mes</span>
                <Flame size={16} className="text-[#B45309]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#111827]">
                  {loadingData ? '--' : (stats?.thisMonth ?? 0).toLocaleString()}
                </span>
                {stats && stats.trendPercent !== 0 && (
                  <span
                    className={`inline-flex items-center text-xs font-bold ${
                      stats.trendPercent > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stats.trendPercent > 0 ? <TrendingUp size={13} className="mr-0.5" /> : <TrendingDown size={13} className="mr-0.5" />}
                    {stats.trendPercent > 0 ? `+${stats.trendPercent}%` : `${stats.trendPercent}%`}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#78716C] mt-1">Total de clientes que tocaron tu NFC este mes</p>
            </div>

            {/* Escaneos mes anterior */}
            <div className="bg-white border border-[#E7E5E4] rounded-3xl p-5 shadow-xs hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between text-[#78716C] mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A8A29E]">Mes anterior</span>
                <Layers size={16} className="text-[#78716C]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#78716C]">
                  {loadingData ? '--' : (stats?.lastMonth ?? 0).toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-[#78716C] mt-1">Interacciones registradas el mes pasado</p>
            </div>

            {/* Stands activos */}
            <div className="bg-white border border-[#E7E5E4] rounded-3xl p-5 shadow-xs hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between text-[#78716C] mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A8A29E]">Stands Vinculados</span>
                <Smartphone size={16} className="text-[#18181B]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#111827]">
                  {loadingData ? '--' : devices.length}
                </span>
              </div>
              <p className="text-xs text-[#78716C] mt-1">Dispositivos físicos 3D con chip NFC</p>
            </div>
          </div>
        </section>

        {/* Sección de Dispositivos / Stands NFC */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#111827]">Tus Stands y Objetos NFC</h2>
              <p className="text-xs text-[#78716C]">
                Puedes cambiar el destino de cualquier stand cuando quieras. El cambio se aplica en tiempo real sin reprogramar el chip.
              </p>
            </div>
          </div>

          {loadingData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-52 bg-white border border-[#E7E5E4] rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : devices.length === 0 ? (
            <div className="bg-white border border-[#E7E5E4] rounded-3xl p-10 text-center space-y-3 shadow-sm">
              <Smartphone size={36} className="mx-auto text-[#A8A29E]" />
              <h3 className="font-bold text-[#111827] text-base">Aún no tienes dispositivos registrados</h3>
              <p className="text-xs text-[#78716C] max-w-md mx-auto">
                Tu pedido de StandUrl está siendo preparado. En cuanto el equipo técnico active tus objetos NFC, aparecerán aquí para que los gestiones.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {devices.map(device => (
                <DeviceCard
                  key={device.id}
                  device={device}
                  onUpdate={updated => {
                    setDevices(prev => prev.map(d => (d.id === updated.id ? updated : d)))
                  }}
                />
              ))}
            </div>
          )}
        </section>

        {/* Guía práctica para el cliente */}
        <section className="bg-[#F3EFE6]/70 border border-[#E5DFD3] rounded-3xl p-6 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-sm font-bold text-[#111827]">
            <HelpCircle size={17} className="text-[#B45309]" />
            <span>¿Cómo sacar el máximo partido a tu StandUrl?</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#78716C] pt-1">
            <div className="space-y-1">
              <strong className="text-[#111827] font-bold block">1. Enlace directo de reseñas</strong>
              <p>
                Obtén el enlace corto de tu perfil de Google Business para que el cliente caiga directamente en la ventana de 5 estrellas.
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-[#111827] font-bold block">2. Cambia de campaña al instante</strong>
              <p>
                ¿Quieres promocionar tu Instagram, un sorteo o la carta esta semana? Cambia la URL arriba y el stand se actualizará en segundos.
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-[#111827] font-bold block">3. Ubicación estratégica</strong>
              <p>
                Coloca tu Stand en el mostrador de cobro o en mesas principales para maximizar el ratio de escaneo.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E7E5E4] py-6 text-center text-xs text-[#78716C] mt-auto">
        © {new Date().getFullYear()} StandUrl · Si necesitas ayuda con tus dispositivos, contacta a{' '}
        <a href="mailto:hola@standurl.com" className="text-[#111827] font-bold hover:underline transition-colors">
          hola@standurl.com
        </a>
      </footer>

      {/* Modal Cambio de Contraseña */}
      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  )
}

