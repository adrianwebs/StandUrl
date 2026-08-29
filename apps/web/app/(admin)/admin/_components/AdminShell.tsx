'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import clsx from 'clsx'
import Logo from '@/components/Logo'

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
      <div className="min-h-screen flex items-center justify-center bg-[#FBFBF9]">
        <div className="w-8 h-8 border-2 border-[#18181B] border-t-transparent rounded-full animate-spin" />
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
    <div className="flex min-h-screen bg-[#FBFBF9]">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-white border-r border-[#E7E5E4] flex flex-col">
        <div className="px-6 py-5 border-b border-[#E7E5E4]">
          <Link href="/admin" className="inline-flex items-center">
            <Logo variant="horizontal" theme="dark" height={24} />
          </Link>
          <p className="text-xs text-[#A8A29E] mt-1 font-medium">Admin Panel</p>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'bg-[#F3EFE6] text-[#18181B] font-semibold shadow-xs'
                  : 'text-[#78716C] hover:text-[#111827] hover:bg-[#F3EFE6]/60'
              )}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-[#E7E5E4]">
          <p className="text-xs text-[#78716C] mb-2 truncate font-medium">{name}</p>
          <button
            onClick={handleLogout}
            className="w-full text-left text-sm text-[#78716C] hover:text-[#DC2626] transition-colors px-1 font-medium"
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

