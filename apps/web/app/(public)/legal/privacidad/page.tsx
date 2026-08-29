import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Política de Privacidad' }
export default function PrivacidadPage() {
  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 bg-[#FBFBF9] text-[#111827]">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#111827] mb-3 tracking-tight">Política de Privacidad</h1>
        <p className="text-[#78716C] mb-8 font-medium text-sm">Última actualización: agosto 2025</p>

        <h2 className="font-heading text-xl font-bold text-[#111827] mt-8 mb-3">1. Responsable del tratamiento</h2>
        <p className="text-[#78716C] leading-relaxed">StandUrl (en adelante, «la empresa»), con domicilio en España. Contacto: <a href="mailto:privacidad@standurl.com" className="text-[#B45309] font-semibold hover:underline">privacidad@standurl.com</a></p>

        <h2 className="font-heading text-xl font-bold text-[#111827] mt-8 mb-3">2. Datos que recogemos</h2>
        <ul className="text-[#78716C] space-y-2 leading-relaxed list-disc list-inside">
          <li>Nombre del negocio, sector y ciudad (formulario de prototipo)</li>
          <li>Email y contraseña (hasheada con bcrypt) para acceso al dashboard</li>
          <li>Número de teléfono o WhatsApp de contacto</li>
          <li>Dirección IP y user agent en los accesos al redirector (analítica)</li>
          <li>Enlace a ficha de Google Maps (opcional)</li>
        </ul>

        <h2 className="font-heading text-xl font-bold text-[#111827] mt-8 mb-3">3. Base legal del tratamiento</h2>
        <p className="text-[#78716C] leading-relaxed">Ejecución de un contrato (Art. 6.1.b RGPD) para los datos necesarios para prestar el servicio. Interés legítimo (Art. 6.1.f RGPD) para la analítica de interacciones.</p>

        <h2 className="font-heading text-xl font-bold text-[#111827] mt-8 mb-3">4. Tus derechos (ARCO)</h2>
        <p className="text-[#78716C] leading-relaxed">Puedes ejercer tus derechos de Acceso, Rectificación, Cancelación y Oposición escribiendo a <a href="mailto:privacidad@standurl.com" className="text-[#B45309] font-semibold hover:underline">privacidad@standurl.com</a>. También tienes derecho a presentar una reclamación ante la AEPD (aepd.es).</p>

        <h2 className="font-heading text-xl font-bold text-[#111827] mt-8 mb-3">5. Conservación de datos</h2>
        <p className="text-[#78716C] leading-relaxed">Los datos se conservan mientras dure la relación contractual y durante los plazos legales obligatorios (máx. 5 años para datos fiscales).</p>
      </div>
    </div>
  )
}
