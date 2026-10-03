# StandUrl — Fase 2: análisis de keywords (primer export)

> Fuente: `Keyword_Stats_2026-10-03` (Google Keyword Planner, España, español; 1 sep 2025 – 31 ago 2026).
> **Limitación importante:** Google devolvió muy pocas ideas relacionadas (las variantes de "qr reseñas google"); la mayoría de las semillas no tienen volumen. El análisis es **parcial**. Ver secciones 6 y 8 (el segundo export de la misma fecha corrige parte de las conclusiones).

## 1. Datos en bruto

| Keyword | Búsquedas/mes (media) | Tendencia 3 meses | Interanual | Puja pág. 1 (baja–alta) |
|---|---|---|---|---|
| qr reseñas google | 260 | 0 % | 0 % | 0,61–1,88 € |
| qr para reseñas de google | 110 | 0 % | 0 % | 0,63–1,89 € |
| reseñas google nfc | 50 | +89 % | +750 % | 0,27–0,96 € |
| código qr reseñas google | 40 | −25 % | −25 % | 0,47–1,16 € |
| código qr para reseñas google | 30 | −75 % | −50 % | 0,62–1,68 € |
| generar codigo qr para reseñas google | 20 | −67 % | −50 % | 0,57–1,54 € |
| crear qr reseñas google | 20 | −50 % | −50 % | 0,73–1,83 € |
| soporte nfc reseñas | sin datos | | | |
| placa nfc negocio | sin datos | | | |
| nfc reseñas gimnasio | sin datos | | | |
| nfc reseñas peluquería | sin datos | | | |
| nfc reseñas restaurante | sin datos | | | |

"Sin datos" = Google no devuelve volumen (volumen muy bajo, normalmente < 10/mes). Las columnas de posición orgánica están vacías: no hay datos propios de Search Console.

Evolución mensual de las dos keywords con más señal:
- `qr reseñas google`: 390 (sep 25) → 260 → 260 → 210 → 210 → **320 (feb 26)** → 260 → 260 → 260 → 210 → 210 → 210. Estable, con pico en febrero y valle en diciembre/enero y verano.
- `reseñas google nfc`: 30 → 40 → 20 → 30 → 20 → 30 → 20 → 20 → 40 → **90 (jun)** → 50 → **170 (ago)**. Pequeña pero **creciendo**.

## 2. Limpieza

Se eliminan por intención no transaccional (el usuario quiere una herramienta gratuita, no comprar un objeto):
- `generar codigo qr para reseñas google` (20)
- `crear qr reseñas google` (20)

StandUrl no ofrece generador de QR y `.agents/context.md` prohíbe features fuera del MVP, así que esta intención no se ataca. Los dos tienen además tendencia a la baja.

**Aviso de intención:** ninguna de las keywords restantes contiene una palabra claramente de compra (*comprar, precio, soporte, placa, tarjeta, pack*). `qr reseñas google` y sus variantes mezclan dos tipos de búsqueda: quien quiere fabricarse un QR gratis y quien busca una solución completa. Es intención **comercial/mixta, no transaccional pura**. Hay que asumir que parte de ese tráfico no comprará.

Quedan 5 keywords con volumen (**490 búsquedas/mes** en total).

## 3. Agrupación por intención real

| Cluster | Keyword principal | Keywords del cluster | Búsquedas/mes |
|---|---|---|---|
| **A. QR de reseñas de Google** | qr reseñas google | qr reseñas google (260), qr para reseñas de google (110), código qr reseñas google (40), código qr para reseñas google (30) | 440 |
| **B. NFC para reseñas de Google** | reseñas google nfc | reseñas google nfc (50) | 50 |
| **C. Soporte/objeto NFC y sector** | soporte nfc reseñas | soporte nfc reseñas, placa nfc negocio, nfc reseñas gimnasio, nfc reseñas peluquería, nfc reseñas restaurante | sin datos |
| *(descartado)* D. Generador QR gratis | generar código qr… | generar codigo qr para reseñas google, crear qr reseñas google | 40 |

Dentro del cluster A, las cuatro variantes son la misma intención (cambian "código" y "para/de"), así que no se tratan como variantes distintas.

## 4. Asignación a páginas (arquitectura de `01-…md`)

| Página | Keywords asignadas | Comentario |
|---|---|---|
| `/` (home) | **qr reseñas google** (principal), qr para reseñas de google, código qr reseñas google, código qr para reseñas google, **reseñas google nfc** | Una sola página para la intención QR+NFC. El producto lleva ambas tecnologías, no tiene sentido separarlas en dos URL |
| `/gimnasios` | sin keyword con datos | Ver aviso en sección 5 |
| `/peluquerias-y-barberias` | sin keyword con datos | Ídem |
| `/restaurantes-y-cafeterias` | sin keyword con datos | Ídem |
| `/precios`, `/prototipo-gratis`, `/panel-estadisticas-nfc`, `/objeto-personalizado` | ninguna probada todavía | Se necesita probar términos de compra/precio/personalización |

