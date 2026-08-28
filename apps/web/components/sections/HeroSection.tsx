import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-16 overflow-hidden">
      {/* Glow background */}
      <div
        aria-hidden
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #F5A623 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Texto */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-[#111] border border-[#222] rounded-full px-3 py-1 text-xs text-[#888] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
            Prototipo gratis para los primeros negocios
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-[#FAFAFA] mb-6">
            El objeto que convierte{' '}
            <span className="text-[#F5A623]">cada visita</span>
            {' '}en una reseña de Google
          </h1>

          <p className="text-lg sm:text-xl text-[#888] max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
            Objeto 3D personalizado para tu negocio con NFC + QR.{' '}
            <strong className="text-[#FAFAFA]">Tus clientes tocan o escanean → Google Reviews al instante.</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
            <Link
              href="/prototipo-gratis"
              className="inline-flex items-center justify-center gap-2 bg-[#F5A623] text-black font-bold text-base px-6 py-3.5 rounded-xl hover:bg-[#C47D0E] transition-all active:scale-95"
            >
              Pide tu prototipo gratis
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/como-funciona"
              className="inline-flex items-center justify-center gap-2 bg-[#111] border border-[#222] text-[#888] font-medium text-base px-6 py-3.5 rounded-xl hover:border-[#444] hover:text-[#FAFAFA] transition-all"
            >
              Ver cómo funciona
            </Link>
          </div>

          {/* Badges sector */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {['🏋️ Gimnasios', '✂️ Peluquerías', '🍽️ Restaurantes', '☕ Cafeterías'].map((b) => (
              <span
                key={b}
                className="text-xs text-[#888] bg-[#111] border border-[#222] rounded-full px-3 py-1"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Imagen placeholder del objeto */}
        <div className="flex-shrink-0 w-72 h-72 lg:w-96 lg:h-96 relative">
          <div className="w-full h-full rounded-2xl bg-[#111] border border-[#222] flex flex-col items-center justify-center gap-4 relative overflow-hidden">
            {/* Glow interior */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-5"
              style={{ background: 'radial-gradient(circle at 50% 50%, #F5A623, transparent 70%)' }}
            />
            {/* Placeholder pesa */}
            <div className="text-8xl">🏋️</div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full border-2 border-[#F5A623] flex items-center justify-center">
                <div className="text-[10px] font-mono text-[#F5A623] font-bold">NFC</div>
              </div>
              <div className="font-mono text-xs text-[#888] mt-1 tracking-widest">8F7K2P</div>
            </div>
            <div className="text-xs text-[#555] text-center px-4">
              Foto real del objeto próximamente
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
