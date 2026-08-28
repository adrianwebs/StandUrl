import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Política de Cookies' }
export default function CookiesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-3xl font-bold text-[#FAFAFA] mb-8">Política de Cookies</h1>
        <p className="text-[#888] mb-6">Última actualización: agosto 2025</p>
        <div className="space-y-6 text-[#888] leading-relaxed">
          <p>StandUrl únicamente utiliza cookies técnicas estrictamente necesarias para el funcionamiento del servicio. No utilizamos cookies de terceros, cookies de seguimiento ni cookies de publicidad.</p>
          <h2 className="font-heading text-xl font-bold text-[#FAFAFA]">Cookies utilizadas</h2>
          <div className="bg-[#111] border border-[#222] rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="border-b border-[#222]">
                <tr>
                  <th className="text-left px-4 py-3 text-[#555]">Cookie</th>
                  <th className="text-left px-4 py-3 text-[#555]">Finalidad</th>
                  <th className="text-left px-4 py-3 text-[#555]">Duración</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 text-[#FAFAFA] font-mono text-xs">refresh_token</td>
                  <td className="px-4 py-3 text-[#888]">Mantener la sesión del dashboard</td>
                  <td className="px-4 py-3 text-[#888]">30 días</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>Al ser cookies técnicas necesarias, no es posible rechazarlas sin que el servicio deje de funcionar correctamente, por lo que no requieren consentimiento previo según la Ley 34/2002 (LSSI).</p>
          <p>Para más información, escríbenos a <a href="mailto:privacidad@standurl.com" className="text-[#F5A623]">privacidad@standurl.com</a></p>
        </div>
      </div>
    </div>
  )
}
