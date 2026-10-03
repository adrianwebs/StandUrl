# StandUrl — Estudio de mercado, buyer personas y arquitectura web (fase 1)

> Documento de trabajo SEO. Fecha: octubre 2026.
> Base: `.agents/context.md`, `.agents/architecture.md`, el código de `apps/web` y búsquedas web públicas.
> **Lo que NO hay aquí:** volúmenes de búsqueda ni dificultad de keywords. Esos datos vendrán de los CSV de Google Keyword Planner (fase 2). Las frases de búsqueda de los buyer personas son **hipótesis** a validar con esos CSV.

---

## 0. Contexto de negocio (lo que da por bueno el resto del documento)

| Tema | Dato (fuente: `.agents/context.md`) |
|---|---|
| Qué es | Objeto físico impreso en 3D (pesa, tijeras, taza…) con chip NFC + QR que lleva siempre a `/t/{TOKEN}` → 302 → destino configurable (normalmente la ficha de Google para reseñas) |
| Promesa | "Tu cliente acerca el móvil → está en Google Reviews en menos de 2 segundos" |
| Producto (pago único) | Starter 29,90 € (1 ud) · Pro 49,90 € (2 uds) · Business 79,90 € (4 uds) |
| Recurrente (opcional) | 4,90 €/mes: cambiar destino, estadísticas, historial, varios dispositivos. Sin suscripción el redirect sigue funcionando (URL congelada) |
| Nichos, por prioridad | 1) Gimnasios 2) Peluquerías y barberías 3) Restaurantes y cafeterías |
| CTA principal | "Pide tu prototipo gratis" (30 días de prueba) |
| Diferenciador declarado | El objeto parece un producto de marca, no una tarjeta NFC genérica |
| Restricciones no negociables | Sin *review gating* · tokens aleatorios · redirect sin bloqueo · sin permanencia |
| Objetivo a 6 meses | 100 clientes activos → ~500 €/mes MRR |
| Ámbito geográfico | Online, venta en España. **Supuesto:** no hay base local a posicionar. Confirmar si se quieren páginas locales |

**Incoherencias detectadas en el repo (conviene corregirlas antes de indexar):**
- Dominio: `sitemap.ts`/`robots.ts` usan por defecto `standurl.webadir.es`, pero la documentación habla de `standurl.com`. Elegir un único dominio canónico.
- `.agents/architecture.md` dice Next.js 15 + PostgreSQL; README dice Next.js 16 + SQL Server.
- `app/sitemap.ts` ya lista 10 URLs, pero el sitemap es estático: hay que mantenerlo alineado con la arquitectura de la sección 7.

---

## 1. Análisis de mercado

### 1.1 Por qué existe la necesidad (demanda del cliente final)

