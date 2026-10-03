// Contenido por sector. Solo la pesa existe hoy como modelo real (Modelos/Genericos/Pesa).
// `modelAvailable: false` => la página se presenta como lista de espera y no promete envío inmediato.

export type SectorSlug = 'gimnasios' | 'peluquerias-y-barberias' | 'restaurantes-y-cafeterias'

export type Sector = {
  slug: SectorSlug
  path: string
  formValue: 'gimnasio' | 'peluqueria' | 'restaurante'
  short: string
  title: string
  description: string
  h1: string
  lead: string
  badge: string
  modelAvailable: boolean
  modelName: string
  modelNote: string
  problemTitle: string
  problem: string[]
  moments: { title: string; text: string }[]
  placesTitle: string
  places: { place: string; tip: string }[]
  faqs: { q: string; a: string }[]
  guide: { href: string; label: string }
}

export const SECTORS: Sector[] = [
  {
    slug: 'gimnasios',
    path: '/gimnasios',
    formValue: 'gimnasio',
    short: 'Gimnasios',
    title: 'Reseñas de Google para gimnasios con NFC y QR',
    description:
      'Una pesa con NFC y QR en recepción para que tus socios dejen su reseña en Google sin que se la pidas. Prueba 30 días con devolución.',
    h1: 'Una pesa en tu recepción que consigue reseñas de Google',
    lead:
      'Cuando alguien busca gimnasio en Google Maps, mira la nota y cuántas reseñas tiene. Con una pesa de diseño en recepción, tus socios llegan a tu ficha de Google con un toque, sin que tengas que pedírselo en persona.',
    badge: 'Para gimnasios y centros de fitness',
    modelAvailable: true,
    modelName: 'Pesa hexagonal',
    modelNote: 'Es el modelo disponible hoy. Lleva chip NFC y código QR en el mismo objeto.',
    problemTitle: 'Tu gimnasio es bueno, pero tu ficha no lo cuenta',
    problem: [
      'La mayoría de socios contentos nunca dejan una reseña: no es que no quieran, es que nadie se lo recuerda en el momento adecuado.',
      'Pedirlo uno a uno en recepción es incómodo y depende de que el personal se acuerde. Mandar un enlace por WhatsApp se pierde entre cientos de mensajes.',
      'Mientras tanto, la cadena de al lado acumula reseñas y es la que aparece primero cuando alguien busca “gimnasio cerca de mí”.',
    ],
    moments: [
      { title: 'Al salir del entrenamiento', text: 'Es cuando el socio está más a gusto con tu centro. Un objeto a la vista en la salida le da el empujón sin que nadie se lo pida.' },
      { title: 'En la recepción', text: 'Alta de un socio nuevo, primera semana, renovación. Un momento natural para enseñarle dónde puede opinar.' },
      { title: 'Sin tareas para el equipo', text: 'El objeto trabaja solo. Tu personal no tiene que acordarse de pedir nada ni de mandar enlaces.' },
    ],
    placesTitle: '¿Dónde colocar el objeto?',
    places: [
      { place: 'Recepción', tip: 'Máxima visibilidad al entrar y al salir.' },
      { place: 'Salida de vestuarios', tip: 'Justo después del entreno, cuando se sienten bien.' },
      { place: 'Zona de espera o cafetería', tip: 'Si tienes un rincón donde la gente se queda charlando.' },
      { place: 'Zona de pesas', tip: 'Cerca de los espejos o de la fuente de agua.' },
    ],
    faqs: [
      { q: '¿Mis socios tienen que instalar algo?', a: 'No. Acercan el móvil al objeto (NFC) o escanean el código QR con la cámara. En ambos casos se abre tu ficha de Google para dejar la reseña.' },
      { q: '¿Cómo queda en un gimnasio?', a: 'El modelo disponible es una pesa hexagonal impresa en 3D, pensada para quedar bien sobre un mostrador. Si quieres tu logo, lo diseñamos (consulta la página de objeto personalizado).' },
      { q: '¿Puedo cambiar el enlace más adelante?', a: 'Sí, con el panel (4,90 €/mes, 3 primeros meses incluidos). El chip no se reprograma: cambias el destino desde el panel.' },
      { q: '¿Esto cumple las normas de Google?', a: 'Está diseñado para pedir reseñas sin filtros: un único destino para todos los clientes y sin ofrecer nada a cambio. Lo explicamos en nuestra guía sobre las normas de Google.' },
    ],
    guide: { href: '/guias/resenas-google-gimnasio', label: 'Guía: reseñas de Google para gimnasios' },
  },
  {
    slug: 'peluquerias-y-barberias',
    path: '/peluquerias-y-barberias',
    formValue: 'peluqueria',
    short: 'Peluquerías y barberías',
    title: 'Reseñas de Google para peluquerías y barberías',
    description:
      'Un objeto con NFC y QR en tu mostrador para que cada cliente satisfecho deje su reseña en Google en el momento justo. Prueba 30 días con devolución.',
    h1: 'Que cada cliente que sale encantado deje su reseña en Google',
    lead:
      'El mejor momento para una reseña es cuando el cliente se mira al espejo y le gusta lo que ve. Un objeto de diseño en el mostrador le lleva a tu ficha de Google en ese momento, sin que tengas que pedirlo con las tijeras en la mano.',
    badge: 'Para peluquerías y barberías',
    modelAvailable: false,
    modelName: 'Modelo para peluquería y barbería (en preparación)',
    modelNote: 'Estamos diseñando el modelo de este sector. Déjanos tu solicitud y te avisamos en cuanto esté listo; mientras tanto, también puedes pedir un diseño a medida.',
    problemTitle: 'Tu agenda depende de lo que se ve en Google Maps',
    problem: [
      'Quien busca peluquería o barbería en su barrio compara notas y reseñas antes de reservar. Un local nuevo con buena puntuación puede llevarse clientes que antes eran tuyos.',
      'Los clientes contentos suelen irse sin dejar nada: tienen prisa, no se acuerdan, o nadie se lo ha propuesto.',
      'Pedirlo tú mismo en medio del servicio resulta forzado. Necesitas algo que lo haga por ti, con buen gusto.',
    ],
    moments: [
      { title: 'Al cobrar', text: 'Es el momento en que el cliente ya ha visto el resultado. Un objeto junto al TPV o la caja le invita a opinar sin que tengas que decir nada.' },
      { title: 'Con NFC y con QR', text: 'Quien tiene NFC acerca el móvil; quien no, escanea el código QR del mismo objeto. Nadie se queda fuera.' },
      { title: 'Sin interrumpir el servicio', text: 'Nada que explicar ni que instalar. El cliente lo ve en el mostrador y decide si quiere opinar.' },
    ],
    placesTitle: '¿Dónde colocar el objeto?',
    places: [
      { place: 'Junto a la caja o el TPV', tip: 'Es donde se pasa el momento del pago.' },
      { place: 'Mostrador de entrada', tip: 'Lo ven quienes llegan y quienes se van.' },
      { place: 'Zona de espera', tip: 'Mientras esperan turno, con el móvil en la mano.' },
      { place: 'Cerca del espejo de salida', tip: 'Cuando se están viendo el resultado final.' },
    ],
    faqs: [
      { q: '¿Cuándo estará el modelo de peluquería?', a: 'Lo estamos diseñando. Si dejas tu solicitud, te avisamos cuando esté listo. Si no quieres esperar, podemos diseñar un objeto con tu logo.' },
      { q: '¿Y si el cliente es mayor o no sabe usar el NFC?', a: 'Cada objeto lleva también un código QR, que cualquier móvil con cámara puede leer. Y si prefieres explicarlo, basta con decir “aquí puedes dejar tu opinión en Google”.' },
      { q: '¿Aguanta el ambiente de una peluquería?', a: 'Estamos validando los materiales (humedad y productos del salón) antes de afirmar nada. Te lo confirmaremos antes del pedido.' },
      { q: '¿Puedo cambiar el enlace si cambio de local?', a: 'Sí, con el panel. El chip no se toca: cambias el destino desde el panel.' },
    ],
    guide: { href: '/guias/resenas-google-peluqueria-barberia', label: 'Guía: reseñas de Google para peluquerías y barberías' },
  },
  {
    slug: 'restaurantes-y-cafeterias',
    path: '/restaurantes-y-cafeterias',
    formValue: 'restaurante',
    short: 'Restaurantes y cafeterías',
    title: 'Reseñas de Google para restaurantes y cafeterías',
    description:
      'Un objeto con NFC y QR en la mesa o en la barra para conseguir reseñas en Google sin que el personal tenga que pedirlas. Sin permanencia.',
    h1: 'Reseñas en Google sin que tu equipo tenga que pedirlas',
    lead:
      'En hostelería, el equipo cambia y los turnos son largos: nadie tiene tiempo de pedir reseñas. Un objeto en la mesa o en la barra lo hace por ti y lleva al cliente a tu ficha de Google con un toque.',
    badge: 'Para restaurantes y cafeterías',
    modelAvailable: false,
    modelName: 'Modelo para hostelería (en preparación)',
    modelNote: 'Estamos diseñando el modelo para barra y mesa. Déjanos tu solicitud y te avisamos; también puedes pedir un diseño a medida.',
    problemTitle: 'Una nota que baja unas décimas cuesta mesas',
    problem: [
      'Quien busca dónde comer o desayunar mira la nota y las últimas reseñas antes de decidir. Unas pocas opiniones negativas pesan mucho si tienes pocas reseñas.',
      'Los clientes que han comido bien rara vez dejan reseña por iniciativa propia. Los que han tenido un mal momento, sí.',
      'Depender de que los camareros lo pidan no funciona cuando hay prisas y rotación de personal.',
    ],
    moments: [
      { title: 'Al pedir la cuenta', text: 'Es el momento en que la experiencia ya está completa. Un objeto en la mesa o junto a la caja deja la puerta abierta a opinar.' },
      { title: 'En la barra y en las mesas', text: 'Con el pack Business puedes cubrir varios puntos del local, cada uno con sus propias estadísticas.' },
      { title: 'Sin depender del equipo', text: 'El objeto funciona igual con un turno de mañana que con uno de noche, con personal nuevo o veterano.' },
    ],
    placesTitle: '¿Dónde colocar el objeto?',
    places: [
      { place: 'Junto a la caja', tip: 'El punto donde acaba la experiencia.' },
      { place: 'En la barra', tip: 'Donde se paga y se espera el café.' },
      { place: 'Mesas o terraza', tip: 'Con el pack Business, un objeto por zona.' },
      { place: 'Entrada o salida', tip: 'Visible para quien se va.' },
    ],
    faqs: [
      { q: '¿Cuándo estará el modelo de restaurante o cafetería?', a: 'Lo estamos diseñando. Déjanos tu solicitud y te avisamos. Si necesitas algo antes, podemos diseñar uno con tu logo.' },
      { q: '¿Aguanta líquidos, golpes y limpieza diaria?', a: 'Estamos validando los materiales para este uso antes de afirmar nada. Te lo confirmaremos antes de que hagas el pedido.' },
      { q: '¿Puedo tener varios puntos en el local?', a: 'Sí. El pack Business incluye 4 objetos y cada uno tiene su propio enlace y estadísticas desde el panel.' },
      { q: '¿Tengo que pagar una cuota mensual?', a: 'No. El panel es opcional (4,90 €/mes, 3 primeros meses incluidos). Sin él, los objetos siguen funcionando con el último destino configurado.' },
    ],
    guide: { href: '/guias/resenas-google-restaurante-cafeteria', label: 'Guía: reseñas de Google para restaurantes y cafeterías' },
  },
]

export function getSector(slug: SectorSlug): Sector {
  const s = SECTORS.find((x) => x.slug === slug)
  if (!s) throw new Error(`Sector desconocido: ${slug}`)
  return s
}
