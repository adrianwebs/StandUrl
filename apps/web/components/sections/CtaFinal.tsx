import { ButtonLink } from '@/components/ui'
import { CTA } from '@/lib/site'
import { FREE_SHIPPING_FROM, TRIAL_DAYS, formatEUR } from '@/lib/pricing'

export default function CtaFinal({
  title = 'Pruébalo 30 días en tu negocio',
  text = `Haz tu pedido, pruébalo ${TRIAL_DAYS} días y, si no te convence, devuélvelo y te reembolsamos el producto.`,
}: {
  title?: string
  text?: string
}) {
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-[#F3EFE6] border border-[#E5DFD3] rounded-3xl p-8 sm:p-16 text-center overflow-hidden shadow-sm">
          <div
            aria-hidden
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 rounded-full opacity-30 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, #FFFFFF 0%, transparent 70%)' }}
          />
          <div className="relative z-10">
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#111827] mb-4 leading-tight tracking-tight">
              {title}
            </h2>
            <p className="text-[#78716C] text-lg max-w-xl mx-auto mb-8 leading-relaxed">{text}</p>
            <ButtonLink href={CTA.href} size="lg" arrow>
              {CTA.label}
            </ButtonLink>
            <p className="text-xs text-[#78716C] mt-4 font-medium">
              Sin permanencia · Envío gratis desde {formatEUR(FREE_SHIPPING_FROM)} · No se cobra nada al enviar la solicitud
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
