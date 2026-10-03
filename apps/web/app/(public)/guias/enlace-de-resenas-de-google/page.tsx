import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout from '@/components/ArticleLayout'
import { Callout } from '@/components/ui'
import { getGuide } from '@/lib/guides'

const g = getGuide('enlace-de-resenas-de-google')

export const metadata: Metadata = {
  title: g.title,
  description: g.description,
  alternates: { canonical: `/guias/${g.slug}` },
  openGraph: { type: 'article', title: g.title, description: g.description, url: `/guias/${g.slug}` },
}

const faqs = [
  { q: '¿Cuál es la diferencia entre el enlace de mi ficha y el enlace de reseñas?', a: 'El enlace de la ficha lleva a la página completa de tu negocio en Google. El enlace de reseñas lleva directamente al formulario para escribir la opinión, que es lo que quieres que vea el cliente.' },
  { q: '¿Necesito una ficha de empresa verificada?', a: 'Necesitas acceso a tu perfil de empresa de Google para poder generar y compartir el enlace de reseñas. Si aún no lo has reclamado, empieza por ahí.' },
  { q: '¿Y si no encuentro la opción?', a: 'Google cambia a veces los nombres de los menús. Si no la encuentras, puedes mandarnos el nombre y la ciudad de tu negocio y te ayudamos a localizar el enlace.' },
]

export default function Page() {
  return (
    <ArticleLayout
      slug={g.slug}
      faqs={faqs}
      related={['como-pedir-resenas-a-clientes', 'tarjeta-nfc-resenas-google', 'tarjeta-nfc-programable-vs-enlace-editable']}
    >
      <p>
        Para que tus clientes dejen una reseña con un solo gesto, necesitas el enlace directo al formulario de reseñas de tu negocio.
        Aquí tienes cómo conseguirlo y cómo comprobar que funciona.
      </p>

      <Callout title="Aviso">
        <p>
          Google cambia a veces los nombres y la ubicación de los menús. Si lo que ves no coincide con estos pasos, busca la opción de
          «pedir reseñas» en tu perfil de empresa.
        </p>
      </Callout>

      <h2>Cómo conseguir el enlace paso a paso</h2>
      <ol>
        <li>Inicia sesión en Google con la cuenta con la que gestionas tu perfil de empresa.</li>
        <li>Busca el nombre de tu negocio en Google. Verás, en la parte superior, las opciones para gestionar tu perfil.</li>
        <li>Pulsa en <strong>«Pedir reseñas»</strong> (o «Conseguir más reseñas», según la versión).</li>
        <li>Se abrirá una ventana con tu enlace de reseñas. <strong>Cópialo.</strong></li>
      </ol>

      <h2>Comprueba que funciona</h2>
      <ul>
        <li>Ábrelo en tu móvil desde una cuenta de Google distinta de la de tu negocio.</li>
        <li>Debería abrirse el formulario para escribir una reseña de tu negocio, no la página de búsqueda ni solo la ficha.</li>
        <li>Prueba también desde una ventana de incógnito en el ordenador.</li>
      </ul>

      <h2>Errores frecuentes</h2>
      <ul>
        <li>Copiar el enlace de la ficha en Google Maps en vez del enlace de reseñas.</li>
        <li>Copiar un enlace de una búsqueda con tu nombre.</li>
        <li>No probar el enlace antes de grabarlo en un objeto o imprimirlo en un QR.</li>
      </ul>

      <h2>Dónde ponerlo</h2>
      <ul>
        <li>En un objeto con NFC y QR en tu mostrador.</li>
        <li>En el mensaje de confirmación de cita o en la factura.</li>
        <li>En tu página web y en tu firma de correo.</li>
      </ul>

      <h2>Cómo usar el enlace con StandUrl</h2>
      <p>
        Cuando haces tu pedido, nos pasas el enlace (o el nombre y la ciudad de tu negocio) y lo configuramos como destino de tu objeto.
        Si algún día cambia, lo actualizas desde el panel sin tocar el objeto. Es lo que explicamos en{' '}
        <Link href="/guias/tarjeta-nfc-programable-vs-enlace-editable">tarjeta programable frente a enlace editable</Link>.
      </p>
    </ArticleLayout>
  )
}
