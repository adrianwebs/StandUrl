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
    <div className="min-h-screen pt-28 pb-16 bg-[#FBFBF9] text-[#111827]">
      <div className="text-center px-4 sm:px-6 pt-4 mb-4">
        <div className="inline-flex items-center gap-2 bg-[#F3EFE6] border border-[#E5DFD3] text-[#B45309] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          Planes y Tarifas
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#111827] mb-4 tracking-tight">
          Precios sin letra pequeña
        </h1>
        <p className="text-[#78716C] text-lg sm:text-xl max-w-2xl mx-auto">
          Pago único por el objeto físico. Suscripción opcional por la plataforma.
        </p>
      </div>

      <PricingSection />

      {/* SaaS detail */}
      <section className="px-4 sm:px-6 py-16 max-w-3xl mx-auto">
        <div className="bg-white border border-[#E7E5E4] rounded-3xl p-8 sm:p-10 shadow-sm">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#E7E5E4]">
            <div>
              <h2 className="font-heading text-xl font-extrabold text-[#111827]">Suscripción de plataforma</h2>
              <p className="text-[#78716C] text-sm mt-1 font-medium">Opcional · Cancela cuando quieras</p>
            </div>
            <div className="text-right">
              <span className="font-heading text-4xl font-extrabold text-[#111827]">4,90</span>
              <span className="text-[#78716C] font-semibold">€/mes</span>
            </div>
          </div>
          <ul className="space-y-3.5">
            {saasFeatures.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-[#78716C] font-medium">
                <Check size={16} className="text-green-600 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-6 border-t border-[#E7E5E4] bg-[#FBFBF9] -mx-8 -mb-8 sm:-mx-10 sm:-mb-10 p-6 rounded-b-3xl">
            <p className="text-xs text-[#78716C] leading-relaxed">
              <strong className="text-[#111827]">Sin suscripción:</strong> tu objeto sigue redirigiendo a la última URL configurada. Perderás acceso al dashboard interactivo pero el redirect no se interrumpe nunca.
            </p>
          </div>
        </div>
      </section>

      <CtaFinal />
    </div>
  )
}
