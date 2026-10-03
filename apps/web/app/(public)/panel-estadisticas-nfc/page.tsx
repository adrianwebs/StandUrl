import type { Metadata } from 'next'
import Link from 'next/link'
import { BarChart3, History, Layers, Link2 } from 'lucide-react'
import PageHero from '@/components/PageHero'
import CtaFinal from '@/components/sections/CtaFinal'
import FaqList from '@/components/FaqList'
import JsonLd from '@/components/JsonLd'
import { ButtonLink, Card, Container, Eyebrow, H2, Section, SectionHeader } from '@/components/ui'
import { faqPanel, type Faq } from '@/lib/faqs'
import { PANEL_INCLUDED_MONTHS, PANEL_MONTHLY, PANEL_YEARLY, formatEUR } from '@/lib/pricing'
import { absoluteUrl, CTA } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Cambia el enlace de tu NFC y mide los escaneos',
  description:
    'Cambia el destino de tu objeto NFC o QR sin reprogramar el chip y consulta cuántas veces se usa. Panel por 4,90 €/mes, 3 meses incluidos, sin permanencia.',
  alternates: { canonical: '/panel-estadisticas-nfc' },
  openGraph: { url: '/panel-estadisticas-nfc' },
}

const features = [
  { icon: Link2, title: 'Cambiar el destino', text: 'Cambias a dónde lleva cada objeto cuando quieras. Sin reprogramar el chip y sin tocar el objeto.' },
  { icon: BarChart3, title: 'Estadísticas de uso', text: 'Ves cuántas veces se ha usado cada objeto y cómo evoluciona mes a mes.' },
  { icon: History, title: 'Historial de cambios', text: 'Queda registro de los destinos que ha tenido cada objeto y cuándo los cambiaste.' },
  { icon: Layers, title: 'Varios objetos, un panel', text: 'Si tienes más de un objeto, los gestionas todos desde el mismo sitio y ves cada uno por separado.' },
]

const extra: Faq[] = [
  {
    q: '¿El panel responde o gestiona mis reseñas de Google?',
    a: 'No. El panel gestiona el destino de tus objetos y te muestra cuántas veces se usan. Las reseñas se gestionan en tu perfil de empresa de Google.',
  },
  {
    q: '¿Qué diferencia hay con una tarjeta NFC programable?',
    a: 'Una tarjeta programable guarda en el chip el enlace directo; para cambiarlo hay que reprogramarla. Nuestros objetos guardan un enlace fijo de StandUrl y el destino real se cambia desde el panel. Lo explicamos en la guía de tarjeta programable frente a enlace editable.',
  },
]

export default function PanelPage() {
  const faqs = [...faqPanel, ...extra]
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Panel StandUrl',
    description: 'Panel para cambiar el destino de tus objetos NFC y QR y ver estadísticas de uso.',
    brand: { '@type': 'Brand', name: 'StandUrl' },
    url: absoluteUrl('/panel-estadisticas-nfc'),
    offers: [
      { '@type': 'Offer', name: 'Panel mensual', price: PANEL_MONTHLY.toFixed(2), priceCurrency: 'EUR', url: absoluteUrl('/panel-estadisticas-nfc') },
      { '@type': 'Offer', name: 'Panel anual', price: PANEL_YEARLY.toFixed(2), priceCurrency: 'EUR', url: absoluteUrl('/panel-estadisticas-nfc') },
    ],
  }
  return (
    <>
      <JsonLd data={ld} />
      <PageHero
        crumbs={[{ label: 'Panel y estadísticas' }]}
        badge="Panel opcional"
        title="Cambia el destino cuando quieras, sin tocar el objeto"
        lead={`El chip del objeto apunta a una dirección fija de StandUrl. Desde el panel decides a dónde lleva. Los ${PANEL_INCLUDED_MONTHS} primeros meses van incluidos con cualquier pack; después, ${formatEUR(PANEL_MONTHLY)}/mes o ${formatEUR(PANEL_YEARLY)}/año.`}
      >
        <ButtonLink href={CTA.href} size="lg" arrow>
          {CTA.label}
        </ButtonLink>
        <ButtonLink href="/precios" variant="secondary" size="lg">
          Ver precios
        </ButtonLink>
      </PageHero>

      <Section tone="cream">
        <Container size="md">
          <Eyebrow>El problema</Eyebrow>
          <H2 className="mb-5">Los chips NFC no se pueden cambiar con facilidad</H2>
          <div className="space-y-4 text-[#57534E] text-lg leading-relaxed">
            <p>
              Si guardas el enlace de tu ficha directamente en el chip, cada vez que cambie (cambio de local, de ficha o de
              enlace) tienes que reprogramar el chip o reponer el objeto. Y con un QR impreso, lo único que puedes hacer es
              imprimirlo de nuevo.
            </p>
            <p>
              Con StandUrl, el chip y el QR llevan siempre a la misma dirección. Lo que cambia es el destino, y eso lo haces tú desde
              el panel, en un momento.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Qué incluye" title="Lo que haces desde el panel" />
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <Card key={f.title}>
                  <Icon className="text-[#B45309] mb-4" size={26} />
                  <h3 className="font-heading font-bold text-lg text-[#111827] mb-2">{f.title}</h3>
                  <p className="text-sm text-[#78716C] leading-relaxed">{f.text}</p>
                </Card>
              )
            })}
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container size="md">
          <SectionHeader eyebrow="Precio" title="Opcional y sin permanencia" />
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <Card>
              <p className="text-xs font-bold uppercase tracking-wider text-[#B45309] mb-2">Primeros meses</p>
              <p className="font-heading text-3xl font-extrabold text-[#111827]">{PANEL_INCLUDED_MONTHS} meses</p>
              <p className="text-sm text-[#78716C] mt-1">incluidos en cualquier pack</p>
            </Card>
            <Card>
              <p className="text-xs font-bold uppercase tracking-wider text-[#B45309] mb-2">Mensual</p>
              <p className="font-heading text-3xl font-extrabold text-[#111827]">{formatEUR(PANEL_MONTHLY)}</p>
              <p className="text-sm text-[#78716C] mt-1">al mes, IVA incluido</p>
            </Card>
            <Card>
              <p className="text-xs font-bold uppercase tracking-wider text-[#B45309] mb-2">Anual</p>
              <p className="font-heading text-3xl font-extrabold text-[#111827]">{formatEUR(PANEL_YEARLY)}</p>
              <p className="text-sm text-[#78716C] mt-1">al año: 2 meses gratis</p>
            </Card>
          </div>
          <p className="text-[#57534E] leading-relaxed mt-8 text-center max-w-2xl mx-auto">
            Si dejas de pagar el panel, tus objetos <strong className="text-[#111827]">siguen funcionando</strong> con el último
            destino configurado. Solo pierdes la posibilidad de cambiarlo y de ver estadísticas.
          </p>
        </Container>
      </Section>

      <Section>
        <Container size="sm">
          <SectionHeader title="Preguntas sobre el panel" />
          <FaqList faqs={faqs} />
          <p className="text-center text-sm text-[#78716C] mt-6">
            <Link href="/guias/tarjeta-nfc-programable-vs-enlace-editable" className="text-[#B45309] font-semibold hover:underline">
              Guía: tarjeta NFC programable o enlace editable
            </Link>
          </p>
        </Container>
      </Section>

      <CtaFinal />
    </>
  )
}
