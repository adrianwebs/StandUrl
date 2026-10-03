import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import CtaFinal from '@/components/sections/CtaFinal'
import FaqList from '@/components/FaqList'
import JsonLd from '@/components/JsonLd'
import { ButtonLink, Card, Container, Eyebrow, H2, Section, SectionHeader } from '@/components/ui'
import { CUSTOM_LOGO_FEE, PACKS, formatEUR } from '@/lib/pricing'
import { absoluteUrl, CTA } from '@/lib/site'
import type { Faq } from '@/lib/faqs'

export const metadata: Metadata = {
  title: 'Objeto NFC personalizado con tu logo para reseñas',
  description:
    'Objeto impreso en 3D con tu logo y colores, con NFC y QR para reseñas de Google. Diseñado en Albacete. Boceto antes de imprimir.',
  alternates: { canonical: '/objeto-personalizado' },
  openGraph: { url: '/objeto-personalizado' },
}

const steps = [
  { n: '1', t: 'Nos cuentas qué quieres', d: 'Tu logo, tus colores y dónde lo vas a poner. Si no tienes logo en buen formato, te orientamos.' },
  { n: '2', t: 'Te enviamos un boceto', d: 'En 2–3 días laborables ves cómo quedaría. Puedes pedir ajustes antes de dar el visto bueno.' },
  { n: '3', t: 'Lo imprimimos', d: 'Cuando validas el boceto, lo imprimimos en 3D, le ponemos el chip NFC y el QR y lo comprobamos.' },
  { n: '4', t: 'Lo recibes en tu negocio', d: 'De la validación a la entrega, el plazo habitual es de 7 a 12 días laborables en total.' },
]

const faqs: Faq[] = [
  { q: '¿Qué puedo personalizar?', a: 'Tu logo y los colores del objeto, dentro de los colores de filamento que tenemos disponibles. El modelo base es el de catálogo. Si quieres una forma distinta, cuéntanoslo y valoramos si es viable y el presupuesto.' },
  { q: '¿Cuánto cuesta?', a: `El diseño con tu logo tiene un cargo único de ${formatEUR(CUSTOM_LOGO_FEE)} en el primer pedido; después, el precio del pack que elijas. Las reposiciones con el mismo logo no llevan ese recargo.` },
  { q: '¿Puedo ver cómo queda antes de que lo imprimáis?', a: 'Sí. Te enviamos un boceto y no imprimimos hasta que lo valides.' },
  { q: '¿Qué formato de logo necesitáis?', a: 'Lo ideal es un archivo vectorial (SVG o PDF) o una imagen PNG de buena resolución. Si solo tienes una foto o un logo borroso, nos lo cuentas y vemos qué se puede hacer.' },
  { q: '¿Se puede devolver un objeto personalizado?', a: 'Los objetos con tu logo se fabrican a medida, por eso no admiten devolución salvo defecto de fabricación. Para eso validas el boceto antes de imprimir. Los modelos de catálogo sí tienen prueba de 30 días con devolución.' },
  { q: '¿Cuánto tarda?', a: 'El boceto, en 2–3 días laborables, y el objeto, entre 7 y 12 días laborables desde que lo validas hasta que lo recibes.' },
]

export default function PersonalizadoPage() {
  const pro = PACKS[1]
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Objeto NFC y QR personalizado con tu logo',
    serviceType: 'Diseño e impresión 3D de objeto con NFC y QR personalizado',
    provider: { '@type': 'Organization', name: 'StandUrl', url: absoluteUrl('/') },
    areaServed: 'ES',
    offers: { '@type': 'Offer', price: CUSTOM_LOGO_FEE.toFixed(2), priceCurrency: 'EUR', name: 'Diseño con tu logo (primer pedido)' },
  }
  return (
    <>
      <JsonLd data={ld} />
      <PageHero
        crumbs={[{ label: 'Objeto personalizado' }]}
        badge="Con tu marca"
        title="Un objeto con tu marca, no una tarjeta genérica"
        lead="Ponemos tu logo y tus colores en un objeto impreso en 3D con NFC y QR. Lo ves antes de que lo imprimamos y lo recibes listo para dejarlo en tu mostrador."
      >
        <ButtonLink href={`${CTA.href}?logo=1&sector=otro`} size="lg" arrow>
          Cuéntanos tu idea
        </ButtonLink>
        <ButtonLink href="/precios" variant="secondary" size="lg">
          Ver precios
        </ButtonLink>
      </PageHero>

      <Section tone="cream">
        <Container size="md">
          <Eyebrow>Por qué personalizarlo</Eyebrow>
          <H2 className="mb-5">Un objeto de tu marca llama más la atención</H2>
          <div className="space-y-4 text-[#57534E] text-lg leading-relaxed">
            <p>
              Una tarjeta genérica pasa desapercibida. Un objeto con tu logo y tus colores parece parte de tu negocio, y eso es lo
              que hace que tus clientes se fijen en él.
            </p>
            <p>
              Funciona igual que el modelo de catálogo: NFC y QR en la misma pieza, y un destino que puedes cambiar desde el panel.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Cómo lo hacemos" title="De tu idea a tu mostrador en cuatro pasos" />
          <ol className="grid sm:grid-cols-2 gap-5">
            {steps.map((s) => (
              <li key={s.n} className="flex gap-4 bg-white border border-[#E7E5E4] rounded-2xl p-6 shadow-xs">
                <span className="font-heading text-4xl font-black text-[#E5DFD3] leading-none">{s.n}</span>
                <div>
                  <h3 className="font-heading font-bold text-[#111827] mb-1">{s.t}</h3>
                  <p className="text-sm text-[#78716C] leading-relaxed">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="white">
        <Container size="md">
          <SectionHeader eyebrow="Precio" title="Cuánto cuesta ponerle tu logo" />
          <Card className="text-center">
            <p className="font-heading text-4xl font-extrabold text-[#111827]">+ {formatEUR(CUSTOM_LOGO_FEE)}</p>
            <p className="text-[#78716C] mt-2 mb-4">cargo único de diseño en el primer pedido</p>
            <p className="text-[#57534E] leading-relaxed max-w-xl mx-auto">
              Se suma al precio del pack. Por ejemplo, un pack {pro.name} ({pro.units} objetos) con tu logo:{' '}
              {formatEUR(pro.price)} + {formatEUR(CUSTOM_LOGO_FEE)} = <strong className="text-[#111827]">{formatEUR(pro.price + CUSTOM_LOGO_FEE)}</strong>, con envío gratis.
            </p>
          </Card>
        </Container>
      </Section>

      <Section>
        <Container size="sm">
          <SectionHeader title="Preguntas sobre el objeto personalizado" />
          <FaqList faqs={faqs} />
        </Container>
      </Section>

      <CtaFinal title="Cuéntanos tu idea" text="Dinos qué negocio tienes y cómo imaginas el objeto. Te respondemos con un boceto." />
    </>
  )
}
