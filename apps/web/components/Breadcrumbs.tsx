import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import { absoluteUrl } from '@/lib/site'

export type Crumb = { label: string; href?: string }

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: 'Inicio', href: '/' }, ...items]
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: absoluteUrl(c.href) } : {}),
    })),
  }
  return (
    <>
      <JsonLd data={ld} />
      <nav aria-label="Migas de pan" className="text-xs sm:text-sm text-[#78716C] mb-6">
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((c, i) => (
            <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
              {c.href && i < all.length - 1 ? (
                <Link href={c.href} className="hover:text-[#111827] font-medium">
                  {c.label}
                </Link>
              ) : (
                <span aria-current={i === all.length - 1 ? 'page' : undefined} className="text-[#111827] font-semibold">
                  {c.label}
                </span>
              )}
              {i < all.length - 1 && <ChevronRight size={14} className="text-[#A8A29E]" />}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
