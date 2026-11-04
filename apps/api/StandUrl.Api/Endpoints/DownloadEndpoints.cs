using System.Net;
using Microsoft.EntityFrameworkCore;
using StandUrl.Api.Data;
using StandUrl.Api.Services;

namespace StandUrl.Api.Endpoints;

/// <summary>
/// Enlaces públicos de descarga con seguimiento.
///
///   GET  /d/{token}  → página con el botón "Descargar"   (cuenta como "abierto")
///   POST /d/{token}  → entrega el fichero                 (cuenta como "descargado")
///
/// La descarga va por POST a propósito: los antivirus de correo (Outlook Safe Links,
/// Gmail, Proofpoint…) abren con GET los enlaces de los emails antes que la persona,
/// pero no envían formularios. Así una "descarga" significa que alguien pulsó el botón.
/// </summary>
public static class DownloadEndpoints
{
    public static void MapDownloadEndpoints(this WebApplication app)
    {
        app.MapGet("/d/{token}", async (
            string token,
            AppDbContext db,
            IFileTrackingService tracking,
            HttpContext ctx) =>
        {
            SetPrivateHeaders(ctx);

            var link = await FindActiveLinkAsync(db, token);
            if (link is null)
                return Results.Content(NotFoundPage(), "text/html; charset=utf-8", statusCode: 404);

            var ua = ctx.Request.Headers.UserAgent.ToString();
            _ = Task.Run(() => tracking.RecordAsync(link.Id, "open", ua));

            return Results.Content(
                LandingPage(token, link.BusinessName, link.FileName, link.SizeBytes, link.RecipientName),
                "text/html; charset=utf-8");
        })
        .WithName("DownloadLanding")
        .WithTags("Download")
        .RequireRateLimiting("api")
        .ExcludeFromDescription();

        app.MapPost("/d/{token}", async (
            string token,
            AppDbContext db,
            IFileStorageService storage,
            IFileTrackingService tracking,
            HttpContext ctx) =>
        {
            SetPrivateHeaders(ctx);

            var link = await FindActiveLinkAsync(db, token);
            if (link is null)
                return Results.Content(NotFoundPage(), "text/html; charset=utf-8", statusCode: 404);

            var stream = storage.OpenRead(link.StoredName);
            if (stream is null)
                return Results.Content(NotFoundPage(), "text/html; charset=utf-8", statusCode: 404);

            var ua = ctx.Request.Headers.UserAgent.ToString();
            _ = Task.Run(() => tracking.RecordAsync(link.Id, "download", ua));

            // Siempre como adjunto: el navegador nunca lo renderiza en nuestro dominio
            return Results.File(stream, "application/octet-stream", fileDownloadName: link.FileName);
        })
        .DisableAntiforgery()
        .WithName("DownloadFile")
        .WithTags("Download")
        .RequireRateLimiting("api")
        .ExcludeFromDescription();
    }

    private sealed record LinkInfo(Guid Id, string RecipientName, string FileName, string StoredName,
        long SizeBytes, string BusinessName);

    private static async Task<LinkInfo?> FindActiveLinkAsync(AppDbContext db, string token)
    {
        if (string.IsNullOrEmpty(token) || token.Length != 8) return null;

        return await db.FileLinks
            .AsNoTracking()
            .Where(l => l.Token == token && l.IsActive && l.SharedFile.Business.IsActive)
            .Select(l => new LinkInfo(
                l.Id,
                l.RecipientName,
                l.SharedFile.OriginalName,
                l.SharedFile.StoredName,
                l.SharedFile.SizeBytes,
                l.SharedFile.Business.Name))
            .FirstOrDefaultAsync();
    }

    private static void SetPrivateHeaders(HttpContext ctx)
    {
        ctx.Response.Headers.CacheControl = "no-store";
        ctx.Response.Headers["X-Robots-Tag"] = "noindex, nofollow";
        ctx.Response.Headers["Referrer-Policy"] = "no-referrer";
        ctx.Response.Headers.XContentTypeOptions = "nosniff";
    }

    public static string FormatSize(long bytes) => bytes switch
    {
        < 1024 => $"{bytes} B",
        < 1024 * 1024 => $"{bytes / 1024.0:0.#} KB",
        _ => $"{bytes / 1024.0 / 1024.0:0.#} MB"
    };

    private static string LandingPage(string token, string businessName, string fileName, long size, string recipient)
    {
        Func<string?, string?> e = WebUtility.HtmlEncode;
        var body = $"""
            <p class="eyebrow">{e(businessName)} te ha enviado un fichero</p>
            <h1>Hola, {e(recipient)}</h1>
            <div class="file">
              <div class="name">{e(fileName)}</div>
              <div class="meta">{FormatSize(size)}</div>
            </div>
            <form method="post" action="/d/{e(token)}">
              <button type="submit">Descargar fichero</button>
            </form>
            <p class="note">Enlace personal enviado por {e(businessName)}. Al descargarlo, el remitente sabrá que lo has recibido.</p>
            """;
        return Shell($"{fileName} · {businessName}", body);
    }

    private static string NotFoundPage() => Shell("Enlace no disponible", """
        <h1>Enlace no disponible</h1>
        <p class="note">Este enlace de descarga ha caducado o ha sido retirado. Pide al remitente que te envíe uno nuevo.</p>
        """);

    private static string Shell(string title, string body) => $$"""
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="robots" content="noindex, nofollow">
          <title>{{WebUtility.HtmlEncode(title)}}</title>
          <style>
            body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#FBFBF9;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;padding:16px;box-sizing:border-box}
            .card{background:#fff;border:1px solid #E7E5E4;border-radius:24px;padding:32px;max-width:440px;width:100%;box-shadow:0 10px 30px rgba(0,0,0,.06)}
            .eyebrow{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#B45309;margin:0 0 8px}
            h1{font-size:22px;margin:0 0 20px}
            .file{background:#FBFBF9;border:1px solid #E7E5E4;border-radius:16px;padding:16px;margin-bottom:20px;word-break:break-word}
            .name{font-weight:700}
            .meta{font-size:13px;color:#78716C;margin-top:4px}
            button{width:100%;background:#18181B;color:#fff;border:0;border-radius:12px;padding:14px;font-size:15px;font-weight:700;cursor:pointer}
            button:hover{background:#27272A}
            .note{font-size:12px;color:#78716C;line-height:1.5;margin:16px 0 0}
            .brand{font-size:11px;color:#A8A29E;text-align:center;margin-top:20px}
          </style>
        </head>
        <body>
          <main class="card">
            {{body}}
            <div class="brand">StandUrl</div>
          </main>
        </body>
        </html>
        """;
}
