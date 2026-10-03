import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout from '@/components/ArticleLayout'
import { Callout } from '@/components/ui'
import { getGuide } from '@/lib/guides'

const g = getGuide('responder-resenas-negativas')

export const metadata: Metadata = {
  title: g.title,
  description: g.description,
  alternates: { canonical: `/guias/${g.slug}` },
  openGraph: { type: 'article', title: g.title, description: g.description, url: `/guias/${g.slug}` },
}

const faqs = [
  { q: '¿Debo responder a todas las reseñas negativas?', a: 'Sí, en general. Una respuesta educada demuestra que te importa la opinión de tus clientes, y la leen también quienes aún no te conocen.' },
  { q: '¿Puedo pedir a Google que elimine una reseña negativa?', a: 'Solo si incumple las normas de Google, por ejemplo si es spam, contiene insultos o no se refiere a una experiencia real. Una reseña negativa pero legítima no se elimina por el mero hecho de no gustarte.' },
  { q: '¿Qué hago si sospecho que es una reseña falsa?', a: 'Respóndela con calma, sin acusar, e infórmala a Google a través de la opción de marcarla como inapropiada. Guarda cualquier prueba que tengas.' },
]

export default function Page() {
  return (
    <ArticleLayout
      slug={g.slug}
      faqs={faqs}
      related={['normas-de-google-sobre-resenas', 'como-pedir-resenas-a-clientes', 'resenas-google-restaurante-cafeteria']}
    >
      <p>
        Todos los negocios reciben tarde o temprano una reseña negativa. No es el final del mundo: lo que más cuenta, para quien lee, es
        cómo respondes. Esta guía te da pautas y ejemplos.
      </p>

      <h2>Antes de responder</h2>
      <ol>
        <li><strong>Respira.</strong> No respondas en caliente.</li>
        <li><strong>Lee con calma</strong> qué ha pasado y comprueba si puedes identificar al cliente o la situación.</li>
        <li><strong>Decide el tono:</strong> educado, breve y sin ponerte a la defensiva.</li>
      </ol>

      <h2>Cómo responder paso a paso</h2>
      <ol>
        <li><strong>Agradece</strong> que haya compartido su opinión.</li>
        <li><strong>Discúlpate</strong> si hay algo que no estuvo bien, aunque no coincidas del todo.</li>
        <li><strong>Explica brevemente</strong> qué ha pasado o qué vas a hacer, sin excusas largas.</li>
        <li><strong>Ofrece un canal privado</strong> (correo o teléfono) para resolverlo.</li>
        <li><strong>No reveles datos personales</strong> del cliente ni detalles de su visita.</li>
      </ol>

      <h2>Ejemplos de respuesta</h2>
      <h3>Queja por un mal servicio</h3>
      <blockquote>
        «Gracias por contárnoslo y sentimos que tu experiencia no fuera la que esperabas. Nos gustaría entender qué pasó y
        solucionarlo. Escríbenos a [tu correo] y lo vemos juntos.»
      </blockquote>
      <h3>Reseña que no se corresponde con lo ocurrido</h3>
      <blockquote>
        «Gracias por tu comentario. No encontramos en nuestros registros la situación que describes y nos gustaría revisarlo.
        ¿Puedes contactar con nosotros en [tu correo] para ayudarnos a entender qué ocurrió?»
      </blockquote>
      <h3>Reseña de una estrella sin texto</h3>
      <blockquote>
        «Gracias por tu valoración. Nos gustaría saber cómo podemos mejorar. Si quieres contárnoslo, escríbenos a [tu correo].»
      </blockquote>

      <h2>Qué evitar</h2>
      <ul>
        <li>Discutir o culpar al cliente.</li>
        <li>Responder con una plantilla idéntica a todas las reseñas.</li>
        <li>Ofrecer un descuento o un regalo a cambio de que retire la reseña.</li>
        <li>Pedir a amigos o empleados que dejen reseñas positivas para tapar la negativa.</li>
      </ul>

      <h2>Cuándo se puede pedir a Google que la revise</h2>
      <p>
        Si la reseña incumple las normas de Google (spam, lenguaje ofensivo, conflicto de interés, contenido que no corresponde a una
        experiencia real), puedes marcarla como inapropiada desde tu perfil de empresa. Google decide, y puede tardar. Las reseñas
        legítimas, aunque sean críticas, se quedan.
      </p>

      <h2>Un consejo para el largo plazo</h2>
      <p>
        Una reseña negativa pesa menos cuando hay muchas reseñas reales. Facilita que todos tus clientes opinen, no solo los
        descontentos. Mira <Link href="/guias/como-pedir-resenas-a-clientes">cómo pedir reseñas sin incomodar</Link> y las{' '}
        <Link href="/guias/normas-de-google-sobre-resenas">normas de Google</Link> para hacerlo bien.
      </p>

      <Callout title="Sin ocultar nada">
        <p>
          StandUrl lleva a todos tus clientes al mismo formulario, sin filtrar por puntuación. <Link href="/">Más información</Link>.
        </p>
      </Callout>
    </ArticleLayout>
  )
}
