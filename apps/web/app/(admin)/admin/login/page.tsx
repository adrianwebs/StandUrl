'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { apiLogin } from '@/lib/adminApi'

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
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-2xl font-bold text-[#F5A623]">StandUrl</span>
          <p className="text-[#888] text-sm mt-1">Panel de administración</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#111] border border-[#222] rounded-2xl p-8 space-y-5"
        >
          <h1 className="text-xl font-semibold text-[#FAFAFA]">Acceso admin</h1>

          {error && (
            <div className="bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-sm text-[#888]" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg px-4 py-3 text-[#FAFAFA] placeholder-[#555] focus:outline-none focus:border-[#F5A623] transition-colors"
              placeholder="admin@standurl.com"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm text-[#888]" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg px-4 py-3 text-[#FAFAFA] placeholder-[#555] focus:outline-none focus:border-[#F5A623] transition-colors"
              placeholder="••••••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#F5A623] hover:bg-[#C47D0E] disabled:opacity-50 text-[#0A0A0A] font-bold py-3 rounded-lg transition-colors"
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
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
        <div className="w-8 h-8 border-2 border-[#F5A623] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
