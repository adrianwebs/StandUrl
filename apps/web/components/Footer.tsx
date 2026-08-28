import Link from 'next/link'

const productLinks = [
  { href: '/como-funciona', label: 'Cómo funciona' },
  { href: '/precios', label: 'Precios' },
  { href: '/prototipo-gratis', label: 'Prototipo gratis' },
]

const sectorLinks = [
  { href: '/gimnasios', label: 'Gimnasios' },
  { href: '/peluquerias-y-barberias', label: 'Peluquerías y barberías' },
  { href: '/restaurantes-y-cafeterias', label: 'Restaurantes' },
]

const legalLinks = [
  { href: '/legal/privacidad', label: 'Privacidad' },
  { href: '/legal/cookies', label: 'Cookies' },
  { href: '/legal/terminos', label: 'Términos de uso' },
]

export default function Footer() {
  return (
    <footer className="bg-[#111] border-t border-[#222] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {/* Marca */}
          <div className="sm:col-span-1">
            <Link href="/" className="font-heading text-lg font-bold text-[#F5A623]">
              Stand<span className="text-[#FAFAFA]">Url</span>
            </Link>
            <p className="mt-3 text-sm text-[#888] leading-relaxed max-w-xs">
              Objetos NFC + QR personalizados para que tus clientes dejen reseñas en Google con un solo toque.
            </p>
          </div>

          {/* Producto */}
          <div>
            <h3 className="text-xs font-semibold text-[#555] uppercase tracking-wider mb-3">Producto</h3>
            <ul className="space-y-2">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[#888] hover:text-[#FAFAFA] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sectores */}
          <div>
            <h3 className="text-xs font-semibold text-[#555] uppercase tracking-wider mb-3">Sectores</h3>
            <ul className="space-y-2">
              {sectorLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[#888] hover:text-[#FAFAFA] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#222] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#555]">
            © {new Date().getFullYear()} StandUrl. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-xs text-[#555] hover:text-[#888] transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
