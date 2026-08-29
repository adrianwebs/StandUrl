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
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#111827] mb-4 tracking-tight">
            Precios sin letra pequeña
          </h2>
          <p className="text-[#78716C] text-lg max-w-2xl mx-auto">
            Pago único por el objeto físico. Suscripción opcional de 4,90&nbsp;€/mes para estadísticas y cambio de destino.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 flex flex-col transition-all ${
                plan.highlighted
                  ? 'bg-[#F3EFE6] border-2 border-[#18181B] shadow-xl'
                  : 'bg-white border border-[#E7E5E4] shadow-sm hover:shadow-md'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#18181B] text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-sm">
                  Más popular
                </span>
              )}

              <div className="mb-6">
                <h3 className="font-heading text-lg font-bold text-[#111827] mb-1">{plan.name}</h3>
                <div className="flex items-end gap-1">
                  <span className="font-heading text-4xl font-extrabold text-[#111827]">{plan.price}</span>
                  <span className="text-[#78716C] font-semibold mb-1">€</span>
                </div>
                <p className="text-xs text-[#78716C] mt-1 font-medium">{plan.devices} dispositivo{plan.devices > 1 ? 's' : ''} · pago único</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#78716C]">
                    <Check size={16} className="text-[#16A34A] mt-0.5 shrink-0" />
                    <span className="text-[#111827]">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/prototipo-gratis"
                className={`w-full text-center py-3 rounded-xl text-sm font-bold transition-all shadow-xs ${
                  plan.highlighted
                    ? 'bg-[#18181B] text-white hover:bg-[#27272A]'
                    : 'bg-white text-[#111827] border border-[#E7E5E4] hover:bg-[#F3EFE6]'
                }`}
              >
                Pide tu prototipo gratis
              </Link>
            </div>
          ))}
        </div>

        {/* Nota importante */}
        <div className="bg-[#F3EFE6]/70 border border-[#E5DFD3] rounded-2xl p-6 text-center shadow-xs">
          <p className="text-sm text-[#78716C] leading-relaxed">
            <strong className="text-[#111827]">Sin permanencia. Sin suscripción obligatoria.</strong>{' '}
            Tu dispositivo sigue funcionando aunque no pagues nada más — el redirect siempre activo.
            Con la suscripción de <strong className="text-[#111827]">4,90&nbsp;€/mes</strong> puedes cambiar el destino en cualquier momento, ver estadísticas y gestionar todos tus dispositivos.
          </p>
        </div>
      </div>
    </section>
  )
}

