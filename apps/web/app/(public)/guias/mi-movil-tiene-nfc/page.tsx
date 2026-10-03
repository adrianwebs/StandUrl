import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout from '@/components/ArticleLayout'
import { Callout } from '@/components/ui'
import { getGuide } from '@/lib/guides'

const g = getGuide('mi-movil-tiene-nfc')

export const metadata: Metadata = {
  title: g.title,
  description: g.description,
  alternates: { canonical: `/guias/${g.slug}` },
  openGraph: { type: 'article', title: g.title, description: g.description, url: `/guias/${g.slug}` },
}

const faqs = [
  { q: '¿Todos los móviles Android tienen NFC?', a: 'No todos. La mayoría de los móviles de gama media y alta de los últimos años lo incluyen, pero algunos modelos básicos no. La forma más segura es buscar «NFC» en los ajustes del teléfono.' },
  { q: '¿Cómo sé si mi iPhone puede leer NFC?', a: 'Los iPhone 7 y posteriores tienen chip NFC. Los iPhone XS, XR y posteriores leen etiquetas NFC directamente; en el iPhone 7, 8 y X hay que usar el lector de etiquetas NFC desde el Centro de control.' },
  { q: '¿Qué hago si el móvil de mi cliente no tiene NFC?', a: 'Que escanee el código QR con la cámara. Por eso conviene que el objeto lleve las dos opciones.' },
]

export default function Page() {
  return (
    <ArticleLayout
      slug={g.slug}
      faqs={faqs}
      related={['qr-vs-nfc-resenas-google', 'tarjeta-nfc-resenas-google', 'como-pedir-resenas-a-clientes']}
    >
      <p>
        Si vas a pedir reseñas con un objeto NFC, es normal que te preguntes si los móviles de tus clientes podrán leerlo. Aquí tienes
        cómo comprobarlo en Android y en iPhone, cómo activarlo y qué hacer si no hay NFC.
      </p>

      <h2>Cómo saber si tu móvil Android tiene NFC</h2>
      <ol>
        <li>Abre los <strong>Ajustes</strong> del móvil.</li>
        <li>Usa el buscador de ajustes y escribe <strong>NFC</strong>.</li>
        <li>Si aparece la opción, tu móvil tiene NFC. Si no aparece, es probable que no lo tenga.</li>
      </ol>
      <p>
        La ruta exacta cambia según la marca. Suele estar en «Conexiones», «Conexiones inalámbricas» o «Dispositivos conectados».
      </p>

      <h2>Cómo activar el NFC en Android</h2>
      <ol>
        <li>Entra en los ajustes de NFC (los pasos de arriba).</li>
        <li>Activa el interruptor de <strong>NFC</strong>.</li>
        <li>Desbloquea la pantalla: muchos móviles solo leen NFC con la pantalla encendida.</li>
      </ol>

      <h2>Cómo funciona en iPhone</h2>
      <p>
        Los iPhone 7 y posteriores incorporan chip NFC. A partir del iPhone XS y XR, el teléfono lee etiquetas NFC cuando lo acercas, sin
        abrir ninguna aplicación, y muestra un aviso para abrir el enlace. En los iPhone 7, 8 y X hay que usar el lector de etiquetas
        NFC desde el Centro de control. Puedes consultar los modelos compatibles en la{' '}
        <a href="https://support.apple.com/es-la/guide/iphone/aside/asd-nfc-reader/15.0/ios/15.0" rel="noopener noreferrer" target="_blank">
          guía de Apple sobre el lector de etiquetas NFC
        </a>
        .
      </p>

      <h2>Dónde acercar el móvil</h2>
      <p>
        La antena NFC suele estar en la parte superior de la parte trasera del teléfono, aunque en Android varía mucho según el modelo.
        Si no lee a la primera, mueve el móvil despacio sobre el objeto durante un par de segundos.
      </p>

      <h2>Si no lee: causas habituales</h2>
      <ul>
        <li>El NFC está desactivado (en Android).</li>
        <li>La pantalla está bloqueada o apagada.</li>
        <li>Hay una funda gruesa, con metal o con tarjetas detrás del móvil.</li>
        <li>El objeto está sobre una superficie metálica.</li>
      </ul>

      <h2>Qué hacer si el móvil no tiene NFC</h2>
      <p>
        Usar el código QR: cualquier móvil con cámara puede leerlo. Por eso cada objeto de StandUrl lleva NFC y QR en la misma pieza, para
        que nadie se quede sin poder dejar su reseña.
      </p>

      <Callout title="¿Quieres saber más?">
        <p>
          Lee <Link href="/guias/qr-vs-nfc-resenas-google">QR o NFC: cuál es mejor para reseñas</Link>.
        </p>
      </Callout>
    </ArticleLayout>
  )
}
