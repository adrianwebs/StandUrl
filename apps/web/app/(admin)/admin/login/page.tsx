'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { apiLogin } from '@/lib/adminApi'
import Logo from '@/components/Logo'

function LoginForm() {
  const { login, isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') || '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Si ya esta autenticado como admin, redirigir
  useEffect(() => {
    if (!isLoading && isAdmin) {
      router.replace(from)
    }
  }, [isLoading, isAdmin, router, from])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const data = await apiLogin(email, password)

      if (data.role !== 'superadmin') {
        setError('No tienes permisos de administrador.')
        setSubmitting(false)
        return
      }

      login(data.accessToken, data.businessId, data.name, data.role)
      router.replace(from)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error de conexión')
      setSubmitting(false)
    }
  }

  if (isLoading) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBFBF9] px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 flex flex-col items-center">
          <Logo variant="horizontal" theme="dark" height={32} />
          <p className="text-[#78716C] text-sm mt-2 font-medium">Panel de administración</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#E7E5E4] rounded-3xl p-8 space-y-5 shadow-xl"
        >
          <h1 className="text-xl font-bold text-[#111827]">Acceso admin</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C]" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#FBFBF9] border border-[#E7E5E4] rounded-xl px-4 py-3 text-sm text-[#111827] placeholder-[#A8A29E] focus:outline-none focus:border-[#18181B] transition-colors"
              placeholder="admin@standurl.com"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C]" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#FBFBF9] border border-[#E7E5E4] rounded-xl px-4 py-3 text-sm text-[#111827] placeholder-[#A8A29E] focus:outline-none focus:border-[#18181B] transition-colors"
              placeholder="••••••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#18181B] hover:bg-[#27272A] disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-all shadow-sm cursor-pointer"
          >
            {submitting ? 'Iniciando sesión...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#FBFBF9]">
        <div className="w-8 h-8 border-2 border-[#18181B] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}

