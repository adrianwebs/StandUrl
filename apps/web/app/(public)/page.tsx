import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Infinity as InfinityIcon, MapPin, ShieldCheck } from 'lucide-react'
import HeroSection from '@/components/sections/HeroSection'
import HowItWorks from '@/components/sections/HowItWorks'
import ComparisonTable from '@/components/sections/ComparisonTable'
import PricingSection from '@/components/sections/PricingSection'
import CtaFinal from '@/components/sections/CtaFinal'
import FaqList from '@/components/FaqList'
import JsonLd from '@/components/JsonLd'
import { Card, Container, Eyebrow, H2, Section, SectionHeader } from '@/components/ui'
import { faqHome } from '@/lib/faqs'
import { SECTORS } from '@/lib/sectors'
import { productLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: { absolute: 'Soporte NFC y QR para reseñas de Google | StandUrl' },
  description:
    'Objeto de diseño con NFC y QR para que tus clientes dejen su reseña en Google con un toque. Cambia el destino cuando quieras. Pruébalo 30 días.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Soporte NFC y QR para reseñas de Google | StandUrl',
    description:
      'Objeto de diseño con NFC y QR para que tus clientes dejen su reseña en Google con un toque. Pruébalo 30 días.',
    url: '/',
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={productLd} />
      <HeroSection />

      {/* Problema → solución */}
      <Section tone="cream">
        <Container size="md">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
            <div>
              <Eyebrow>El problema</Eyebrow>
              <H2 className="!text-2xl sm:!text-3xl mb-4">Pedir una reseña incomoda. A ti y a tu cliente.</H2>
              <p className="text-[#78716C] leading-relaxed">
                Decirle a alguien «¿me dejas una reseña?» resulta forzado, y mandar un enlace por WhatsApp se pierde entre
                mil mensajes. El resultado: los clientes contentos se van sin opinar, y en Google Maps pierdes terreno frente a
                quien sí acumula reseñas.
              </p>
            </div>
            <div>
              <Eyebrow tone="green">La solución</Eyebrow>
              <H2 className="!text-2xl sm:!text-3xl mb-4">Un objeto que lo hace por ti.</H2>
              <p className="text-[#78716C] leading-relaxed">
                Lo dejas en el mostrador. El cliente acerca el móvil o escanea el QR y se abre el formulario de reseña de tu
                ficha de Google. Tú no tienes que pedir nada, y él no tiene que buscarte ni instalar nada.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <HowItWorks />
      <ComparisonTable />

      {/* Sectores */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Para tu negocio"
            title="Un objeto pensado para cada sector"
            lead="Cada negocio tiene su momento y su lugar para pedir una reseña. Mira cómo lo planteamos en el tuyo."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {SECTORS.map((s) => (
              <Link
                key={s.slug}
                href={s.path}
                className="group bg-white border border-[#E7E5E4] rounded-2xl p-7 shadow-sm hover:shadow-md hover:border-[#18181B] transition-all flex flex-col"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-[#B45309] mb-2">{s.short}</p>
                <h3 className="font-heading text-xl font-bold text-[#111827] mb-3 leading-snug">{s.h1}</h3>
                <p className="text-sm text-[#78716C] leading-relaxed mb-5 flex-1">{s.description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#111827]">
                  Ver para {s.short.toLowerCase()}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Destino editable */}
      <Section tone="white">
        <Container size="md">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <Eyebrow>Panel y estadísticas</Eyebrow>
              <H2 className="!text-2xl sm:!text-3xl mb-4">Cambia el destino sin tocar el objeto</H2>
              <p className="text-[#57534E] leading-relaxed mb-4">
                El chip no apunta directamente a tu ficha de Google, sino a una dirección fija de StandUrl. Desde el panel eliges
                a dónde lleva en cada momento. Si cambias de ficha o de local, no hay que reprogramar nada.
              </p>
              <p className="text-[#57534E] leading-relaxed mb-6">
                Con el panel también ves cuántas veces se usa cada objeto. Está incluido los primeros 3 meses.
              </p>
              <Link href="/panel-estadisticas-nfc" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#B45309] hover:underline">
                Ver qué incluye el panel <ArrowRight size={16} />
              </Link>
            </div>
            <Card className="bg-[#FBFBF9] font-mono text-sm space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[#78716C]">Chip del objeto</span>
                <span className="bg-white border border-[#E5DFD3] rounded-lg px-2.5 py-1 text-[#18181B]">standurl.com/t/…</span>
              </div>
              <div className="text-[#A8A29E] pl-2">↓ redirección</div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[#78716C]">Destino (editable)</span>
                <span className="bg-white border border-[#E5DFD3] rounded-lg px-2.5 py-1 text-[#B45309]">tu ficha de Google</span>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Confianza */}
      <Section>
        <Container>
          <SectionHeader eyebrow="Por qué confiar" title="Sin trucos y sin ataduras" />
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <InfinityIcon className="text-[#B45309] mb-4" size={26} />
              <h3 className="font-heading font-bold text-lg text-[#111827] mb-2">Sin permanencia</h3>
              <p className="text-sm text-[#78716C] leading-relaxed">
                Compras el objeto una vez. Si dejas de pagar el panel, el objeto sigue funcionando con el último destino que
                hayas configurado.
              </p>
            </Card>
            <Card>
              <ShieldCheck className="text-[#B45309] mb-4" size={26} />
              <h3 className="font-heading font-bold text-lg text-[#111827] mb-2">Sin filtros ni incentivos</h3>
              <p className="text-sm text-[#78716C] leading-relaxed">
                Todos tus clientes van al mismo sitio, sin preguntas previas. Google prohíbe filtrar a quién se piden reseñas y
                ofrecer algo a cambio.{' '}
                <Link href="/guias/normas-de-google-sobre-resenas" className="text-[#B45309] font-semibold hover:underline">
                  Léelo aquí
                </Link>
                .
              </p>
            </Card>
            <Card>
              <MapPin className="text-[#B45309] mb-4" size={26} />
              <h3 className="font-heading font-bold text-lg text-[#111827] mb-2">Hecho en Albacete</h3>
              <p className="text-sm text-[#78716C] leading-relaxed">
                Diseñamos e imprimimos cada objeto en nuestro taller, en tandas pequeñas. Hablas con la persona que lo hace.{' '}
                <Link href="/sobre-standurl" className="text-[#B45309] font-semibold hover:underline">
                  Conócenos
                </Link>
                .
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <div className="bg-[#F3EFE6]/40 border-y border-[#E7E5E4]">
        <PricingSection />
      </div>

      <Section>
        <Container size="sm">
          <SectionHeader eyebrow="Dudas habituales" title="Preguntas frecuentes" center />
          <FaqList faqs={faqHome} />
          <p className="text-center text-sm text-[#78716C] mt-6">
            <Link href="/preguntas-frecuentes" className="text-[#B45309] font-semibold hover:underline">
              Ver todas las preguntas frecuentes
            </Link>
          </p>
        </Container>
      </Section>

      <CtaFinal />
    </>
  )
}
