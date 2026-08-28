# StandUrl — Arquitectura Técnica

## Stack

| Capa            | Tecnología                        | Notas                                        |
|-----------------|-----------------------------------|----------------------------------------------|
| Frontend        | Next.js 15 + TypeScript           | App Router, RSC por defecto                  |
| Backend         | ASP.NET Core Minimal API (.NET 9) | Un proyecto para API + redirector            |
| Base de datos   | **SQL Server** (servidor externo) | EF Core como ORM · host: 51.195.47.36        |
| Caché           | Redis 7                           | Solo para `/t/{token}` lookups               |
| Reverse proxy   | Traefik v3                        | SSL automático via Let's Encrypt             |
| Contenedores    | Docker + Docker Compose           | Un compose por entorno (dev/prod)            |
| Pagos           | Stripe                            | Activar en Fase 2, no en MVP                 |
| Emails          | SMTP (MailKit)                    | Transaccionales únicamente (OVH / SMTP)      |
| Auth            | ASP.NET Identity + JWT            | Sin OAuth externo en MVP                     |

## Modelo de Datos

```sql
-- Negocio
CREATE TABLE businesses (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  slug         TEXT UNIQUE NOT NULL,
  email        TEXT UNIQUE NOT NULL,
  sector       TEXT CHECK (sector IN ('gimnasio','peluqueria','restaurante','otro')),
  plan         TEXT DEFAULT 'free' CHECK (plan IN ('free','pro')),
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- Dispositivo
CREATE TABLE devices (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id     UUID REFERENCES businesses(id) ON DELETE CASCADE,
  token           CHAR(8) UNIQUE NOT NULL,        -- base62, aleatorio
  label           TEXT NOT NULL,                  -- "Entrada", "Barra"...
  destination_url TEXT NOT NULL,
  status          TEXT DEFAULT 'active' CHECK (status IN ('active','inactive')),
  model_type      TEXT DEFAULT 'generico',        -- pesa, tijeras, taza, plato, generico
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Historial de destinos
CREATE TABLE destination_history (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id   UUID REFERENCES devices(id) ON DELETE CASCADE,
  old_url     TEXT NOT NULL,
  new_url     TEXT NOT NULL,
  changed_at  TIMESTAMPTZ DEFAULT now()
);

-- Interacciones (analítica)
CREATE TABLE interactions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id   UUID REFERENCES devices(id) ON DELETE CASCADE,
  timestamp   TIMESTAMPTZ DEFAULT now(),
  source      TEXT CHECK (source IN ('nfc','qr','unknown')),
  user_agent  TEXT
);

-- Índices
CREATE INDEX idx_devices_token ON devices(token);
CREATE INDEX idx_interactions_device_id ON interactions(device_id);
CREATE INDEX idx_interactions_timestamp ON interactions(timestamp);
```

## Endpoints API

### Público (sin autenticación)
| Método | Ruta              | Descripción                                          |
|--------|-------------------|------------------------------------------------------|
| GET    | `/t/{token}`      | Redis lookup → 302. Interacción registrada async.   |
| POST   | `/api/auth/login` | Login negocio. Devuelve JWT (access + refresh).     |
| POST   | `/api/proto-request` | Formulario "Prototipo gratis" → email interno.  |

### Privado (JWT required)
| Método  | Ruta                          | Descripción                                  |
|---------|-------------------------------|----------------------------------------------|
| GET     | `/api/businesses/me`          | Datos del negocio autenticado                |
| GET     | `/api/businesses/me/stats`    | Total interacciones + evolución mensual      |
| GET     | `/api/devices`                | Lista dispositivos del negocio               |
| POST    | `/api/devices`                | Crea dispositivo (uso interno/admin)         |
| PATCH   | `/api/devices/{id}`           | Cambia label o destination_url + invalida Redis |
| GET     | `/api/devices/{id}/stats`     | Interacciones por dispositivo                |

## Flujo del Redirect (`/t/{token}`)

```
Request GET /t/8F7K2P
         │
         ▼
    Redis GET "device:8F7K2P"
         │
    ┌────┴────┐
    │  HIT    │  MISS
    │         ▼
    │    Postgres: SELECT destination_url FROM devices WHERE token='8F7K2P' AND status='active'
    │         │
    │    Redis SET "device:8F7K2P" url EX 3600
    │         │
    └────┬────┘
         │ destination_url
         ▼
    HTTP 302 Location: destination_url   ← respuesta inmediata
         │
         ▼ (en background, sin bloquear)
    INSERT INTO interactions (device_id, source, user_agent, timestamp)
```

**Regla de rendimiento:** La analítica NUNCA bloquea el redirect. Se procesa en un `Task.Run()` o canal de background worker.

## Estructura de Carpetas (monorepo)

```
StandUrl/
├── .agents/                    ← instrucciones para agentes
│   ├── context.md
│   ├── design.md
│   └── architecture.md
├── apps/
│   ├── web/                    ← Next.js (landing + dashboard)
│   └── api/                    ← ASP.NET Core Minimal API
├── infra/
│   ├── docker-compose.dev.yml
│   ├── docker-compose.prod.yml
│   └── traefik/
└── docs/                       ← ADRs, notas de producto
```

## Variables de Entorno

### API (.env)
```
DATABASE_URL=postgres://user:pass@localhost:5432/standurl
REDIS_URL=redis://localhost:6379
JWT_SECRET=...
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=465
SMTP_USER=...
SMTP_PASSWORD=...
INTERNAL_ADMIN_KEY=...   # para crear devices desde back-office
```

### Web (.env.local)
```
NEXT_PUBLIC_API_URL=https://api.standurl.com
NEXT_PUBLIC_SITE_URL=https://standurl.com
```

## Seguridad

- Tokens: base62 (A-Z a-z 0-9), 8 caracteres → 218 billones de combinaciones posibles.
- Generación: `RandomNumberGenerator.GetBytes()` en .NET, nunca `Random`.
- Rate limiting: 100 req/min en `/api/auth/login`, 500 req/min en `/api/devices`.
- JWT: expiración 60 min, refresh token httpOnly cookie.
- `/t/{token}`: sin rate limiting agresivo (puede recibir muchas peticiones legítimas).

## Restricciones de Diseño

- ❌ Sin lógica condicional por estrellas en el redirect.
- ❌ Sin IDs correlativos expuestos.
- ❌ Sin bloqueo del redirect para analítica.
- ❌ Sin features fuera del MVP (app móvil, IA, CRM, campañas, API pública).
