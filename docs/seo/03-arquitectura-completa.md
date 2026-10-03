# StandUrl — Arquitectura SEO completa: clusters, URLs, landings, guías y plan de contenido

> Versión 1 · 3 oct 2026 · Basada en `01` (mercado y personas), `02` (keywords) y `.agents/*`.
> **Qué es y qué no es:** es el plano completo del sitio (qué páginas, qué ataca cada una, qué lleva dentro y cómo se enlazan). Contiene el *esqueleto de contenido* de cada página (títulos, H1, secciones, mensajes, schema, enlaces). La **redacción final** de cada página es la fase 3 y se hace página a página.
> **Aviso de datos:** los volúmenes de Keyword Planner de agosto 2026 no son fiables (ver `02`, sección 11). Se usan medias anuales. La demanda de búsqueda de este nicho es **pequeña**; el diseño del sitio tiene en cuenta que la conversión y la venta directa pesan más que el tráfico.

---

## 0. Principios de diseño del sitio

1. **Una intención → una URL.** Si dos páginas responden a la misma búsqueda, se fusionan.
2. **La home vende el producto; las guías resuelven dudas y captan búsquedas de "tarjeta", "QR" y "NFC".** Cada guía lleva a la home, a precios o al prototipo.
3. **Páginas de sector = conversión.** No tienen keywords con volumen medido; existen para que el dueño de un gimnasio, una barbería o un restaurante se vea reflejado.
4. **Cero afirmaciones que no se puedan probar** (testimonios, "x3", "2 segundos"). Se sustituyen por demostraciones reales (vídeo del toque, el propio objeto, el prototipo).
5. **Confianza por transparencia:** hecho en Albacete, sin permanencia, sin filtrar reseñas, precios visibles.

---

## 1. Limpieza del 4.º export (lo que se descarta y por qué)

| Grupo | Ejemplos (media/mes) | Motivo |
|---|---|---|
| Ver/gestionar mis reseñas (consumidor o titular de cuenta) | reseñas google 18.100 · mis reseñas google 6.600 · google reseñas 3.600 · reseñas de google 1.000 · ver mis reseñas google 720 · reseña google maps 720 · google maps reseñas 480 · google maps mis reseñas 320 · ver reseñas google 260 | Intención informativa/navegación. No quiere comprar nada ni conseguir reseñas |
| Reseñas anónimas, buscar, Gmail, Android, "paga por reseñas" | reseña anónima google 40 · buscar mis reseñas… 40 · gmail reseñas 20 · google maps paga por reseñas 10 | Mercado distinto |
| Reseñas de restaurantes como consumidor | google reseñas restaurantes 50 · reseñas google restaurantes 70 | El usuario lee reseñas, no las pide |
| Tarjetas de visita/presentación/digitales NFC | tarjetas de visita nfc 40 · tarjeta visita nfc 40 · tarjeta de visita nfc 30 · tarjetas de presentacion nfc 10 · tarjetas digitales nfc 10 · tarjeta digital nfc 10 | StandUrl no vende tarjetas de visita |
| Marca ajena / ruido | tarjetas nfc amazon 10 · tarjeta sd poco x3 10 · xiaomi poco x3 tarjeta sd 10 | Marcas ajenas o irrelevantes |
| Chips técnicos (bricolaje) | tarjeta nfc ntag215 10 · tarjetas nfc 215 10 · tarjetas con chip nfc 10 · tipos de tarjetas nfc 10 · para qué sirven las tarjetas nfc 10 · nfc en tarjetas 10 | Intención técnica o curiosidad, volumen mínimo |
| Herramienta gratis | generar / crear QR para reseñas (40) | No hay generador en el MVP |
| Sin datos | tarjeta nfc negocio y reseñas en google maps | Sin volumen |

Además se aplica la regla de **no sumar variantes que Google agrupa** (`tarjeta nfc` = `tarjetas con nfc` = 1.300; `tarjeta nfc programable` = `tarjetas nfc programables` = 50).

---

## 2. Clusters finales y asignación a páginas

