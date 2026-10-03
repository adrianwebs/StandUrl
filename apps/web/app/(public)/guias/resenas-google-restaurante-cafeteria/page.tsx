import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout from '@/components/ArticleLayout'
import { Callout } from '@/components/ui'
import { getGuide } from '@/lib/guides'

const g = getGuide('resenas-google-restaurante-cafeteria')

export const metadata: Metadata = {
  title: g.title,
  description: g.description,
  alternates: { canonical: `/guias/${g.slug}` },
  openGraph: { type: 'article', title: g.title, description: g.description, url: `/guias/${g.slug}` },
}

const faqs = [
  { q: '¿Puedo poner el código QR en el ticket o la carta?', a: 'Sí. Es una forma sencilla de facilitar la reseña a todos los clientes por igual. Asegúrate de que el enlace sea el del formulario de reseñas.' },
  { q: '¿Qué hago con las reseñas negativas?', a: 'Respóndelas con calma y sin discutir. Tienes ejemplos en la guía de respuestas a reseñas negativas. Y no intentes evitarlas filtrando a quién se pide opinión.' },
  { q: '¿Cómo lo hago si el personal cambia mucho?', a: 'Apóyate en algo que no dependa de las personas: un objeto fijo en la barra o en las mesas, y un QR en el ticket.' },
]

export default function Page() {
  return (
    <ArticleLayout
      slug={g.slug}
      faqs={faqs}
      related={['como-pedir-resenas-a-clientes', 'responder-resenas-negativas', 'normas-de-google-sobre-resenas']}
    >
      <p>
        En hostelería, la ficha de Google es el escaparate: quien busca dónde comer o desayunar mira la nota y las últimas reseñas antes
        de decidir. El reto es que los clientes contentos rara vez opinan por su cuenta y el personal no tiene tiempo para pedirlo. Esta
        guía te da ideas prácticas.
      </p>

      <h2>Por qué pesan tanto en un restaurante o una cafetería</h2>
      <ul>
        <li>La decisión se toma deprisa y casi siempre desde el móvil.</li>
        <li>Con pocas reseñas, unas pocas opiniones negativas mueven mucho la nota.</li>
        <li>Las reseñas recientes dan sensación de local vivo y cuidado.</li>
      </ul>

      <h2>Los mejores momentos</h2>
      <ul>
        <li><strong>Al pedir o pagar la cuenta:</strong> la experiencia ya está completa.</li>
        <li><strong>En la barra, al cobrar el café.</strong></li>
        <li><strong>Al recoger un pedido para llevar:</strong> con un QR en la bolsa o en el ticket.</li>
      </ul>

      <h2>Cómo hacerlo sin depender del equipo</h2>
      <ul>
        <li>Un objeto fijo en la barra o en las mesas, siempre a la vista.</li>
        <li>El QR del formulario de reseñas impreso en el ticket o en la carta.</li>
        <li>El mismo enlace en tus redes y en tu web.</li>
      </ul>

      <h2>Qué decir si alguien pregunta</h2>
      <blockquote>«Si has estado a gusto, nos ayudaría mucho que nos dejaras tu opinión en Google. Solo tienes que escanear aquí.»</blockquote>

      <h2>Qué evitar</h2>
      <ul>
        <li>Ofrecer un café, un postre o un descuento a cambio de una reseña.</li>
        <li>Pedírselo solo a las mesas que parecen contentas.</li>
        <li>Pedir cinco estrellas o dictar qué escribir.</li>
      </ul>
      <p>Consulta <Link href="/guias/normas-de-google-sobre-resenas">las normas de Google sobre reseñas</Link> antes de lanzar cualquier iniciativa.</p>

      <Callout title="Un objeto para la barra o la mesa">
        <p>
          Estamos preparando el modelo para hostelería. <Link href="/restaurantes-y-cafeterias">Apúntate a la lista de espera</Link>.
        </p>
      </Callout>
    </ArticleLayout>
  )
}
