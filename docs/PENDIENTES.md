# StandUrl — Pendientes tras la construcción del sitio web

> Estado a 3 oct 2026. La web nueva está en la rama `claude/sweet-allen-41k7ns`. **No se ha publicado nada**: el despliegue (`web-cd.yml`) solo se dispara al subir a `main`, y no se ha creado ningún PR.
> Para ver el sitio en local: `cd apps/web && npm ci && npm run dev` (http://localhost:3000). Para buscar todos los huecos marcados en el código: `grep -rn "PENDIENTE" apps/web docs`.

## 1. Qué se ha hecho

- **Reglas del proyecto actualizadas** (`.agents/context.md`, `.agents/seo.md`): sin prototipo gratis, CTA «Pruébalo 30 días», precios y envío aprobados.
- **29 URLs indexables** (ver `apps/web/app/sitemap.ts`): home, 3 sectores, precios, prueba de 30 días, objeto personalizado, panel, cómo funciona, FAQ, sobre, contacto, envíos y devoluciones, índice de guías + 11 guías, 4 páginas legales (se añade `aviso-legal`).
- **Redirección 301** de `/prototipo-gratis` a `/prueba-30-dias`.
- **SEO técnico**: título, descripción y canonical por página; Open Graph y `opengraph-image`; JSON-LD (`Organization`, `WebSite`, `Product`/`Offer`, `FAQPage`, `Article`, `BreadcrumbList`, `Service`, `CollectionPage`); sitemap y robots generados; `noindex` en login, dashboard y admin; página 404.
- **Componentes y contenido reescritos** con precios desde `lib/pricing.ts` (una sola fuente de verdad), sectores en `lib/sectors.ts`, FAQ en `lib/faqs.ts` y guías en `lib/guides.ts`.
- Comprobado: lint (0 errores; 3 avisos que ya existían), typecheck, build de producción, 29 URLs con un solo H1, canonical y JSON-LD válido, sin enlaces internos rotos, sin desbordes en móvil y formulario enviando correctamente a una API simulada.

## 2. Claims antiguos que se han eliminado (no se podían demostrar)

«Funciona en 2 segundos» · «Google Reviews con 5 estrellas» (además sugería empujar la puntuación) · «<10 ms, caché Redis» · «Plazas limitadas» · «Te contactamos en menos de 24 h» · «3–5 días laborables» · «Prototipo gratis» · «Pesas, mancuernas, kettlebells, tijeras, tazas» como si existieran · «chip programado con tu URL de Google» (el chip lleva la dirección de StandUrl).

## 3. Decisiones que necesito de ti

1. **Logo incluido o con recargo.** Ahora el logo cuesta +19,90 € (el pack incluye modelo de catálogo). Antes, la web decía que la personalización estaba incluida.
2. **Objetos con logo: no se devuelven** salvo defecto. ¿De acuerdo?
3. **Reembolso en 14 días** desde que recibes el objeto devuelto (puesto en `/envios-y-devoluciones`). ¿Confirmas ese plazo?
4. **Entrega en mano gratuita en Albacete**, previa cita. ¿Sí?
5. **Panel «3 meses incluidos»**: hoy no hay cobro automático (Stripe está en Fase 2), así que es una promesa gestionada a mano. Define cómo se activa y se cobra al terminar.
6. **Cobro del pedido**: la web dice «te contactamos para confirmar y te enviamos el método de pago». Falta decidir qué métodos (transferencia, Bizum, enlace de pago…).
7. **Plazo de respuesta**: ahora no se promete ninguno. Si quieres, añade uno realista (p. ej. «en 1–2 días laborables»).
8. **Compromiso de continuidad**: la guía de «programable frente a editable» reconoce que el objeto depende de la dirección de StandUrl. Conviene definir qué prometes si algún día cierras (aviso previo, redirección a un enlace directo…).

## 4. Datos que faltan (están marcados como `[PENDIENTE]`)

- **Aviso legal** (`/legal/aviso-legal`): nombre o razón social, NIF/CIF, domicilio, datos registrales si procede.
- **Correo de contacto**: está puesto `hola@standurl.com` (`lib/site.ts`). Crea el buzón cuando tengas el dominio.
- **Privacidad, términos y cookies**: actualizados mínimamente; **requieren revisión de un gestor/abogado** (venta online, desistimiento, RGPD, derecho de los consumidores). También `/envios-y-devoluciones`.
- **Precios con IVA**: los precios de la web llevan IVA incluido según lo aprobado. Confírmalo con tu gestor, junto con el alta de actividad y la facturación.
- **Envío**: confirmar con tarifa real (Correos/SEUR/GLS/Packlink) con el peso real del paquete. Plazos y costes puestos según la propuesta de `docs/seo/03` §10.

## 5. Producto y contenido físico

- **Solo existe el modelo de la pesa** (`Modelos/Genericos/Pesa`). Las páginas de peluquerías/barberías y de restaurantes/cafeterías muestran «modelo en preparación» y un formulario de **lista de espera**. Cuando tengas los modelos, cambia `modelAvailable` a `true` en `lib/sectors.ts` y sustituye el marcador por una imagen.
- Modelos que recomendé (ver `docs/seo/01`): gimnasios, kettlebell y disco; peluquerías, tijeras/peine con peana y poste de barbero en miniatura; hostelería, taza, plato con soporte inclinado y botella/copa con base ancha.
- **Fotos y vídeo reales**: hoy hay una ilustración vectorial de la pesa (`components/ObjectIllustration.tsx`). Sustitúyela por fotos reales y añade el vídeo del toque con el móvil.
- **Prueba técnica**: leer el objeto ya impreso y cerrado con un iPhone y un Android; comprobar el comportamiento del PLA con calor y humedad (considera PETG si falla).
- **Reutilización de objetos devueltos**: comprobar que desde el admin se puede reasignar un dispositivo a otro negocio.

## 6. Cambios que necesita el backend (no he tocado la API: no hay .NET en este entorno)

- `ProtoRequestModel` solo admite negocio, sector, ciudad, contacto y enlace. Para no cambiar la API, el pack, la lista de espera y el mensaje viajan **dentro del campo `sector`** (se ven en el correo interno). Conviene añadir campos propios (`pack`, `message`, `waitlist`).
- El correo interno sigue titulándose «Nuevo prototipo solicitado» y usa colores oscuros antiguos. Actualizar asunto y diseño.
- No hay cobro (Stripe) ni gestión de pedidos: todo es manual por ahora.

## 7. Dominio y despliegue (cuando decidas publicar)

1. Comprar `standurl.com` y configurar DNS/Traefik.
2. En GitHub, definir la variable `NEXT_PUBLIC_SITE_URL=https://standurl.com` (si no, el workflow usa `https://standurl.webadir.es`, y los canonical, sitemap y Open Graph saldrían con ese dominio). Igual con `NEXT_PUBLIC_API_URL`.
3. Verificar el dominio en **Google Search Console**, enviar `sitemap.xml` y crear la **ficha de Google de StandUrl** (negocio sin local, área de servicio España).
4. Mientras `standurl.webadir.es` siga siendo el sitio activo, valora ponerle `noindex` para no duplicar contenido.
5. Abrir un PR de la rama (no he creado ninguno) y dejar que pase el CI antes de fusionar.

## 8. Contenido y SEO

- Las guías son un **borrador sólido para revisar con ojos nuevos**. Antes de publicar: enlazar la **política oficial de Google** en la guía de normas (no pude abrir `support.google.com` desde este entorno) y comprobar los pasos del menú «Pedir reseñas».
- El enlace a Apple de la guía de NFC viene de un resultado de búsqueda; ábrelo y confirma que sigue vigente.
- **Keywords**: los volúmenes de agosto 2026 del Planificador eran dudosos (ver `docs/seo/02`). Comprueba Google Trends y valora un test de Google Ads (30–50 €) sobre «tarjeta nfc reseñas google».
- **Analítica**: no se ha añadido ninguna. Si la añades, actualiza la política de cookies y el consentimiento.
- **Testimonios**: no hay ninguno. Cuando tengas los primeros clientes (3–10 en Albacete, a mano), pide permiso y añádelos.
- **Tablas de precios de la competencia** («Desde 1 € aprox.»): son orientativas, a partir de precios al por mayor vistos en Alibaba. Revisa con precios reales de tienda.

## 9. Deuda técnica menor

- 3 avisos de lint ya existentes (`set-state-in-effect`) en `DeviceQrModal.tsx` y `AuthContext.tsx`.
- La documentación `.agents/architecture.md` aún habla de Next.js 15 y PostgreSQL (el README dice Next 16 y SQL Server).
- El sitemap usa una fecha fija (`CONTENT_UPDATED` en `lib/site.ts`): actualízala cuando cambies contenido.
