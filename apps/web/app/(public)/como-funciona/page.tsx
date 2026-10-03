import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import CtaFinal from '@/components/sections/CtaFinal'
import { Card, Container, Section, SectionHeader } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Cómo funciona el soporte NFC y QR de StandUrl',
  description:
    'Qué pasa desde que tu cliente acerca el móvil o escanea el QR hasta que llega a tu ficha de Google, y por qué puedes cambiar el destino sin tocar el objeto.',
  alternates: { canonical: '/como-funciona' },
  openGraph: { url: '/como-funciona' },
}

const flow = [
  { t: 'El objeto está en tu mostrador', d: 'Lleva un chip NFC y un código QR en la misma pieza.' },
  { t: 'El cliente acerca el móvil o escanea el QR', d: 'Con NFC o con la cámara. No hace falta instalar nada.' },
  { t: 'Se abre una dirección fija de StandUrl', d: 'Tanto el chip como el QR apuntan siempre a la misma dirección, con un código único para tu objeto.' },
  { t: 'StandUrl lo redirige al destino configurado', d: 'Normalmente, el formulario de reseña de tu ficha de Google. Es la misma redirección para todos tus clientes.' },
  { t: 'Se registra el uso', d: 'Si tienes el panel, ves cuántas veces se ha usado cada objeto.' },
]

export default function ComoFuncionaPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Cómo funciona' }]}
        badge="Cómo funciona"
        title="Cómo funciona StandUrl"
        lead="Tecnología sencilla para que tus clientes lleguen a tu ficha de Google sin complicaciones."
      />

      <Section className="!pt-0">
        <Container size="md">
          <SectionHeader center={false} title="El recorrido completo" />
          <ol className="space-y-4">
            {flow.map((f, i) => (
              <li key={f.t} className="flex gap-4 bg-white border border-[#E7E5E4] rounded-2xl p-5 shadow-xs">
                <span className="font-heading text-3xl font-black text-[#E5DFD3] leading-none w-8 shrink-0">{i + 1}</span>
                <div>
                  <h3 className="font-bold text-[#111827] mb-1">{f.t}</h3>
                  <p className="text-sm text-[#78716C] leading-relaxed">{f.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="cream">
        <Container size="md">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <h2 className="font-heading text-lg font-bold text-[#111827] mb-3">¿Por qué no hay que tocar el objeto nunca?</h2>
              <p className="text-[#78716C] text-sm leading-relaxed">
                El chip siempre apunta a una dirección de StandUrl con un código único. Ese código no cambia nunca. Lo que cambia es el
                destino, que guardamos en nuestro sistema y tú gestionas desde el panel. Si cambias de ficha o de local, no hay que reprogramar
                el chip ni cambiar el objeto.
              </p>
            </Card>
            <Card>
              <h2 className="font-heading text-lg font-bold text-[#111827] mb-3">¿Qué pasa si no pago el panel?</h2>
              <p className="text-[#78716C] text-sm leading-relaxed">
                El objeto sigue funcionando y redirigiendo al último destino que tuvieras configurado. El panel es opcional: sirve para
                cambiar el destino y ver estadísticas.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="md">
          <SectionHeader center={false} title="NFC y QR: las dos puertas" />
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <h3 className="font-bold text-[#111827] mb-2">Chip NFC</h3>
              <p className="text-[#78716C] text-sm leading-relaxed">
                El cliente acerca el móvil al objeto. Funciona con los iPhone XS y posteriores y con la mayoría de móviles Android
                actuales.{' '}
                <Link href="/guias/mi-movil-tiene-nfc" className="text-[#B45309] font-semibold hover:underline">
                  Cómo saber si tu móvil tiene NFC
                </Link>
                .
              </p>
            </Card>
            <Card>
              <h3 className="font-bold text-[#111827] mb-2">Código QR</h3>
              <p className="text-[#78716C] text-sm leading-relaxed">
                Cualquier móvil con cámara puede leerlo. Va en el mismo objeto, así que quien no tiene NFC no se queda fuera.{' '}
                <Link href="/guias/qr-vs-nfc-resenas-google" className="text-[#B45309] font-semibold hover:underline">
                  QR o NFC: cuál es mejor
                </Link>
                .
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <CtaFinal />
    </>
  )
}
