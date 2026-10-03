import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import FaqList from '@/components/FaqList'
import JsonLd from '@/components/JsonLd'
import CtaFinal from '@/components/sections/CtaFinal'
import { Container, Section } from '@/components/ui'
import { faqComparativa, faqCompra, faqGeneral, faqPanel, faqUso } from '@/lib/faqs'

export const metadata: Metadata = {
  title: 'Preguntas frecuentes sobre el soporte NFC y QR',
  description:
    'Resolvemos las dudas habituales: compatibilidad con móviles, normas de Google, cambiar el enlace, precios, envíos y la prueba de 30 días.',
  alternates: { canonical: '/preguntas-frecuentes' },
  openGraph: { url: '/preguntas-frecuentes' },
}

const groups = [
  { title: 'Uso y normas de Google', faqs: faqUso },
  { title: 'Panel y cambio de destino', faqs: faqPanel },
  { title: 'Pedido, envío y prueba de 30 días', faqs: faqCompra },
  { title: 'Frente a una tarjeta o pegatina', faqs: faqComparativa },
]

export default function Page() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqGeneral.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  return (
    <>
      <JsonLd data={ld} />
      <PageHero crumbs={[{ label: 'Preguntas frecuentes' }]} title="Preguntas frecuentes" lead="Todo lo que suelen preguntarnos antes de pedir." />
      <Section className="!pt-0">
        <Container size="sm">
          <div className="space-y-12">
            {groups.map((g) => (
              <div key={g.title}>
                <h2 className="font-heading text-2xl font-extrabold text-[#111827] mb-4 tracking-tight">{g.title}</h2>
                <FaqList faqs={g.faqs} schema={false} />
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <CtaFinal />
    </>
  )
}
