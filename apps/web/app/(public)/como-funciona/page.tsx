import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Cómo funciona' }

export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#FAFAFA] mb-4">
            Cómo funciona StandUrl
          </h1>
          <p className="text-[#888] text-xl max-w-2xl mx-auto">
            Tecnología sencilla, resultado inmediato.
          </p>
        </div>

        {/* Flujo visual */}
        <div className="bg-[#111] border border-[#222] rounded-2xl p-8 mb-12">
          <h2 className="font-heading text-xl font-bold text-[#FAFAFA] mb-6">El flujo completo</h2>
          <div className="font-mono text-sm text-[#888] space-y-2 leading-loose">
            <div><span className="text-[#F5A623]">1.</span> Objeto físico en tu mostrador</div>
            <div className="pl-6">↓</div>
            <div><span className="text-[#F5A623]">2.</span> Cliente acerca el móvil (NFC) o escanea el QR</div>
            <div className="pl-6">↓</div>
            <div><span className="text-[#F5A623]">3.</span> Petición a <span className="text-[#FAFAFA]">standurl.com/t/8F7K2P</span></div>
            <div className="pl-6">↓ <span className="text-xs text-[#555]">(cache Redis · &lt;10ms)</span></div>
            <div><span className="text-[#F5A623]">4.</span> Servidor responde <span className="text-[#22C55E]">302 Redirect</span> → destination_url</div>
            <div className="pl-6">↓</div>
            <div><span className="text-[#F5A623]">5.</span> Google Reviews de tu negocio</div>
            <div className="pl-6">↓ <span className="text-xs text-[#555]">(en background, sin bloquear)</span></div>
            <div><span className="text-[#F5A623]">6.</span> Interacción registrada en tu dashboard</div>
          </div>
        </div>

        {/* Por qué no hay que tocar el objeto */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
            <h3 className="font-heading text-lg font-bold text-[#FAFAFA] mb-3">
              ¿Por qué no hay que tocar el objeto nunca?
            </h3>
            <p className="text-[#888] text-sm leading-relaxed">
              El chip NFC siempre apunta a <code className="text-[#F5A623]">standurl.com/t/TOKEN</code>.
              Ese TOKEN no cambia nunca. Lo que cambia es el{' '}
              <strong className="text-[#FAFAFA]">destino</strong> en nuestra base de datos.
              Hoy Google Reviews, mañana tu menú, pasado mañana tu WhatsApp — sin cambiar el objeto.
            </p>
          </div>
          <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
            <h3 className="font-heading text-lg font-bold text-[#FAFAFA] mb-3">
              ¿Por qué el redirect es instantáneo?
            </h3>
            <p className="text-[#888] text-sm leading-relaxed">
              El destino está en cache Redis. Cuando el cliente toca el objeto, el servidor responde en menos de 10ms. El usuario nunca ve una pantalla de carga. El registro de la interacción sucede después, en segundo plano, sin bloquear el redirect.
            </p>
          </div>
        </div>

        {/* NFC vs QR */}
        <div className="bg-[#111] border border-[#222] rounded-2xl p-8">
          <h2 className="font-heading text-xl font-bold text-[#FAFAFA] mb-6">NFC + QR: las dos puertas</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-[#FAFAFA] mb-2">📡 NFC</h3>
              <p className="text-[#888] text-sm leading-relaxed">
                iPhone 7+ y Android modernos. El cliente acerca el móvil sin abrir ninguna app. El SO detecta la etiqueta automáticamente.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#FAFAFA] mb-2">📷 QR</h3>
              <p className="text-[#888] text-sm leading-relaxed">
                Cualquier smartphone con cámara. Impreso directamente en el objeto, apunta a la misma URL que el NFC. Cubre el 100% de los móviles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
