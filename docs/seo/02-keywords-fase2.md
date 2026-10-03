# StandUrl — Fase 2: análisis de keywords (primer export)

> Fuente: `Keyword_Stats_2026-10-03` (Google Keyword Planner, España, español; 1 sep 2025 – 31 ago 2026).
> **Limitación importante:** este export contiene solo las 12 keywords que se introdujeron como semillas (volumen de cada una). No incluye "ideas de palabras clave" relacionadas, así que este análisis es **parcial**. Ver sección 6.

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
