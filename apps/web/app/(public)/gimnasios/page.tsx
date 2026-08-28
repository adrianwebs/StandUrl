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
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero */}
      <section className="px-4 sm:px-6 py-16 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#111] border border-[#222] rounded-full px-3 py-1 text-xs text-[#888] mb-6">
          🏋️ Para gimnasios y centros de fitness
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAFAFA] mb-6 leading-tight">
          La competencia tiene más reseñas.{' '}
          <span className="text-[#F5A623]">Cámbiatelo.</span>
        </h1>
        <p className="text-xl text-[#888] max-w-2xl mx-auto mb-8 leading-relaxed">
          En Google Maps, el gimnasio con más reseñas se lleva los clientes nuevos. Un objeto NFC en forma de pesa pone en 2 segundos a tus socios en tu ficha de Google.
        </p>
        <Link
          href="/prototipo-gratis"
          className="inline-flex items-center gap-2 bg-[#F5A623] text-black font-bold text-lg px-8 py-4 rounded-xl hover:bg-[#C47D0E] transition-all"
        >
          Pide tu prototipo gratis <ArrowRight size={20} />
        </Link>
      </section>

      {/* Objeto */}
      <section className="px-4 sm:px-6 py-16 bg-[#111] border-y border-[#222]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-shrink-0 w-64 h-64 bg-[#0A0A0A] border border-[#222] rounded-2xl flex flex-col items-center justify-center gap-3">
            <div className="text-8xl">🏋️</div>
            <div className="text-xs font-mono text-[#F5A623] border border-[#F5A623]/30 rounded-full px-3 py-1">NFC</div>
          </div>
          <div className="flex-1">
            <h2 className="font-heading text-3xl font-bold text-[#FAFAFA] mb-4">
              Una pesa con tu logo. Con NFC dentro.
            </h2>
            <p className="text-[#888] leading-relaxed mb-6">
              Imprimimos en 3D una pesa, mancuerna o kettlebell personalizada con los colores y logo de tu gimnasio. Dentro, un chip NFC programado con tu URL de Google Reviews.
            </p>
            <p className="text-[#888] leading-relaxed">
              El cliente acerca el móvil → Google. En menos de 2 segundos. Sin apps, sin fricción.
            </p>
          </div>
        </div>
      </section>

      {/* Dónde colocarlo */}
      <section className="px-4 sm:px-6 py-16 max-w-5xl mx-auto">
        <h2 className="font-heading text-3xl font-bold text-[#FAFAFA] mb-10 text-center">
          ¿Dónde colocarlo?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { place: 'Recepción', tip: 'Máxima visibilidad al entrar y salir' },
            { place: 'Vestuarios', tip: 'El momento post-entreno es perfecto' },
            { place: 'Zona de cardio', tip: 'Cuando esperan o descansan' },
            { place: 'Zona de pesas', tip: 'Cerca de los espejos' },
          ].map((z) => (
            <div key={z.place} className="bg-[#111] border border-[#222] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={14} className="text-[#F5A623]" />
                <span className="font-semibold text-[#FAFAFA] text-sm">{z.place}</span>
              </div>
              <p className="text-xs text-[#888]">{z.tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 py-10 text-center">
        <Link
          href="/prototipo-gratis"
          className="inline-flex items-center gap-2 bg-[#F5A623] text-black font-bold text-lg px-8 py-4 rounded-xl hover:bg-[#C47D0E] transition-all"
        >
          Quiero un prototipo para mi gimnasio <ArrowRight size={20} />
        </Link>
      </section>
    </div>
  )
}
