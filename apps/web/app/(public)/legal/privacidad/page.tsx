import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Política de Privacidad' }
export default function PrivacidadPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto prose prose-invert prose-sm">
        <h1 className="font-heading text-3xl font-bold text-[#FAFAFA] mb-8">Política de Privacidad</h1>
        <p className="text-[#888] mb-6">Última actualización: agosto 2025</p>

        <h2 className="font-heading text-xl font-bold text-[#FAFAFA] mt-8 mb-3">1. Responsable del tratamiento</h2>
        <p className="text-[#888] leading-relaxed">StandUrl (en adelante, «la empresa»), con domicilio en España. Contacto: <a href="mailto:privacidad@standurl.com" className="text-[#F5A623]">privacidad@standurl.com</a></p>

        <h2 className="font-heading text-xl font-bold text-[#FAFAFA] mt-8 mb-3">2. Datos que recogemos</h2>
        <ul className="text-[#888] space-y-2 leading-relaxed list-disc list-inside">
          <li>Nombre del negocio, sector y ciudad (formulario de prototipo)</li>
          <li>Email y contraseña (hasheada con bcrypt) para acceso al dashboard</li>
          <li>Número de teléfono o WhatsApp de contacto</li>
          <li>Dirección IP y user agent en los accesos al redirector (analítica)</li>
          <li>Enlace a ficha de Google Maps (opcional)</li>
        </ul>

        <h2 className="font-heading text-xl font-bold text-[#FAFAFA] mt-8 mb-3">3. Base legal del tratamiento</h2>
        <p className="text-[#888] leading-relaxed">Ejecución de un contrato (Art. 6.1.b RGPD) para los datos necesarios para prestar el servicio. Interés legítimo (Art. 6.1.f RGPD) para la analítica de interacciones.</p>

        <h2 className="font-heading text-xl font-bold text-[#FAFAFA] mt-8 mb-3">4. Tus derechos (ARCO)</h2>
        <p className="text-[#888] leading-relaxed">Puedes ejercer tus derechos de Acceso, Rectificación, Cancelación y Oposición escribiendo a <a href="mailto:privacidad@standurl.com" className="text-[#F5A623]">privacidad@standurl.com</a>. También tienes derecho a presentar una reclamación ante la AEPD (aepd.es).</p>

        <h2 className="font-heading text-xl font-bold text-[#FAFAFA] mt-8 mb-3">5. Conservación de datos</h2>
        <p className="text-[#888] leading-relaxed">Los datos se conservan mientras dure la relación contractual y durante los plazos legales obligatorios (máx. 5 años para datos fiscales).</p>
      </div>
    </div>
  )
}
