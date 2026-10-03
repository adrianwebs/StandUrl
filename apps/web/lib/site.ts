// Configuración central del sitio público. Los valores marcados como PENDIENTE
// se resuelven en docs/PENDIENTES.md antes de publicar.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://standurl.com').replace(/\/$/, '')

export const SITE_NAME = 'StandUrl'

export const SITE_TAGLINE = 'Soporte NFC y QR para reseñas de Google'

// PENDIENTE: confirmar que este buzón existe cuando se compre el dominio.
export const CONTACT_EMAIL = 'hola@standurl.com'

export const CTA = {
  label: 'Pruébalo 30 días',
  href: '/prueba-30-dias',
} as const

export const LOCATION = {
  city: 'Albacete',
  country: 'España',
} as const

/** Fecha de última revisión de contenido (se usa en sitemap y artículos). */
export const CONTENT_UPDATED = '2026-10-03'

export function absoluteUrl(path = '/'): string {
  return `${SITE_URL}${path === '/' ? '' : path}`
}
