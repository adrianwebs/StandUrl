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
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#111827] mb-4 tracking-tight">
            No es «una tarjeta más»
          </h2>
          <p className="text-[#78716C] text-lg">
            Cualquiera puede imprimir una placa acrílica con NFC. Esto es diferente.
          </p>
        </div>

        <div className="bg-white border border-[#E7E5E4] rounded-2xl overflow-hidden shadow-sm">
          {/* Header */}
          <div className="grid grid-cols-3 border-b border-[#E7E5E4]">
            <div className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#A8A29E]">Característica</div>
            <div className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-[#78716C] border-l border-[#E7E5E4]">
              Tarjeta genérica
            </div>
            <div className="px-6 py-4 text-center text-sm font-bold text-[#18181B] bg-[#F3EFE6]/60 border-l border-[#E7E5E4]">
              StandUrl
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 border-b border-[#E7E5E4] last:border-b-0 ${i % 2 === 0 ? '' : 'bg-[#FBFBF9]'}`}
            >
              <div className="px-6 py-4 text-sm font-medium text-[#111827]">{row.feature}</div>
              <div className="px-6 py-4 flex justify-center items-center border-l border-[#E7E5E4]">
                {row.generic ? (
                  <Check size={18} className="text-[#16A34A]" />
                ) : (
                  <X size={18} className="text-[#DC2626]" />
                )}
              </div>
              <div className="px-6 py-4 flex justify-center items-center border-l border-[#E7E5E4] bg-[#F3EFE6]/20">
                {row.standurl ? (
                  <Check size={18} className="text-[#16A34A]" />
                ) : (
                  <X size={18} className="text-[#DC2626]" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

