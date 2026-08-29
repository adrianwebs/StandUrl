import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Términos de Uso' }
export default function TerminosPage() {
  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 bg-[#FBFBF9] text-[#111827]">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#111827] mb-3 tracking-tight">Términos de Uso</h1>
        <p className="text-[#78716C] mb-8 font-medium text-sm">Última actualización: agosto 2025</p>
        <div className="space-y-6 text-[#78716C] leading-relaxed">
          <section>
            <h2 className="font-heading text-xl font-bold text-[#111827] mb-3">1. Objeto</h2>
            <p>Los presentes términos regulan el uso del servicio StandUrl, que incluye el objeto físico NFC/QR y la plataforma de gestión de redirecciones.</p>
          </section>
          <section>
            <h2 className="font-heading text-xl font-bold text-[#111827] mb-3">2. Uso aceptable</h2>
            <p>El usuario se compromete a utilizar el servicio exclusivamente para redireccionar a URLs legales. Está prohibido utilizar el servicio para spam, phishing o cualquier actividad contraria a la ley española o las políticas de las plataformas de destino (incluyendo Google).</p>
          </section>
          <section>
            <h2 className="font-heading text-xl font-bold text-[#111827] mb-3">3. Política de reseñas de Google</h2>
            <p>El usuario se compromete a no utilizar el servicio para filtrar reseñas por puntuación (review gating), ni para ofrecer incentivos a cambio de reseñas, en cumplimiento con las políticas de Google My Business. StandUrl no implementa ningún filtro por estrellas: todos los usuarios son redirigidos directamente a Google.</p>
          </section>
          <section>
            <h2 className="font-heading text-xl font-bold text-[#111827] mb-3">4. Servicio sin garantía de disponibilidad</h2>
            <p>StandUrl se esfuerza por mantener una disponibilidad del servicio del 99%, pero no garantiza la continuidad del servicio. Los objetos físicos siguen funcionando aunque la suscripción esté cancelada (el redirect permanece activo con la última URL configurada).</p>
          </section>
          <section>
            <h2 className="font-heading text-xl font-bold text-[#111827] mb-3">5. Limitación de responsabilidad</h2>
            <p>StandUrl no se responsabiliza de los contenidos de las URLs de destino configuradas por los usuarios, ni de los daños directos o indirectos derivados del uso del servicio más allá de lo permitido por la legislación española aplicable.</p>
          </section>
          <section>
            <h2 className="font-heading text-xl font-bold text-[#111827] mb-3">6. Ley aplicable y jurisdicción</h2>
            <p>Estos términos se rigen por la ley española. Para cualquier controversia, las partes se someten a los juzgados y tribunales del domicilio del usuario, salvo que la normativa vigente establezca otro fuero imperativo.</p>
          </section>
          <section>
            <h2 className="font-heading text-xl font-bold text-[#111827] mb-3">7. Contacto</h2>
            <p>Para cualquier consulta: <a href="mailto:hola@standurl.com" className="text-[#B45309] font-semibold hover:underline">hola@standurl.com</a></p>
          </section>
        </div>
      </div>
    </div>
  )
}
