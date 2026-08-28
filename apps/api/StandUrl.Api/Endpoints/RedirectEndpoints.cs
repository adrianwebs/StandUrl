using Microsoft.EntityFrameworkCore;
using StandUrl.Api.Data;
using StandUrl.Api.Services;

namespace StandUrl.Api.Endpoints;

public static class RedirectEndpoints
{
    public static void MapRedirectEndpoints(this WebApplication app)
    {
        // ── GET /t/{token} ────────────────────────────────────────────────────
        // Flujo: Redis → SQL Server → 302 (instantáneo)
        //        Analítica en background (nunca bloquea el redirect)
        app.MapGet("/t/{token}", async (
            string token,
            IRedisService redis,
            AppDbContext db,
            IInteractionService interactions,
            HttpContext ctx) =>
        {
            // 1. Intentar desde cache Redis
            var destination = await redis.GetDeviceDestinationAsync(token);
            Guid deviceId = Guid.Empty;

            if (destination is null)
            {
                // 2. Cache miss → consultar SQL Server
                var device = await db.Devices
                    .AsNoTracking()
                    .Where(d => d.Token == token && d.Status == "active")
                    .Select(d => new { d.Id, d.DestinationUrl })
                    .FirstOrDefaultAsync();

                if (device is null)
                    return Results.NotFound();

                // 3. Poblar cache para próximas peticiones
                await redis.SetDeviceDestinationAsync(token, device.DestinationUrl, TimeSpan.FromHours(1));
                destination = device.DestinationUrl;
                deviceId = device.Id;
            }
            else
            {
                // Obtener ID en background sin bloquear (solo para analítica)
                deviceId = await db.Devices
                    .AsNoTracking()
                    .Where(d => d.Token == token)
                    .Select(d => d.Id)
                    .FirstOrDefaultAsync();
            }

            // 4. Detectar fuente: NFC o QR
            var source = DetectSource(ctx.Request);
            var userAgent = ctx.Request.Headers.UserAgent.ToString();

            // 5. Analítica ASÍNCRONA — el redirect ya fue enviado, esto va en background
            if (deviceId != Guid.Empty)
            {
                _ = Task.Run(() => interactions.RecordAsync(deviceId, source, userAgent));
            }

            // 6. Redirect instantáneo — el usuario nunca ve pantalla de carga
            return Results.Redirect(destination, permanent: false);
        })
        .WithName("Redirect")
        .WithTags("Redirect")
        .ExcludeFromDescription(); // No exponer en Swagger por limpieza
    }

    private static string DetectSource(HttpRequest request)
    {
        // Heurística básica: si viene de NFC el referer suele ser nulo y el UA específico
        // El QR generalmente viene con referer o desde apps de cámara
        if (request.Query.ContainsKey("src"))
            return request.Query["src"].ToString() switch
            {
                "nfc" => "nfc",
                "qr" => "qr",
                _ => "unknown"
            };

        return "unknown";
    }
}
