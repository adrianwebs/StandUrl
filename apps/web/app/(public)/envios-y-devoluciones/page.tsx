import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { Container, Prose, Section } from '@/components/ui'
import {
  BALEARIC_SURCHARGE,
  CUSTOM_LOGO_FEE,
  FREE_SHIPPING_FROM,
  PACKS,
  TRIAL_DAYS,
  formatEUR,
} from '@/lib/pricing'
import { CONTACT_EMAIL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Envíos y devoluciones: prueba de 30 días',
  description:
    'Costes y plazos de envío, zonas de entrega y condiciones de la prueba de 30 días con devolución de StandUrl.',
  alternates: { canonical: '/envios-y-devoluciones' },
  openGraph: { url: '/envios-y-devoluciones' },
}

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Envíos y devoluciones' }]}
        title="Envíos y devoluciones"
        lead={`Cómo enviamos, cuánto cuesta y cómo funciona la prueba de ${TRIAL_DAYS} días.`}
      />
      <Section className="!pt-0">
        <Container size="sm">
          <Prose>
            <h2>Zonas de entrega</h2>
            <ul>
              <li>Península: sí.</li>
              <li>Baleares: sí, con un recargo de {formatEUR(BALEARIC_SURCHARGE)} sobre la tarifa de envío.</li>
              <li>Canarias, Ceuta y Melilla: por ahora no enviamos, por aduanas y coste de transporte.</li>
              <li>Albacete: entrega en mano, sin coste, previa cita.</li>
            </ul>

            <h2>Costes de envío</h2>
            <table>
              <thead>
                <tr>
                  <th>Pack</th>
                  <th>Precio (IVA incl.)</th>
                  <th>Envío</th>
                </tr>
              </thead>
              <tbody>
                {PACKS.map((p) => (
                  <tr key={p.id}>
                    <td>
                      {p.name} ({p.units} {p.units > 1 ? 'objetos' : 'objeto'})
                    </td>
                    <td>{formatEUR(p.price)}</td>
                    <td>{p.shipping === 0 ? 'Gratis' : formatEUR(p.shipping)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>El envío es gratis en pedidos desde {formatEUR(FREE_SHIPPING_FROM)}.</p>

            <h2>Plazos</h2>
            <ul>
              <li>Modelos de catálogo con stock: entre 2 y 5 días laborables.</li>
              <li>Modelos de catálogo sin stock (se imprimen bajo pedido): entre 4 y 7 días laborables.</li>
              <li>Objetos personalizados con logo: entre 7 y 12 días laborables desde que validas el boceto.</li>
            </ul>
            <p>Te avisamos cuando el pedido sale, con el seguimiento del envío.</p>

            <h2>Prueba de {TRIAL_DAYS} días con devolución</h2>
            <p>
              Tienes {TRIAL_DAYS} días desde que recibes el pedido para probar el objeto en tu negocio. Si no te convence:
            </p>
            <ol>
              <li>
                Escríbenos a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> dentro del plazo.
              </li>
              <li>Nos devuelves el objeto, en buen estado y con su embalaje. El envío de vuelta corre por tu cuenta.</li>
              <li>
                Te reembolsamos el importe del producto, por el mismo medio de pago, en un plazo máximo de 14 días desde que
                recibimos el objeto. El envío de ida no se reembolsa.
              </li>
            </ol>

            <h2>Objetos personalizados</h2>
            <p>
              Los objetos con tu logo se fabrican a medida tras validar un boceto contigo. Por eso no admiten devolución, salvo
              defecto de fabricación. El cargo de diseño es de {formatEUR(CUSTOM_LOGO_FEE)} en el primer pedido.
            </p>

            <h2>Defectos y daños en el transporte</h2>
            <p>
              Si el objeto llega dañado o no funciona, escríbenos con una foto en un plazo de 7 días desde la entrega. Lo
              sustituimos o te devolvemos el importe, incluido el envío.
            </p>

            <h2>Derecho de desistimiento</h2>
            <p>
              Si compras como consumidor, además de la prueba de {TRIAL_DAYS} días tienes los derechos que reconoce la ley.
              Puedes consultar los{' '}
              <Link href="/legal/terminos">términos de uso</Link> y el <Link href="/legal/aviso-legal">aviso legal</Link>.
            </p>

            <h2>Pagos</h2>
            <p>
              Tras tu solicitud te contactamos para confirmar el pedido y te enviamos el método de pago. No se te cobra nada al
              enviar el formulario.
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  )
}
