# StandUrl — Contexto del Proyecto

## ¿Qué es StandUrl?

Un **botón físico inteligente** para negocios locales (gimnasios, peluquerías, restaurantes).

- El objeto físico (impresión 3D personalizada por sector) lleva un chip NFC + un QR impreso.
- Ambos apuntan a `https://standurl.com/t/{TOKEN}` (8 caracteres, base62).
- Nuestro servidor resuelve ese token → `destination_url` → `302 redirect`.
- El negocio nunca toca el objeto: cambia el destino desde su dashboard.

## Propuesta de Valor

> "Tu cliente acerca el móvil → está en Google Reviews en menos de 2 segundos."

El objeto parece un producto profesional de marca, no una tarjeta NFC genérica. Esa diferenciación visual es el principal argumento de venta frente a la competencia.

## Modelo de Negocio

### Producto físico (venta única)
| Pack     | Precio  | Dispositivos |
|----------|---------|--------------|
| Starter  | 29,90 € | 1            |
| Pro      | 49,90 € | 2            |
| Business | 79,90 € | 4            |

### SaaS (recurrente opcional)
- **4,90 €/mes** por negocio
- Sin suscripción: el redirect sigue funcionando (URL congelada)
- Con suscripción: cambio de destino, estadísticas, historial, múltiples dispositivos

## Nichos (en orden de prioridad)
1. 🥇 **Gimnasios** — estética 3D compatible, propietarios accesibles, Google Reviews crítico
2. 🥈 **Peluquerías y barberías** — alta personalización visual
3. 🥉 **Restaurantes y cafeterías** — mercado enorme, más competido

## Objetivo de Validación (6 meses)
- Semana 1-2: 3 modelos 3D + 10 unidades físicas
- Semana 3: 3 primeros clientes (prototipo gratis 30 días)
- Semana 4: entrevista de feedback
- Mes 2-3: SaaS mínimo + primeros pagos
- Mes 6: 100 clientes activos → 500 €/mes MRR

## Restricciones de Diseño (NO negociables)

1. **Sin review gating** — destino único por dispositivo, sin ramificaciones por estrellas.
2. **Sin IDs correlativos** — tokens siempre aleatorios base62.
3. **El redirect NO puede bloquear** — analítica siempre asíncrona.
4. **Sin permanencia forzada** — el dispositivo sigue funcionando sin suscripción.

## El Objeto Físico

- Impresora: Bambu Lab Carbon 2 (negro mate base)
- Filamento: PLA de colores
- Chip: NTAG213 o NTAG215 (grabado en fabricación, nunca se reprograma)
- QR: impreso/pegado en el objeto, apunta a la misma URL que el NFC
- Coste material estimado: 3,60–7 € por unidad
- El 80-90 % de la producción debe salir de plantillas (biblioteca de modelos)

---

## Reglas para Agentes

- **Nunca** añadir features no incluidas en el MVP (app móvil, IA, CRM, campañas, heatmaps, API pública).
- El stack está fijado: **Next.js + TypeScript** (frontend), **ASP.NET Core Minimal API** (backend), **PostgreSQL** (DB), **Redis** (caché redirects), **Docker + Traefik** (infra).
- Pagos: **Stripe** (activar cuando llegue la capa de suscripción, no antes).
- Emails: **SMTP (MailKit)** vía OVH u otro proveedor SMTP estándar.
- El CTA principal de la landing es siempre **"Pide tu prototipo gratis"**, no "Comprar".
