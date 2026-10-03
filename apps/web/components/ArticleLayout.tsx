import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import JsonLd from '@/components/JsonLd'
import FaqList from '@/components/FaqList'
import { ButtonLink, Prose } from '@/components/ui'
import { absoluteUrl, CONTENT_UPDATED, CTA, SITE_NAME } from '@/lib/site'
import { GUIDES, getGuide } from '@/lib/guides'
import type { Faq } from '@/lib/faqs'

export default function ArticleLayout({
  slug,
  related = [],
  faqs,
  children,
}: {
  slug: string
  related?: string[]
  faqs?: Faq[]
  children: React.ReactNode
}) {
  const g = getGuide(slug)
  const url = absoluteUrl(`/guias/${slug}`)
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: g.h1,
    description: g.description,
    inLanguage: 'es-ES',
    datePublished: g.published,
    dateModified: CONTENT_UPDATED,
    mainEntityOfPage: url,
    author: { '@type': 'Organization', name: SITE_NAME, url: absoluteUrl('/') },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: absoluteUrl('/') },
  }
  const relatedGuides = related.map((s) => GUIDES.find((x) => x.slug === s)).filter(Boolean)

  return (
    <article className="px-4 sm:px-6 pt-28 sm:pt-32 pb-16">
      <JsonLd data={ld} />
      <div className="max-w-3xl mx-auto">
        <Breadcrumbs items={[{ label: 'Guías', href: '/guias' }, { label: g.title }]} />
        <p className="text-xs font-bold uppercase tracking-wider text-[#B45309] mb-3">{g.topic}</p>
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#111827] tracking-tight leading-[1.15] mb-4">
          {g.h1}
        </h1>
        <p className="text-sm text-[#78716C] mb-10">
          Por el equipo de {SITE_NAME} · Actualizado el{' '}
          <time dateTime={CONTENT_UPDATED}>
            {new Date(CONTENT_UPDATED).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
          </time>{' '}
          · {g.readingMinutes} min de lectura
        </p>

        <Prose>{children}</Prose>

        {faqs && faqs.length > 0 && (
          <section className="mt-14">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight mb-5">
              Preguntas frecuentes
            </h2>
            <FaqList faqs={faqs} />
          </section>
        )}

        <aside className="mt-14 bg-[#F3EFE6] border border-[#E5DFD3] rounded-3xl p-7 sm:p-9 text-center">
          <p className="font-heading text-2xl font-extrabold text-[#111827] mb-2">¿Quieres probarlo en tu negocio?</p>
          <p className="text-[#78716C] mb-5">
            Un objeto con NFC y QR para que tus clientes dejen su reseña en Google. 30 días de prueba con devolución.
          </p>
          <ButtonLink href={CTA.href} arrow>
            {CTA.label}
          </ButtonLink>
        </aside>

        {relatedGuides.length > 0 && (
          <section className="mt-12">
            <h2 className="font-heading text-xl font-bold text-[#111827] mb-4">Sigue leyendo</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {relatedGuides.map((r) =>
                r ? (
                  <li key={r.slug}>
                    <Link
                      href={`/guias/${r.slug}`}
                      className="block h-full bg-white border border-[#E7E5E4] rounded-xl p-4 hover:border-[#18181B] transition-colors"
                    >
                      <span className="block text-xs font-bold uppercase tracking-wider text-[#B45309] mb-1">{r.topic}</span>
                      <span className="font-semibold text-[#111827] text-sm">{r.title}</span>
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </section>
        )}
      </div>
    </article>
  )
}
