import { PACKS } from '@/lib/pricing'
import { absoluteUrl } from '@/lib/site'

export const productLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'StandUrl: soporte NFC y QR para reseñas de Google',
  description:
    'Objeto impreso en 3D con chip NFC y código QR que lleva a la ficha de Google del negocio. El destino se puede cambiar desde un panel.',
  brand: { '@type': 'Brand', name: 'StandUrl' },
  url: absoluteUrl('/'),
  offers: PACKS.map((p) => ({
    '@type': 'Offer',
    name: `Pack ${p.name} (${p.units} ${p.units > 1 ? 'objetos' : 'objeto'})`,
    price: p.price.toFixed(2),
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    url: absoluteUrl('/precios'),
  })),
}
