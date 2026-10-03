import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import JsonLd from '@/components/JsonLd'
import { ButtonLink, Card, Container, Section } from '@/components/ui'
import { absoluteUrl, CONTACT_EMAIL, CTA } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Escríbenos para resolver dudas sobre el soporte NFC y QR para reseñas de Google, pedidos o diseños personalizados.',
  alternates: { canonical: '/contacto' },
  openGraph: { url: '/contacto' },
}

export default function Page() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contacto StandUrl',
    url: absoluteUrl('/contacto'),
  }
  return (
    <>
      <JsonLd data={ld} />
      <PageHero crumbs={[{ label: 'Contacto' }]} title="Hablemos" lead="Pregúntanos lo que quieras antes de pedir. Respondemos nosotros, no un robot." />
      <Section className="!pt-0">
        <Container size="md">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <h2 className="font-heading font-bold text-lg text-[#111827] mb-2">Por correo</h2>
              <p className="text-sm text-[#78716C] leading-relaxed mb-4">Para dudas, presupuestos de objetos personalizados o cualquier consulta sobre tu pedido.</p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#B45309] font-bold hover:underline break-all">
                {CONTACT_EMAIL}
              </a>
            </Card>
            <Card>
              <h2 className="font-heading font-bold text-lg text-[#111827] mb-2">Quiero hacer un pedido</h2>
              <p className="text-sm text-[#78716C] leading-relaxed mb-4">Rellena el formulario de pedido. No se te cobra nada al enviarlo.</p>
              <ButtonLink href={CTA.href} arrow>
                {CTA.label}
              </ButtonLink>
            </Card>
          </div>
          <p className="text-sm text-[#78716C] mt-8">
            Estamos en Albacete, España. No tenemos tienda abierta al público; si quieres ver el objeto en persona en Albacete, escríbenos y
            quedamos.
          </p>
        </Container>
      </Section>
    </>
  )
}
