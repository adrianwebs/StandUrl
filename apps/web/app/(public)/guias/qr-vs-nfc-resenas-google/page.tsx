import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout from '@/components/ArticleLayout'
import { Callout } from '@/components/ui'
import { getGuide } from '@/lib/guides'

const g = getGuide('qr-vs-nfc-resenas-google')

export const metadata: Metadata = {
  title: g.title,
  description: g.description,
  alternates: { canonical: `/guias/${g.slug}` },
  openGraph: { type: 'article', title: g.title, description: g.description, url: `/guias/${g.slug}` },
}

const faqs = [
  { q: '¿Qué es mejor para reseñas de Google, el QR o el NFC?', a: 'Lo mejor es tener los dos en el mismo objeto. El QR funciona con cualquier móvil con cámara; el NFC es más cómodo para quien lo tiene y sabe usarlo.' },
  { q: '¿El QR caduca o deja de funcionar?', a: 'Un QR impreso no caduca, pero puede estropearse si se raya o se desgasta. Si el QR apunta a una dirección que ya no existe, dejará de llevar a donde querías.' },
  { q: '¿El NFC funciona a través de una funda?', a: 'Normalmente sí con fundas finas. Las fundas muy gruesas, las que llevan metal o las tarjetas pegadas detrás del móvil pueden impedir la lectura.' },
]

export default function Page() {
  return (
    <ArticleLayout
      slug={g.slug}
      faqs={faqs}
      related={['tarjeta-nfc-resenas-google', 'mi-movil-tiene-nfc', 'tarjeta-nfc-programable-vs-enlace-editable']}
    >
      <p>
        Para que tus clientes lleguen a tu ficha de Google sin escribir nada, tienes dos opciones: un código QR o un chip NFC. Las dos
        funcionan, pero no son iguales. Te explicamos las diferencias y cuál te conviene.
      </p>

      <h2>Cómo funciona cada uno</h2>
      <h3>Código QR</h3>
      <p>
        Es un dibujo de cuadrados que contiene un enlace. El cliente abre la cámara del móvil, apunta al código y pulsa el aviso que
        aparece. No necesita ninguna aplicación en los móviles actuales.
      </p>
      <h3>Chip NFC</h3>
      <p>
        Es un chip pequeño que guarda un enlace. El cliente acerca el móvil al objeto (a pocos centímetros) y el teléfono abre el
        enlace. No requiere batería.
      </p>

      <h2>Comparativa</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>QR</th>
            <th>NFC</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Compatibilidad</td>
            <td>Cualquier móvil con cámara</td>
            <td>iPhone XS y posteriores y la mayoría de Android actuales</td>
          </tr>
          <tr>
            <td>Qué hace el cliente</td>
            <td>Abre la cámara, enfoca y toca el aviso</td>
            <td>Acerca el móvil</td>
          </tr>
          <tr>
            <td>Se ve a simple vista</td>
            <td>Sí: es un dibujo visible</td>
            <td>No: hay que indicarlo (un icono o un texto)</td>
          </tr>
          <tr>
            <td>Desgaste</td>
            <td>Se puede rayar o ensuciar</td>
            <td>El chip va dentro y apenas se desgasta</td>
          </tr>
          <tr>
            <td>Problemas típicos</td>
            <td>Poca luz o reflejos</td>
            <td>Fundas gruesas o metal cerca</td>
          </tr>
          <tr>
            <td>Cambiar el enlace</td>
            <td>Reimprimir el QR</td>
            <td>Reprogramar el chip</td>
          </tr>
        </tbody>
      </table>

      <h2>Qué elegir</h2>
      <ul>
        <li>
          <strong>Si solo puedes elegir uno:</strong> el QR cubre a más gente, porque cualquier móvil con cámara lo lee.
        </li>
        <li>
          <strong>Si puedes tener los dos:</strong> es lo ideal. El NFC es más cómodo para quien lo tiene, y el QR es la red de
          seguridad para el resto.
        </li>
      </ul>

      <h2>El problema común: cambiar el enlace</h2>
      <p>
        Tanto un QR impreso como un chip NFC programado guardan el enlace «fijo». Si cambias de ficha o de local, tendrás que reimprimir
        el QR o reprogramar el chip. La solución es que ambos apunten a una dirección intermedia que no cambie y que tú puedas redirigir
        cuando quieras. Es lo que hace StandUrl, y lo explicamos en{' '}
        <Link href="/guias/tarjeta-nfc-programable-vs-enlace-editable">tarjeta programable frente a enlace editable</Link>.
      </p>

      <Callout title="StandUrl lleva los dos">
        <p>
          Cada objeto lleva NFC y QR en la misma pieza y apuntan a la misma dirección. <Link href="/como-funciona">Mira cómo funciona</Link>.
        </p>
      </Callout>
    </ArticleLayout>
  )
}
