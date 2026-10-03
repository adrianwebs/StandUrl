import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout from '@/components/ArticleLayout'
import { Callout } from '@/components/ui'
import { getGuide } from '@/lib/guides'

const g = getGuide('normas-de-google-sobre-resenas')

export const metadata: Metadata = {
  title: g.title,
  description: g.description,
  alternates: { canonical: `/guias/${g.slug}` },
  openGraph: { type: 'article', title: g.title, description: g.description, url: `/guias/${g.slug}` },
}

const faqs = [
  { q: '¿Puedo regalar algo a quien deje una reseña?', a: 'No. Google prohíbe ofrecer dinero, descuentos, regalos o cualquier otra cosa a cambio de una reseña, aunque la reseña sea sincera.' },
  { q: '¿Puedo pedir la reseña solo a los clientes que me dicen que están contentos?', a: 'No es recomendable. Pedir reseñas de forma selectiva a quienes están satisfechos es lo que se conoce como review gating y va contra las políticas de Google. Lo correcto es ofrecer la misma oportunidad a todos.' },
  { q: '¿Puedo pedir reseñas por WhatsApp o por correo?', a: 'Sí, siempre que se lo pidas a todos tus clientes por igual, sin condiciones ni incentivos y sin filtrar a quién se lo envías según su opinión.' },
  { q: '¿Pueden dejar reseñas mis empleados o mi familia?', a: 'Es mejor que no. Google considera conflicto de interés las reseñas de personas vinculadas al negocio.' },
]

export default function Page() {
  return (
    <ArticleLayout
      slug={g.slug}
      faqs={faqs}
      related={['como-pedir-resenas-a-clientes', 'responder-resenas-negativas', 'tarjeta-nfc-resenas-google']}
    >
      <p>
        Pedir reseñas está permitido y es una práctica habitual. Pero Google tiene normas sobre cómo hacerlo, y saltárselas puede
        acabar con reseñas eliminadas e incluso con problemas para tu ficha de empresa. Esta guía resume lo esencial, con un lenguaje
        claro.
      </p>

      <Callout title="Importante">
        <p>
          Las políticas de Google cambian con el tiempo. Esta guía es un resumen informativo, no asesoramiento legal. Antes de lanzar una
          campaña de reseñas, consulta siempre la política oficial vigente de Google para contenido en Maps y para perfiles de empresa.
        </p>
      </Callout>

      <h2>Lo que Google no permite</h2>

      <h3>1. Ofrecer algo a cambio de una reseña</h3>
      <p>
        No puedes dar descuentos, regalos, tarjetas regalo, sorteos ni ninguna otra ventaja a cambio de que alguien deje una reseña.
        Tampoco puedes imponer cuotas de reseñas a tu equipo ni ligar incentivos a la cantidad de reseñas conseguidas.
      </p>

      <h3>2. Filtrar a quién se pide la reseña (review gating)</h3>
      <p>
        El review gating consiste en preguntar primero al cliente qué tal ha ido y enseñarle el enlace de Google solo si la respuesta
        es buena, mientras a los demás se les envía a un formulario privado. Google lo considera una forma de manipular la
        puntuación. La norma es sencilla: no pidas reseñas de forma selectiva ni desalientes las negativas.
      </p>

      <h3>3. Reseñas falsas o con conflicto de interés</h3>
      <p>
        Tampoco están permitidas las reseñas que no reflejan una experiencia real, las escritas por el propio negocio, sus empleados o
        familiares, ni las que se compran o se intercambian.
      </p>

      <h2>Lo que sí puedes hacer</h2>
      <ul>
        <li>Pedir reseñas a <strong>todos</strong> tus clientes por igual, sin condiciones.</li>
        <li>Facilitar el camino: un enlace directo, un código QR o un objeto con NFC.</li>
        <li>Pedir una opinión sincera, no una puntuación concreta.</li>
        <li>Responder a todas las reseñas, también a las negativas.</li>
        <li>Denunciar a Google las reseñas que incumplen sus normas.</li>
      </ul>

      <h2>Qué riesgos hay si no se cumplen</h2>
      <p>
        Google puede eliminar reseñas que considere que incumplen sus políticas y, en los casos graves o repetidos, puede sancionar o
        suspender el perfil del negocio. Además, los clientes se dan cuenta cuando las reseñas parecen forzadas.
      </p>

      <h2>Cómo cumple StandUrl con estas normas</h2>
      <ul>
        <li>El objeto lleva siempre a un único destino para todos los clientes: el formulario de reseña de tu ficha.</li>
        <li>No hay preguntas previas ni filtros por puntuación.</li>
        <li>No ofrecemos ni sugerimos premios a cambio de reseñas.</li>
      </ul>
      <p>
        StandUrl no está afiliado a Google ni cuenta con su respaldo. Ofrecemos un objeto que facilita pedir reseñas de forma
        abierta; cumplir las normas depende también de cómo lo uses. Para más ideas, lee{' '}
        <Link href="/guias/como-pedir-resenas-a-clientes">cómo pedir reseñas a tus clientes sin incomodar</Link>.
      </p>
    </ArticleLayout>
  )
}
