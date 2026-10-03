import type { Metadata } from 'next'

// Áreas privadas: no deben indexarse.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return children
}
