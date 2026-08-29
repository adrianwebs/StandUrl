import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NFC para reseñas de Google en tu peluquería o barbería',
  description:
    'Consigue más reseñas en Google para tu peluquería o barbería. Objeto NFC personalizado en forma de tijeras o peine. Tus clientes dejan su opinión con un toque.',
  keywords: ['reseñas google peluquería', 'nfc peluquería reseñas', 'conseguir opiniones google barbería'],
}

export default function PeluqueriasPage() {
  return (
    <div className="min-h-screen pt-28 pb-16 bg-[#FBFBF9] text-[#111827]">
      <section className="px-4 sm:px-6 py-16 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#F3EFE6] border border-[#E5DFD3] rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#B45309] mb-6">
          ✂️ Para peluquerías y barberías
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] mb-6 leading-tight tracking-tight">
          Tu siguiente cliente busca en Google{' '}
          <span className="text-[#B45309]">antes de elegirte.</span>
        </h1>
        <p className="text-lg sm:text-xl text-[#78716C] max-w-2xl mx-auto mb-8 leading-relaxed">
          Las reseñas de Google son tu escaparate digital. Con un objeto NFC en forma de tijeras o peine en tu mostrador, tus clientes dejan su opinión en 2 segundos.
        </p>
        <Link
          href="/prototipo-gratis"
          className="inline-flex items-center gap-2 bg-[#18181B] hover:bg-[#27272A] text-white font-bold text-base sm:text-lg px-8 py-4 rounded-xl transition-all shadow-md active:scale-[0.98]"
        >
          Pide tu prototipo gratis <ArrowRight size={20} />
        </Link>
      </section>

      <section className="px-4 sm:px-6 py-16 bg-[#F3EFE6] border-y border-[#E5DFD3]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-shrink-0 w-64 h-64 bg-white border border-[#E5DFD3] rounded-3xl flex flex-col items-center justify-center gap-3 shadow-sm">
            <div className="text-8xl">✂️</div>
            <div className="text-xs font-mono font-bold text-[#B45309] bg-[#F3EFE6] border border-[#E5DFD3] rounded-full px-3 py-1">NFC + QR</div>
          </div>
          <div className="flex-1">
            <h2 className="font-heading text-3xl font-extrabold text-[#111827] mb-4">
              Unas tijeras de marca. Con NFC dentro.
            </h2>
            <p className="text-[#78716C] leading-relaxed mb-4">
              Diseñamos e imprimimos en 3D un objeto relacionado con tu negocio — tijeras, peine, secador — con tus colores y logo. El chip NFC dirige directamente a tu ficha de Google Reviews con 5 estrellas.
            </p>
            <p className="text-[#78716C] leading-relaxed">
              Lo dejas en el mostrador mientras cobras. El cliente acerca el móvil y en 2 segundos ya está escribiendo su reseña.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-10 text-center">
        <Link
          href="/prototipo-gratis"
          className="inline-flex items-center gap-2 bg-[#18181B] hover:bg-[#27272A] text-white font-bold text-base sm:text-lg px-8 py-4 rounded-xl transition-all shadow-md active:scale-[0.98]"
        >
          Quiero un prototipo para mi peluquería <ArrowRight size={20} />
        </Link>
      </section>
    </div>
  )
}
