import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import HowItWorks from '@/components/sections/HowItWorks'
import ComparisonTable from '@/components/sections/ComparisonTable'
import PricingSection from '@/components/sections/PricingSection'
import FaqSection from '@/components/sections/FaqSection'
import CtaFinal from '@/components/sections/CtaFinal'

export const metadata: Metadata = {
  title: 'Objetos NFC personalizados para conseguir reseñas de Google',
  description:
    'Imprime en 3D un objeto personalizado para tu negocio (pesa, tijeras, taza) con NFC + QR. Tus clientes dejan reseñas en Google con un solo toque.',
  keywords: [
    'tarjeta nfc reseñas google personalizada',
    'objeto 3d reseñas google',
    'dispositivo nfc reseñas negocio',
    'aumentar reseñas google negocio local',
    'cómo pedir reseñas de google a mis clientes',
  ],
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* Problema → Solución */}
      <section className="py-20 px-4 sm:px-6 bg-[#111] border-y border-[#222]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <p className="text-xs text-[#F5A623] font-semibold uppercase tracking-wider mb-3">El problema</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#FAFAFA] mb-4 leading-snug">
              Pedir una reseña de Google incomoda. A ti y a tu cliente.
            </h2>
            <p className="text-[#888] leading-relaxed">
              Decirle a alguien «¿me puedes dejar una reseña?» es incómodo. Pasarle un enlace por WhatsApp tiene una tasa de conversión bajísima. Y sin reseñas, en Google Maps pierdes clientes frente a la competencia que sí las tiene.
            </p>
          </div>
          <div className="text-5xl flex-shrink-0">→</div>
          <div className="flex-1">
            <p className="text-xs text-[#22C55E] font-semibold uppercase tracking-wider mb-3">La solución</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#FAFAFA] mb-4 leading-snug">
              Con un toque, ya está.
            </h2>
            <p className="text-[#888] leading-relaxed">
              El objeto está en el mostrador. El cliente acerca el móvil — o escanea el QR. En menos de 2 segundos está en tu ficha de Google, listo para dejar su reseña. Sin fricción, sin intermediarios, sin pedir nada.
            </p>
          </div>
        </div>
      </section>
      <HowItWorks />
      {/* Galería de sectores */}
      <section className="py-20 px-4 sm:px-6 bg-[#111] border-y border-[#222]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#FAFAFA] mb-4">
              Un objeto para cada negocio
            </h2>
            <p className="text-[#888] text-lg">Diseñado para que encaje en tu sector, no genérico.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { emoji: '🏋️', name: 'Gimnasios', desc: 'Pesa · Mancuerna · Kettlebell', href: '/gimnasios' },
              { emoji: '✂️', name: 'Peluquerías', desc: 'Tijeras · Peine · Secador', href: '/peluquerias-y-barberias' },
              { emoji: '🍽️', name: 'Restaurantes', desc: 'Plato · Cubiertos · Copa', href: '/restaurantes-y-cafeterias' },
              { emoji: '☕', name: 'Cafeterías', desc: 'Taza · Grano de café', href: '/restaurantes-y-cafeterias' },
            ].map((s) => (
              <a
                key={s.name}
                href={s.href}
                className="bg-[#0A0A0A] border border-[#222] rounded-2xl p-6 flex flex-col items-center text-center hover:border-[#F5A623]/40 transition-all group"
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{s.emoji}</div>
                <div className="font-semibold text-[#FAFAFA] text-sm mb-1">{s.name}</div>
                <div className="text-xs text-[#555]">{s.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <ComparisonTable />
      <PricingSection />
      <FaqSection />
      <CtaFinal />
    </>
  )
}
