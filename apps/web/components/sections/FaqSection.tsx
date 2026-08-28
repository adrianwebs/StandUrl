'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: '¿Es legal pedir reseñas de Google con NFC?',
    a: 'Sí. Google permite explícitamente que los negocios soliciten reseñas auténticas a sus clientes. Lo que prohíben es filtrar por estrellas (mostrar el formulario de Google solo si el cliente pone 5 estrellas). En StandUrl nunca filtramos: el botón lleva directamente a Google, sin preguntas previas.',
  },
  {
    q: '¿Funciona si mi móvil no tiene NFC?',
    a: 'Sí. Cada objeto incluye también un código QR impreso que apunta a la misma URL. Cualquier smartphone con cámara puede escanearlo. No se necesita ninguna app.',
  },
  {
    q: '¿Cuánto tarda en llegar el objeto?',
    a: 'El objeto se imprime, configura y envía en 3-5 días laborables desde que confirmamos el pedido. Los primeros prototipos los gestionamos de forma personalizada.',
  },
  {
    q: '¿Tengo que pagar suscripción obligatoriamente?',
    a: 'No. La suscripción de 4,90 €/mes es opcional. Sin ella, tu objeto sigue funcionando y redirigiendo a la URL que configuramos inicialmente. Con la suscripción puedes cambiar el destino, ver estadísticas y gestionar múltiples dispositivos.',
  },
  {
    q: '¿Qué pasa si cancelo la suscripción?',
    a: 'El objeto sigue funcionando. El NFC y el QR siguen redirigiendo a la última URL que hayas configurado. Simplemente pierdes acceso al dashboard para cambiar el destino o ver estadísticas.',
  },
  {
    q: '¿Puedo tener varios objetos para distintas zonas?',
    a: 'Sí. Cada objeto tiene su propio token único. Puedes tener uno en recepción, otro en la barra y otro en la terraza, cada uno con estadísticas independientes. Los packs Pro (2 dispositivos) y Business (4 dispositivos) están pensados exactamente para esto.',
  },
]

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 px-4 sm:px-6 bg-[#0A0A0A]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#FAFAFA] mb-4">
            Preguntas frecuentes
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-[#111] border border-[#222] rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[#1A1A1A] transition-colors"
              >
                <span className="font-medium text-[#FAFAFA] text-sm sm:text-base">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-[#888] shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm text-[#888] leading-relaxed border-t border-[#222] pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
