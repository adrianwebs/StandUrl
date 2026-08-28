import Link from 'next/link'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: '29,90',
    devices: 1,
    features: ['1 dispositivo personalizado', 'NFC + QR incluidos', 'Configuración inicial', 'Dashboard básico', '30 días de plataforma'],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '49,90',
    devices: 2,
    features: ['2 dispositivos personalizados', 'NFC + QR incluidos', 'Personalización completa', 'Dashboard + Estadísticas', 'Historial de cambios', '30 días de plataforma'],
    highlighted: true,
  },
  {
    name: 'Business',
    price: '79,90',
    devices: 4,
    features: ['4 dispositivos personalizados', 'NFC + QR incluidos', 'Personalización premium', 'Dashboard + Estadísticas', 'Historial de cambios', 'Varios puntos físicos', '30 días de plataforma'],
    highlighted: false,
  },
]

export default function PricingSection() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#FAFAFA] mb-4">
            Precios sin letra pequeña
          </h2>
          <p className="text-[#888] text-lg max-w-2xl mx-auto">
            Pago único por el objeto físico. Suscripción opcional de 4,90&nbsp;€/mes para estadísticas y cambio de destino.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.highlighted
                  ? 'bg-[#111] border-2 border-[#F5A623] shadow-[0_0_40px_rgba(245,166,35,0.15)]'
                  : 'bg-[#111] border border-[#222]'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F5A623] text-black text-xs font-bold px-3 py-1 rounded-full">
                  Más popular
                </span>
              )}

              <div className="mb-6">
                <h3 className="font-heading text-lg font-bold text-[#FAFAFA] mb-1">{plan.name}</h3>
                <div className="flex items-end gap-1">
                  <span className="font-heading text-4xl font-bold text-[#FAFAFA]">{plan.price}</span>
                  <span className="text-[#888] mb-1">€</span>
                </div>
                <p className="text-xs text-[#555] mt-1">{plan.devices} dispositivo{plan.devices > 1 ? 's' : ''} · pago único</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#888]">
                    <Check size={14} className="text-[#22C55E] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/prototipo-gratis"
                className={`w-full text-center py-3 rounded-xl text-sm font-semibold transition-all ${
                  plan.highlighted
                    ? 'bg-[#F5A623] text-black hover:bg-[#C47D0E]'
                    : 'bg-[#1A1A1A] text-[#FAFAFA] border border-[#222] hover:border-[#444]'
                }`}
              >
                Pide tu prototipo gratis
              </Link>
            </div>
          ))}
        </div>

        {/* Nota importante */}
        <div className="bg-[#111] border border-[#222] rounded-xl p-6 text-center">
          <p className="text-sm text-[#888] leading-relaxed">
            <strong className="text-[#FAFAFA]">Sin permanencia. Sin suscripción obligatoria.</strong>{' '}
            Tu dispositivo sigue funcionando aunque no pagues nada más — el redirect siempre activo.
            Con la suscripción de <strong className="text-[#FAFAFA]">4,90&nbsp;€/mes</strong> puedes cambiar el destino en cualquier momento, ver estadísticas y gestionar todos tus dispositivos.
          </p>
        </div>
      </div>
    </section>
  )
}