Cifras = media mensual del Planificador (sep 2025–ago 2026). "Intención" = lo que realmente quiere quien teclea.

| # | Cluster | Keyword principal | Variantes con diferencia semántica real | Media/mes | Intención | Página destino |
|---|---|---|---|---|---|---|
| 1 | **Soporte NFC/QR para reseñas** (categoría producto) | reseñas google nfc | — (única con datos) | 50 | Comercial: busca la solución | `/` |
| 2 | **QR de reseñas de Google** | qr reseñas google | qr para reseñas de google (110) · código qr reseñas google (40) · código qr para reseñas google (30). *Mismo significado: se tratan como sinónimos* | 260 (+110+40+30) | Mixta (crear QR gratis o solución hecha) | `/` |
| 3 | **Tarjeta NFC de reseñas (formato "tarjeta")** | tarjeta nfc reseñas google | — | 260 (agosto dudoso) | Comercial: busca una tarjeta barata → hay que reorientar a objeto | `/guias/tarjeta-nfc-resenas-google` |
| 4 | **NFC personalizado con marca** | tarjetas nfc personalizadas | tarjeta personal nfc (10) | 260 | Comercial: quiere algo con su logo | `/objeto-personalizado` |
| 5 | **Comprar / precio** | comprar tarjeta nfc | — | 40 (+267 % interanual) | Transaccional | `/precios` (secundaria) |
| 6 | **Programable vs editable** | tarjeta nfc programable | — (plural = mismo volumen) | 50 | Bricolaje: quiere programar el chip | `/guias/tarjeta-nfc-programable-vs-enlace-editable` |
| 7 | **Compatibilidad del móvil** | nfc en huawei | nfc en android (30) · tarjeta nfc en el móvil (10) | 40+30 | Informativa/objeción previa a comprar | `/guias/mi-movil-tiene-nfc` |
| 8 | **"Tarjeta NFC" genérica** | tarjeta nfc | nfc tarjeta (140) | 1.300 | Genérica y DIY (muy competida, Amazon…) | **No se ataca directamente.** Se cubre en la guía del cluster 3 |
| 9 | **Problema: más reseñas** | aumentar reseñas google | cómo conseguir/pedir reseñas… (sin datos) | 20 | Informativa | `/guias/como-pedir-resenas-a-clientes` |
| 10 | **Por sector** (gimnasio, peluquería, barbería, restaurante) | — (sin datos) | — | — | Comercial por contexto | `/gimnasios`, `/peluquerias-y-barberias`, `/restaurantes-y-cafeterias` |

**Por qué el cluster 3 va fuera de la home:** quien busca "tarjeta" quiere una tarjeta de PVC barata. Mandarlo directamente a la home genera rebote. Una guía comparativa le dice la verdad (qué es una tarjeta, sus límites, cuándo conviene un objeto) y lo lleva al producto. La home se queda con "soporte/objeto NFC y QR" para que no compitan entre sí.

---

## 3. Árbol de URLs final (ordenado por potencial de negocio)

