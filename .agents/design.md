# StandUrl — Guía de Diseño

## Identidad Visual

### Filosofía
- Parece un **producto comercial**, no "algo que Adrián imprimió ayer".
- La foto del objeto físico es el argumento de venta — nunca mockups genéricos.
- Minimalista, oscuro, profesional. No "startup colorida".

### Paleta de Colores
```
--color-bg:          #0A0A0A   /* Negro casi puro (fondo principal) */
--color-surface:     #111111   /* Tarjetas y paneles */
--color-surface-2:   #1A1A1A   /* Bordes, inputs */
--color-accent:      #F5A623   /* Dorado/Ámbar — el "detalle dorado" del producto */
--color-accent-dim:  #C47D0E   /* Dorado oscuro para hover */
--color-text:        #FAFAFA   /* Texto principal */
--color-text-muted:  #888888   /* Texto secundario */
--color-success:     #22C55E   /* Estado activo dispositivo */
--color-error:       #EF4444
```

### Tipografía
- **Headings**: Geist (o Inter, peso 700–800). Títulos grandes, impactantes.
- **Body**: Inter, peso 400–500.
- **Mono / Tokens**: JetBrains Mono (para mostrar tokens como `8F7K2P`).

### Iconografía
- Lucide Icons (incluido en el ecosistema Next.js)
- Sin emojis en UI de producto — solo en contenido de marketing/landing

### Espaciado
- Grid de 8px. Secciones separadas 80–120px en desktop.
- Border-radius: 8px en tarjetas, 6px en inputs, 4px en badges.

---

## Landing Page

### Principios
1. **Foto real > ilustración** — la primera imagen que ve el usuario es el objeto físico real.
2. **Una acción** — cada sección lleva al mismo CTA: `/prototipo-gratis`.
3. **Sin fricción** — formulario con 5 campos máximo.
4. **SEO técnico** — meta tags, OG, structured data (LocalBusiness), sitemap.

### Estructura visual por sección (Home)
```
[Hero]          — Full-height, fondo negro, foto objeto, headline grande, CTA dorado
[Problema]      — 2 columnas: texto izquierda, imagen derecha (dark mode)
[Cómo funciona] — 3 pasos con iconos y número grande
[Galería]       — Grid 2×2 o carrusel de objetos por sector
[Comparativa]   — Tabla "Competencia vs StandUrl"
[Precios]       — 3 tarjetas horizontales, pack Pro destacado
[FAQ]           — Acordeón, máximo 6 preguntas
[CTA Final]     — Sección oscura con formulario o botón grande
[Footer]        — 3 columnas: nav, legal, contacto
```

---

## Dashboard (MVP — referencia para cuando se construya)

### Estilo
- Sidebar izquierda fija (colapsable en móvil)
- Fondo `#0A0A0A`, tarjetas `#111111`
- Datos principales con tipografía grande (stat cards)
- Tabla de interacciones recientes (paginada, sin infinite scroll por ahora)

### Componentes clave
- `StatCard` — número grande + tendencia (↑/↓ % mes anterior)
- `DeviceCard` — badge estado (🟢/🔴) + nombre + contador
- `DestinationBlock` — URL actual + botón "Cambiar destino"
- `InteractionTable` — timestamp + dispositivo + SO del user agent

---

## Reglas para Agentes de Diseño

- Siempre dark mode por defecto — no implementar toggle claro/oscuro en MVP.
- El color dorado (`#F5A623`) se usa exclusivamente para CTAs y acentos críticos.
- Tailwind CSS v4 es el sistema de estilos del proyecto.
- No usar librerías de componentes externas (shadcn/radix está permitido como base, pero con estilos propios encima).
- Todas las páginas deben ser mobile-first.
- El formulario de `/prototipo-gratis` no lleva JS complejo — acción POST simple con feedback de éxito.
