import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout from '@/components/ArticleLayout'
import { Callout } from '@/components/ui'
import { getGuide } from '@/lib/guides'

const g = getGuide('resenas-google-gimnasio')

export const metadata: Metadata = {
  title: g.title,
  description: g.description,
  alternates: { canonical: `/guias/${g.slug}` },
  openGraph: { type: 'article', title: g.title, description: g.description, url: `/guias/${g.slug}` },
}

const faqs = [
  { q: '¿Puedo regalar una semana gratis a quien deje una reseña?', a: 'No. Ofrecer cualquier ventaja a cambio de una reseña va contra las normas de Google. Pide la opinión sin condiciones.' },
  { q: '¿Cuándo es mejor pedirla: al apuntarse o después de unas semanas?', a: 'Cuando el socio ya haya vivido la experiencia: tras unas semanas, después de una clase que le haya gustado o al renovar. Pedirla el primer día no tiene mucho sentido.' },
  { q: '¿Y si el personal no tiene tiempo de pedirlo?', a: 'Para eso sirve un objeto a la vista en recepción o en la salida: invita a opinar sin depender de que alguien se acuerde.' },
]

export default function Page() {
  return (
    <ArticleLayout
      slug={g.slug}
      faqs={faqs}
      related={['como-pedir-resenas-a-clientes', 'normas-de-google-sobre-resenas', 'responder-resenas-negativas']}
    >
      <p>
        Cuando alguien busca un gimnasio en su barrio, lo primero que mira en Google Maps es la puntuación y cuántas reseñas tiene. Un
        gimnasio con buen servicio pero pocas reseñas parece, desde fuera, menos fiable que otro que tiene muchas. Esta guía te explica
        cómo cambiar eso sin presionar a tus socios.
      </p>

      <h2>Por qué pesan tanto las reseñas en un gimnasio</h2>
      <ul>
        <li>Apuntarse a un gimnasio es una decisión de confianza: el cliente va a pagar una cuota y a volver varias veces por semana.</li>
        <li>La gente compara varios centros antes de decidir, y lo hace desde el móvil.</li>
        <li>Las cadenas grandes suelen acumular muchas reseñas. Un gimnasio independiente tiene que recoger las suyas.</li>
      </ul>

      <h2>Los mejores momentos para pedirla</h2>
      <ul>
        <li><strong>Al salir del entrenamiento o de una clase:</strong> es cuando el socio está más a gusto.</li>
        <li><strong>En una renovación:</strong> quien renueva ya ha decidido que le compensa.</li>
        <li><strong>Tras un hito:</strong> un reto, una clase especial, un evento del centro.</li>
        <li><strong>En recepción:</strong> con un objeto a la vista, sin necesidad de decir nada.</li>
      </ul>

      <h2>Qué decir</h2>
      <blockquote>«Si te estás encontrando bien aquí, nos ayudaría mucho que lo contaras en Google. Solo te llevará un minuto.»</blockquote>
      <p>No pidas una puntuación concreta y no la ofrezcas a cambio de nada.</p>

      <h2>Dónde colocar el objeto</h2>
      <ul>
        <li>Recepción, a la vista de quien entra y de quien sale.</li>
        <li>Salida de vestuarios.</li>
        <li>Zona de espera o cafetería, si la tienes.</li>
        <li>Zona de pesas, cerca de los espejos o la fuente de agua.</li>
      </ul>

      <h2>Qué evitar</h2>
      <ul>
        <li>Regalar «un mes gratis» u otros premios a cambio de reseñas.</li>
        <li>Pedírselo solo a los socios que sabes que están contentos.</li>
        <li>Pedirlo con el socio cansado y con prisa.</li>
      </ul>
      <p>Más detalles en <Link href="/guias/normas-de-google-sobre-resenas">las normas de Google sobre reseñas</Link>.</p>

      <Callout title="Una pesa que lo hace por ti">
        <p>
          Nuestro modelo para gimnasios es una pesa hexagonal con NFC y QR. <Link href="/gimnasios">Ver para gimnasios</Link>.
        </p>
      </Callout>
    </ArticleLayout>
  )
}
