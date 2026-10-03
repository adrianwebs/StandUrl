import type { Metadata } from 'next'
import SectorLanding from '@/components/SectorLanding'
import { getSector } from '@/lib/sectors'

const sector = getSector('gimnasios')

export const metadata: Metadata = {
  title: sector.title,
  description: sector.description,
  alternates: { canonical: sector.path },
  openGraph: { title: sector.title, description: sector.description, url: sector.path },
}

export default function Page() {
  return <SectorLanding sector={sector} />
}
