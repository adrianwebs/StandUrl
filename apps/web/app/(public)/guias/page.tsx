import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import JsonLd from '@/components/JsonLd'
import CtaFinal from '@/components/sections/CtaFinal'
import { Container, Section } from '@/components/ui'
import { GUIDES, type GuideTopic } from '@/lib/guides'
import { absoluteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Guías para conseguir reseñas en Google',
  description:
    'Guías prácticas sobre reseñas de Google, tarjetas NFC, códigos QR y normas de Google, escritas para dueños de gimnasios, peluquerías y restaurantes.',
  alternates: { canonical: '/guias' },
  openGraph: { url: '/guias' },
}

const topics: GuideTopic[] = ['Comparativas', 'Normas y confianza', 'Dudas antes de comprar', 'Cómo pedir reseñas', 'Por sector']

export default function GuiasPage() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Guías para conseguir reseñas en Google',
    url: absoluteUrl('/guias'),
    hasPart: GUIDES.map((g) => ({ '@type': 'Article', headline: g.h1, url: absoluteUrl(`/guias/${g.slug}`) })),
  }
  return (
    <>
      <JsonLd data={ld} />
      <PageHero
        crumbs={[{ label: 'Guías' }]}
        title="Guías para conseguir reseñas en Google"
        lead="Respuestas claras para dueños de negocios locales: cómo pedir reseñas, qué permite Google y cómo elegir entre una tarjeta NFC, un QR o un objeto."
      />
      <Section className="!pt-0">
        <Container size="md">
          <div className="space-y-12">
            {topics.map((t) => {
              const items = GUIDES.filter((g) => g.topic === t)
              if (items.length === 0) return null
              return (
                <div key={t}>
                  <h2 className="font-heading text-2xl font-extrabold text-[#111827] mb-4 tracking-tight">{t}</h2>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {items.map((g) => (
                      <li key={g.slug}>
                        <Link
                          href={`/guias/${g.slug}`}
                          className="block h-full bg-white border border-[#E7E5E4] rounded-2xl p-5 shadow-xs hover:border-[#18181B] hover:shadow-sm transition-all"
                        >
                          <span className="block font-heading font-bold text-[#111827] mb-2">{g.h1}</span>
                          <span className="block text-sm text-[#78716C] leading-relaxed mb-3">{g.description}</span>
                          <span className="text-xs font-semibold text-[#B45309]">{g.readingMinutes} min de lectura</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>
      <CtaFinal />
    </>
  )
}
