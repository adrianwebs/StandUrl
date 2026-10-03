import Link from 'next/link'
import { Check } from 'lucide-react'
import { Container, Section, SectionHeader } from '@/components/ui'
import {
  CUSTOM_LOGO_FEE,
  FREE_SHIPPING_FROM,
  PACKS,
  PANEL_INCLUDED_MONTHS,
  PANEL_MONTHLY,
  PANEL_YEARLY,
  TRIAL_DAYS,
  formatEUR,
  pricePerUnit,
} from '@/lib/pricing'
import { CTA } from '@/lib/site'

export default function PricingSection({ heading = 'Precios claros, sin letra pequeña' }: { heading?: string }) {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow="Precios"
          title={heading}
          lead={`Pagas el objeto una sola vez. El panel es opcional: ${PANEL_INCLUDED_MONTHS} meses incluidos y después ${formatEUR(PANEL_MONTHLY)}/mes. Precios con IVA incluido.`}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {PACKS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 flex flex-col transition-all ${
                plan.highlighted
                  ? 'bg-[#F3EFE6] border-2 border-[#18181B] shadow-xl'
                  : 'bg-white border border-[#E7E5E4] shadow-sm hover:shadow-md'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#18181B] text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-sm">
                  Más elegido
                </span>
              )}
              <h3 className="font-heading text-lg font-bold text-[#111827] mb-1">{plan.name}</h3>
              <p className="text-xs text-[#78716C] mb-4 min-h-8">{plan.tagline}</p>
              <div className="flex items-end gap-1">
                <span className="font-heading text-4xl font-extrabold text-[#111827]">{formatEUR(plan.price)}</span>
              </div>
              <p className="text-xs text-[#78716C] mt-1 font-medium mb-6">
                {plan.units} objeto{plan.units > 1 ? 's' : ''}
                {plan.units > 1 ? ` · ${formatEUR(pricePerUnit(plan))} cada uno` : ''} ·{' '}
                {plan.shipping === 0 ? 'envío gratis' : `+${formatEUR(plan.shipping)} de envío`}
              </p>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={16} className="text-[#16A34A] mt-0.5 shrink-0" />
                    <span className="text-[#111827]">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`${CTA.href}?pack=${plan.id}`}
                className={`w-full text-center py-3 rounded-xl text-sm font-bold transition-all shadow-xs ${
                  plan.highlighted
                    ? 'bg-[#18181B] text-white hover:bg-[#27272A]'
                    : 'bg-white text-[#111827] border border-[#E7E5E4] hover:bg-[#F3EFE6]'
                }`}
              >
                {CTA.label}
              </Link>
            </div>
          ))}
        </div>

        <div className="bg-[#F3EFE6]/70 border border-[#E5DFD3] rounded-2xl p-6 text-sm text-[#57534E] leading-relaxed shadow-xs space-y-2">
          <p>
            <strong className="text-[#111827]">Prueba de {TRIAL_DAYS} días con devolución.</strong> Si no te convence,
            devuelves el objeto y te reembolsamos el producto (el envío de vuelta corre por tu cuenta).{' '}
            <Link href="/envios-y-devoluciones" className="text-[#B45309] font-semibold hover:underline">
              Ver condiciones
            </Link>
            .
          </p>
          <p>
            <strong className="text-[#111827]">Sin permanencia.</strong> Si dejas de pagar el panel, el objeto sigue
            funcionando con el último destino configurado. Panel: {formatEUR(PANEL_MONTHLY)}/mes o {formatEUR(PANEL_YEARLY)}/año.
          </p>
          <p>
            <strong className="text-[#111827]">Envío gratis desde {formatEUR(FREE_SHIPPING_FROM)}.</strong> ¿Quieres tu logo?
            Diseño a medida por {formatEUR(CUSTOM_LOGO_FEE)} en el primer pedido.{' '}
            <Link href="/objeto-personalizado" className="text-[#B45309] font-semibold hover:underline">
              Más información
            </Link>
            .
          </p>
        </div>
      </Container>
    </Section>
  )
}
