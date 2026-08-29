import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Política de Cookies' }
export default function CookiesPage() {
  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 bg-[#FBFBF9] text-[#111827]">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#111827] mb-3 tracking-tight">Política de Cookies</h1>
        <p className="text-[#78716C] mb-8 font-medium text-sm">Última actualización: agosto 2025</p>
        <div className="space-y-6 text-[#78716C] leading-relaxed">
          <p>StandUrl únicamente utiliza cookies técnicas estrictamente necesarias para el funcionamiento del servicio. No utilizamos cookies de terceros, cookies de seguimiento publicitario ni cookies de análisis invasivas.</p>
          <h2 className="font-heading text-xl font-bold text-[#111827]">Cookies utilizadas</h2>
          <div className="bg-white border border-[#E7E5E4] rounded-2xl overflow-hidden shadow-xs">
            <table className="w-full text-sm">
              <thead className="border-b border-[#E7E5E4] bg-[#FBFBF9]">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#78716C]">Cookie</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#78716C]">Finalidad</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#78716C]">Duración</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 text-[#111827] font-mono font-bold text-xs">refresh_token</td>
                  <td className="px-4 py-3 text-[#78716C]">Mantener la sesión del dashboard</td>
                  <td className="px-4 py-3 text-[#78716C]">30 días</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>Al ser cookies técnicas necesarias, no es posible rechazarlas sin que el servicio deje de funcionar correctamente, por lo que no requieren consentimiento previo según la Ley 34/2002 (LSSI).</p>
          <p>Para más información, escríbenos a <a href="mailto:privacidad@standurl.com" className="text-[#B45309] font-semibold hover:underline">privacidad@standurl.com</a></p>
        </div>
      </div>
    </div>
  )
}