| Prio | URL | Tipo | Cluster | Estado |
|---|---|---|---|---|
| 1 | `/gimnasios` | Landing de sector | 10 | Existe |
| 2 | `/` | Home / hub | 1, 2 | Existe |
| 3 | `/prototipo-gratis` | Conversión | — | Existe |
| 4 | `/peluquerias-y-barberias` | Landing de sector | 10 | Existe |
| 5 | `/precios` | Transaccional | 5 | Existe |
| 6 | `/objeto-personalizado` | Landing de servicio | 4 | **Nueva** |
| 7 | `/restaurantes-y-cafeterias` | Landing de sector | 10 | Existe |
| 8 | `/panel-estadisticas-nfc` | Landing de servicio (suscripción 4,90 €/mes) | 6 (apoyo) | **Nueva** |
| 9 | `/guias/tarjeta-nfc-resenas-google` | Guía pilar (comparativa) | 3 | **Nueva** |
| 10 | `/guias/qr-vs-nfc-resenas-google` | Guía comparativa | 1, 2 | **Nueva** |
| 11 | `/guias/normas-de-google-sobre-resenas` | Guía de confianza | — | **Nueva** |
| 12 | `/guias/como-pedir-resenas-a-clientes` | Guía de problema | 9 | **Nueva** |
| 13 | `/guias/mi-movil-tiene-nfc` | Guía de objeción | 7 | **Nueva** |
| 14 | `/guias/tarjeta-nfc-programable-vs-enlace-editable` | Guía de diferenciación | 6 | **Nueva** |
| 15 | `/guias/enlace-de-resenas-de-google` | Guía práctica | — | **Nueva** |
| 16 | `/guias/resenas-google-gimnasio` | Guía de sector | 10 | **Nueva** |
| 17 | `/guias/resenas-google-peluqueria-barberia` | Guía de sector | 10 | **Nueva** |
| 18 | `/guias/resenas-google-restaurante-cafeteria` | Guía de sector | 10 | **Nueva** |
| 19 | `/guias/responder-resenas-negativas` | Guía de problema (miedo) | 9 | **Nueva** |
| 20 | `/guias` | Índice de guías | — | **Nueva** |
| Apoyo | `/como-funciona` | Confianza | — | Existe |
| Apoyo | `/preguntas-frecuentes` | FAQ (FAQPage schema) | — | **Nueva** |
| Apoyo | `/sobre-standurl` | E-E-A-T: quién, dónde, cómo se fabrica | — | **Nueva** |
| Apoyo | `/contacto` | Contacto | — | **Nueva** |
| Apoyo | `/legal/privacidad`, `/legal/cookies`, `/legal/terminos` | Legal | — | Existen |
| Excluir | `/t/*`, `/admin/*`, `/dashboard`, `/login`, `/api/*` | Funcionales | — | `noindex` o bloqueadas |

**Slugs sin tildes ni eñes** (`resenas`, no `reseñas`).
No se crean páginas para: tarjetas de visita NFC, "reseñas google" genérico, "ver mis reseñas", generador de QR (fuera de alcance o de producto).

---

## 4. Landings: especificación página por página

Formato: URL · title (≤60) · meta (≤155) · H1 · keywords · estructura · schema · enlaces · CTA.

### 4.1 Home `/`
- **Title:** `Soporte NFC y QR para reseñas de Google | StandUrl`
- **Meta:** `Objeto de diseño con NFC y QR para que tus clientes dejen su reseña en Google con un toque. Cambia el destino cuando quieras. Pide tu prototipo gratis.`
- **H1:** `Soporte NFC y QR para que tus clientes te dejen reseñas en Google`
- **Keywords:** reseñas google nfc · qr reseñas google · qr para reseñas de google · código qr reseñas google · soporte nfc reseñas.
- **Estructura:**
  1. Hero: promesa + imagen del objeto (la pesa) + CTA "Pide tu prototipo gratis" + microcopia "30 días de prueba, sin compromiso".
  2. Problema → solución (pedir reseñas incomoda; un toque).
  3. Cómo funciona en 3 pasos: lo pones en el mostrador · el cliente acerca el móvil o escanea el QR · llega a tu ficha de Google.
  4. **"No es una tarjeta, es un objeto"**: tabla comparativa tarjeta de PVC / pegatina con QR / objeto StandUrl (diseño, visibilidad, edición del destino, panel, precio). Enlace a la guía de tarjetas.
  5. Un objeto para cada negocio: 3 tarjetas (gimnasios, peluquerías y barberías, restaurantes y cafeterías).
  6. Destino editable sin reprogramar el chip + estadísticas (enlace a `/panel-estadisticas-nfc`).
  7. Sin permanencia: si dejas de pagar el panel, el objeto sigue funcionando.
  8. Pedir reseñas bien: sin filtros ni incentivos (enlace a la guía de normas).
  9. Precios resumidos (Starter/Pro/Business) → `/precios`.
  10. FAQ (6 preguntas, ver 4.9).
  11. CTA final.
- **Schema:** `Organization`, `WebSite`, `Product` + `Offer` (3 packs), `FAQPage`.
- **Enlaces salientes:** 3 sectores, precios, prototipo, panel, personalizado, guía tarjeta, guía normas.

