import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout from '@/components/ArticleLayout'
import { Callout } from '@/components/ui'
import { getGuide } from '@/lib/guides'

const g = getGuide('tarjeta-nfc-programable-vs-enlace-editable')

export const metadata: Metadata = {
  title: g.title,
  description: g.description,
  alternates: { canonical: `/guias/${g.slug}` },
  openGraph: { type: 'article', title: g.title, description: g.description, url: `/guias/${g.slug}` },
}

const faqs = [
  { q: '¿Qué significa que una tarjeta NFC sea programable?', a: 'Que puedes escribir en su chip el contenido que quieras, por ejemplo un enlace, usando una aplicación de escritura de etiquetas NFC.' },
  { q: '¿Se puede bloquear una tarjeta programada?', a: 'Sí. Al bloquearla evitas que alguien la modifique, pero tú tampoco podrás cambiarla después. Si el enlace cambia, tendrás que sustituirla.' },
  { q: '¿Qué pasa si dejo de usar el servicio de enlace editable?', a: 'Depende del proveedor. En StandUrl, el objeto sigue funcionando con el último destino configurado aunque dejes de pagar el panel. La contrapartida es que el objeto depende de que la dirección de StandUrl siga activa.' },
]

export default function Page() {
  return (
    <ArticleLayout
      slug={g.slug}
      faqs={faqs}
      related={['tarjeta-nfc-resenas-google', 'qr-vs-nfc-resenas-google', 'enlace-de-resenas-de-google']}
    >
      <p>
        Cuando buscas «tarjeta NFC programable» normalmente quieres poder poner tu enlace de reseñas en el chip. Es una buena idea, pero
        tiene un problema que solo se nota después: ¿qué pasa cuando el enlace cambia? Esta guía compara las dos formas de hacerlo.
      </p>

      <h2>Qué es programar una tarjeta NFC</h2>
      <p>
        Programarla es escribir en su chip un dato, normalmente un enlace. Se hace con el móvil y una aplicación gratuita en un par de
        minutos. Desde ese momento, quien acerque el móvil abrirá ese enlace.
      </p>

      <h2>El problema de programar el enlace directo</h2>
      <p>Si guardas en el chip el enlace directo a tu formulario de reseñas, estás atando el objeto a ese enlace. Si algo cambia:</p>
      <ul>
        <li>Si cambias de ficha o de local, el enlace deja de ser el que quieres.</li>
        <li>Tendrás que reprogramar cada tarjeta, una a una.</li>
        <li>Si bloqueaste la tarjeta para que nadie la modifique, tendrás que sustituirla.</li>
        <li>Con un QR impreso pasa exactamente lo mismo: hay que reimprimirlo.</li>
      </ul>

      <h2>La alternativa: enlace fijo con destino editable</h2>
      <p>
        En lugar de guardar tu enlace de Google, el chip guarda una dirección intermedia que no cambia (en nuestro caso, una dirección de
        StandUrl con un código único). Esa dirección redirige a tu enlace real, y tú puedes cambiar a dónde redirige desde un panel. Así:
      </p>
      <ul>
        <li>No hay que reprogramar el chip ni cambiar el objeto.</li>
        <li>Puedes ver cuántas veces se usa.</li>
        <li>Puedes cambiar el destino en cualquier momento.</li>
      </ul>

      <h2>La contrapartida, dicha claramente</h2>
      <p>
        Con un enlace intermedio, tu objeto depende de que esa dirección siga funcionando. Con una tarjeta programada con el enlace
        directo, el único que puede fallar es Google. Es una decisión que conviene tomar con los ojos abiertos. En StandUrl, el objeto
        sigue funcionando con el último destino aunque dejes de pagar el panel.
      </p>

      <h2>Comparativa</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Tarjeta programada con enlace directo</th>
            <th>Enlace fijo con destino editable</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cambiar el destino</td>
            <td>Reprogramar cada tarjeta (o sustituirla)</td>
            <td>Desde un panel, sin tocar el objeto</td>
          </tr>
          <tr>
            <td>Estadísticas</td>
            <td>No (salvo que uses otra herramienta)</td>
            <td>Sí, con el panel</td>
          </tr>
          <tr>
            <td>Dependencia de un tercero</td>
            <td>Solo de Google</td>
            <td>De Google y del servicio intermedio</td>
          </tr>
          <tr>
            <td>Coste</td>
            <td>Lo que cuesta la tarjeta</td>
            <td>Objeto + panel opcional</td>
          </tr>
        </tbody>
      </table>

      <h2>Cuándo conviene programarla tú mismo</h2>
      <ul>
        <li>Tu enlace no va a cambiar y no necesitas estadísticas.</li>
        <li>Quieres cero dependencia de terceros.</li>
        <li>Tienes pocas tarjetas y no te importa reprogramarlas.</li>
      </ul>

      <Callout title="Si prefieres no reprogramar nada">
        <p>
          Con StandUrl cambias el destino desde el panel. <Link href="/panel-estadisticas-nfc">Ver qué incluye</Link>.
        </p>
      </Callout>
    </ArticleLayout>
  )
}
