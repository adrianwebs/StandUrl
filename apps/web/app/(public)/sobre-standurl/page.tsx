import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import CtaFinal from '@/components/sections/CtaFinal'
import ObjectIllustration from '@/components/ObjectIllustration'
import { Card, Container, Prose, Section, SectionHeader } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Sobre StandUrl: hecho en Albacete',
  description:
    'Quién hay detrás de StandUrl, cómo fabricamos cada objeto en Albacete con impresión 3D y los principios con los que trabajamos.',
  alternates: { canonical: '/sobre-standurl' },
  openGraph: { url: '/sobre-standurl' },
}

const principles = [
  { t: 'Sin permanencia', d: 'Compras el objeto una vez. Si dejas de pagar el panel, el objeto sigue funcionando.' },
  { t: 'Sin filtros ni trucos', d: 'Todos los clientes van al mismo sitio. No filtramos por puntuación ni ofrecemos nada a cambio de reseñas.' },
  { t: 'Precios a la vista', d: 'Lo que ves es lo que pagas, con el IVA incluido. Sin cuotas escondidas.' },
  { t: 'Te lo decimos como es', d: 'Si algo todavía no está listo (como algunos modelos), lo ponemos en la web tal cual.' },
]

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Sobre StandUrl' }]}
        badge="Hecho en Albacete"
        title="Un objeto pequeño para que tu negocio se vea mejor en Google"
        lead="StandUrl es un proyecto pequeño, hecho en Albacete, para negocios locales que quieren más reseñas sin incomodar a sus clientes."
      />

      <Section className="!pt-0">
        <Container size="md">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <Prose>
              <h2>Por qué lo hacemos</h2>
              <p>
                Un negocio local vive de que lo encuentren y de que se fíen de él. Hoy, buena parte de esa confianza está en las
                reseñas de Google. Pero pedirlas incomoda, y los clientes contentos suelen irse sin dejar nada.
              </p>
              <p>
                StandUrl nació para resolver justo eso: un objeto que se ve bien en tu mostrador y que lleva a tu ficha de Google con
                un toque, sin que tengas que pedir nada.
              </p>
            </Prose>
            <div className="bg-white border border-[#E5DFD3] rounded-3xl p-6 shadow-sm">
              <ObjectIllustration className="w-full h-auto" />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="cream">
        <Container size="md">
          <Prose>
            <h2>Cómo se fabrica</h2>
            <p>
              Cada objeto se diseña e imprime en 3D en nuestro taller de Albacete, en tandas pequeñas. Lleva un chip NFC de la
              familia NTAG y un código QR que apuntan a la misma dirección de StandUrl. Antes de enviarlo comprobamos que ambos
              funcionan.
            </p>
            <p>
              Somos un proyecto en sus primeros pasos y estamos buscando los primeros negocios con los que probarlo. Por eso no
              verás aquí testimonios que no existen: cuando los tengamos, los publicaremos con permiso de quien los dé.
            </p>
          </Prose>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader title="Con qué principios trabajamos" />
          <div className="grid sm:grid-cols-2 gap-6">
            {principles.map((p) => (
              <Card key={p.t}>
                <h3 className="font-heading font-bold text-lg text-[#111827] mb-2">{p.t}</h3>
                <p className="text-sm text-[#78716C] leading-relaxed">{p.d}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <CtaFinal />
    </>
  )
}
