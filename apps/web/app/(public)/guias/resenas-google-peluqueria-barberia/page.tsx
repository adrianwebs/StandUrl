import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout from '@/components/ArticleLayout'
import { Callout } from '@/components/ui'
import { getGuide } from '@/lib/guides'

const g = getGuide('resenas-google-peluqueria-barberia')

export const metadata: Metadata = {
  title: g.title,
  description: g.description,
  alternates: { canonical: `/guias/${g.slug}` },
  openGraph: { type: 'article', title: g.title, description: g.description, url: `/guias/${g.slug}` },
}

const faqs = [
  { q: '¿Es buena idea mandar el enlace por WhatsApp junto al recordatorio de cita?', a: 'Sí, si se lo mandas a todos tus clientes por igual. Es una forma cómoda de facilitar la reseña sin pedirla en persona.' },
  { q: '¿Qué hago con un cliente que ha quedado descontento?', a: 'Escúchale y trata de resolverlo. No lo excluyas de la petición de reseñas ni lo desvíes a un canal privado para evitar que opine en Google; eso se considera filtrar.' },
  { q: '¿Y si el cliente no usa el móvil en el local?', a: 'Puedes dejar el enlace en el mensaje de confirmación de la siguiente cita, en la factura o en las redes sociales del negocio.' },
]

export default function Page() {
  return (
    <ArticleLayout
      slug={g.slug}
      faqs={faqs}
      related={['como-pedir-resenas-a-clientes', 'enlace-de-resenas-de-google', 'responder-resenas-negativas']}
    >
      <p>
        En peluquería y barbería, la gente elige mirando fotos, nota y reseñas. Un cliente que sale contento rara vez deja una reseña si
        nadie se lo propone en el momento justo. Aquí tienes cómo hacerlo sin que resulte incómodo.
      </p>

      <h2>Por qué importan en una peluquería o barbería</h2>
      <ul>
        <li>El cliente deja su imagen en manos de otra persona: necesita fiarse.</li>
        <li>Las reseñas suelen hablar de trato, puntualidad y resultado, que es justo lo que busca quien aún no te conoce.</li>
        <li>Un local nuevo con buena puntuación puede atraer a clientes del barrio que antes eran tuyos.</li>
      </ul>

      <h2>Los mejores momentos</h2>
      <ul>
        <li><strong>Al cobrar:</strong> el cliente ya ha visto el resultado y suele estar contento.</li>
        <li><strong>Cuando se mira al espejo:</strong> un comentario como «¡qué bien te ha quedado!» abre la puerta.</li>
        <li><strong>En el mensaje de confirmación de la siguiente cita:</strong> con el enlace directo.</li>
      </ul>

      <h2>Qué decir</h2>
      <blockquote>«Me alegra que te guste. Si te apetece, nos ayudaría mucho que lo contaras en Google; tienes el código aquí al lado.»</blockquote>
      <p>Mejor que sea breve y natural. No interrumpas el servicio para pedirlo.</p>

      <h2>Dónde colocar el objeto</h2>
      <ul>
        <li>Junto a la caja o el TPV.</li>
        <li>En el mostrador de entrada.</li>
        <li>En la zona de espera.</li>
      </ul>

      <h2>Qué evitar</h2>
      <ul>
        <li>Ofrecer descuentos o productos a cambio de reseñas.</li>
        <li>Pedírselo solo a quien ha dicho que le ha gustado el corte.</li>
        <li>Pedir cinco estrellas.</li>
      </ul>
      <p>Lo explicamos en <Link href="/guias/normas-de-google-sobre-resenas">las normas de Google sobre reseñas</Link>.</p>

      <Callout title="Un objeto para tu mostrador">
        <p>
          Estamos preparando el modelo para peluquerías y barberías. <Link href="/peluquerias-y-barberias">Apúntate a la lista de espera</Link>.
        </p>
      </Callout>
    </ArticleLayout>
  )
}
