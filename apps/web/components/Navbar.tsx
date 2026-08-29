'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'
import Logo from '@/components/Logo'

const navLinks = [
  { href: '/como-funciona', label: 'Cómo funciona' },
]

const sectorLinks = [
  { href: '/gimnasios', label: '🏋️ Gimnasios' },
  { href: '/peluquerias-y-barberias', label: '✂️ Peluquerías' },
  { href: '/restaurantes-y-cafeterias', label: '🍽️ Restaurantes' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [sectorsOpen, setSectorsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#FBFBF9]/90 backdrop-blur-md border-b border-[#E7E5E4] shadow-xs'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2">
          <Logo variant="horizontal" theme="dark" height={28} priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-[#78716C]">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[#111827] font-medium transition-colors">
              {l.label}
            </Link>
          ))}

          {/* Sectores dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSectorsOpen(true)}
            onMouseLeave={() => setSectorsOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-[#111827] font-medium transition-colors">
              Sectores <ChevronDown size={14} />
            </button>
            {sectorsOpen && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-[#E7E5E4] rounded-xl py-1.5 shadow-xl">
                {sectorLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block px-4 py-2 text-sm text-[#78716C] hover:text-[#111827] hover:bg-[#F3EFE6] transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/precios" className="hover:text-[#111827] font-medium transition-colors">
            Precios
          </Link>

          <Link
            href="/login"
            className="text-xs text-[#78716C] hover:text-[#111827] border border-[#E7E5E4] hover:border-[#18181B] bg-white hover:bg-[#F3EFE6] px-3.5 py-1.5 rounded-lg transition-colors font-medium"
          >
            Área clientes
          </Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/prototipo-gratis"
            className="inline-flex items-center gap-2 bg-[#18181B] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#27272A] transition-all shadow-sm"
          >
            Pide tu prototipo gratis
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#78716C] hover:text-[#111827] p-1.5 rounded-lg hover:bg-[#F3EFE6]"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#FBFBF9] border-t border-[#E7E5E4] px-4 py-4 flex flex-col gap-4 shadow-lg">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[#78716C] hover:text-[#111827] font-medium text-sm"
            >
              {l.label}
            </Link>
          ))}
          <div className="text-xs text-[#A8A29E] uppercase tracking-wider mt-1 font-semibold">Sectores</div>
          {sectorLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[#78716C] hover:text-[#111827] text-sm pl-2"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/precios"
            onClick={() => setOpen(false)}
            className="text-[#78716C] hover:text-[#111827] font-medium text-sm"
          >
            Precios
          </Link>
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="text-[#78716C] hover:text-[#111827] text-sm py-1 font-medium"
          >
            Área clientes
          </Link>
          <Link
            href="/prototipo-gratis"
            onClick={() => setOpen(false)}
            className="bg-[#18181B] text-white text-sm font-semibold px-4 py-2.5 rounded-xl text-center hover:bg-[#27272A] transition-colors"
          >
            Pide tu prototipo gratis
          </Link>
        </div>
      )}
    </header>
  )
}

