import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout from '@/components/ArticleLayout'
import { Callout } from '@/components/ui'
import { getGuide } from '@/lib/guides'

const g = getGuide('tarjeta-nfc-resenas-google')

export const metadata: Metadata = {
  title: g.title,
  description: g.description,
  alternates: { canonical: `/guias/${g.slug}` },
  openGraph: { type: 'article', title: g.title, description: g.description, url: `/guias/${g.slug}` },
}

const faqs = [
  { q: '¿Una tarjeta NFC funciona con iPhone?', a: 'Los iPhone XS y posteriores leen etiquetas NFC sin abrir ninguna aplicación. Los modelos anteriores con NFC (iPhone 7, 8 y X) necesitan un paso adicional. Por eso conviene que el objeto lleve también un código QR.' },
  { q: '¿Cuánto cuesta una tarjeta NFC para reseñas?', a: 'Una tarjeta de PVC en blanco puede costar alrededor de un euro, o menos si compras muchas. Si además quieres que lleve tu logo impreso, el precio sube.' },
  { q: '¿La tarjeta necesita batería?', a: 'No. El chip NFC de una tarjeta es pasivo: se alimenta del propio móvil cuando lo acercas.' },
  { q: '¿Se puede cambiar el enlace de una tarjeta ya programada?', a: 'Si no la has bloqueado, sí, volviendo a escribir el chip con una aplicación. Si la has bloqueado, no. Y en cualquier caso tendrías que hacerlo tarjeta por tarjeta.' },
]

export default function Page() {
  return (
    <ArticleLayout
      slug={g.slug}
      faqs={faqs}
      related={['qr-vs-nfc-resenas-google', 'tarjeta-nfc-programable-vs-enlace-editable', 'normas-de-google-sobre-resenas']}
    >
      <p>
        Si buscas «tarjeta NFC para reseñas de Google», seguramente quieres algo sencillo: que tus clientes acerquen el móvil y lleguen a
        tu ficha para dejar su opinión. Esta guía te explica qué es exactamente, cómo se configura, cuándo basta con una tarjeta y
        cuándo conviene otra cosa.
      </p>

      <h2>Qué es una tarjeta NFC de reseñas</h2>
      <p>
        Es una tarjeta de plástico (normalmente PVC, del tamaño de una tarjeta bancaria) con un chip NFC dentro. En ese chip se guarda un
        enlace: el del formulario de reseñas de tu ficha de Google. Cuando un cliente acerca su móvil, el teléfono lee el enlace y
        abre el formulario.
      </p>
      <p>
        El chip no lleva batería: se alimenta de la propia señal del móvil. Por eso la tarjeta es muy barata y no se gasta.
      </p>

      <h2>Cómo se configura una tarjeta NFC paso a paso</h2>
      <ol>
        <li>
          <strong>Consigue el enlace de reseñas de tu negocio.</strong> Tienes los pasos en la guía{' '}
          <Link href="/guias/enlace-de-resenas-de-google">cómo conseguir el enlace de reseñas de Google</Link>.
        </li>
        <li>
          <strong>Compra tarjetas NFC en blanco.</strong> Las más habituales usan chips de la familia NTAG (NTAG213, NTAG215 o NTAG216).
        </li>
        <li>
          <strong>Instala una aplicación para escribir etiquetas NFC.</strong> Hay varias gratuitas para Android y para iPhone.
        </li>
        <li>
          <strong>Escribe el enlace.</strong> En la aplicación eliges «escribir» y, como tipo de dato, «enlace» o «URL». Pegas tu enlace y
          acercas la tarjeta al móvil hasta que confirme que se ha grabado.
        </li>
        <li>
          <strong>Pruébala con dos móviles distintos</strong>, uno Android y un iPhone, antes de ponerla en tu negocio.
        </li>
      </ol>

      <h2>Cuándo basta una tarjeta NFC</h2>
      <ul>
        <li>Quieres gastar lo mínimo y probar la idea.</li>
        <li>Eres un profesional que se mueve (fontanero, electricista, taxista) y puedes entregar la tarjeta en mano al terminar.</li>
        <li>Vas a repartirlas en un evento o junto con la factura.</li>
      </ul>

      <h2>Cuándo una tarjeta se queda corta</h2>
      <ul>
        <li>
          <strong>Pasa desapercibida.</strong> En un mostrador, una tarjeta plana se confunde con cualquier otra. Si el cliente no la ve,
          no la usa.
        </li>
        <li>
          <strong>Solo NFC.</strong> Si la tarjeta no lleva también un código QR visible, quien tenga un móvil sin NFC (o no sepa usarlo) se
          queda fuera.
        </li>
        <li>
          <strong>Cambiar el enlace es un trabajo.</strong> Si cambias de ficha o de local, hay que reprogramar cada tarjeta, y si la
          bloqueaste, hay que sustituirla. Lo explicamos en{' '}
          <Link href="/guias/tarjeta-nfc-programable-vs-enlace-editable">tarjeta programable frente a enlace editable</Link>.
        </li>
        <li>
          <strong>No sabes cuántas veces se usa.</strong> Una tarjeta programada directamente con el enlace de Google no te da
          estadísticas.
        </li>
      </ul>

      <h2>Tarjeta, pegatina u objeto: comparativa</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Tarjeta de PVC</th>
            <th>Pegatina con QR</th>
            <th>Objeto StandUrl</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Se ve en el mostrador</td>
            <td>Poco</td>
            <td>Poco</td>
            <td>Mucho: es un objeto</td>
          </tr>
          <tr>
            <td>NFC y QR a la vez</td>
            <td>Según el modelo</td>
            <td>Normalmente solo QR</td>
            <td>Sí</td>
          </tr>
          <tr>
            <td>Cambiar el enlace</td>
            <td>Reprogramar cada tarjeta</td>
            <td>Imprimir otra</td>
            <td>Desde un panel, sin tocar el objeto</td>
          </tr>
          <tr>
            <td>Estadísticas</td>
            <td>Depende del proveedor</td>
            <td>Normalmente no</td>
            <td>Sí, con el panel</td>
          </tr>
          <tr>
            <td>Precio orientativo</td>
            <td>Desde 1 € aprox.</td>
            <td>Muy bajo</td>
            <td>Desde 29,90 €</td>
          </tr>
        </tbody>
      </table>

      <h2>Errores habituales al usar tarjetas NFC</h2>
      <ul>
        <li>Dejar la tarjeta en un cajón o en un lugar donde el cliente no la ve.</li>
        <li>Programar el enlace de la ficha en Maps en lugar del enlace directo al formulario de reseña.</li>
        <li>No probarla con un iPhone y con un Android.</li>
        <li>Colocarla sobre una superficie metálica: muchas etiquetas NFC dejan de leerse si hay metal justo debajo.</li>
        <li>
          Ofrecer algo a cambio de la reseña. Google lo prohíbe; mira las{' '}
          <Link href="/guias/normas-de-google-sobre-resenas">normas de Google sobre reseñas</Link>.
        </li>
      </ul>

      <Callout title="Una alternativa si quieres que se vea y que se pueda editar">
        <p>
          StandUrl es un objeto impreso en 3D con NFC y QR en la misma pieza y un destino que cambias desde un panel. Lo pruebas 30 días y,
          si no te convence, lo devuelves. <Link href="/precios">Ver precios</Link>.
        </p>
      </Callout>
    </ArticleLayout>
  )
}