### 4.2 `/gimnasios`
- **Title:** `Reseñas de Google para gimnasios con NFC y QR | StandUrl`
- **Meta:** `Una pesa con NFC y QR en recepción para que tus socios dejen su reseña en Google. Sin pedirla, sin cuotas obligatorias. Prueba 30 días gratis.`
- **H1:** `Una pesa en tu recepción que consigue reseñas de Google`
- **Estructura:** problema (la cadena de al lado tiene cientos de reseñas) → solución (la pesa) → dónde ponerla (recepción, zona de pesas, vestuarios no) → cómo funciona → qué obtiene el gimnasio (ficha más sólida, sin tareas para el personal) → FAQ de gimnasio → modelos disponibles (**solo la pesa hoy**; otros "próximamente" solo si se confirman) → precios resumidos → CTA.
- **Keywords:** sin datos de volumen. Usar de forma natural: reseñas google gimnasio, soporte nfc gimnasio, qr reseñas gimnasio.
- **Schema:** `Product`/`Offer`, `FAQPage`, `BreadcrumbList`.
- **Enlaces:** home (migas), precios, prototipo, guía `/guias/resenas-google-gimnasio`.

### 4.3 `/peluquerias-y-barberias`
- **Title:** `Reseñas de Google para peluquerías y barberías | StandUrl`
- **Meta:** `Un objeto con NFC y QR en tu mostrador para que cada cliente satisfecho deje su reseña en Google en el momento justo. Prototipo gratis.`
- **H1:** `Que cada cliente que sale encantado deje su reseña en Google`
- **Estructura:** el momento justo (al verse el resultado) → el objeto en el mostrador/sillón → funciona con NFC y QR (clientes sin NFC) → cómo queda en tu local → FAQ (clientes mayores, cómo se instala, aguanta humedad y productos) → modelos (solo los realmente disponibles) → CTA.
- **Schema/enlaces:** igual que 4.2 con guía `/guias/resenas-google-peluqueria-barberia`.

### 4.4 `/restaurantes-y-cafeterias`
- **Title:** `Reseñas de Google para restaurantes y cafeterías | StandUrl`
- **Meta:** `Un objeto con NFC y QR en la mesa o la barra para conseguir reseñas en Google sin que el personal tenga que pedirlas. Sin permanencia.`
- **H1:** `Reseñas en Google sin que tu equipo tenga que pedirlas`
- **Estructura:** problema (rotación de personal, nadie lo pide) → mesa y barra → resistencia (verificar con el material real antes de afirmar) → pack Business (4 puntos) → destino editable (si cambia la ficha) → FAQ → CTA.
- **Enlaces:** guía `/guias/resenas-google-restaurante-cafeteria`, precios, prototipo.

### 4.5 `/precios`
- **Title:** `Precios: soporte NFC y QR para reseñas de Google | StandUrl`
- **Meta:** `Starter 29,90 €, Pro 49,90 €, Business 79,90 €. Pago único, sin permanencia. Panel opcional por 4,90 €/mes. Pide tu prototipo gratis.`
- **H1:** `Precios claros: pagas el objeto una vez`
- **Estructura:** tabla de 3 packs (1/2/4 dispositivos) · qué incluye cada uno · panel opcional 4,90 €/mes (qué se pierde si no se paga: nada del redirect) · envío (**dato pendiente**: coste y plazo) · comparación con tarjetas de ~1 € (honesta: qué pagas de más y por qué) · FAQ de compra · CTA prototipo.
- **Keywords:** comprar soporte nfc reseñas google, precio, "comprar tarjeta nfc" como variante secundaria.
- **Schema:** `Product` + `Offer` (3 ofertas con `price`, `priceCurrency: EUR`), `FAQPage`.

