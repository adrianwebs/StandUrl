import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import PricingSection from '@/components/sections/PricingSection'
import CtaFinal from '@/components/sections/CtaFinal'
import FaqList from '@/components/FaqList'
import JsonLd from '@/components/JsonLd'
import { Container, H2, Section } from '@/components/ui'
import { faqCompra, faqComparativa, faqPanel } from '@/lib/faqs'
import { PACKS, PANEL_INCLUDED_MONTHS, PANEL_MONTHLY, PANEL_YEARLY, formatEUR } from '@/lib/pricing'
import { productLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Precios: soporte NFC y QR para reseñas de Google',
  description:
    'Starter 29,90 €, Pro 54,90 € y Business 94,90 €, con IVA. Pago único y sin permanencia. Panel opcional 4,90 €/mes. Prueba 30 días con devolución.',
  alternates: { canonical: '/precios' },
  openGraph: { url: '/precios' },
}

const pro = PACKS[1]
const firstYear = pro.price + (12 - PANEL_INCLUDED_MONTHS) * PANEL_MONTHLY

export default function PreciosPage() {
  const faqs = [...faqCompra.slice(0, 4), faqPanel[0], faqPanel[1], faqComparativa[1]]
  return (
    <>
      <JsonLd data={productLd} />
      <PageHero
        crumbs={[{ label: 'Precios' }]}
        title="Precios claros: pagas el objeto una vez"
        lead="Tres packs según los puntos de tu negocio que quieras cubrir. Todos incluyen NFC y QR, 3 meses de panel y prueba de 30 días con devolución."
      />
      <PricingSection heading="Elige tu pack" />

      <Section tone="cream">
        <Container size="md">
          <H2 className="!text-2xl sm:!text-3xl mb-4">Cuánto cuesta de verdad el primer año</H2>
          <p className="text-[#57534E] leading-relaxed mb-4">
            El panel (cambiar el destino y ver estadísticas) está incluido los primeros {PANEL_INCLUDED_MONTHS} meses. Después cuesta{' '}
            {formatEUR(PANEL_MONTHLY)} al mes o {formatEUR(PANEL_YEARLY)} al año, y es opcional. Un ejemplo con el pack {pro.name}:
          </p>
          <ul className="list-disc pl-6 text-[#57534E] space-y-1 mb-4">
            <li>Pack {pro.name} ({pro.units} objetos): {formatEUR(pro.price)}, envío gratis.</li>
            <li>
              Panel durante los 9 meses siguientes: 9 × {formatEUR(PANEL_MONTHLY)} = {formatEUR(9 * PANEL_MONTHLY)}.
            </li>
            <li>
              <strong className="text-[#111827]">Total del primer año con panel: {formatEUR(firstYear)}</strong>. Sin panel, solo {formatEUR(pro.price)}.
            </li>
          </ul>
          <p className="text-[#57534E] leading-relaxed">
            Si dejas de pagar el panel, el objeto sigue funcionando con el último destino que tuvieras configurado.
          </p>
        </Container>
      </Section>

      <Section>
        <Container size="md">
          <H2 className="!text-2xl sm:!text-3xl mb-4">¿Por qué cuesta más que una tarjeta de un euro?</H2>
          <div className="space-y-4 text-[#57534E] leading-relaxed">
            <p>
              Una tarjeta NFC de PVC puede costar alrededor de un euro. Si solo necesitas lo mínimo y no te importa que pase
              desapercibida, es una opción válida.
            </p>
            <p>
              Lo que pagas con StandUrl es otra cosa: un objeto que se ve y se toca en tu mostrador, con NFC y QR en la misma pieza,
              diseñado e impreso en 3D en Albacete, y un panel para cambiar el destino sin reprogramar nada. Si tienes dudas, lee la{' '}
              <Link href="/guias/tarjeta-nfc-resenas-google" className="text-[#B45309] font-semibold hover:underline">
                guía de tarjetas NFC para reseñas
              </Link>
              : te explicamos cuándo basta una tarjeta y cuándo no.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container size="sm">
          <H2 className="!text-2xl sm:!text-3xl mb-6 text-center">Preguntas sobre precios y pedidos</H2>
          <FaqList faqs={faqs} />
        </Container>
      </Section>

      <CtaFinal />
    </>
  )
}
