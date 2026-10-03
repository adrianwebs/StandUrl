import Breadcrumbs, { type Crumb } from '@/components/Breadcrumbs'
import { Badge } from '@/components/ui'

export default function PageHero({
  crumbs,
  badge,
  title,
  lead,
  children,
  align = 'left',
}: {
  crumbs?: Crumb[]
  badge?: string
  title: React.ReactNode
  lead?: React.ReactNode
  children?: React.ReactNode
  align?: 'left' | 'center'
}) {
  return (
    <section className="px-4 sm:px-6 pt-28 sm:pt-32 pb-12 sm:pb-16">
      <div className={align === 'center' ? 'max-w-4xl mx-auto text-center' : 'max-w-4xl mx-auto'}>
        {crumbs && <div className={align === 'center' ? 'flex justify-center' : undefined}><Breadcrumbs items={crumbs} /></div>}
        {badge && (
          <div className="mb-5">
            <Badge>{badge}</Badge>
          </div>
        )}
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tight leading-[1.1] mb-6">
          {title}
        </h1>
        {lead && (
          <p
            className={
              align === 'center'
                ? 'text-lg sm:text-xl text-[#78716C] max-w-2xl mx-auto leading-relaxed'
                : 'text-lg sm:text-xl text-[#78716C] max-w-3xl leading-relaxed'
            }
          >
            {lead}
          </p>
        )}
        {children && <div className={align === 'center' ? 'mt-8 flex flex-wrap gap-3 justify-center' : 'mt-8 flex flex-wrap gap-3'}>{children}</div>}
      </div>
    </section>
  )
}
