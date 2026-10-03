import { ButtonLink } from '@/components/ui'
import ObjectIllustration from '@/components/ObjectIllustration'
import { CTA } from '@/lib/site'
import { FREE_SHIPPING_FROM, TRIAL_DAYS, formatEUR } from '@/lib/pricing'

export default function HeroSection() {
  return (
    <section className="relative px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-24 overflow-hidden">
      <div
        aria-hidden
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] rounded-full opacity-35 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #F3EFE6 0%, #E5DFD3 50%, transparent 75%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-[#F3EFE6] border border-[#E5DFD3] rounded-full px-3.5 py-1 text-xs text-[#78716C] mb-6 font-medium shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#B45309]" />
            Diseñado e impreso en 3D en Albacete
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-[#111827] mb-6">
            Soporte NFC y QR para que tus clientes te dejen{' '}
            <span className="text-[#B45309]">reseñas en Google</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#78716C] max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
            Un objeto de diseño para tu mostrador. Tus clientes acercan el móvil o escanean el QR y llegan a tu ficha de
            Google.{' '}
            <strong className="text-[#111827] font-semibold">Tú cambias el destino cuando quieras, sin tocar el objeto.</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
            <ButtonLink href={CTA.href} size="lg" arrow>
              {CTA.label}
            </ButtonLink>
            <ButtonLink href="/como-funciona" variant="secondary" size="lg">
              Ver cómo funciona
            </ButtonLink>
          </div>

          <p className="text-sm text-[#78716C] mb-8 font-medium">
            {TRIAL_DAYS} días de prueba con devolución · Sin permanencia · Envío gratis desde {formatEUR(FREE_SHIPPING_FROM)}
          </p>

          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {['Gimnasios', 'Peluquerías y barberías', 'Restaurantes y cafeterías'].map((b) => (
              <span
                key={b}
                className="text-xs text-[#78716C] bg-[#F3EFE6] border border-[#E5DFD3] rounded-full px-3 py-1 font-medium"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 w-full max-w-sm lg:max-w-md">
          <div className="rounded-3xl bg-white border border-[#E7E5E4] shadow-xl p-6 sm:p-8 relative overflow-hidden">
            <div
              aria-hidden
              className="absolute inset-0 opacity-40"
              style={{ background: 'radial-gradient(circle at 50% 45%, #F3EFE6, transparent 70%)' }}
            />
            <ObjectIllustration className="relative w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}
