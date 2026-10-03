import Link from 'next/link'
import Logo from '@/components/Logo'
import { CONTACT_EMAIL, CTA } from '@/lib/site'

const productLinks = [
  { href: '/como-funciona', label: 'Cómo funciona' },
  { href: '/precios', label: 'Precios' },
  { href: CTA.href, label: CTA.label },
  { href: '/objeto-personalizado', label: 'Objeto con tu logo' },
  { href: '/panel-estadisticas-nfc', label: 'Panel y estadísticas' },
]

const sectorLinks = [
  { href: '/gimnasios', label: 'Gimnasios' },
  { href: '/peluquerias-y-barberias', label: 'Peluquerías y barberías' },
  { href: '/restaurantes-y-cafeterias', label: 'Restaurantes y cafeterías' },
]

const guideLinks = [
  { href: '/guias/tarjeta-nfc-resenas-google', label: 'Tarjeta NFC para reseñas' },
  { href: '/guias/qr-vs-nfc-resenas-google', label: 'QR o NFC' },
  { href: '/guias/normas-de-google-sobre-resenas', label: 'Normas de Google' },
  { href: '/guias', label: 'Todas las guías' },
]

const companyLinks = [
  { href: '/sobre-standurl', label: 'Sobre StandUrl' },
  { href: '/contacto', label: 'Contacto' },
  { href: '/preguntas-frecuentes', label: 'Preguntas frecuentes' },
  { href: '/envios-y-devoluciones', label: 'Envíos y devoluciones' },
]

const legalLinks = [
  { href: '/legal/aviso-legal', label: 'Aviso legal' },
  { href: '/legal/privacidad', label: 'Privacidad' },
  { href: '/legal/cookies', label: 'Cookies' },
  { href: '/legal/terminos', label: 'Términos' },
]

function Column({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-[#78716C] uppercase tracking-wider mb-3">{title}</h3>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-[#78716C] hover:text-[#111827] transition-colors font-medium">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#F3EFE6]/60 border-t border-[#E7E5E4] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center">
              <Logo variant="horizontal" theme="dark" height={26} />
            </Link>
            <p className="mt-3 text-sm text-[#78716C] leading-relaxed max-w-xs">
              Objetos con NFC y QR para que tus clientes dejen reseñas en Google con un toque. Hechos en Albacete.
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-3 inline-block text-sm text-[#B45309] font-semibold hover:underline">
              {CONTACT_EMAIL}
            </a>
          </div>
          <Column title="Producto" links={productLinks} />
          <Column title="Sectores" links={sectorLinks} />
          <Column title="Guías" links={guideLinks} />
          <Column title="Empresa" links={companyLinks} />
        </div>

        <div className="border-t border-[#E7E5E4] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#78716C]">© {new Date().getFullYear()} StandUrl. Todos los derechos reservados.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-xs text-[#78716C] hover:text-[#111827] transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
