import { MousePointerClick, Smartphone, Star } from 'lucide-react'
import { Container, Section, SectionHeader } from '@/components/ui'

const steps = [
  {
    number: '01',
    icon: MousePointerClick,
    title: 'Pones el objeto en tu mostrador',
    description:
      'Un objeto de diseño impreso en 3D, a la vista de tus clientes. No es una tarjeta que se pierde en el cajón: se ve y se toca.',
  },
  {
    number: '02',
    icon: Smartphone,
    title: 'El cliente acerca el móvil o escanea el QR',
    description:
      'Con NFC o con la cámara. No hay que instalar ninguna aplicación ni crear cuentas. El objeto lleva las dos opciones.',
  },
  {
    number: '03',
    icon: Star,
    title: 'Llega a tu ficha de Google',
    description:
      'Se abre el formulario de reseña de tu negocio. Un único destino para todos tus clientes, sin filtros por puntuación.',
  },
]

export default function HowItWorks() {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow="Cómo funciona"
          title="Tan simple como parece"
          lead="Tres pasos, sin instalaciones ni contraseñas."
        />
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <li
                key={step.number}
                className="relative bg-white border border-[#E7E5E4] rounded-2xl p-8 hover:border-[#D6D3D1] shadow-sm hover:shadow-md transition-all"
              >
                <span
                  aria-hidden
                  className="font-heading text-7xl font-black text-[#F3EFE6] absolute top-6 right-6 leading-none select-none"
                >
                  {step.number}
                </span>
                <div className="w-12 h-12 rounded-xl bg-[#F3EFE6] border border-[#E5DFD3] flex items-center justify-center mb-6 shadow-xs">
                  <Icon size={22} className="text-[#18181B]" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#111827] mb-3">{step.title}</h3>
                <p className="text-[#78716C] text-sm leading-relaxed">{step.description}</p>
              </li>
            )
          })}
        </ol>
      </Container>
    </Section>
  )
}
