import type { Metadata } from 'next'
import PricingSection from '@/components/sections/PricingSection'
import CtaFinal from '@/components/sections/CtaFinal'
import { Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Precios — Objetos NFC para reseñas de Google',
  description:
    'Precios transparentes sin letra pequeña. Desde 29,90€ el objeto físico. Suscripción opcional de 4,90€/mes. Sin permanencia.',
}

const saasFeatures = [
  'Cambio de destino en cualquier momento',
  'Estadísticas mensuales de interacciones',
  'Historial de cambios de URL',
  'Gestión de múltiples dispositivos',
  'Dashboard completo del negocio',
]

export default function PreciosPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="text-center px-4 sm:px-6 pt-8 mb-4">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#FAFAFA] mb-4">
          Precios sin letra pequeña
        </h1>
        <p className="text-[#888] text-xl max-w-2xl mx-auto">
          Pago único por el objeto físico. Suscripción opcional por la plataforma.
        </p>
      </div>

      <PricingSection />

      {/* SaaS detail */}
      <section className="px-4 sm:px-6 py-16 max-w-3xl mx-auto">
        <div className="bg-[#111] border border-[#222] rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading text-xl font-bold text-[#FAFAFA]">Suscripción de plataforma</h2>
              <p className="text-[#888] text-sm mt-1">Opcional · Cancela cuando quieras</p>
            </div>
            <div className="text-right">
              <span className="font-heading text-3xl font-bold text-[#FAFAFA]">4,90</span>
              <span className="text-[#888]">€/mes</span>
            </div>
          </div>
          <ul className="space-y-3">
            {saasFeatures.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-[#888]">
                <Check size={14} className="text-[#22C55E] shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-6 border-t border-[#222]">
            <p className="text-sm text-[#555] leading-relaxed">
              <strong className="text-[#888]">Sin suscripción:</strong> tu objeto sigue redirigiendo a la última URL configurada. Perderás acceso al dashboard pero el redirect no se interrumpe nunca.
            </p>
          </div>
        </div>
      </section>

      <CtaFinal />
    </div>
  )
}
