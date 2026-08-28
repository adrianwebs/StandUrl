'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { apiLogin } from '@/lib/adminApi'
import { ArrowLeft, KeyRound, Mail, AlertCircle, Loader2 } from 'lucide-react'

function ClientLoginForm() {
  const { login, isAuthenticated, isAdmin, isBusiness, isLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') || '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Si ya está autenticado, redirigir adecuadamente
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (isAdmin) {
        router.replace('/admin')
      } else {
        router.replace(from)
      }
    }
  }, [isLoading, isAuthenticated, isAdmin, isBusiness, router, from])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const data = await apiLogin(email, password)

      login(data.accessToken, data.businessId, data.name, data.role, data.plan)

      if (data.role === 'superadmin') {
        router.replace('/admin')
      } else {
        router.replace(from)
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al conectar con el servidor')
      setSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
        <div className="w-8 h-8 border-2 border-[#F5A623] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0A0A0A] px-4 py-8 relative selection:bg-[#F5A623] selection:text-black">
      {/* Glow ambient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F5A623]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top bar */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#888] hover:text-[#FAFAFA] transition-colors"
        >
          <ArrowLeft size={16} /> Volver a la web
        </Link>
        <Link href="/" className="font-bold text-lg text-[#F5A623]">
          Stand<span className="text-[#FAFAFA]">Url</span>
        </Link>
      </div>

      {/* Main card */}
      <div className="w-full max-w-md mx-auto my-auto z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] text-[#F5A623] mb-4 shadow-lg shadow-black/40">
            <KeyRound size={26} />
          </div>
          <h1 className="text-2xl font-bold text-[#FAFAFA] tracking-tight">
            Portal del Cliente
          </h1>
          <p className="text-sm text-[#888] mt-2">
            Gestiona tus objetos NFC, modifica enlaces de destino y consulta tus estadísticas.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#111] border border-[#222] rounded-2xl p-7 sm:p-8 space-y-5 shadow-2xl shadow-black/80"
        >
          {error && (
            <div className="flex items-start gap-3 bg-red-950/40 border border-red-500/30 text-red-300 text-sm px-4 py-3 rounded-xl">
              <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#888]" htmlFor="email">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555]" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl pl-10 pr-4 py-3 text-sm text-[#FAFAFA] placeholder-[#555] focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] transition-all"
                placeholder="tu-negocio@ejemplo.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#888]" htmlFor="password">
                Contraseña
              </label>
            </div>
            <div className="relative">
              <KeyRound size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555]" />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#161616] border border-[#2A2A2A] rounded-xl pl-10 pr-4 py-3 text-sm text-[#FAFAFA] placeholder-[#555] focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] transition-all"
                placeholder="Introduce tu contraseña"
              />
            </div>
            <p className="text-xs text-[#666] pt-1">
              Si es tu primer acceso, introduce la contraseña temporal que recibiste en tu correo de bienvenida.
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 bg-[#F5A623] hover:bg-[#E59512] disabled:opacity-50 text-[#0A0A0A] font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-[#F5A623]/20 hover:shadow-[#F5A623]/30 cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Accediendo...</span>
              </>
            ) : (
              <span>Entrar a mi panel</span>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-[#555]">
            ¿Tienes problemas para acceder? Contacta con el equipo de soporte en{' '}
            <a href="mailto:hola@standurl.com" className="text-[#888] hover:text-[#F5A623] underline transition-colors">
              hola@standurl.com
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-[#444] mt-8 z-10">
        © {new Date().getFullYear()} StandUrl · Gestión Inteligente de Reseñas y Stands NFC
      </div>
    </div>
  )
}

export default function ClientLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
          <div className="w-8 h-8 border-2 border-[#F5A623] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ClientLoginForm />
    </Suspense>
  )
}
