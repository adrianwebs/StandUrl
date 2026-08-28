'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import clsx from 'clsx'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '▦' },
  { href: '/admin/businesses', label: 'Negocios', icon: '🏢' },
]

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { name, logout, isAdmin, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
        <div className="w-8 h-8 border-2 border-[#F5A623] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAdmin) {
    router.replace('/admin/login')
    return null
  }

  function handleLogout() {
    logout()
    router.replace('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-[#111] border-r border-[#222] flex flex-col">
        <div className="px-6 py-5 border-b border-[#222]">
          <span className="text-lg font-bold text-[#F5A623]">StandUrl</span>
          <p className="text-xs text-[#555] mt-0.5">Admin Panel</p>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'bg-[#F5A623]/10 text-[#F5A623]'
                  : 'text-[#888] hover:text-[#FAFAFA] hover:bg-[#1A1A1A]'
              )}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-[#222]">
          <p className="text-xs text-[#555] mb-2 truncate">{name}</p>
          <button
            onClick={handleLogout}
            className="w-full text-left text-sm text-[#888] hover:text-[#EF4444] transition-colors px-1"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
