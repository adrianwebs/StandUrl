import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'
import FaqList from '@/components/FaqList'
import { Badge, Container, Section } from '@/components/ui'
import ProtoForm from './ProtoForm'
import { faqCompra } from '@/lib/faqs'
import { FREE_SHIPPING_FROM, TRIAL_DAYS, formatEUR } from '@/lib/pricing'

export const metadata: Metadata = {
  title: 'Pruébalo 30 días: NFC y QR para reseñas de Google',
  description:
    'Pide tu objeto con NFC y QR y pruébalo 30 días en tu negocio. Si no te convence, lo devuelves y te reembolsamos el producto. Sin permanencia.',
  alternates: { canonical: '/prueba-30-dias' },
  openGraph: { url: '/prueba-30-dias' },
}

const steps = [
  { n: '1', t: 'Envías la solicitud', d: 'Eliges pack y nos dejas los datos de tu negocio. No se te cobra nada en este paso.' },
  { n: '2', t: 'Confirmamos el pedido', d: 'Te contactamos para confirmar los detalles, el enlace de tu ficha de Google y el pago.' },
  { n: '3', t: 'Lo recibes y lo pruebas', d: `Lo colocas en tu negocio y lo pruebas durante ${TRIAL_DAYS} días.` },
  { n: '4', t: 'Te lo quedas o lo devuelves', d: 'Si no te convence, nos lo devuelves y te reembolsamos el producto.' },
]

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ pack?: string; sector?: string; espera?: string; logo?: string }>
}) {
  const sp = await searchParams
  const defaultPack = ['starter', 'pro', 'business'].includes(sp.pack ?? '') ? (sp.pack as string) : 'starter'
  const defaultSector = ['gimnasio', 'peluqueria', 'restaurante', 'otro'].includes(sp.sector ?? '') ? (sp.sector as string) : 'gimnasio'
  const waitlist = sp.espera === '1'
  const defaultMessage = sp.logo === '1' ? 'Quiero mi logo en el objeto. Os paso el logo cuando me contactéis.' : ''

  return (
    <div className="px-4 sm:px-6 pt-28 sm:pt-32 pb-16">
      <div className="max-w-2xl mx-auto">
        <Breadcrumbs items={[{ label: 'Pruébalo 30 días' }]} />
        <div className="mb-10">
          <div className="mb-4">
            <Badge>{waitlist ? 'Lista de espera' : `${TRIAL_DAYS} días de prueba con devolución`}</Badge>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#111827] mb-4 tracking-tight leading-tight">
            {waitlist ? 'Avísame cuando el modelo esté listo' : 'Pruébalo 30 días en tu negocio'}
          </h1>
          <p className="text-[#78716C] text-lg leading-relaxed">
            {waitlist ? (
              'Estamos terminando el modelo de tu sector. Déjanos tus datos y te avisamos en cuanto podamos enviártelo.'
            ) : (
              <>
                Pide tu objeto con NFC y QR. Si en {TRIAL_DAYS} días no te convence, lo devuelves y te reembolsamos el producto.{' '}
                <strong className="text-[#111827]">Envío gratis desde {formatEUR(FREE_SHIPPING_FROM)}.</strong>
              </>
            )}
          </p>
        </div>

        <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-10 shadow-sm">
          <ProtoForm defaultPack={defaultPack} defaultSector={defaultSector} waitlist={waitlist} defaultMessage={defaultMessage} />
        </div>
      </div>

      {!waitlist && (
        <Section className="!px-0">
          <Container size="md">
            <h2 className="font-heading text-2xl font-extrabold text-[#111827] mb-6 text-center">Qué pasa después de enviar la solicitud</h2>
            <ol className="grid sm:grid-cols-2 gap-4 mb-14">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-4 bg-white border border-[#E7E5E4] rounded-2xl p-5">
                  <span className="font-heading text-3xl font-black text-[#E5DFD3] leading-none">{s.n}</span>
                  <div>
                    <p className="font-bold text-[#111827] mb-1">{s.t}</p>
                    <p className="text-sm text-[#78716C] leading-relaxed">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <h2 className="font-heading text-2xl font-extrabold text-[#111827] mb-5 text-center">Preguntas sobre el pedido</h2>
            <FaqList faqs={faqCompra} />
          </Container>
        </Section>
      )}
    </div>
  )
}
