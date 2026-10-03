// Precios aprobados el 3 oct 2026 (IVA incluido). Fuente: docs/seo/03-arquitectura-completa.md §10–11.

export type Pack = {
  id: 'starter' | 'pro' | 'business'
  name: string
  units: number
  price: number
  shipping: number
  highlighted: boolean
  tagline: string
  features: string[]
}

export const FREE_SHIPPING_FROM = 50
export const BALEARIC_SURCHARGE = 5
export const CUSTOM_LOGO_FEE = 19.9
export const PANEL_MONTHLY = 4.9
export const PANEL_YEARLY = 49
export const PANEL_INCLUDED_MONTHS = 3
export const TRIAL_DAYS = 30

export const PACKS: Pack[] = [
  {
    id: 'starter',
    name: 'Starter',
    units: 1,
    price: 29.9,
    shipping: 4.9,
    highlighted: false,
    tagline: 'Para probar en un único punto del negocio',
    features: [
      '1 objeto con NFC + QR',
      `Panel incluido ${PANEL_INCLUDED_MONTHS} meses`,
      'Destino editable desde el panel',
      'Sin permanencia',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    units: 2,
    price: 54.9,
    shipping: 0,
    highlighted: true,
    tagline: 'Para dos puntos: recepción y zona de espera, mostrador y sillón…',
    features: [
      '2 objetos con NFC + QR',
      `Panel incluido ${PANEL_INCLUDED_MONTHS} meses`,
      'Estadísticas por objeto',
      'Envío gratis',
      'Sin permanencia',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    units: 4,
    price: 94.9,
    shipping: 0,
    highlighted: false,
    tagline: 'Para locales grandes o con varias zonas',
    features: [
      '4 objetos con NFC + QR',
      `Panel incluido ${PANEL_INCLUDED_MONTHS} meses`,
      'Estadísticas e historial por objeto',
      'Envío gratis',
      'Sin permanencia',
    ],
  },
]

export function formatEUR(value: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function pricePerUnit(pack: Pack): number {
  return Math.round((pack.price / pack.units) * 100) / 100
}
