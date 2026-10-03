import Link from 'next/link'
import { Container, Section, SectionHeader } from '@/components/ui'
import { formatEUR } from '@/lib/pricing'

const rows = [
  { feature: 'Presencia en el mostrador', card: 'Baja: es discreta', sticker: 'Baja: es plana', us: 'Alta: es un objeto' },
  { feature: 'NFC y QR en el mismo objeto', card: 'Según el modelo', sticker: 'Normalmente solo QR', us: 'Sí, los dos' },
  { feature: 'Cambiar el destino sin reprogramar', card: 'No: hay que reprogramar el chip', sticker: 'No: hay que imprimir otra', us: 'Sí, desde el panel' },
  { feature: 'Estadísticas de uso', card: 'Depende del proveedor', sticker: 'Normalmente no', us: 'Sí, con el panel' },
  { feature: 'Precio orientativo', card: 'Desde 1 € aprox.', sticker: 'Muy bajo', us: `Desde ${formatEUR(29.9)}` },
]

export default function ComparisonTable() {
  return (
    <Section tone="cream">
      <Container size="md">
        <SectionHeader
          eyebrow="Tarjeta, pegatina u objeto"
          title="No es «una tarjeta más»"
          lead="Una tarjeta o una pegatina pueden servirte si solo quieres lo mínimo. Esto es lo que cambia con un objeto."
        />

        <div className="bg-white border border-[#E7E5E4] rounded-2xl overflow-x-auto shadow-sm">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-[#E7E5E4]">
                <th scope="col" className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#A8A29E]">
                  Característica
                </th>
                <th scope="col" className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#78716C] border-l border-[#E7E5E4]">
                  Tarjeta de PVC
                </th>
                <th scope="col" className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#78716C] border-l border-[#E7E5E4]">
                  Pegatina con QR
                </th>
                <th scope="col" className="px-5 py-4 text-left text-sm font-bold text-[#18181B] bg-[#F3EFE6]/70 border-l border-[#E7E5E4]">
                  StandUrl
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.feature} className={`border-b border-[#E7E5E4] last:border-b-0 ${i % 2 ? 'bg-[#FBFBF9]' : ''}`}>
                  <th scope="row" className="px-5 py-4 text-left font-medium text-[#111827]">
                    {r.feature}
                  </th>
                  <td className="px-5 py-4 text-[#78716C] border-l border-[#E7E5E4]">{r.card}</td>
                  <td className="px-5 py-4 text-[#78716C] border-l border-[#E7E5E4]">{r.sticker}</td>
                  <td className="px-5 py-4 font-semibold text-[#111827] bg-[#F3EFE6]/30 border-l border-[#E7E5E4]">{r.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-sm text-[#78716C] mt-6">
          ¿Dudas entre una tarjeta y un objeto?{' '}
          <Link href="/guias/tarjeta-nfc-resenas-google" className="text-[#B45309] font-semibold hover:underline">
            Lee la guía de tarjetas NFC para reseñas
          </Link>
          .
        </p>
      </Container>
    </Section>
  )
}
