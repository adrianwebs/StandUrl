import { Check, X } from 'lucide-react'

const rows = [
  { feature: 'Objeto de marca personalizado', generic: false, standurl: true },
  { feature: 'NFC + QR combinados', generic: false, standurl: true },
  { feature: 'Destino configurable sin tocar el objeto', generic: false, standurl: true },
  { feature: 'Estadísticas de uso', generic: false, standurl: true },
  { feature: 'Sin suscripción obligatoria', generic: false, standurl: true },
  { feature: 'Personalizado por sector', generic: false, standurl: true },
  { feature: 'Redirige a Google Reviews', generic: true, standurl: true },
]

export default function ComparisonTable() {
  return (
    <section className="py-24 px-4 sm:px-6 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#FAFAFA] mb-4">
            No es «una tarjeta más»
          </h2>
          <p className="text-[#888] text-lg">
            Cualquiera puede imprimir una placa acrílica con NFC. Esto es diferente.
          </p>
        </div>

        <div className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 border-b border-[#222]">
            <div className="px-6 py-4 text-sm text-[#555]">Característica</div>
            <div className="px-6 py-4 text-center text-sm text-[#555] border-l border-[#222]">
              Tarjeta genérica
            </div>
            <div className="px-6 py-4 text-center text-sm font-semibold text-[#F5A623] border-l border-[#222]">
              StandUrl
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 border-b border-[#222] last:border-b-0 ${i % 2 === 0 ? '' : 'bg-[#0A0A0A]/40'}`}
            >
              <div className="px-6 py-4 text-sm text-[#FAFAFA]">{row.feature}</div>
              <div className="px-6 py-4 flex justify-center items-center border-l border-[#222]">
                {row.generic ? (
                  <Check size={18} className="text-[#22C55E]" />
                ) : (
                  <X size={18} className="text-[#EF4444]" />
                )}
              </div>
              <div className="px-6 py-4 flex justify-center items-center border-l border-[#222]">
                {row.standurl ? (
                  <Check size={18} className="text-[#22C55E]" />
                ) : (
                  <X size={18} className="text-[#EF4444]" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
