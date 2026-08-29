import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Cómo funciona' }

export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 bg-[#FBFBF9] text-[#111827]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#F3EFE6] border border-[#E5DFD3] text-[#B45309] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Flujo Tecnológico
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#111827] mb-4 tracking-tight">
            Cómo funciona StandUrl
          </h1>
          <p className="text-[#78716C] text-lg sm:text-xl max-w-2xl mx-auto">
            Tecnología sencilla, resultado inmediato sin complicaciones técnicas.
          </p>
        </div>

        {/* Flujo visual */}
        <div className="bg-white border border-[#E7E5E4] rounded-3xl p-8 sm:p-10 mb-10 shadow-sm">
          <h2 className="font-heading text-xl font-extrabold text-[#111827] mb-6">El flujo completo</h2>
          <div className="font-mono text-sm text-[#78716C] space-y-2.5 leading-loose">
            <div className="font-semibold text-[#111827]"><span className="text-[#B45309] font-bold">1.</span> Objeto físico personalizado en tu mostrador</div>
            <div className="pl-6 text-[#A8A29E]">↓</div>
            <div className="font-semibold text-[#111827]"><span className="text-[#B45309] font-bold">2.</span> El cliente acerca el móvil (NFC) o escanea el QR</div>
            <div className="pl-6 text-[#A8A29E]">↓</div>
            <div className="font-semibold text-[#111827]"><span className="text-[#B45309] font-bold">3.</span> Petición ultrarrápida a <span className="text-[#18181B] bg-[#F3EFE6] px-2 py-0.5 rounded border border-[#E5DFD3]">standurl.com/t/8F7K2P</span></div>
            <div className="pl-6 text-[#A8A29E]">↓ <span className="text-xs text-[#78716C] font-sans font-medium">(cache Redis · &lt;10ms de latencia)</span></div>
            <div className="font-semibold text-[#111827]"><span className="text-[#B45309] font-bold">4.</span> El servidor responde <span className="text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded border border-green-200">302 Redirect</span> → destino dinámico</div>
            <div className="pl-6 text-[#A8A29E]">↓</div>
            <div className="font-semibold text-[#111827]"><span className="text-[#B45309] font-bold">5.</span> Google Reviews de tu negocio se abre al instante con 5 estrellas</div>
            <div className="pl-6 text-[#A8A29E]">↓ <span className="text-xs text-[#78716C] font-sans font-medium">(en background asíncrono, sin bloquear la carga)</span></div>
            <div className="font-semibold text-[#111827]"><span className="text-[#B45309] font-bold">6.</span> Interacción registrada en tu dashboard de cliente</div>
          </div>
        </div>

        {/* Por qué no hay que tocar el objeto */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-8 shadow-xs">
            <h3 className="font-heading text-lg font-bold text-[#111827] mb-3">
              ¿Por qué no hay que tocar el objeto nunca?
            </h3>
            <p className="text-[#78716C] text-sm leading-relaxed">
              El chip NFC siempre apunta a <code className="text-[#B45309] font-bold bg-[#F3EFE6] px-1.5 py-0.5 rounded">standurl.com/t/TOKEN</code>.
              Ese TOKEN no cambia nunca. Lo que cambia es el{' '}
              <strong className="text-[#111827]">destino</strong> en nuestra base de datos en tiempo real.
              Hoy Google Reviews, mañana tu menú, pasado mañana tu WhatsApp — sin cambiar el objeto físico.
            </p>
          </div>
          <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-8 shadow-xs">
            <h3 className="font-heading text-lg font-bold text-[#111827] mb-3">
              ¿Por qué el redirect es instantáneo?
            </h3>
            <p className="text-[#78716C] text-sm leading-relaxed">
              El destino está en cache ultrarrápida. Cuando el cliente toca el objeto con su teléfono, el servidor responde en menos de 10ms. El usuario nunca ve una pantalla de carga ni intermediarios molestos.
            </p>
          </div>
        </div>

        {/* NFC vs QR */}
        <div className="bg-[#F3EFE6] border border-[#E5DFD3] rounded-3xl p-8 sm:p-10 shadow-xs">
          <h2 className="font-heading text-xl font-extrabold text-[#111827] mb-6">NFC + QR: las dos puertas</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#E5DFD3] rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-[#111827] mb-2 flex items-center gap-2">
                <span>📡 Chip NFC Integrado</span>
              </h3>
              <p className="text-[#78716C] text-sm leading-relaxed">
                Compatible con iPhone y Android modernos. El cliente solo tiene que acercar el móvil sin abrir ninguna aplicación previa.
              </p>
            </div>
            <div className="bg-white border border-[#E5DFD3] rounded-2xl p-6 shadow-xs">
              <h3 className="font-bold text-[#111827] mb-2 flex items-center gap-2">
                <span>📷 Código QR Vectorial</span>
              </h3>
              <p className="text-[#78716C] text-sm leading-relaxed">
                Cualquier smartphone con cámara. Integrado y extruido directamente en el objeto, cubriendo el 100% de compatibilidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
