import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NFC para reseñas de Google en tu gimnasio',
  description:
    'Consigue más reseñas en Google para tu gimnasio con un objeto NFC personalizado. Pesa, mancuerna o kettlebell con chip NFC + QR. Tus socios tocan y dejan su opinión.',
  keywords: ['reseñas google gimnasio', 'cómo conseguir reseñas gimnasio', 'nfc gimnasio reseñas', 'aumentar reseñas google fitness'],
}

export default function GimnasiosPage() {
  return (
    <div className="min-h-screen pt-28 pb-16 bg-[#FBFBF9] text-[#111827]">
      {/* Hero */}
      <section className="px-4 sm:px-6 py-16 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#F3EFE6] border border-[#E5DFD3] rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#B45309] mb-6">
          🏋️ Para gimnasios y centros de fitness
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] mb-6 leading-tight tracking-tight">
          La competencia tiene más reseñas.{' '}
          <span className="text-[#B45309]">Cámbialo hoy.</span>
        </h1>
        <p className="text-lg sm:text-xl text-[#78716C] max-w-2xl mx-auto mb-8 leading-relaxed">
          En Google Maps, el gimnasio con más reseñas se lleva los clientes nuevos. Un objeto NFC en forma de pesa pone en 2 segundos a tus socios en tu ficha de Google.
        </p>
        <Link
          href="/prototipo-gratis"
          className="inline-flex items-center gap-2 bg-[#18181B] hover:bg-[#27272A] text-white font-bold text-base sm:text-lg px-8 py-4 rounded-xl transition-all shadow-md active:scale-[0.98]"
        >
          Pide tu prototipo gratis <ArrowRight size={20} />
        </Link>
      </section>

      {/* Objeto */}
      <section className="px-4 sm:px-6 py-16 bg-[#F3EFE6] border-y border-[#E5DFD3]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-shrink-0 w-64 h-64 bg-white border border-[#E5DFD3] rounded-3xl flex flex-col items-center justify-center gap-3 shadow-sm">
            <div className="text-8xl">🏋️</div>
            <div className="text-xs font-mono font-bold text-[#B45309] bg-[#F3EFE6] border border-[#E5DFD3] rounded-full px-3 py-1">NFC + QR</div>
          </div>
          <div className="flex-1">
            <h2 className="font-heading text-3xl font-extrabold text-[#111827] mb-4">
              Una pesa con tu logo. Con NFC dentro.
            </h2>
            <p className="text-[#78716C] leading-relaxed mb-6">
              Imprimimos en 3D una pesa, mancuerna o kettlebell personalizada con los colores y logo de tu gimnasio. Dentro, un chip NFC programado con tu URL de Google Reviews.
            </p>
            <p className="text-[#78716C] leading-relaxed">
              El cliente acerca el móvil → Google Reviews con 5 estrellas. En menos de 2 segundos. Sin apps, sin fricción.
            </p>
          </div>
        </div>
      </section>

      {/* Dónde colocarlo */}
      <section className="px-4 sm:px-6 py-16 max-w-5xl mx-auto">
        <h2 className="font-heading text-3xl font-extrabold text-[#111827] mb-10 text-center">
          ¿Dónde colocarlo?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { place: 'Recepción', tip: 'Máxima visibilidad al entrar y salir' },
            { place: 'Vestuarios', tip: 'El momento post-entreno es perfecto' },
            { place: 'Zona de cardio', tip: 'Cuando esperan o descansan' },
            { place: 'Zona de pesas', tip: 'Cerca de los espejos' },
          ].map((z) => (
            <div key={z.place} className="bg-white border border-[#E7E5E4] rounded-2xl p-5 shadow-xs hover:shadow-sm transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={16} className="text-[#B45309]" />
                <span className="font-bold text-[#111827] text-sm">{z.place}</span>
              </div>
              <p className="text-xs text-[#78716C]">{z.tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 py-10 text-center">
        <Link
          href="/prototipo-gratis"
          className="inline-flex items-center gap-2 bg-[#18181B] hover:bg-[#27272A] text-white font-bold text-base sm:text-lg px-8 py-4 rounded-xl transition-all shadow-md active:scale-[0.98]"
        >
          Quiero un prototipo para mi gimnasio <ArrowRight size={20} />
        </Link>
      </section>
    </div>
  )
}
