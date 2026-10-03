import type { Metadata } from 'next'
import { Prose } from '@/components/ui'
import { CONTACT_EMAIL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Aviso legal',
  description: 'Datos identificativos del titular del sitio web StandUrl.',
  alternates: { canonical: '/legal/aviso-legal' },
}

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 bg-[#FBFBF9] text-[#111827]">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#111827] mb-3 tracking-tight">Aviso legal</h1>
        <p className="text-[#78716C] mb-8 font-medium text-sm">Última actualización: octubre 2026</p>
        <Prose>
          <h2>1. Titular del sitio web</h2>
          <p>En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de que el titular de este sitio web es:</p>
          <ul>
            <li>Nombre o razón social: <strong>[PENDIENTE: nombre completo o razón social]</strong></li>
            <li>NIF/CIF: <strong>[PENDIENTE]</strong></li>
            <li>Domicilio: <strong>[PENDIENTE: dirección en Albacete, España]</strong></li>
            <li>Correo electrónico: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
            <li>Datos registrales (si procede): <strong>[PENDIENTE]</strong></li>
          </ul>

          <h2>2. Objeto</h2>
          <p>Este sitio web ofrece información y venta de objetos con NFC y código QR para facilitar que los clientes de un negocio dejen reseñas en Google, así como el acceso a un panel de gestión opcional.</p>

          <h2>3. Condiciones de uso</h2>
          <p>El acceso y uso del sitio web atribuye la condición de usuario e implica la aceptación de estas condiciones y de los <a href="/legal/terminos">términos de uso</a>. El usuario se compromete a hacer un uso adecuado del sitio y a no emplearlo para fines ilícitos.</p>

          <h2>4. Propiedad intelectual</h2>
          <p>Los contenidos del sitio (textos, diseños, logotipos, imágenes, modelos 3D y código) son propiedad del titular o se utilizan con autorización. Queda prohibida su reproducción sin permiso previo.</p>

          <h2>5. Enlaces y servicios de terceros</h2>
          <p>Este sitio puede enlazar a servicios de terceros, como Google. El titular no se responsabiliza de sus contenidos ni de sus políticas. StandUrl no está afiliado a Google ni cuenta con su respaldo.</p>

          <h2>6. Protección de datos y cookies</h2>
          <p>El tratamiento de datos personales se describe en la <a href="/legal/privacidad">política de privacidad</a> y el uso de cookies en la <a href="/legal/cookies">política de cookies</a>.</p>

          <h2>7. Legislación aplicable</h2>
          <p>Este aviso se rige por la legislación española. Para cualquier controversia, y salvo que la normativa establezca otro fuero imperativo, las partes se someten a los juzgados y tribunales que correspondan.</p>
        </Prose>
      </div>
    </div>
  )
}
