import { MousePointerClick, Smartphone, Star } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: MousePointerClick,
    title: 'El objeto en tu mostrador',
    description:
      'Pesas, tijeras, tazas. Objetos de marca impresos en 3D con tu logo. No una tarjeta genérica — algo que llama la atención.',
  },
  {
    number: '02',
    icon: Smartphone,
    title: 'El cliente toca o escanea',
    description:
      'NFC o QR. Compatible con cualquier smartphone, sin descargar ninguna app. Funciona en 2 segundos.',
  },
  {
    number: '03',
    icon: Star,
    title: 'Reseña en Google, al instante',
    description:
      'Directo a tu ficha de Google. Sin pasos intermedios, sin filtros por estrellas. Solo tu reseña auténtica.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#FAFAFA] mb-4">
            Tan simple como parece
          </h2>
          <p className="text-[#888] text-lg max-w-xl mx-auto">
            Tres pasos. Sin instalaciones. Sin contraseñas. Sin fricciones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative bg-[#111] border border-[#222] rounded-2xl p-8 hover:border-[#333] transition-colors">
                {/* Número grande */}
                <span className="font-heading text-7xl font-bold text-[#1A1A1A] absolute top-6 right-6 leading-none select-none">
                  {step.number}
                </span>
                {/* Icono */}
                <div className="w-12 h-12 rounded-xl bg-[#F5A623]/10 border border-[#F5A623]/20 flex items-center justify-center mb-6">
                  <Icon size={22} className="text-[#F5A623]" />
                </div>
                <h3 className="font-heading text-lg font-bold text-[#FAFAFA] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#888] text-sm leading-relaxed">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
