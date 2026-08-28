import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CtaFinal() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-[#111] border border-[#222] rounded-3xl p-10 sm:p-16 text-center overflow-hidden">
          {/* Fondo glow */}
          <div
            aria-hidden
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, #F5A623 0%, transparent 70%)' }}
          />

          <div className="relative z-10">
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#FAFAFA] mb-4 leading-tight">
              Empieza con un prototipo gratis
            </h2>
            <p className="text-[#888] text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Sin compromiso. Sin tarjeta de crédito. Te hacemos un objeto personalizado para tu negocio y lo probamos juntos durante 30 días.
            </p>
            <Link
              href="/prototipo-gratis"
              className="inline-flex items-center gap-2 bg-[#F5A623] text-black font-bold text-lg px-8 py-4 rounded-xl hover:bg-[#C47D0E] transition-all active:scale-95"
            >
              Pide tu prototipo gratis
              <ArrowRight size={20} />
            </Link>
            <p className="text-xs text-[#555] mt-4">
              Plazas limitadas · Te contactamos en menos de 24h
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
