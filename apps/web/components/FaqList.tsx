import { ChevronDown } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import type { Faq } from '@/lib/faqs'

/** Acordeón con <details>: todo el texto está en el HTML (indexable) y funciona sin JavaScript. */
export default function FaqList({ faqs, schema = true }: { faqs: Faq[]; schema?: boolean }) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  return (
    <>
      {schema && <JsonLd data={ld} />}
      <div className="space-y-3">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group bg-white border border-[#E7E5E4] rounded-xl overflow-hidden shadow-xs hover:border-[#D6D3D1] transition-colors"
          >
            <summary className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-[#F3EFE6]/50">
              <span className="font-semibold text-[#111827] text-sm sm:text-base">{f.q}</span>
              <ChevronDown size={18} className="text-[#78716C] shrink-0 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <div className="px-5 sm:px-6 pb-5 text-sm sm:text-[15px] text-[#57534E] leading-relaxed border-t border-[#E7E5E4] pt-4">
              {f.a}
            </div>
          </details>
        ))}
      </div>
    </>
  )
}
