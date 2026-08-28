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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-[#111] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 text-[#FAFAFA] font-bold text-lg">
            <Lock size={20} className="text-[#F5A623]" />
            <span>Cambiar contraseña</span>
          </div>
          <button
            onClick={onClose}
            className="text-[#666] hover:text-[#FAFAFA] transition-colors p-1 rounded-lg hover:bg-[#222]"
          >
            <X size={18} />
          </button>
        </div>

        {error && (
          <div className="flex items-start gap-2.5 bg-red-950/40 border border-red-500/30 text-red-300 text-sm px-3.5 py-2.5 rounded-xl mb-4">
            <AlertCircle size={17} className="shrink-0 mt-0.5 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-start gap-2.5 bg-green-950/40 border border-green-500/30 text-green-300 text-sm px-3.5 py-2.5 rounded-xl mb-4">
            <CheckCircle2 size={17} className="shrink-0 mt-0.5 text-green-400" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#888] mb-1.5">
              Contraseña actual
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              className="w-full bg-[#181818] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-sm text-[#FAFAFA] focus:outline-none focus:border-[#F5A623] transition-colors"
              placeholder="••••••••••••"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#888] mb-1.5">
              Nueva contraseña
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full bg-[#181818] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-sm text-[#FAFAFA] focus:outline-none focus:border-[#F5A623] transition-colors"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#888] mb-1.5">
              Confirmar nueva contraseña
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full bg-[#181818] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-sm text-[#FAFAFA] focus:outline-none focus:border-[#F5A623] transition-colors"
              placeholder="Repite la nueva contraseña"
            />
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-[#333] text-[#888] hover:text-[#FAFAFA] hover:bg-[#1A1A1A] transition-colors text-sm font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-[#F5A623] hover:bg-[#E59512] text-[#0A0A0A] font-bold text-sm disabled:opacity-50 transition-colors shadow-md shadow-[#F5A623]/20"
            >
              {loading ? 'Guardando...' : 'Actualizar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Modal para ver y descargar QR
function QrModal({
  device,
  onClose,
}: {
  device: ClientDevice | null
  onClose: () => void
}) {
  const [copied, setCopied] = useState(false)
  if (!device) return null

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://standurl.com'
  const redirectUrl = `${origin}/t/${device.token}?src=qr`
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${encodeURIComponent(
    redirectUrl
  )}&bgcolor=FFFFFF&color=0A0A0A&margin=15`

  function copyLink() {
    navigator.clipboard.writeText(redirectUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-[#111] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8 w-full max-w-sm text-center shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="text-left">
            <h3 className="font-bold text-[#FAFAFA] text-base">{device.label}</h3>
            <p className="text-xs text-[#777]">Código QR asociado al Stand NFC</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#666] hover:text-[#FAFAFA] transition-colors p-1 rounded-lg hover:bg-[#222]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="bg-white p-4 rounded-2xl inline-block my-3 shadow-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qrImageUrl} alt={`QR ${device.label}`} className="w-56 h-56 mx-auto object-contain" />
        </div>

        <p className="text-xs text-[#888] mb-4">
          Este QR redirige en tiempo real a la URL que configures para este stand.
        </p>

        <div className="flex flex-col gap-2">
          <button
            onClick={copyLink}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-[#222] border border-[#333] text-xs font-semibold text-[#FAFAFA] transition-colors"
          >
            {copied ? (
              <>
                <Check size={14} className="text-green-400" />
                <span className="text-green-400">Enlace copiado</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copiar enlace directo</span>
              </>
            )}
          </button>

          <a
            href={qrImageUrl}
            download={`QR-${device.label.replace(/\s+/g, '_')}.png`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F5A623] hover:bg-[#E59512] text-[#0A0A0A] text-xs font-bold transition-colors"
          >
            Descargar imagen QR
          </a>
        </div>
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
    <div className="bg-[#111] border border-[#222] hover:border-[#333] rounded-2xl p-5 sm:p-6 transition-all shadow-lg flex flex-col justify-between">
      <div>
        {/* Cabecera de la tarjeta */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#F5A623] shadow-inner">
              <Smartphone size={20} />
            </div>
            <div>
              <h3 className="font-bold text-[#FAFAFA] text-base leading-tight">
                {device.label}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] font-mono uppercase bg-[#181818] border border-[#262626] text-[#888] px-2 py-0.5 rounded">
                  {device.modelType}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-green-400 font-medium bg-green-950/30 px-2 py-0.5 rounded-full border border-green-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Activo
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowQrModal(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#888] hover:text-[#FAFAFA] bg-[#181818] hover:bg-[#222] border border-[#262626] px-3 py-1.5 rounded-lg transition-colors"
            title="Ver código QR"
          >
            <QrCode size={14} className="text-[#F5A623]" />
            <span>Ver QR</span>
          </button>
        </div>

        {/* URL de Destino (Configuración activa) */}
        <div className="bg-[#161616] border border-[#262626] rounded-xl p-3.5 mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#777]">
              Destino actual (NFC + QR)
            </span>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1 text-xs text-[#F5A623] hover:text-[#E59512] font-semibold transition-colors"
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
                className="w-full bg-[#0D0D0D] border border-[#F5A623] rounded-lg px-3 py-2 text-xs text-[#FAFAFA] focus:outline-none focus:ring-1 focus:ring-[#F5A623]"
                autoFocus
              />
              {error && <p className="text-xs text-red-400">{error}</p>}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F5A623] hover:bg-[#E59512] text-[#0A0A0A] font-bold text-xs disabled:opacity-50 transition-colors"
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
                  className="px-3 py-1.5 rounded-lg border border-[#333] text-[#888] hover:text-[#FAFAFA] text-xs transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <span
                className="text-xs text-[#CCC] font-medium truncate block max-w-[260px] sm:max-w-[320px]"
                title={device.destinationUrl}
              >
                {device.destinationUrl}
              </span>
              <a
                href={device.destinationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#666] hover:text-[#FAFAFA] p-1 transition-colors"
                title="Abrir destino en pestaña nueva"
              >
                <ExternalLink size={13} />
              </a>
            </div>
          )}

          {successToast && (
            <div className="flex items-center gap-1.5 text-xs text-green-400 mt-2 pt-2 border-t border-[#222]">
              <CheckCircle2 size={13} />
              <span>¡Enlace actualizado al instante en tu objeto NFC!</span>
            </div>
          )}
        </div>

        {/* Datos técnicos y prueba */}
        <div className="grid grid-cols-2 gap-2 text-xs text-[#777] pt-1">
          <div>
            <span className="block text-[10px] uppercase font-bold text-[#555]">Token Stand</span>
            <button
              onClick={copyTokenLink}
              className="font-mono text-[#AAA] hover:text-[#F5A623] flex items-center gap-1 mt-0.5 group"
              title="Copiar enlace de redirección"
            >
              <span>{device.token}</span>
              {copiedToken ? (
                <Check size={11} className="text-green-400" />
              ) : (
                <Copy size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
          </div>
          <div className="text-right">
            <span className="block text-[10px] uppercase font-bold text-[#555]">Escaneos</span>
            <span className="font-bold text-[#FAFAFA] text-sm">
              {(device.interactionCount ?? 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Footer de la tarjeta con acción rápida */}
      <div className="mt-4 pt-3 border-t border-[#1C1C1C] flex items-center justify-between">
        <a
          href={`/t/${device.token}?src=qr`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#888] hover:text-[#F5A623] flex items-center gap-1 transition-colors"
        >
          <span>Probar toque NFC / Escaneo QR</span>
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Modal QR */}
      {showQrModal && (
        <QrModal device={device} onClose={() => setShowQrModal(false)} />
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
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
        <div className="w-8 h-8 border-2 border-[#F5A623] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA] flex flex-col selection:bg-[#F5A623] selection:text-black">
      {/* Top Navbar */}
      <header className="bg-[#0F0F0F] border-b border-[#1F1F1F] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-bold text-xl text-[#F5A623] tracking-tight">
              Stand<span className="text-[#FAFAFA]">Url</span>
            </Link>
            <span className="hidden sm:inline-block text-xs bg-[#1C1C1C] border border-[#2C2C2C] text-[#888] px-2.5 py-0.5 rounded-full">
              Portal del Cliente
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#AAA] hover:text-[#FAFAFA] bg-[#181818] hover:bg-[#222] border border-[#282828] px-3.5 py-2 rounded-xl transition-colors"
            >
              <Lock size={13} className="text-[#F5A623]" />
              <span className="hidden sm:inline">Cambiar contraseña</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#888] hover:text-red-400 bg-[#181818] hover:bg-red-950/20 border border-[#282828] hover:border-red-900/30 px-3.5 py-2 rounded-xl transition-colors"
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
        <div className="bg-gradient-to-r from-[#141414] via-[#111] to-[#141414] border border-[#222] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#F5A623] bg-[#F5A623]/10 border border-[#F5A623]/20 px-2.5 py-0.5 rounded-full">
                  <Sparkles size={11} /> {business?.plan ? `Plan ${business.plan}` : 'Cliente'}
                </span>
                {business?.sector && (
                  <span className="text-[11px] capitalize text-[#777] bg-[#1A1A1A] px-2.5 py-0.5 rounded-full border border-[#262626]">
                    {business.sector}
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#FAFAFA] tracking-tight">
                {business?.name || name || 'Tu Negocio'}
              </h1>
              <p className="text-sm text-[#888] mt-1">
                Configura los destinos de tus stands y analiza el impacto de las reseñas en Google.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto bg-[#1A1A1A] border border-[#2A2A2A] px-4 py-2.5 rounded-2xl">
              <ShieldCheck size={18} className="text-green-400" />
              <div className="text-left">
                <p className="text-[10px] uppercase font-bold text-[#666]">Estado de la cuenta</p>
                <p className="text-xs font-semibold text-green-400">Verificada y activa</p>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-3 bg-red-950/40 border border-red-500/30 text-red-300 text-sm px-4 py-3 rounded-2xl">
            <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Tarjetas de Métricas / Estadísticas */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#666] mb-3">
            Rendimiento e interacciones
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Escaneos este mes */}
            <div className="bg-[#111] border border-[#222] rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between text-[#777] mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Escaneos este mes</span>
                <Flame size={16} className="text-[#F5A623]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#FAFAFA]">
                  {loadingData ? '--' : (stats?.thisMonth ?? 0).toLocaleString()}
                </span>
                {stats && stats.trendPercent !== 0 && (
                  <span
                    className={`inline-flex items-center text-xs font-bold ${
                      stats.trendPercent > 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {stats.trendPercent > 0 ? <TrendingUp size={13} className="mr-0.5" /> : <TrendingDown size={13} className="mr-0.5" />}
                    {stats.trendPercent > 0 ? `+${stats.trendPercent}%` : `${stats.trendPercent}%`}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#555] mt-1">Total de clientes que tocaron tu NFC este mes</p>
            </div>

            {/* Escaneos mes anterior */}
            <div className="bg-[#111] border border-[#222] rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between text-[#777] mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Mes anterior</span>
                <Layers size={16} className="text-[#888]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#CCC]">
                  {loadingData ? '--' : (stats?.lastMonth ?? 0).toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-[#555] mt-1">Interacciones registradas el mes pasado</p>
            </div>

            {/* Stands activos */}
            <div className="bg-[#111] border border-[#222] rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between text-[#777] mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider">Stands Vinculados</span>
                <Smartphone size={16} className="text-[#F5A623]" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#FAFAFA]">
                  {loadingData ? '--' : devices.length}
                </span>
              </div>
              <p className="text-xs text-[#555] mt-1">Dispositivos físicos 3D con chip NFC</p>
            </div>
          </div>
        </section>

        {/* Sección de Dispositivos / Stands NFC */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#FAFAFA]">Tus Stands y Objetos NFC</h2>
              <p className="text-xs text-[#777]">
                Puedes cambiar el destino de cualquier stand cuando quieras. El cambio se aplica en tiempo real sin reprogramar el chip.
              </p>
            </div>
          </div>

          {loadingData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-52 bg-[#111] border border-[#222] rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : devices.length === 0 ? (
            <div className="bg-[#111] border border-[#222] rounded-2xl p-10 text-center space-y-3">
              <Smartphone size={36} className="mx-auto text-[#444]" />
              <h3 className="font-bold text-[#FAFAFA] text-base">Aún no tienes dispositivos registrados</h3>
              <p className="text-xs text-[#777] max-w-md mx-auto">
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
        <section className="bg-[#101010] border border-[#222] rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-[#FAFAFA]">
            <HelpCircle size={17} className="text-[#F5A623]" />
            <span>¿Cómo sacar el máximo partido a tu StandUrl?</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#888] pt-1">
            <div className="space-y-1">
              <strong className="text-[#CCC] block">1. Enlace directo de reseñas</strong>
              <p>
                Obtén el enlace corto de tu perfil de Google Business para que el cliente caiga directamente en la ventana de 5 estrellas.
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-[#CCC] block">2. Cambia de campaña al instante</strong>
              <p>
                ¿Quieres promocionar tu Instagram, un sorteo o la carta esta semana? Cambia la URL arriba y el stand se actualizará en segundos.
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-[#CCC] block">3. Ubicación estratégica</strong>
              <p>
                Coloca tu Stand en el mostrador de cobro o en mesas principales para maximizar el ratio de escaneo.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1A1A1A] py-6 text-center text-xs text-[#555] mt-auto">
        © {new Date().getFullYear()} StandUrl · Si necesitas ayuda con tus dispositivos, contacta a{' '}
        <a href="mailto:hola@standurl.com" className="text-[#888] hover:text-[#F5A623] transition-colors">
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
