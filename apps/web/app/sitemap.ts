import type { MetadataRoute } from 'next'
import { GUIDES } from '@/lib/guides'
import { SECTORS } from '@/lib/sectors'
import { absoluteUrl, CONTENT_UPDATED } from '@/lib/site'

// Debe reflejar la arquitectura de docs/seo/03-arquitectura-completa.md. Solo URLs indexables.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_UPDATED)
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly'
  ) => ({ url: absoluteUrl(path), lastModified, changeFrequency, priority })

  return [
    entry('/', 1, 'weekly'),
    ...SECTORS.map((s) => entry(s.path, s.slug === 'gimnasios' ? 0.9 : 0.8, 'weekly')),
    entry('/precios', 0.8),
    entry('/prueba-30-dias', 0.9),
    entry('/objeto-personalizado', 0.7),
    entry('/panel-estadisticas-nfc', 0.7),
    entry('/como-funciona', 0.6),
    entry('/preguntas-frecuentes', 0.6),
    entry('/sobre-standurl', 0.5),
    entry('/contacto', 0.4),
    entry('/envios-y-devoluciones', 0.4),
    entry('/guias', 0.6),
    ...GUIDES.map((g) => entry(`/guias/${g.slug}`, g.priority === 1 ? 0.7 : g.priority === 2 ? 0.6 : 0.5)),
    entry('/legal/aviso-legal', 0.2, 'yearly'),
    entry('/legal/privacidad', 0.2, 'yearly'),
    entry('/legal/cookies', 0.2, 'yearly'),
    entry('/legal/terminos', 0.2, 'yearly'),
  ]
}
