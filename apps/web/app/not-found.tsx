import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ButtonLink } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 pt-28 pb-16 text-center">
        <div className="max-w-lg">
          <p className="text-xs font-bold uppercase tracking-wider text-[#B45309] mb-3">Error 404</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight mb-4">
            No encontramos esa página
          </h1>
          <p className="text-[#78716C] text-lg mb-8">Puede que el enlace haya cambiado. Prueba desde el inicio o echa un vistazo a las guías.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <ButtonLink href="/" arrow>
              Ir al inicio
            </ButtonLink>
            <ButtonLink href="/guias" variant="secondary">
              Ver las guías
            </ButtonLink>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
