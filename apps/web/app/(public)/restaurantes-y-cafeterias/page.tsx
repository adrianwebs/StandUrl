import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NFC para reseñas de Google en tu restaurante o cafetería',
  description:
    'El 90% de los comensales mira reseñas antes de reservar. Objeto NFC personalizado para restaurantes y cafeterías. Plato, taza o cubiertos con chip NFC + QR.',
  keywords: ['reseñas google restaurante', 'nfc restaurante reseñas', 'código qr reseñas google restaurante'],
}

export default function RestaurantesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <section className="px-4 sm:px-6 py-16 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#111] border border-[#222] rounded-full px-3 py-1 text-xs text-[#888] mb-6">
          🍽️ Para restaurantes y cafeterías
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FAFAFA] mb-6 leading-tight">
          El 90% de tus futuros clientes mira{' '}
          <span className="text-[#F5A623]">reseñas antes de reservar.</span>
        </h1>
        <p className="text-xl text-[#888] max-w-2xl mx-auto mb-8 leading-relaxed">
          Un objeto NFC en forma de plato, taza o cubiertos sobre la mesa. El comensal satisfecho acerca el móvil al pedir la cuenta → Google Reviews en 2 segundos.
        </p>
        <Link
          href="/prototipo-gratis"
          className="inline-flex items-center gap-2 bg-[#F5A623] text-black font-bold text-lg px-8 py-4 rounded-xl hover:bg-[#C47D0E] transition-all"
        >
          Pide tu prototipo gratis <ArrowRight size={20} />
        </Link>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-[#111] border-y border-[#222]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-shrink-0 w-64 h-64 bg-[#0A0A0A] border border-[#222] rounded-2xl flex flex-col items-center justify-center gap-3">
            <div className="text-8xl">🍽️</div>
            <div className="text-xs font-mono text-[#F5A623] border border-[#F5A623]/30 rounded-full px-3 py-1">NFC</div>
          </div>
          <div className="flex-1">
            <h2 className="font-heading text-3xl font-bold text-[#FAFAFA] mb-4">
              Un plato de tu marca. Con NFC dentro.
            </h2>
            <p className="text-[#888] leading-relaxed mb-4">
              Diseñamos e imprimimos en 3D un plato, taza o cubierto decorativo con tus colores y logo. El chip NFC dirige directamente a tu ficha de Google Reviews.
            </p>
            <p className="text-[#888] leading-relaxed">
              Lo pones sobre la mesa o en la barra. El cliente satisfecho acerca el móvil y en 2 segundos ya está escribiendo su reseña — mientras aún tiene el sabor en la boca.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-10 text-center">
        <Link
          href="/prototipo-gratis"
          className="inline-flex items-center gap-2 bg-[#F5A623] text-black font-bold text-lg px-8 py-4 rounded-xl hover:bg-[#C47D0E] transition-all"
        >
          Quiero un prototipo para mi restaurante <ArrowRight size={20} />
        </Link>
      </section>
    </div>
  )
}