- En España, alrededor del **89 % de la gente lee reseñas online antes de comprar** (por encima del 74 % de media mundial) y **Google es el canal preferido (~90 %)** para consultarlas. Una valoración baja (por debajo de 3,5/5) es decisiva para ~75 % según otro estudio. Para un ~52 % las reseñas pesan más que la marca y la proximidad.
  Fuentes: [Puro Marketing](https://www.puromarketing.com/88/215176/resenas-principal-motor-decisiones-compra), [ESdiario](https://www.esdiario.com/economia/250310/154547/90-ciento-espanoles-leen-resenas-online-comprar.html), [SoftwareDoIt](https://www.softwaredoit.es/actualidad/el-73-de-los-consumidores-tienen-en-cuenta-las-resenas-y-valoraciones-online.html).
- Conclusión: para un negocio local, la ficha de Google es su escaparate. Pedir reseñas incomoda y el flujo "te mando un enlace por WhatsApp" convierte poco. Ese es el hueco que ataca StandUrl.

### 1.2 Tamaño del mercado direccionable (España)

| Segmento | Cifra | Fuente |
|---|---|---|
| Gimnasios | ~4.600 centros (sep. 2025), >6,5 M de abonados, ~1.650 M € de facturación | [ASEST](https://asest.es/story/el-negocio-de-los-gimnasios/) |
| Peluquerías y barberías | 33.882 empresas (2024) | [eInforma CNAE 9621](https://www.einforma.com/informes-sectoriales/cnae-9621-empresas-peluquerias-y-barberias) |
| Restauración | ~83.879 restaurantes y ~184.430 bares | [Qamarero](https://qamarero.com/blog/cuantos-bares-hay-en-espana-cifras/), [Vinetur](https://www.vinetur.com/2025053088176/andalucia-arrasa-con-el-mayor-numero-de-bares-y-restaurantes-del-pais-superando-los-49000-establecimientos.html) |

Lectura estratégica:
- **Gimnasios** es el mercado más pequeño (4.600) pero el más manejable: pocos, con ficha de Google muy decisiva, y con encaje de producto (la pesa). Encaja con el orden de prioridad ya definido. Objetivo de 100 clientes = ~2 % del sector.
- **Peluquerías/barberías** (~34.000) es el mejor equilibrio tamaño/accesibilidad después del gimnasio.
- **Restauración** es enorme pero muy competida y con mucho ruido (cartas QR, TheFork, etc.), tal como ya anticipa el contexto del proyecto.
- Con solo 100 clientes de objetivo, **no se necesita un gran volumen de búsquedas**: hacen falta pocas búsquedas muy cualificadas. Esto condiciona toda la estrategia SEO (sección 6).

### 1.3 Competencia (qué he podido verificar)

| Competidor | Qué ofrece | Qué sé / qué no |
|---|---|---|
| **Genéricos de Alibaba/AliExpress** | Tarjetas, llaveros y placas NFC "reseñas Google", ~0,06–2,47 € la unidad, pedidos mínimos de 10–500 uds | Precio muy bajo, sin servicio, sin panel. Sirven de **ancla de precio** que StandUrl debe justificar |
| **TAPro Card** (EE. UU.) | +50 productos: tarjetas, soportes, placas, pegatinas; envío EE. UU., garantía 30 días | Referente internacional del formato "soporte". Precios y panel no verificados |
| **RevuLink**, **TapFive**, **GrowthTap** | Soportes NFC para reseñas | Reseñas de usuarios positivas en RevuLink. Precios no verificados |
| **just5stars** (Valencia) | Productos NFC para reseñas en España | Competidor local directo en español. Condiciones no verificadas |
| **Local Guide Program** (Baleares) | Tarjetas NFC de reseñas, envío gratis desde 3 uds | Competidor local directo. Condiciones no verificadas |
| **EmbedSocial** y blogs SaaS | Contenido educativo en español sobre "conseguir reseñas con tarjeta NFC" | Dominan el SEO **informativo**, no el transaccional con producto físico de diseño |

Fuentes: [EmbedSocial](https://embedsocial.com/es/blog/get-google-reviews-with-nfc-card/), [Alibaba](https://spanish.alibaba.com/f/google.html), [Trustpilot just5stars](https://ie.trustpilot.com/review/just5stars.com), [Trustpilot TAPro](https://es.trustpilot.com/review/taprocard.com), [Trustpilot RevuLink](https://www.trustpilot.com/review/revulink.net).

**Pendiente de verificar (no lo he podido confirmar con las búsquedas):** precios reales de just5stars y Local Guide Program, si ofrecen panel/analítica, y qué competidores españoles aparecen en las primeras posiciones para "tarjeta nfc reseñas google". Hacerlo a mano en Google (modo incógnito, España) es el primer paso de la fase 2.

### 1.4 Posicionamiento y huecos

Casi todos compiten en **"tarjeta/placa NFC genérica y barata"**. Hueco real de StandUrl:

1. **Objeto con identidad de sector** (pesa en el gimnasio, tijeras en la barbería, taza en la cafetería) en lugar de una tarjeta de PVC. Nadie parece atacar la intención "algo que quede bien en mi mostrador".
2. **Destino editable sin reprogramar el chip** y **sin permanencia** (el objeto sigue funcionando si dejas de pagar). Es un argumento de confianza muy potente frente a los SaaS con cuota obligatoria.
3. **Sin *review gating***: cumple la política de Google, que prohíbe filtrar a quién se pide reseña y ofrecer incentivos a cambio; infringirla puede acabar en suspensión de la ficha. Es un argumento de seguridad para el dueño que no sabe que otros métodos son arriesgados. Fuente: [Seologist](https://seologist.com/knowledge-sharing/what-is-review-gating-and-why-does-it-violate-googles-review-policies/).
4. **Prueba gratis de 30 días** con un objeto físico real: reduce el riesgo percibido.

### 1.5 Debilidades que hay que gestionar

- Marca nueva: **sin reseñas propias ni backlinks**. La primera tarea de autoridad es conseguir reseñas reales de los 3 primeros clientes y publicarlas (con su permiso) en la web. Es irónico y a la vez la mejor prueba social posible.
- Precio de entrada (29,90 €) frente a tarjetas de ~1 €: hay que vender **diseño + panel + sin permanencia**, no "una tarjeta NFC".
- **Capacidad productiva** (impresión 3D) y modelos disponibles: en el repo solo existe `Modelos/Genericos/Pesa`. No prometer en la web modelos que no existen todavía.
- Afirmaciones: "menos de 2 segundos" y cualquier cifra de aumento de reseñas (p. ej. "x3") **solo se publican si se pueden demostrar**. No copiar cifras de competidores.
- Restricciones del MVP: no anunciar en la web app móvil, IA, CRM, campañas, heatmaps ni API pública (`.agents/context.md`).

### 1.6 Riesgos legales y de política (afectan al contenido)

- No sugerir descuentos, regalos ni sorteos a cambio de reseñas.
- No presentar el producto como forma de "filtrar" reseñas malas.
- Cumplir RGPD/cookies para la analítica de interacciones (ya hay `legal/*`).

---

## 2. Buyer personas

> Frases de Google = hipótesis redactadas con el vocabulario real del dueño de negocio. A contrastar con Keyword Planner.

### PERFIL A — El dueño del gimnasio independiente (principal)

**Quién es**
Dueño/a o gerente de un gimnasio o box de entre 150 y 800 socios, 35–50 años, normalmente con 2–6 empleados. Compite con cadenas low-cost que tienen mucho presupuesto de marketing. Se mueve entre recepción, sala y WhatsApp; no tiene tiempo para "estrategias de marketing". Su necesidad aparece cuando busca el gimnasio en Google y ve que la cadena de al lado tiene 900 reseñas y él 47, o tras una mala reseña injusta que se queda arriba.

**Qué quiere conseguir**
No "más reseñas": quiere que **quien busque "gimnasio cerca de mí" lo elija a él**. Que la ficha transmita que es un sitio serio y con socios contentos, sin tener que pedir a nadie nada de forma incómoda. Y que el sistema funcione solo, sin añadir tareas al personal.

**Qué le frena o le preocupa**
- "Si pido reseñas, parece que voy desesperado."
- Ya probó pegatinas con QR en recepción y nadie las usa.
- Miedo a pagar una cuota mensual que luego no puede cancelar.
- Miedo a que le "bloqueen" la ficha de Google por hacerlo mal.
- No cree que un objeto de 30 € le cambie nada; teme que sea otra tarjeta de plástico más.

**Cómo busca en Google (hipótesis)**
1. cómo conseguir más reseñas en google para mi gimnasio
2. cómo pedir reseñas a los socios del gimnasio sin que quede mal
3. tarjeta nfc reseñas google gimnasio
4. soporte qr reseñas google para gimnasio
5. placa nfc para recepción gimnasio reseñas
6. mi gimnasio tiene pocas reseñas en google
7. cómo subir la puntuación de mi gimnasio en google maps
8. qr reseñas google gimnasio personalizado
9. objeto nfc reseñas google original para negocio
10. cuánto cuesta un soporte nfc reseñas google
11. reseñas google gimnasio sin suscripción mensual
12. mejor forma de conseguir reseñas en google maps para un gimnasio

**Qué le haría elegirte**
1. Es **una pesa de verdad con la marca del gimnasio**, no una tarjeta; queda bien en recepción y los socios lo comentan.
2. **Prueba gratis 30 días** con objeto físico real, sin compromiso.
3. **Sin permanencia**: si deja de pagar el panel, el objeto sigue funcionando.
4. Cumple las normas de Google (sin trucos ni filtros), por lo que no arriesga su ficha.

---

### PERFIL B — El dueño de peluquería o barbería (principal)

**Quién es**
Propietario/a de peluquería o barbería de barrio, 28–48 años, con 1–5 sillones, a menudo trabaja él mismo en el salón. Gestiona la agenda por WhatsApp o app de citas. Su necesidad nace cuando un nuevo local abre cerca y se lleva clientes por "salir mejor en Google", o cuando una clienta satisfecha se va sin dejar reseña por falta de un momento natural para pedirla.

**Qué quiere conseguir**
Llenar la agenda de clientes nuevos que lo encuentran en Google Maps y llegan ya convencidos. Que el cliente que acaba de verse el corte genial deje la reseña **en el momento justo**, sin que el peluquero tenga que insistir con las tijeras en la mano.

**Qué le frena o le preocupa**
- Vergüenza de pedir reseñas "como un vendedor".
- Cree que los clientes mayores "no saben usar el NFC".
- Poco tiempo y cero conocimientos técnicos: teme que se complique.
- Experiencia previa con códigos QR que "nunca funcionan" o son feos.
- Duda de que el objeto combine con la estética de su local.

**Cómo busca en Google (hipótesis)**
1. cómo conseguir reseñas en google para mi peluquería
2. cómo pedir reseñas a clientes de la barbería
3. soporte nfc reseñas google peluquería
4. tarjeta nfc google reseñas barbería
5. qr para que los clientes dejen reseña en google mi peluquería
6. mi barbería no sale en google maps
7. pocas reseñas en google peluquería qué hago
8. placa nfc mostrador peluquería reseñas
9. soporte nfc reseñas google original para barbería
10. nfc reseñas google decoración peluquería
11. cuánto cuesta un soporte nfc de reseñas google para negocio
12. cómo subir mi peluquería en google maps con reseñas

**Qué le haría elegirte**
1. Un objeto **con forma de tijeras o similar al sector**, que parece decoración de su local.
2. Funciona con NFC **y** QR: nadie se queda fuera, incluidos los clientes con móvil sin NFC.
3. Instalación cero: lo pone en el mostrador y ya está.
4. Prototipo gratis para ver cómo queda antes de comprometerse.

---

### PERFIL C — El dueño de restaurante o cafetería (principal, más competido)

**Quién es**
Dueño/a o encargado/a de bar, cafetería o restaurante, 30–55 años, 3–15 empleados. Vive de la rotación y de que lo encuentren en Google Maps ("restaurantes cerca de mí"). Su necesidad aparece tras ver reseñas negativas aisladas que bajan la media de 4,5 a 4,2, o al comparar su ficha con la de la competencia directa en la misma calle.

**Qué quiere conseguir**
Una puntuación alta y estable que le traiga mesas llenas sin depender de plataformas con comisión. Que cada mesa satisfecha deje reseña antes de irse, sin que los camareros tengan que pedirlo.

**Qué le frena o le preocupa**
- Personal con mucha rotación: cualquier sistema que dependa de que "el camarero lo pida" falla.
- Ya paga a otras plataformas y no quiere otra cuota.
- Miedo a que las reseñas malas se multipliquen.
- Duda de que el objeto aguante el uso intensivo (líquidos, golpes).
- Mercado saturado de soluciones QR; no distingue una de otra.

**Cómo busca en Google (hipótesis)**
1. cómo conseguir más reseñas en google para mi restaurante
2. cómo pedir reseñas a los clientes del restaurante sin molestar
3. qr reseñas google para mesas de restaurante
4. soporte nfc reseñas google restaurante
5. placa nfc cafetería reseñas google
6. mi restaurante tiene mala puntuación en google
7. subir puntuación restaurante google maps
8. tarjeta nfc reseñas google bar
9. cuánto cuesta un soporte nfc de reseñas para restaurante
10. objeto nfc personalizado mostrador cafetería
11. qr reseñas google para mesas sin cuota mensual
12. reseñas google restaurante sin cuota mensual

**Qué le haría elegirte**
1. **Un objeto que no se confunde con una tarjeta o pegatina**: se ve y se toca en la mesa.
2. **Sin permanencia** ni cuota obligatoria.
3. Cambia el destino sin sustituir el objeto (si cambia de ficha o de local).
4. Soporte para varios puntos del local (pack de 4 dispositivos).

---

### PERFIL D — Responsable de varios locales o marca (secundario)

**Quién es**
Gerente o dueño/a de 2–10 locales del mismo sector (cadena pequeña, franquiciado, grupo de restauración), 35–55 años. Quiere uniformidad de marca en todos los locales y saber qué local funciona mejor.

**Qué quiere conseguir**
Una forma estándar y barata de pedir reseñas en todos los locales y ver cuál rinde más, sin montar una herramienta compleja.

**Qué le frena o le preocupa**
- Necesita ver estadísticas por local y no solo "total".
- Teme la logística de enviar objetos a varios sitios.
- Quiere un único proveedor y una sola factura.

**Cómo busca en Google (hipótesis)**
1. soporte nfc reseñas google varios locales
2. reseñas google para cadena de gimnasios
3. pack nfc reseñas google 4 dispositivos
4. placas nfc reseñas para franquicia
5. estadísticas escaneos nfc reseñas google
6. nfc reseñas google para varios establecimientos
7. cambiar enlace tarjeta nfc google reseñas sin reprogramar
8. soporte qr reseñas google personalizado con logo
9. comprar placas nfc reseñas por mayor
10. panel para ver escaneos de tarjeta nfc reseñas

**Qué le haría elegirte**
1. Pack Business (4 dispositivos) con precio cerrado.
2. Panel con estadísticas e historial por dispositivo.
3. Un solo proveedor; destino editable por local.

> **Perfil no incluido:** agencias de marketing local que revenden. No aparece en el contexto del negocio; es una hipótesis futura, no la trabajo ahora.

---

## 3. Parte 1 — Ideas de páginas/servicios (solo intención transaccional)

Cada una responde a algo que **StandUrl realmente vende hoy** según `context.md`.

| # | Servicio / página | Por qué merece página propia |
|---|---|---|
| 1 | **Objeto NFC + QR para reseñas de Google** (producto general) | Es el producto principal y la intención más amplia ("comprar soporte NFC reseñas Google"). Hace de hub |
| 2 | **Para gimnasios** (la pesa) | Nicho prioritario, un producto específico (pesa) y un comprador con vocabulario propio ("socios", "recepción") |
| 3 | **Para peluquerías y barberías** (tijeras) | Segundo nicho, producto visual distinto y contexto de uso distinto (mostrador, sillón) |
| 4 | **Para restaurantes y cafeterías** (taza/plato) | Tercer nicho; mesa y barra son contextos de uso distintos, intención similar pero con competencia propia |
| 5 | **Precios y packs** (Starter / Pro / Business) | Las búsquedas de precio son transaccionales y separadas del producto. Un solo lugar para los tres packs evita canibalizar |
| 6 | **Prototipo gratis 30 días** | Es la página de conversión principal (CTA oficial) y atrae búsquedas del tipo "probar gratis" |
| 7 | **Destino editable y estadísticas** (suscripción 4,90 €/mes) | Servicio recurrente real con intención propia: "cambiar enlace NFC sin reprogramar", "ver escaneos". No compite con el producto físico |
| 8 | **Objeto personalizado con tu logo** (modelo a medida) | El contexto prevé que 10–20 % de la producción sea a medida. Intención distinta: "quiero algo con mi marca". **Fase 2**: solo si hay capacidad real y modelos a medida disponibles |

**Descartadas, y por qué:**
- *Tarjeta NFC de reseñas* (PVC): StandUrl no vende tarjetas. Esa intención se trata con copy en home y en la comparativa del contenido informativo (fase de contenido, fuera de esta lista).
- *Otros sectores* (clínicas, talleres, hoteles): el contexto solo prioriza tres nichos. Posible expansión posterior, no ahora.
- *Estadísticas* y *cambiar destino* como páginas separadas: ambas son parte de la misma suscripción, separarlas canibalizaría la página 7.
- *Pack Business* como página aparte: se resuelve dentro de Precios + el Perfil D en la página 7. Separar canibalizaría "precios".
- *Cómo funciona*: es informativa/educativa, no transaccional. Se mantiene como página de apoyo para conversión, no como objetivo de keywords.

---

## 4. Parte 2 — Arquitectura web propuesta

### 4.1 Árbol de URLs (ordenado de mayor a menor potencial de negocio, no de volumen)

| Prioridad | URL | Ataca | Rol | Estado actual en `apps/web` |
|---|---|---|---|---|
| 1 | `/gimnasios` | Objeto NFC/QR reseñas para gimnasios | Página de categoría de nicho (hija de la home) | Existe |
| 2 | `/` | Soporte NFC/QR de reseñas de Google (general) | **Home / hub** | Existe |
| 3 | `/prototipo-gratis` | Prueba gratis 30 días | Conversión, enlazada desde todas | Existe |
| 4 | `/peluquerias-y-barberias` | Objeto NFC/QR reseñas para peluquerías y barberías | Nicho (hija de la home) | Existe |
| 5 | `/precios` | Packs y precios | Transaccional/comparación | Existe |
| 6 | `/restaurantes-y-cafeterias` | Objeto NFC/QR reseñas para restaurantes y cafeterías | Nicho (hija de la home) | Existe |
| 7 | `/panel-estadisticas-nfc` *(nombre provisional)* | Destino editable + estadísticas (suscripción) | Servicio recurrente | **Falta** |
| 8 | `/objeto-personalizado` *(fase 2)* | Modelo a medida con logo | Servicio a medida | **Falta** |
| Apoyo | `/como-funciona` | Cómo funciona (NFC + QR + redirect) | Apoyo/confianza, no objetivo de keywords | Existe |
| Apoyo | `/legal/privacidad`, `/legal/cookies`, `/legal/terminos` | Legal | `noindex` recomendable o baja prioridad | Existen |

Por qué este orden de potencial:
- **Gimnasios primero**: nicho prioritario del contexto, comprador cualificado y producto con mejor encaje.
- **Home segunda**: capta la intención amplia con más búsquedas pero también la más competida; no manda en ingresos a corto plazo.
- **Prototipo gratis tercera**: no se posiciona por volumen pero es donde se convierte todo el tráfico.
- **Restaurantes última de los nichos**: mercado enorme pero con más ruido y competencia.

### 4.2 Reglas anti-canibalización

- Una intención de búsqueda → una URL. Las tres páginas de nicho son mutuamente excluyentes porque cada una se define por el sector. La home trata el término genérico, **sin** nombrar un sector concreto como objetivo.
- `/precios` captura "precio / cuánto cuesta / packs". Las páginas de nicho enlazan a ella en lugar de repetir una tabla completa.
- `/panel-estadisticas-nfc` captura solo "cambiar enlace / estadísticas / panel", no "comprar soporte".
- `/como-funciona` no se optimiza para keywords transaccionales para no competir con la home.
- Enlazado interno: home → 3 nichos + precios + prototipo. Cada nicho → home (migas), precios y prototipo. Prototipo-gratis recibe enlaces desde todas con el mismo anchor.

### 4.3 Cosas a corregir en la web actual antes de la fase de contenido

- Revisar el dominio canónico y alinear `NEXT_PUBLIC_SITE_URL`, canonical, `sitemap.ts` y `robots.ts`.
- `robots.ts` bloquea `/t/`: correcto (redirect), pero asegurar que **no** se enlazan tokens públicamente.
- Cada página debe tener su `<title>`, `meta description`, canonical, Open Graph, y datos estructurados (`Product`/`Offer` para packs, `FAQPage` donde haya preguntas reales, `Organization`).
- La `<meta keywords>` en `app/(public)/page.tsx` no tiene valor SEO real; se puede dejar pero no confiar en ella.
- Medir Core Web Vitals en móvil (el tráfico será mayoritariamente móvil).

---

## 5. Siguiente paso (fase 2, con tus CSV de Keyword Planner)

1. Exporta de Keyword Planner (España, español) los CSV para estas semillas: *reseñas google nfc*, *soporte nfc reseñas*, *qr reseñas google*, *placa nfc negocio*, y los equivalentes por sector (gimnasio, peluquería, barbería, restaurante, cafetería).
2. Los analizaré en 4 pasos: limpieza → agrupación por intención real → asignación a las páginas de la sección 4 → variantes con diferencia semántica real.
3. Con eso defino por página: keyword principal, secundarias, estructura H1/H2, FAQ y datos estructurados, y después redacto el contenido.

## 6. Realismo sobre "primera posición"

Nadie puede garantizar una primera posición. Lo que sí es razonable para StandUrl:
- Atacar **long tail con intención transaccional por sector** ("soporte nfc reseñas google gimnasio") donde la competencia es menor que en "tarjeta nfc reseñas google".
- Aprovechar que los competidores son tarjetas genéricas: el ángulo "objeto de diseño + sin permanencia + panel" es diferenciador.
- Con un objetivo de 100 clientes, **pocas búsquedas bien convertidas** bastan.
- Mientras la marca no tenga autoridad, el SEO se complementa con reseñas propias reales, ficha de Google propia y enlaces desde directorios del sector.

## 7. Datos confirmados por el propietario (3 oct 2026)

1. Dominio definitivo: **standurl.com** (pendiente de comprar). Hasta entonces, no indexar el dominio provisional `standurl.webadir.es`.
2. Propietario de Albacete, sin base física, todo por envío; fabricación propia con impresora 3D.
3. Modelos reales hoy: solo la pesa. Quedan por modelar: ver la propuesta en el informe de fase 2.
4. La personalización con logo **sí** se ofrece: la página `/objeto-personalizado` pasa de fase 2 a fase 1.
5. Sin clientes del prototipo todavía: no hay testimonios que citar. No publicar reseñas ni cifras inventadas.
