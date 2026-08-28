# ── Build stage ─────────────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:9.0-alpine AS build
WORKDIR /src

# Copiar csproj primero para aprovechar el cache de capas
COPY ["StandUrl.Api/StandUrl.Api.csproj", "StandUrl.Api/"]
RUN dotnet restore "StandUrl.Api/StandUrl.Api.csproj"

# Copiar el resto del código
COPY . .
WORKDIR /src/StandUrl.Api
RUN dotnet publish "StandUrl.Api.csproj" \
    -c Release \
    -o /app/publish \
    --no-restore \
    /p:UseAppHost=false

# ── Runtime stage ────────────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/aspnet:9.0-alpine AS runtime
WORKDIR /app

# Instalar librerías de sistema necesarias para SQL Server en Alpine
RUN apk add --no-cache icu-libs krb5-libs libgcc libintl libssl3 libstdc++ zlib

# Variables de entorno base
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false \
    ASPNETCORE_URLS=http://+:8080 \
    ASPNETCORE_ENVIRONMENT=Production

# Usuario no-root por seguridad
RUN addgroup -g 1001 -S appgroup && adduser -u 1001 -S appuser -G appgroup
USER appuser

COPY --from=build --chown=appuser:appgroup /app/publish .

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:8080/health || exit 1

ENTRYPOINT ["dotnet", "StandUrl.Api.dll"]
