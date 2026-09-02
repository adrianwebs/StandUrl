# StandUrl

[![publish](https://github.com/adrianwebs/StandUrl/actions/workflows/web-cd.yml/badge.svg)](https://github.com/adrianwebs/StandUrl/actions/workflows/web-cd.yml)

Botón físico inteligente (NFC + QR) para negocios locales. El objeto impreso en 3D
apunta siempre a la misma URL corta; el negocio cambia el destino desde su panel
sin tocar el objeto.

```
NFC / QR  →  https://standurl.com/t/{TOKEN}  →  302  →  destino configurable
```

## Estructura del repositorio

| Ruta | Contenido |
|------|-----------|
| `apps/web` | Frontend Next.js 16 (App Router, TypeScript, Tailwind 4) |
| `apps/api` | API y redirector en ASP.NET Core Minimal API (.NET 9) |
| `apps/api/StandUrl.Api.Tests` | Tests unitarios con xUnit |
| `infra` | Docker Compose de desarrollo y producción |
| `Modelos` | Modelos 3D de los dispositivos (`.blend`, `.stl`, `.3mf`) |
| `.agents` | Contexto, arquitectura y guía de diseño del proyecto |
| `.github/workflows` | CI/CD de la web en GitHub Actions |

## Stack

- **Frontend:** Next.js 16 + React 19 + TypeScript + Tailwind CSS 4
- **Backend:** ASP.NET Core Minimal API (.NET 9) + EF Core
- **Base de datos:** SQL Server · **Caché:** Redis 7 (lookups de `/t/{token}`)
- **Infraestructura:** Docker Compose + Traefik v3
- **Auth:** ASP.NET Identity + JWT · **Emails:** MailKit (SMTP)

## Desarrollo local

### Todo con Docker

```bash
docker compose -f infra/docker-compose.dev.yml up --build
```

- Web: http://localhost:3000
- API: http://localhost:8080
- Redis: `localhost:6379`

### Frontend suelto (recarga más rápida)

```bash
cd apps/web
npm install
npm run dev
```

Scripts disponibles: `dev`, `build`, `start`, `lint`, `typecheck`.

### Backend suelto

```bash
cd apps/api/StandUrl.Api
dotnet run
```

La cadena de conexión de desarrollo se lee de `appsettings.Development.json`,
que no se incluye en la imagen (se monta como volumen).

## Tests

```bash
dotnet test apps/api/StandUrl.Api.Tests
```

## Restricciones de diseño

Documentadas en [`.agents/context.md`](.agents/context.md) y
[`.agents/architecture.md`](.agents/architecture.md). En resumen:

1. Sin *review gating*: un único destino por dispositivo.
2. Tokens siempre aleatorios en base62, nunca correlativos.
3. El redirect nunca se bloquea: la analítica es asíncrona.
4. Sin permanencia forzada: el dispositivo sigue funcionando sin suscripción.
