import {
  BALEARIC_SURCHARGE,
  FREE_SHIPPING_FROM,
  PANEL_INCLUDED_MONTHS,
  PANEL_MONTHLY,
  PANEL_YEARLY,
  TRIAL_DAYS,
  formatEUR,
} from '@/lib/pricing'

export type Faq = { q: string; a: string }

export const faqUso: Faq[] = [
  {
    q: '¿Funciona con todos los móviles?',
    a: 'El objeto lleva NFC y un código QR. Los iPhone XS y posteriores y la mayoría de móviles Android actuales leen el NFC acercándolos al objeto. Cualquier móvil con cámara puede leer el QR, así que nadie se queda fuera. El cliente no tiene que instalar ninguna aplicación.',
  },
  {
    q: '¿Qué pasa cuando el cliente toca o escanea?',
    a: 'Se abre el formulario de reseña de tu ficha de Google. Desde ahí, el cliente decide si deja su opinión y qué puntuación pone. Nosotros no intervenimos en eso.',
  },
  {
    q: '¿Esto es “review gating”? ¿Cumple las normas de Google?',
    a: 'No hacemos review gating: todos los clientes van al mismo sitio, sin preguntas previas ni filtros por puntuación, y no se ofrece nada a cambio de la reseña. Google prohíbe filtrar a quién se pide reseña y ofrecer incentivos. Te lo explicamos en la guía sobre las normas de Google.',
  },
  {
    q: '¿Cómo consigo el enlace de reseñas de mi negocio?',
    a: 'Desde tu perfil de empresa de Google, en la opción de pedir reseñas, puedes copiar el enlace directo al formulario. Si no sabes dónde está, tienes la guía paso a paso y, si lo prefieres, nos lo puedes pasar con el nombre de tu negocio y lo localizamos nosotros.',
  },
]

export const faqPanel: Faq[] = [
  {
    q: '¿Puedo cambiar el enlace del objeto después?',
    a: `Sí, desde el panel. El chip del objeto apunta siempre a una dirección fija de StandUrl y lo que cambias es el destino, así que no hay que reprogramarlo ni sustituirlo. El panel cuesta ${formatEUR(PANEL_MONTHLY)}/mes o ${formatEUR(PANEL_YEARLY)}/año, y los ${PANEL_INCLUDED_MONTHS} primeros meses van incluidos en cualquier pack.`,
  },
  {
    q: '¿Qué pasa si dejo de pagar el panel?',
    a: 'El objeto sigue funcionando y redirigiendo al último destino que tuvieras configurado. Solo pierdes la posibilidad de cambiar el destino y de ver estadísticas.',
  },
  {
    q: '¿Hay permanencia?',
    a: 'No. Compras el objeto una vez y el panel es opcional, sin compromiso de permanencia.',
  },
]

export const faqCompra: Faq[] = [
  {
    q: '¿Cómo funciona la prueba de 30 días?',
    a: `Haces tu pedido y lo pruebas ${TRIAL_DAYS} días en tu negocio. Si no te convence, nos devuelves el objeto (el envío de vuelta corre por tu cuenta) y te reembolsamos el importe del producto. El envío de ida no se reembolsa. Los objetos personalizados con tu logo se fabrican a medida y no admiten devolución salvo defecto.`,
  },
  {
    q: '¿Cuánto cuesta el envío y cuánto tarda?',
    a: `Los pedidos desde ${formatEUR(FREE_SHIPPING_FROM)} (packs Pro y Business) tienen envío gratis; en el Starter el envío cuesta ${formatEUR(4.9)}. Enviamos a península y Baleares (+${formatEUR(BALEARIC_SURCHARGE)} en Baleares). El plazo habitual es de 2 a 7 días laborables según haya stock, y los objetos con logo, de 7 a 12 días. Por ahora no enviamos a Canarias, Ceuta ni Melilla.`,
  },
  {
    q: '¿Está el IVA incluido?',
    a: 'Sí, los precios que ves en la web llevan el IVA incluido.',
  },
  {
    q: '¿Cómo se paga?',
    a: 'Tras tu solicitud te contactamos para confirmar el pedido y te enviamos el método de pago. No se te cobra nada al enviar el formulario.',
  },
  {
    q: '¿Puedo ponerle mi logo?',
    a: 'Sí. Hacemos el diseño por un cargo único de 19,90 € en el primer pedido, y validas un boceto antes de imprimir. Lo explicamos en la página de objeto personalizado.',
  },
]

export const faqComparativa: Faq[] = [
  {
    q: '¿Qué diferencia hay con una tarjeta NFC o una pegatina con QR?',
    a: 'Una tarjeta de PVC o una pegatina cuestan muy poco, pero son discretas y es fácil que pasen desapercibidas. StandUrl es un objeto que se ve y se toca, que lleva NFC y QR a la vez, y cuyo destino puedes cambiar desde un panel sin reprogramar nada.',
  },
  {
    q: '¿Por qué cuesta más que una tarjeta de un euro?',
    a: 'Porque no es una tarjeta: es un objeto diseñado e impreso en 3D, con su chip, su QR y el panel para cambiar el destino. Si solo necesitas lo mínimo y no te importa la presencia, una tarjeta puede bastarte; te contamos cuándo en nuestra guía de tarjetas NFC.',
  },
]

export const faqGeneral: Faq[] = [...faqUso, ...faqPanel, ...faqCompra, ...faqComparativa]

export const faqHome: Faq[] = [
  faqUso[0],
  faqUso[2],
  faqPanel[0],
  faqPanel[1],
  faqCompra[0],
  faqComparativa[0],
]
