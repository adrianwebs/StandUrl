import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { clsx } from 'clsx'

export function Section({
  children,
  tone = 'plain',
  className,
  id,
}: {
  children: React.ReactNode
  tone?: 'plain' | 'cream' | 'white'
  className?: string
  id?: string
}) {
  return (
    <section
      id={id}
      className={clsx(
        'px-4 sm:px-6 py-16 sm:py-20',
        tone === 'cream' && 'bg-[#F3EFE6]/60 border-y border-[#E5DFD3]',
        tone === 'white' && 'bg-white border-y border-[#E7E5E4]',
        className
      )}
    >
      {children}
    </section>
  )
}

export function Container({
  children,
  size = 'lg',
  className,
}: {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  return (
    <div
      className={clsx(
        'mx-auto',
        size === 'sm' && 'max-w-3xl',
        size === 'md' && 'max-w-4xl',
        size === 'lg' && 'max-w-6xl',
        className
      )}
    >
      {children}
    </div>
  )
}

export function Eyebrow({ children, tone = 'amber' }: { children: React.ReactNode; tone?: 'amber' | 'green' }) {
  return (
    <p
      className={clsx(
        'text-xs font-bold uppercase tracking-wider mb-3',
        tone === 'amber' ? 'text-[#B45309]' : 'text-[#16A34A]'
      )}
    >
      {children}
    </p>
  )
}

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 bg-[#F3EFE6] border border-[#E5DFD3] rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#B45309]">
      {children}
    </span>
  )
}

export function H2({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={clsx(
        'font-heading text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight leading-tight',
        className
      )}
    >
      {children}
    </h2>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  center = true,
}: {
  eyebrow?: string
  title: React.ReactNode
  lead?: React.ReactNode
  center?: boolean
}) {
  return (
    <div className={clsx('mb-12', center && 'text-center')}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <H2>{title}</H2>
      {lead && (
        <p className={clsx('mt-4 text-lg text-[#78716C] leading-relaxed', center && 'max-w-2xl mx-auto')}>{lead}</p>
      )}
    </div>
  )
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  arrow = false,
  className,
}: {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'md' | 'lg'
  arrow?: boolean
  className?: string
}) {
  return (
    <Link
      href={href}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-all active:scale-[0.98]',
        size === 'md' ? 'text-sm sm:text-base px-6 py-3' : 'text-base sm:text-lg px-8 py-4',
        variant === 'primary'
          ? 'bg-[#18181B] text-white hover:bg-[#27272A] shadow-md'
          : 'bg-white text-[#111827] border border-[#E7E5E4] hover:bg-[#F3EFE6] hover:border-[#D6D3D1] shadow-xs',
        className
      )}
    >
      {children}
      {arrow && <ArrowRight size={size === 'md' ? 18 : 20} />}
    </Link>
  )
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('bg-white border border-[#E7E5E4] rounded-2xl shadow-sm p-6 sm:p-7', className)}>
      {children}
    </div>
  )
}

/** Tipografía para textos largos (guías y páginas legales/informativas). */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={clsx(
        'text-[#44403C] leading-relaxed text-base sm:text-[17px]',
        '[&_h2]:font-heading [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-extrabold [&_h2]:text-[#111827] [&_h2]:tracking-tight [&_h2]:mt-12 [&_h2]:mb-4',
        '[&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#111827] [&_h3]:mt-8 [&_h3]:mb-3',
        '[&_p]:mb-4',
        '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-2',
        '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-2',
        '[&_a]:text-[#B45309] [&_a]:font-semibold [&_a:hover]:underline',
        '[&_strong]:text-[#111827]',
        '[&_blockquote]:border-l-4 [&_blockquote]:border-[#E5DFD3] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#78716C] [&_blockquote]:mb-4',
        '[&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto [&_table]:w-full [&_table]:text-sm [&_table]:mb-6 [&_table]:border-collapse',
        '[&_th]:text-left [&_th]:bg-[#F3EFE6] [&_th]:p-3 [&_th]:border [&_th]:border-[#E5DFD3] [&_th]:text-[#111827]',
        '[&_td]:p-3 [&_td]:border [&_td]:border-[#E7E5E4] [&_td]:align-top'
      )}
    >
      {children}
    </div>
  )
}

export function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <aside className="my-6 bg-[#F3EFE6] border border-[#E5DFD3] rounded-2xl p-5 text-sm sm:text-base text-[#44403C]">
      <p className="font-heading font-bold text-[#111827] mb-1">{title}</p>
      <div className="[&_p]:mb-2 [&_p:last-child]:mb-0 [&_a]:text-[#B45309] [&_a]:font-semibold [&_a:hover]:underline">{children}</div>
    </aside>
  )
}
