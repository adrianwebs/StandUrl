'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface AuthState {
  token: string | null
  businessId: string | null
  name: string | null
  role: string | null
  plan: string | null
  isAdmin: boolean
  isBusiness: boolean
  isAuthenticated: boolean
  isLoading: boolean
}

interface AuthContextType extends AuthState {
  login: (token: string, businessId: string, name: string, role: string, plan?: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const SESSION_KEY = 'standurl_auth'
const LEGACY_KEY = 'admin_auth'

/** true si el JWT no se puede leer o su `exp` ya ha pasado */
function isTokenExpired(token: string): boolean {
  try {
    const payload = token.split('.')[1]
    if (!payload) return true
    const json = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/'))) as { exp?: number }
    return typeof json.exp === 'number' && json.exp * 1000 <= Date.now()
  } catch {
    return true
  }
}

function clearStoredSession() {
  try {
    localStorage.removeItem(SESSION_KEY)
    sessionStorage.removeItem(SESSION_KEY)
    sessionStorage.removeItem(LEGACY_KEY)
  } catch {
    // Ignorar si storage falla
  }
  document.cookie = 'standurl_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
}

/** Mantiene las cookies que lee el middleware alineadas con la sesión guardada */
function syncSessionCookies(role: string) {
  document.cookie = 'standurl_session=1; path=/; SameSite=Lax'
  if (role === 'superadmin') {
    document.cookie = 'admin_session=1; path=/; SameSite=Strict'
  } else {
    document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    token: null,
    businessId: null,
    name: null,
    role: null,
    plan: null,
    isAdmin: false,
    isBusiness: false,
    isAuthenticated: false,
    isLoading: true,
  })

  // Restaurar sesion desde storage al montar
  useEffect(() => {
    try {
      const stored =
        (typeof window !== 'undefined' && localStorage.getItem(SESSION_KEY)) ||
        (typeof window !== 'undefined' && sessionStorage.getItem(SESSION_KEY)) ||
        (typeof window !== 'undefined' && sessionStorage.getItem(LEGACY_KEY))
      const parsedStored = stored ? (JSON.parse(stored) as { token?: string }) : null
      if (parsedStored && (!parsedStored.token || isTokenExpired(parsedStored.token))) {
        // Sesión caducada: limpiar para no redirigir a paneles que van a rechazarla
        clearStoredSession()
        setAuth(s => ({ ...s, isLoading: false }))
      } else if (stored) {
        const parsed = JSON.parse(stored) as {
          token: string
          businessId: string
          name: string
          role: string
          plan?: string
        }
        syncSessionCookies(parsed.role)
        setAuth({
          token: parsed.token,
          businessId: parsed.businessId,
          name: parsed.name,
          role: parsed.role,
          plan: parsed.plan || null,
          isAdmin: parsed.role === 'superadmin',
          isBusiness: parsed.role === 'business' || parsed.role !== 'superadmin',
          isAuthenticated: !!parsed.token,
          isLoading: false,
        })
      } else {
        setAuth(s => ({ ...s, isLoading: false }))
      }
    } catch {
      setAuth(s => ({ ...s, isLoading: false }))
    }
  }, [])

  const login = useCallback(
    (token: string, businessId: string, name: string, role: string, plan?: string) => {
      const data = { token, businessId, name, role, plan: plan || null }
      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(data))
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(data))
      } catch {
        // Ignorar si storage falla
      }
      // Cambiar de admin a cliente (o al revés) no puede dejar la cookie anterior
      syncSessionCookies(role)
      setAuth({
        ...data,
        isAdmin: role === 'superadmin',
        isBusiness: role === 'business' || role !== 'superadmin',
        isAuthenticated: true,
        isLoading: false,
      })
    },
    []
  )

  const logout = useCallback(() => {
    clearStoredSession()
    setAuth({
      token: null,
      businessId: null,
      name: null,
      role: null,
      plan: null,
      isAdmin: false,
      isBusiness: false,
      isAuthenticated: false,
      isLoading: false,
    })
  }, [])

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
