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
      <section className="py-20 px-4 sm:px-6 bg-[#F3EFE6]/50 border-y border-[#E7E5E4]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <p className="text-xs text-[#B45309] font-bold uppercase tracking-wider mb-3">El problema</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#111827] mb-4 leading-snug tracking-tight">
              Pedir una reseña de Google incomoda. A ti y a tu cliente.
            </h2>
            <p className="text-[#78716C] leading-relaxed">
              Decirle a alguien «¿me puedes dejar una reseña?» es incómodo. Pasarle un enlace por WhatsApp tiene una tasa de conversión bajísima. Y sin reseñas, en Google Maps pierdes clientes frente a la competencia que sí las tiene.
            </p>
          </div>
          <div className="text-5xl flex-shrink-0 text-[#A8A29E]">→</div>
          <div className="flex-1">
            <p className="text-xs text-[#16A34A] font-bold uppercase tracking-wider mb-3">La solución</p>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#111827] mb-4 leading-snug tracking-tight">
              Con un toque, ya está.
            </h2>
            <p className="text-[#78716C] leading-relaxed">
              El objeto está en el mostrador. El cliente acerca el móvil — o escanea el QR. En menos de 2 segundos está en tu ficha de Google, listo para dejar su reseña. Sin fricción, sin intermediarios, sin pedir nada.
            </p>
          </div>
        </div>
      </section>
      <HowItWorks />
      {/* Galería de sectores */}
      <section className="py-20 px-4 sm:px-6 bg-white border-y border-[#E7E5E4]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#111827] mb-4 tracking-tight">
              Un objeto para cada negocio
            </h2>
            <p className="text-[#78716C] text-lg">Diseñado para que encaje en tu sector, no genérico.</p>
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
                className="bg-[#FBFBF9] border border-[#E7E5E4] rounded-2xl p-6 flex flex-col items-center text-center hover:border-[#18181B] hover:bg-[#F3EFE6]/60 shadow-xs hover:shadow-md transition-all group"
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{s.emoji}</div>
                <div className="font-bold text-[#111827] text-sm mb-1">{s.name}</div>
                <div className="text-xs text-[#78716C] font-medium">{s.desc}</div>
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
