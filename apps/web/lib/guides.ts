// Metadatos de las guías. El contenido de cada guía vive en app/(public)/guias/<slug>/page.tsx.

export type GuideTopic = 'Comparativas' | 'Normas y confianza' | 'Dudas antes de comprar' | 'Por sector' | 'Cómo pedir reseñas'

export type Guide = {
  slug: string
  title: string
  h1: string
  description: string
  topic: GuideTopic
  priority: 1 | 2 | 3
  published: string
  readingMinutes: number
}

export const GUIDES: Guide[] = [
  {
    slug: 'tarjeta-nfc-resenas-google',
    title: 'Tarjeta NFC para reseñas de Google: guía',
    h1: 'Tarjeta NFC para reseñas de Google: qué es, cómo funciona y cuándo no basta',
    description:
      'Qué es una tarjeta NFC de reseñas de Google, cómo se configura, cuándo basta y cuándo conviene un objeto con NFC y QR. Comparativa honesta.',
    topic: 'Comparativas',
    priority: 1,
    published: '2026-10-03',
    readingMinutes: 7,
  },
  {
    slug: 'normas-de-google-sobre-resenas',
    title: 'Normas de Google sobre reseñas: qué sí y qué no',
    h1: 'Normas de Google sobre reseñas: qué puedes hacer y qué no',
    description:
      'Qué permite y qué prohíbe Google al pedir reseñas: incentivos, filtrar clientes (review gating) y reseñas falsas. Cómo pedirlas sin poner en riesgo tu ficha.',
    topic: 'Normas y confianza',
    priority: 1,
    published: '2026-10-03',
    readingMinutes: 6,
  },
  {
    slug: 'qr-vs-nfc-resenas-google',
    title: 'QR o NFC para reseñas de Google: cuál es mejor',
    h1: 'QR o NFC para pedir reseñas de Google: cuál elegir',
    description:
      'Diferencias entre un código QR y un chip NFC para conseguir reseñas en Google: compatibilidad, coste y uso real. Por qué lo mejor es combinar los dos.',
    topic: 'Comparativas',
    priority: 1,
    published: '2026-10-03',
    readingMinutes: 5,
  },
  {
    slug: 'mi-movil-tiene-nfc',
    title: '¿Mi móvil tiene NFC? Cómo saberlo y activarlo',
    h1: '¿Mi móvil tiene NFC? Cómo saberlo y cómo activarlo',
    description:
      'Cómo saber si tu móvil Android o iPhone tiene NFC, cómo activarlo y qué hacer si no lo tiene. Útil para negocios que quieren pedir reseñas con NFC.',
    topic: 'Dudas antes de comprar',
    priority: 2,
    published: '2026-10-03',
    readingMinutes: 4,
  },
  {
    slug: 'tarjeta-nfc-programable-vs-enlace-editable',
    title: 'NFC programable o enlace editable: diferencias',
    h1: 'Tarjeta NFC programable frente a enlace editable: qué te conviene',
    description:
      'Qué significa programar una tarjeta NFC, qué problema tiene reprogramar y cómo un enlace fijo con destino editable te ahorra trabajo si cambias de ficha.',
    topic: 'Dudas antes de comprar',
    priority: 2,
    published: '2026-10-03',
    readingMinutes: 5,
  },
  {
    slug: 'como-pedir-resenas-a-clientes',
    title: 'Cómo pedir reseñas a tus clientes sin incomodar',
    h1: 'Cómo pedir reseñas a tus clientes sin incomodar',
    description:
      'Cuándo y cómo pedir reseñas en Google a tus clientes sin que resulte forzado: momento, frases que funcionan, errores que evitar y cómo facilitarlo.',
    topic: 'Cómo pedir reseñas',
    priority: 2,
    published: '2026-10-03',
    readingMinutes: 6,
  },
  {
    slug: 'enlace-de-resenas-de-google',
    title: 'Enlace de reseñas de Google: cómo conseguirlo',
    h1: 'Cómo conseguir el enlace de reseñas de Google de tu negocio',
    description:
      'Paso a paso para obtener el enlace directo al formulario de reseñas de tu ficha de Google, dónde ponerlo y cómo usarlo con NFC o QR.',
    topic: 'Cómo pedir reseñas',
    priority: 2,
    published: '2026-10-03',
    readingMinutes: 4,
  },
  {
    slug: 'resenas-google-gimnasio',
    title: 'Más reseñas en Google para tu gimnasio',
    h1: 'Cómo conseguir más reseñas en Google para tu gimnasio',
    description:
      'Por qué las reseñas de Google pesan tanto en un gimnasio, en qué momentos pedirlas y cómo facilitar que tus socios opinen sin presionarles.',
    topic: 'Por sector',
    priority: 3,
    published: '2026-10-03',
    readingMinutes: 6,
  },
  {
    slug: 'resenas-google-peluqueria-barberia',
    title: 'Más reseñas de Google para tu peluquería',
    h1: 'Cómo conseguir más reseñas en Google para tu peluquería o barbería',
    description:
      'Cuándo pedir reseñas en una peluquería o barbería, cómo hacerlo sin forzar y cómo dejar el camino fácil a tus clientes.',
    topic: 'Por sector',
    priority: 3,
    published: '2026-10-03',
    readingMinutes: 6,
  },
  {
    slug: 'resenas-google-restaurante-cafeteria',
    title: 'Más reseñas en Google para tu restaurante',
    h1: 'Cómo conseguir más reseñas en Google para tu restaurante o cafetería',
    description:
      'Cómo conseguir reseñas en Google en hostelería sin depender de que los camareros lo pidan: momentos, ubicación y buenas prácticas.',
    topic: 'Por sector',
    priority: 3,
    published: '2026-10-03',
    readingMinutes: 6,
  },
  {
    slug: 'responder-resenas-negativas',
    title: 'Cómo responder a una reseña negativa en Google',
    h1: 'Cómo responder a una reseña negativa en Google (con ejemplos)',
    description:
      'Cómo responder a reseñas negativas en Google: pasos, ejemplos de respuesta, qué evitar y cuándo se puede pedir a Google que revise una reseña.',
    topic: 'Cómo pedir reseñas',
    priority: 3,
    published: '2026-10-03',
    readingMinutes: 6,
  },
]

export function getGuide(slug: string): Guide {
  const g = GUIDES.find((x) => x.slug === slug)
  if (!g) throw new Error(`Guía desconocida: ${slug}`)
  return g
}