### 4.6 `/prototipo-gratis`
- **Title:** `Prototipo gratis 30 días del soporte NFC para reseñas | StandUrl`
- **Meta:** `Prueba un objeto real con NFC y QR en tu negocio durante 30 días. Sin compromiso ni permanencia. Pide tu prototipo gratis.`
- **H1:** `Pide tu prototipo gratis`
- **Estructura:** qué recibes · cómo funciona la prueba (30 días) · qué te pedimos (tu enlace de reseñas y tu dirección de envío) · qué pasa al terminar · formulario corto · FAQ · enlaces de confianza (sobre nosotros, normas).
- **Schema:** `Offer`/`Service`. **Nota:** el formulario ya existe (`actions.ts`); revisar RGPD.

### 4.7 `/objeto-personalizado`
- **Title:** `NFC personalizado con tu logo para reseñas de Google | StandUrl`
- **Meta:** `Objeto impreso en 3D con tu logo y colores, con NFC y QR para reseñas de Google. Diseñado en Albacete. Consulta sin compromiso.`
- **H1:** `Un objeto con tu marca, no una tarjeta genérica`
- **Keywords:** tarjetas nfc personalizadas (principal); tarjeta personal nfc.
- **Estructura:** qué se puede personalizar (logo, colores, forma, **dentro de lo que la impresora y los modelos permiten: pendiente de fijar límites**) · proceso (briefing → modelo → prueba → envío) · plazos (**pendiente**) · precio/forma de presupuesto (**pendiente**) · galería (cuando existan piezas reales) · FAQ · CTA "Pide tu prototipo gratis" o "Cuéntanos tu idea".
- **Schema:** `Service`, `FAQPage`.

### 4.8 `/panel-estadisticas-nfc`
- **Title:** `Cambia el enlace de tu NFC y mide escaneos | StandUrl`
- **Meta:** `Cambia el destino de tu objeto NFC o QR sin reprogramar el chip y consulta cuántas veces se usa. Panel por 4,90 €/mes, sin permanencia.`
- **H1:** `Cambia el destino cuando quieras, sin tocar el objeto`
- **Estructura:** problema (la ficha cambia, el chip no se reprograma) → solución (el chip apunta a una URL fija y el destino se cambia en el panel) → qué incluye (cambio de destino, estadísticas, historial, varios dispositivos) → 4,90 €/mes y sin permanencia → qué NO incluye (no anunciar IA, CRM, campañas ni API) → capturas del panel → FAQ → CTA.
- **Keywords de apoyo:** tarjeta nfc programable (se trata mejor en la guía). **No** se promete lo que el MVP no tiene.
- **Schema:** `Product`/`Offer` (4,90 €/mes), `FAQPage`.

### 4.9 FAQ que se reutilizan (home, precios, sectores, `/preguntas-frecuentes`)
1. ¿Funciona con todos los móviles? (NFC en Android e iPhone recientes; el QR cubre el resto.) *Verificar la compatibilidad con iPhone antes de afirmarla.*
2. ¿Qué pasa si dejo de pagar el panel? (El objeto sigue funcionando; la URL queda congelada.)
3. ¿Puedo cambiar el enlace? (Con el panel.)
4. ¿Esto es "review gating"? (No: un único destino, sin filtros, sin incentivos.)
5. ¿Qué diferencia hay con una tarjeta o pegatina NFC? (Diseño, visibilidad, panel, sin reprogramar.)
6. ¿Cuánto tarda el envío y qué cuesta? (**Dato pendiente.**)
7. ¿Cómo consigo el enlace de reseñas de mi negocio? (Enlace a la guía.)
8. ¿Qué incluye la prueba gratuita? (30 días, objeto real.)

### 4.10 Páginas de apoyo
- **`/como-funciona`**: diagrama NFC/QR → `/t/{token}` → 302; "tu cliente no instala nada". No optimizada para keywords transaccionales.
- **`/sobre-standurl`**: quién hay detrás, Albacete, impresión 3D propia, cómo se fabrica (fotos reales del taller cuando existan), principios (sin permanencia, sin filtros). Es la página de **confianza** que sustituye a los testimonios hasta que existan.
- **`/contacto`**: formulario, correo, horario. `ContactPage` schema.
- **`/preguntas-frecuentes`**: todas las FAQ agrupadas; `FAQPage`.

---

## 5. Guías (contenido informativo y de apoyo)

