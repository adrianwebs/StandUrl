'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'

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
          ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#222]'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-heading text-xl font-bold text-[#F5A623] tracking-tight">
          Stand<span className="text-[#FAFAFA]">Url</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-[#888]">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[#FAFAFA] transition-colors">
              {l.label}
            </Link>
          ))}

          {/* Sectores dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSectorsOpen(true)}
            onMouseLeave={() => setSectorsOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-[#FAFAFA] transition-colors">
              Sectores <ChevronDown size={14} />
            </button>
            {sectorsOpen && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-[#111] border border-[#222] rounded-lg py-1 shadow-xl">
                {sectorLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block px-4 py-2 text-sm text-[#888] hover:text-[#FAFAFA] hover:bg-[#1A1A1A] transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/precios" className="hover:text-[#FAFAFA] transition-colors">
            Precios
          </Link>

          <Link
            href="/login"
            className="text-xs text-[#AAA] hover:text-[#FAFAFA] border border-[#333] hover:border-[#F5A623]/50 px-3 py-1.5 rounded-lg transition-colors"
          >
            Área clientes
          </Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/prototipo-gratis"
            className="inline-flex items-center gap-2 bg-[#F5A623] text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#C47D0E] transition-colors"
          >
            Pide tu prototipo gratis
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#888] hover:text-[#FAFAFA]"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#111] border-t border-[#222] px-4 py-4 flex flex-col gap-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[#888] hover:text-[#FAFAFA] text-sm"
            >
              {l.label}
            </Link>
          ))}
          <div className="text-xs text-[#555] uppercase tracking-wider mt-1">Sectores</div>
          {sectorLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[#888] hover:text-[#FAFAFA] text-sm pl-2"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/precios"
            onClick={() => setOpen(false)}
            className="text-[#888] hover:text-[#FAFAFA] text-sm"
          >
            Precios
          </Link>
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="text-[#AAA] hover:text-[#FAFAFA] text-sm py-1"
          >
            Área clientes
          </Link>
          <Link
            href="/prototipo-gratis"
            onClick={() => setOpen(false)}
            className="bg-[#F5A623] text-black text-sm font-semibold px-4 py-2.5 rounded-lg text-center hover:bg-[#C47D0E] transition-colors"
          >
            Pide tu prototipo gratis
          </Link>
        </div>
      )}
    </header>
  )
}