## 5. Variantes con diferencia semántica real

Solo hay **dos ejes** con diferencia real en los datos:

1. **Tecnología**: *QR* (440/mes) frente a *NFC* (50/mes, creciendo +750 % interanual). No son sinónimos: el QR lo busca mucha más gente hoy; el NFC es un nicho pequeño en crecimiento.
2. **Querer fabricar vs querer solución hecha**: *generar/crear* (40/mes, descartado) frente a *qr reseñas google* sin verbo (440/mes).

No hay ninguna variante por sector, por producto (soporte, placa, tarjeta, pegatina) ni por acción de compra en este export: **no puedo listar más variantes sin inventarlas**.

## 6. Conclusiones y lo que implican

1. **El mercado de búsqueda es pequeño**: unas 490 búsquedas/mes con las keywords con datos. Aunque se llegara a las primeras posiciones, serían del orden de unas decenas o pocos cientos de visitas al mes (estimación, no dato). **El SEO no puede ser el único canal para llegar a 100 clientes**; la venta directa a gimnasios y peluquerías (empezando por Albacete, con entrega en mano) será más rápida. El SEO es una inversión a medio plazo.
2. **Sin demanda medible en las keywords por sector** (`nfc reseñas gimnasio/peluquería/restaurante`). Eso no prueba que no exista demanda, pero no se puede justificar una página por esas keywords. Las páginas de nicho siguen teniendo sentido por la **conversión** (copy específico para cada sector) y por la **venta directa**, pero no por volumen NFC. Hay que probar la versión con "QR" y con "reseñas google gimnasio", etc.
3. **El término NFC está creciendo** (30 → 170/mes en 11 meses, volumen pequeño). Conviene posicionarse pronto ahí, cuando todavía hay poca competencia, aunque la de anuncios figure como "alta" en el planificador.
4. **CPC bajo** (0,27–1,89 €): si más adelante se hace publicidad de pago, el coste por clic no es prohibitivo.
5. La **Home debe incorporar "QR" y "NFC" con la misma importancia**, no solo NFC como estaba la `<meta keywords>` actual.

## 7. Siguiente export recomendado (Keyword Planner → "Descubrir nuevas palabras clave")

Pega estas semillas **en la caja de ideas** (no en "Obtener volumen"), España, español, y exporta las ideas:

- **Producto**: `tarjeta nfc reseñas google`, `placa nfc reseñas google`, `soporte qr reseñas google`, `expositor qr reseñas google`, `pegatina nfc reseñas google`, `llavero nfc reseñas`, `placa qr reseñas google`, `soporte qr mesa restaurante`, `tarjeta nfc negocio`
- **Compra**: `comprar soporte nfc reseñas google`, `precio tarjeta nfc reseñas`, `comprar qr reseñas google`
- **Sector**: `qr reseñas google gimnasio`, `qr reseñas google peluquería`, `qr reseñas google barbería`, `qr reseñas google restaurante`, `reseñas google gimnasio`, `reseñas google peluquería`, `reseñas google restaurante`
- **Problema** (servirá para contenido informativo posterior): `cómo conseguir reseñas en google`, `cómo pedir reseñas en google`, `aumentar reseñas google negocio`, `enlace directo reseña google`, `conseguir reseñas google gimnasio`

## 8. Actualización: segundo export (`Keyword_Stats_…03_15_03`)

El primer archivo de la tanda era idéntico al anterior. El segundo añade **un dato nuevo y muy relevante**:

| Keyword | Media/mes | 3 meses | Interanual | Puja pág. 1 | Evolución mensual (sep 25 → ago 26) |
|---|---|---|---|---|---|
| **tarjeta nfc reseñas google** | **260** | **+2.011 %** | **+6.233 %** | **0,04–0,13 €** | 140, 70, 30, 40, 70, 30, 70, 70, 40, 90, 260, **1.900** |

Sin datos (volumen insignificante o nulo): `soporte qr reseñas google`, `placa nfc negocio`, `reseñas google gimnasio`, `reseñas google peluquería`, `reseñas google restaurante`, `conseguir reseñas google negocio`.

Cómo cambia el análisis:

