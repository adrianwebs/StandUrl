import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-28 pb-16 overflow-hidden">
      {/* Glow background */}
      <div
        aria-hidden
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] rounded-full opacity-35 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #F3EFE6 0%, #E5DFD3 50%, transparent 75%)' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Texto */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-[#F3EFE6] border border-[#E5DFD3] rounded-full px-3.5 py-1 text-xs text-[#78716C] mb-6 font-medium shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
            Prototipo gratis para los primeros negocios
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight text-[#111827] mb-6">
            El objeto que convierte{' '}
            <span className="text-[#B45309]">cada visita</span>
            {' '}en una reseña de Google
          </h1>

          <p className="text-lg sm:text-xl text-[#78716C] max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
            Objeto 3D personalizado para tu negocio con NFC + QR.{' '}
            <strong className="text-[#111827] font-semibold">Tus clientes tocan o escanean → Google Reviews al instante.</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
            <Link
              href="/prototipo-gratis"
              className="inline-flex items-center justify-center gap-2 bg-[#18181B] text-white font-bold text-base px-6 py-3.5 rounded-xl hover:bg-[#27272A] transition-all shadow-md active:scale-95"
            >
              Pide tu prototipo gratis
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/como-funciona"
              className="inline-flex items-center justify-center gap-2 bg-white border border-[#E7E5E4] text-[#111827] font-semibold text-base px-6 py-3.5 rounded-xl hover:bg-[#F3EFE6] hover:border-[#D6D3D1] transition-all shadow-xs"
            >
              Ver cómo funciona
            </Link>
          </div>

          {/* Badges sector */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {['🏋️ Gimnasios', '✂️ Peluquerías', '🍽️ Restaurantes', '☕ Cafeterías'].map((b) => (
              <span
                key={b}
                className="text-xs text-[#78716C] bg-[#F3EFE6] border border-[#E5DFD3] rounded-full px-3 py-1 font-medium"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Imagen placeholder del objeto */}
        <div className="flex-shrink-0 w-72 h-72 lg:w-96 lg:h-96 relative">
          <div className="w-full h-full rounded-3xl bg-white border border-[#E7E5E4] flex flex-col items-center justify-center gap-4 relative overflow-hidden shadow-xl">
            {/* Glow interior */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-40"
              style={{ background: 'radial-gradient(circle at 50% 50%, #F3EFE6, transparent 70%)' }}
            />
            {/* Placeholder pesa */}
            <div className="text-8xl relative z-10">🏋️</div>
            <div className="flex flex-col items-center gap-1 relative z-10">
              <div className="w-12 h-12 rounded-full border-2 border-[#18181B] bg-[#F3EFE6] flex items-center justify-center shadow-xs">
                <div className="text-[10px] font-mono text-[#18181B] font-bold">NFC</div>
              </div>
              <div className="font-mono text-xs text-[#78716C] mt-1 tracking-widest font-semibold">8F7K2P</div>
            </div>
            <div className="text-xs text-[#A8A29E] text-center px-4 relative z-10 font-medium">
              Foto real del objeto próximamente
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