> Estas guías **no se justifican por volumen** (casi todas son "sin datos" en Planificador). Existen para (a) captar las pocas búsquedas medidas, (b) resolver objeciones antes de comprar, (c) dar autoridad y enlaces internos. **Prioridad = P1 primero.** No se escribirán más de 3 a la vez.

| P | Guía | Intención | Keywords | Esquema (H2) |
|---|---|---|---|---|
| P1 | `/guias/tarjeta-nfc-resenas-google` | Comparar | tarjeta nfc reseñas google, tarjeta nfc google reseñas | Qué es y cómo funciona · tarjeta vs pegatina vs objeto · cuándo basta una tarjeta de PVC y cuándo no · cómo configurarla para reseñas · errores habituales · alternativa: objeto StandUrl · FAQ |
| P1 | `/guias/normas-de-google-sobre-resenas` | Confianza | normas reseñas google, review gating (término en explicación) | Qué permite y qué prohíbe Google · incentivos · filtrar clientes (gating) · cómo pedir reseñas correctamente · cómo lo hace StandUrl · fuentes oficiales. *Citar la política oficial de Google al redactar* |
| P1 | `/guias/qr-vs-nfc-resenas-google` | Comparar | qr reseñas google, reseñas google nfc | Cómo funciona cada uno · compatibilidad · coste · qué usa tu cliente · por qué StandUrl incluye ambos · FAQ |
| P2 | `/guias/mi-movil-tiene-nfc` | Objeción | nfc en android, nfc en huawei | Cómo saber si tienes NFC · cómo activarlo (Android/iPhone) · qué hacer si no tiene (QR) · FAQ |
| P2 | `/guias/tarjeta-nfc-programable-vs-enlace-editable` | Diferenciar | tarjeta nfc programable | Qué significa programar un chip · el problema de reprogramar · enlace fijo + destino editable · cuándo programar tú mismo · FAQ |
| P2 | `/guias/como-pedir-resenas-a-clientes` | Problema | aumentar reseñas google, como pedir reseñas a clientes | Por qué incomoda · momento adecuado · qué decir (frases) · qué no hacer · el objeto como solución · FAQ |
| P2 | `/guias/enlace-de-resenas-de-google` | Práctica | enlace reseñas google, link reseña google | Cómo conseguirlo paso a paso (ficha de empresa) · errores · dónde ponerlo · cómo usarlo con StandUrl. *Verificar los pasos actuales de Google* |
| P3 | `/guias/resenas-google-gimnasio` | Sector | reseñas google gimnasio | Por qué pesan en un gimnasio · cuándo pedir · ejemplos de recepción · enlace a landing |
| P3 | `/guias/resenas-google-peluqueria-barberia` | Sector | reseñas google peluquería | Idem con el contexto de sillón y agenda |
| P3 | `/guias/resenas-google-restaurante-cafeteria` | Sector | reseñas google restaurante | Idem con mesa, barra y rotación |
| P3 | `/guias/responder-resenas-negativas` | Miedo | responder reseñas negativas google | Cómo responder · plantillas · qué evitar · cuándo reportar |
| — | `/guias` | Índice | — | Listado agrupado por tema |

Reglas de las guías: autor y fecha visibles, `Article` + `BreadcrumbList`, mínimo 2 enlaces internos de venta, **sin cifras sin fuente** y sin consejos que incentiven reseñas.

---

## 6. Enlazado interno

| Desde | Hacia | Anchor sugerido |
|---|---|---|
| Home | 3 sectores, precios, prototipo, panel, personalizado, guía tarjeta, guía normas | Nombre claro (p. ej. "para gimnasios") |
| Cada sector | Home (migas), precios, prototipo, su guía de sector | "Pide tu prototipo gratis" (siempre igual) |
| Guía tarjeta | Home, precios, prototipo, `/objeto-personalizado` | "soporte NFC para reseñas", "objeto personalizado" |
| Guía QR vs NFC | Home, guía tarjeta | idem |
| Guías de problema | Home y landing de sector correspondiente | idem |
| Panel | Precios, guía programable | idem |
| Todas | `/prototipo-gratis` | "Pide tu prototipo gratis" |

