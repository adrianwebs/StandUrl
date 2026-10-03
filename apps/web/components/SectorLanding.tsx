import Link from 'next/link'
import { MapPin } from 'lucide-react'
import PageHero from '@/components/PageHero'
import ObjectIllustration from '@/components/ObjectIllustration'
import ModelPlaceholder from '@/components/ModelPlaceholder'
import FaqList from '@/components/FaqList'
import CtaFinal from '@/components/sections/CtaFinal'
import { ButtonLink, Card, Container, Eyebrow, H2, Section, SectionHeader } from '@/components/ui'
import { SECTORS, type Sector } from '@/lib/sectors'
import { CTA } from '@/lib/site'
import { PACKS, TRIAL_DAYS, formatEUR } from '@/lib/pricing'

export default function SectorLanding({ sector }: { sector: Sector }) {
  const ctaHref = sector.modelAvailable
    ? `${CTA.href}?sector=${sector.formValue}`
    : `${CTA.href}?sector=${sector.formValue}&espera=1`
  const ctaLabel = sector.modelAvailable ? CTA.label : 'Avisadme cuando esté listo'
  const others = SECTORS.filter((s) => s.slug !== sector.slug)

  return (
    <>
      <PageHero crumbs={[{ label: sector.short }]} badge={sector.badge} title={sector.h1} lead={sector.lead}>
        <ButtonLink href={ctaHref} size="lg" arrow>
          {ctaLabel}
        </ButtonLink>
        <ButtonLink href="/precios" variant="secondary" size="lg">
          Ver precios
        </ButtonLink>
      </PageHero>

      <Section tone="cream">
        <Container size="md">
          <Eyebrow>El problema</Eyebrow>
          <H2 className="mb-6">{sector.problemTitle}</H2>
          <div className="space-y-4 text-[#57534E] text-lg leading-relaxed max-w-3xl">
            {sector.problem.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="md">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="bg-white border border-[#E5DFD3] rounded-3xl p-6 shadow-sm">
              {sector.modelAvailable ? <ObjectIllustration className="w-full h-auto" /> : <ModelPlaceholder />}
            </div>
            <div>
              <span
                className={`inline-block text-xs font-bold uppercase tracking-wider rounded-full px-3 py-1 mb-4 border ${
                  sector.modelAvailable
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : 'bg-[#F3EFE6] text-[#B45309] border-[#E5DFD3]'
                }`}
              >
                {sector.modelAvailable ? 'Disponible ahora' : 'En preparación'}
              </span>
              <H2 className="!text-2xl sm:!text-3xl mb-4">{sector.modelName}</H2>
              <p className="text-[#57534E] leading-relaxed mb-4">{sector.modelNote}</p>
              <p className="text-[#57534E] leading-relaxed">
                ¿Quieres tu logo? Podemos diseñarlo.{' '}
                <Link href="/objeto-personalizado" className="text-[#B45309] font-semibold hover:underline">
                  Ver objeto personalizado
                </Link>
                .
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <SectionHeader eyebrow="El momento justo" title="Cuándo y cómo se usa" />
          <div className="grid md:grid-cols-3 gap-6">
            {sector.moments.map((m) => (
              <Card key={m.title}>
                <h3 className="font-heading font-bold text-lg text-[#111827] mb-2">{m.title}</h3>
                <p className="text-sm text-[#78716C] leading-relaxed">{m.text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader title={sector.placesTitle} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {sector.places.map((z) => (
              <div key={z.place} className="bg-white border border-[#E7E5E4] rounded-2xl p-5 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={16} className="text-[#B45309]" />
                  <h3 className="font-bold text-[#111827] text-sm">{z.place}</h3>
                </div>
                <p className="text-sm text-[#78716C]">{z.tip}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container size="md">
          <div className="text-center">
            <H2 className="!text-2xl sm:!text-3xl mb-3">Precios a la vista</H2>
            <p className="text-[#57534E] mb-6">
              Desde {formatEUR(PACKS[0].price)} (más {formatEUR(PACKS[0].shipping)} de envío). Pago único, sin permanencia y{' '}
              {TRIAL_DAYS} días de prueba con devolución.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <ButtonLink href="/precios" variant="secondary">
                Ver los 3 packs
              </ButtonLink>
              <ButtonLink href={ctaHref} arrow>
                {ctaLabel}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="sm">
          <SectionHeader eyebrow="Dudas habituales" title="Preguntas sobre el objeto en tu negocio" />
          <FaqList faqs={sector.faqs} />
        </Container>
      </Section>

      <Section tone="white">
        <Container size="md">
          <h2 className="font-heading text-xl font-bold text-[#111827] mb-4">Sigue leyendo</h2>
          <ul className="grid sm:grid-cols-3 gap-3">
            <li>
              <Link
                href={sector.guide.href}
                className="block h-full bg-[#FBFBF9] border border-[#E7E5E4] rounded-xl p-4 hover:border-[#18181B] transition-colors text-sm font-semibold text-[#111827]"
              >
                {sector.guide.label}
              </Link>
            </li>
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={o.path}
                  className="block h-full bg-[#FBFBF9] border border-[#E7E5E4] rounded-xl p-4 hover:border-[#18181B] transition-colors text-sm font-semibold text-[#111827]"
                >
                  También para {o.short.toLowerCase()}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaFinal />
    </>
  )
}
