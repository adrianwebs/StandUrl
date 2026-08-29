import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CtaFinal() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-[#F3EFE6] border border-[#E5DFD3] rounded-3xl p-10 sm:p-16 text-center overflow-hidden shadow-sm">
          {/* Fondo glow */}
          <div
            aria-hidden
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 rounded-full opacity-30 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, #FFFFFF 0%, transparent 70%)' }}
          />

          <div className="relative z-10">
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#111827] mb-4 leading-tight tracking-tight">
              Empieza con un prototipo gratis
            </h2>
            <p className="text-[#78716C] text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Sin compromiso. Sin tarjeta de crédito. Te hacemos un objeto personalizado para tu negocio y lo probamos juntos durante 30 días.
            </p>
            <Link
              href="/prototipo-gratis"
              className="inline-flex items-center gap-2 bg-[#18181B] text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-[#27272A] transition-all shadow-md active:scale-95"
            >
              Pide tu prototipo gratis
              <ArrowRight size={20} />
            </Link>
            <p className="text-xs text-[#78716C] mt-4 font-medium">
              Plazas limitadas · Te contactamos en menos de 24h
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