1. **El NFC es ahora el motor de crecimiento, no el QR.** En agosto de 2026: *tarjeta nfc reseñas google* 1.900 + *reseñas google nfc* 170 = ~2.070 búsquedas/mes, frente a ~210 de `qr reseñas google`, que es estable. Esto **corrige** la conclusión anterior de que el QR era la demanda principal.
2. **La media de 260 engaña**: la media anual esconde el salto de julio–agosto. Hay que comprobar en Google Trends (gratis, España, 12 meses) si es una tendencia sostenida o un pico puntual antes de apostar todo a ella.
3. **Puja de 0,04–0,13 €**: casi nadie anuncia esta keyword, por lo que la competencia comercial es baja pese a la etiqueta "Alta" del planificador. Es una oportunidad orgánica.
4. **Desajuste de intención a gestionar**: quien busca "tarjeta" quiere una tarjeta de PVC barata. StandUrl vende un objeto de diseño. La home debe captar esta búsqueda con una sección clara que explique "no es una tarjeta, es un objeto que queda en el mostrador" y por qué.

Clusters actualizados:

| Cluster | Keyword principal | Keywords | Búsquedas/mes (media) |
|---|---|---|---|
| A. QR de reseñas | qr reseñas google | qr reseñas google 260, qr para reseñas de google 110, código qr reseñas google 40, código qr para reseñas google 30 | 440 |
| **B1. Tarjeta NFC de reseñas** | **tarjeta nfc reseñas google** | tarjeta nfc reseñas google 260 | **260 (ago: 1.900)** |
| B2. NFC de reseñas (genérico) | reseñas google nfc | reseñas google nfc 50 | 50 (ago: 170) |
| C. Soporte/placa/sector | — | sin datos | — |
| D. Generador QR gratis (descartado) | — | generar…, crear… | 40 |

Asignación: la **home** recibe A, B1 y B2. B1 y B2 son búsquedas distintas (producto-formato frente a tecnología), pero una sola página las cubre sin canibalizarse porque el producto es el mismo. No se crea página separada para "tarjeta" porque StandUrl no vende tarjetas.

Variantes con diferencia semántica real (ahora tres ejes): tecnología (QR frente a NFC), formato de producto (tarjeta frente a genérico) y fabricar frente a comprar hecho.

Pendiente: la tanda de semillas "problema" (`cómo conseguir reseñas en google`, `pedir reseñas google clientes`, `aumentar reseñas google`) no está en los exports. Es donde estará el volumen informativo y el mejor material para contenido de apoyo.

## 9. Tercer export (`Keyword_Stats_…03_15_17`): semillas "problema"

| Keyword | Media/mes | 3 meses | Interanual | Competencia | Puja pág. 1 |
|---|---|---|---|---|---|
| aumentar reseñas google | 20 | −50 % | 0 % | Media | 0,76–4,68 € |
| cómo conseguir reseñas en google | sin datos | | | | |
| pedir reseñas google clientes | sin datos | | | | |
| conseguir reseñas google negocio | sin datos | | | | |

Conclusión: la demanda informativa medible en Keyword Planner es prácticamente nula (20 búsquedas/mes). No justifica ahora una estrategia de contenidos de blog. Si más adelante se quiere probar, hay que hacerlo con otras fuentes (autocompletado de Google, "Otras preguntas de los usuarios", Google Trends y Search Console cuando la web esté indexada).

## 10. Cierre de la fase 2: mapa final keyword → página (datos disponibles)

| Página | Keyword principal | Secundarias con datos | Evidencia |
|---|---|---|---|
| `/` | tarjeta nfc reseñas google | reseñas google nfc; qr reseñas google; qr para reseñas de google; código qr reseñas google; código qr para reseñas google | 260 media (1.900 en ago) + 50 (170 en ago) + 440 |
| `/gimnasios`, `/peluquerias-y-barberias`, `/restaurantes-y-cafeterias` | ninguna con volumen en Keyword Planner | usar el sector de forma natural en el texto | Sin datos: se justifican por conversión y venta directa |
| `/precios`, `/prototipo-gratis`, `/panel-estadisticas-nfc`, `/objeto-personalizado` | ninguna con volumen | — | Sin datos |

Descartadas: `generar codigo qr para reseñas google`, `crear qr reseñas google` (herramienta gratuita, no se ofrece).

Siguientes pasos recomendados:
1. Mirar Google Trends ("tarjeta nfc reseñas google", España, 12 meses) para saber si el pico de agosto se sostiene.
2. Probar semillas más amplias que Google sí conoce: `reseñas google`, `tarjeta nfc`, `tarjeta nfc negocio`, `reseñas en google maps`, también sin tildes.
3. Valorar una campaña de Google Ads pequeña sobre "tarjeta nfc reseñas google" (puja 0,04–0,13 €) como forma barata de validar demanda y conversión antes de invertir en contenido.
