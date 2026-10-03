import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout from '@/components/ArticleLayout'
import { Callout } from '@/components/ui'
import { getGuide } from '@/lib/guides'

const g = getGuide('como-pedir-resenas-a-clientes')

export const metadata: Metadata = {
  title: g.title,
  description: g.description,
  alternates: { canonical: `/guias/${g.slug}` },
  openGraph: { type: 'article', title: g.title, description: g.description, url: `/guias/${g.slug}` },
}

const faqs = [
  { q: '¿Cuál es el mejor momento para pedir una reseña?', a: 'Justo después de una buena experiencia: al terminar un servicio, al cobrar, al salir del entrenamiento. Cuando el cliente aún tiene fresca la sensación.' },
  { q: '¿Debo pedir una puntuación concreta?', a: 'No. Pide una opinión sincera. Pedir cinco estrellas resulta forzado y puede ir en contra de las normas de Google.' },
  { q: '¿Puedo pedir reseñas por WhatsApp?', a: 'Sí, si se lo pides a todos tus clientes por igual y sin ofrecer nada a cambio. Con un objeto en el mostrador evitas tener que acordarte de enviar mensajes.' },
]

export default function Page() {
  return (
    <ArticleLayout
      slug={g.slug}
      faqs={faqs}
      related={['normas-de-google-sobre-resenas', 'enlace-de-resenas-de-google', 'responder-resenas-negativas']}
    >
      <p>
        Casi todos los negocios saben que necesitan reseñas, y casi todos las piden poco, porque resulta incómodo. La buena noticia es
        que pedirlas bien no requiere ser insistente: requiere elegir el momento y quitar fricción.
      </p>

      <h2>Por qué a los clientes contentos no se les ocurre dejar una reseña</h2>
      <p>
        No es que no quieran. Es que no lo piensan, tienen prisa o no saben cómo hacerlo. En cambio, quien ha tenido un problema suele
        tener muchas ganas de contarlo. Si no facilitas que los clientes satisfechos opinen, tu ficha cuenta solo una parte de la
        historia.
      </p>

      <h2>El momento justo</h2>
      <ul>
        <li><strong>Después de una buena experiencia:</strong> al terminar un servicio, al ver el resultado o al cobrar.</li>
        <li><strong>Cuando el cliente tiene el móvil en la mano:</strong> mientras espera o al pagar.</li>
        <li><strong>Sin interrumpir:</strong> nunca en medio de un servicio o con prisas.</li>
      </ul>

      <h2>Qué decir (frases que funcionan)</h2>
      <blockquote>«Si has estado a gusto, nos ayudaría mucho que lo contaras en Google. Aquí tienes cómo, solo te llevará un minuto.»</blockquote>
      <blockquote>«Tu opinión nos ayuda a mejorar y a que nos encuentre más gente del barrio.»</blockquote>
      <p>
        Sé honesto y breve. Pide una opinión sincera, no una puntuación. Y no hace falta decirlo a todo el mundo en voz alta:
        a veces basta con un objeto bien visible que invite a hacerlo.
      </p>

      <h2>Facilita el camino</h2>
      <ul>
        <li>Un enlace directo al formulario, no a la ficha completa. Mira <Link href="/guias/enlace-de-resenas-de-google">cómo conseguirlo</Link>.</li>
        <li>Un código QR o un chip NFC en el mostrador, para que no haya que escribir nada.</li>
        <li>El mismo enlace en tu firma de correo, en la web y en el mensaje de confirmación de cita.</li>
      </ul>

      <h2>Lo que no debes hacer</h2>
      <ul>
        <li>Ofrecer descuentos, regalos o sorteos a cambio de una reseña.</li>
        <li>Pedirla solo a quienes te han dicho que están contentos.</li>
        <li>Pedir una puntuación concreta.</li>
        <li>Presionar o insistir.</li>
      </ul>
      <p>
        Lo detallamos en las <Link href="/guias/normas-de-google-sobre-resenas">normas de Google sobre reseñas</Link>.
      </p>

      <h2>Después de la reseña: responde</h2>
      <p>
        Responder a cada reseña, también a las negativas, muestra que hay alguien al otro lado. Tienes pautas en{' '}
        <Link href="/guias/responder-resenas-negativas">cómo responder a una reseña negativa</Link>.
      </p>

      <Callout title="Un objeto que lo hace por ti">
        <p>
          Un objeto con NFC y QR en el mostrador invita a opinar sin que tengas que pedirlo. <Link href="/">Mira cómo funciona</Link>.
        </p>
      </Callout>
    </ArticleLayout>
  )
}