Regla: ningún enlace con anchor "haz clic aquí". La home no enlaza a `/t/`.

---

## 7. SEO técnico

- **Dominio** `standurl.com` (pendiente). Alinear `NEXT_PUBLIC_SITE_URL`, canonical, `sitemap.ts`, `robots.ts`, Open Graph. Redirección 301 de www a no-www (o al revés) y HTTPS forzado.
- **`sitemap.ts`** debe reflejar exactamente la sección 3; con `lastModified` real, no `new Date()` en cada petición.
- **`robots.ts`**: mantener `/t/` bloqueado; añadir `/dashboard`, `/login`.
- **Metadatos**: `title` y `description` únicos por página (sección 4), `alternates.canonical`, `openGraph` con imagen del objeto, `twitter`.
- **Schema**: `Organization` y `WebSite` en layout; `Product`/`Offer` en precios, home y servicios; `FAQPage` donde haya FAQ real; `Article` en guías; `BreadcrumbList` en todo lo que no sea home.
- **Rendimiento**: imágenes optimizadas (`next/image`), LCP en móvil bajo 2,5 s, fuentes con `display: swap`. Medir con PageSpeed Insights.
- **Accesibilidad y semántica**: un solo H1, jerarquía H2/H3 limpia, `alt` descriptivos.
- **Analítica**: Search Console (verificar dominio) y una analítica respetuosa con RGPD; evento de conversión "envío del formulario de prototipo".
- **Ficha de Google propia**: crear una ficha de empresa como *negocio sin local* (área de servicio: toda España) cuando exista el dominio. Es la primera ficha donde conseguir reseñas reales.

---

## 8. Medición y hoja de ruta (90 días)

**KPIs:** solicitudes de prototipo (principal) · clics e impresiones en Search Console por URL · posición de `tarjeta nfc reseñas google`, `qr reseñas google`, `reseñas google nfc` · conversión landing → formulario.

| Semana | Entrega |
|---|---|
| 1 | Comprar dominio · configurar canonical/sitemap/robots · Search Console · reescribir metadatos de la home (4.1) |
| 2 | Redacción final de home y `/precios` · schema |
| 3 | `/gimnasios` y `/prototipo-gratis` · primeras 3 guías P1 |
| 4 | `/peluquerias-y-barberias`, `/restaurantes-y-cafeterias`, `/sobre-standurl`, `/contacto` |
| 5–6 | `/objeto-personalizado`, `/panel-estadisticas-nfc`, FAQ |
| 7–10 | Guías P2 · primeros clientes del prototipo → pedir permiso para testimonios reales |
| 11–13 | Guías P3 · revisar Search Console y ajustar títulos/contenido según datos reales |
| Paralelo | Venta directa en Albacete · test de Google Ads (30–50 €) sobre "tarjeta nfc reseñas google" para validar demanda real |

---

## 9. Pendientes y riesgos

**Datos que faltan para redactar sin inventar:**
1. Coste y plazo de **envío**; zona de entrega.
2. **Límites de personalización** (logo, colores, formas, plazos, precio).
3. Modelos 3D disponibles más allá de la pesa (el plan sugiere kettlebell, disco, tijeras/peine y taza/plato; ver `01`).
4. **Compatibilidad real** (iPhone y Android: probar con el chip NTAG213/215 que se usa).
5. Resistencia del material (PLA) a humedad y uso en mesa/barra.
6. Fotos y vídeo reales del objeto en uso.
7. Cuál de las afirmaciones ("menos de 2 segundos") se puede **demostrar** en un vídeo.

**Riesgos:**
- Demanda orgánica pequeña: sin venta directa el SEO tardará en dar clientes.
- Búsqueda "tarjeta nfc": intención de comprar tarjetas baratas; si la guía no convence, rebotará.
- Marca nueva sin reseñas ni enlaces: priorizar la primera ficha de Google y el prototipo gratis.
- Cumplimiento de la política de reseñas de Google: revisar cada texto antes de publicar.
