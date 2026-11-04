using System.Net.Mail;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StandUrl.Api.Data;
using StandUrl.Api.Data.Entities;
using StandUrl.Api.Models.Requests;
using StandUrl.Api.Services;

namespace StandUrl.Api.Endpoints;

/// <summary>
/// Ficheros compartidos con enlaces de descarga con seguimiento (panel del negocio).
/// Cada destinatario recibe su propio enlace /d/{token}, así se sabe quién y cuándo descarga.
/// </summary>
public static class FileEndpoints
{
    public const long DefaultMaxFileMb = 25;

    public static void MapFileEndpoints(this WebApplication app)
    {
        var maxBytes = app.Configuration.GetValue<long>("Storage:MaxFileMb", DefaultMaxFileMb) * 1024 * 1024;

        var group = app.MapGroup("/api/files")
            .WithTags("Files")
            .RequireAuthorization()
            .RequireRateLimiting("api");

        // ── GET /api/files ─────────────────────────────────────────────────────
        group.MapGet("/", async (ClaimsPrincipal user, AppDbContext db) =>
        {
            var businessId = GetBusinessId(user);
            if (businessId == Guid.Empty) return Results.Unauthorized();

            var files = await db.SharedFiles
                .AsNoTracking()
                .Where(f => f.BusinessId == businessId)
                .OrderByDescending(f => f.CreatedAt)
                .Select(f => new
                {
                    f.Id,
                    f.OriginalName,
                    f.ContentType,
                    f.SizeBytes,
                    f.CreatedAt,
                    Links = f.Links
                        .OrderBy(l => l.CreatedAt)
                        .Select(l => new
                        {
                            l.Id,
                            l.Token,
                            l.RecipientName,
                            l.RecipientEmail,
                            l.IsActive,
                            l.CreatedAt,
                            l.OpenCount,
                            l.DownloadCount,
                            l.FirstOpenedAt,
                            l.FirstDownloadedAt,
                            l.LastDownloadedAt
                        })
                        .ToList()
                })
                .ToListAsync();

            return Results.Ok(files);
        })
        .WithName("ListFiles");

        // ── POST /api/files (multipart/form-data, campo "file") ────────────────
        group.MapPost("/", async (
            IFormFile? file,
            ClaimsPrincipal user,
            AppDbContext db,
            IFileStorageService storage,
            CancellationToken ct) =>
        {
            var businessId = GetBusinessId(user);
            if (businessId == Guid.Empty) return Results.Unauthorized();

            if (file is null || file.Length == 0)
                return Results.BadRequest(new { error = "Selecciona un fichero." });

            if (file.Length > maxBytes)
                return Results.BadRequest(new { error = $"El fichero supera el máximo de {maxBytes / 1024 / 1024} MB." });

            var originalName = SanitizeFileName(file.FileName);

            string storedName;
            await using (var stream = file.OpenReadStream())
                storedName = await storage.SaveAsync(stream, ct);

            var shared = new SharedFile
            {
                BusinessId = businessId,
                OriginalName = originalName,
                StoredName = storedName,
                ContentType = string.IsNullOrWhiteSpace(file.ContentType) || file.ContentType.Length > 127
                    ? "application/octet-stream"
                    : file.ContentType,
                SizeBytes = file.Length
            };

            db.SharedFiles.Add(shared);
            try
            {
                await db.SaveChangesAsync(ct);
            }
            catch
            {
                storage.Delete(storedName); // no dejar huérfanos en disco
                throw;
            }

            return Results.Created($"/api/files/{shared.Id}", new
            {
                shared.Id,
                shared.OriginalName,
                shared.ContentType,
                shared.SizeBytes,
                shared.CreatedAt,
                Links = Array.Empty<object>()
            });
        })
        .DisableAntiforgery() // API con JWT en cabecera: no hay cookies que proteger
        .WithMetadata(new RequestSizeLimitAttribute(maxBytes + 1024 * 1024))
        .WithName("UploadFile");

        // ── DELETE /api/files/{id} ─────────────────────────────────────────────
        group.MapDelete("/{id:guid}", async (
            Guid id,
            ClaimsPrincipal user,
            AppDbContext db,
            IFileStorageService storage) =>
        {
            var businessId = GetBusinessId(user);
            if (businessId == Guid.Empty) return Results.Unauthorized();

            var file = await db.SharedFiles
                .FirstOrDefaultAsync(f => f.Id == id && f.BusinessId == businessId);
            if (file is null) return Results.NotFound();

            db.SharedFiles.Remove(file); // cascada: enlaces y eventos
            await db.SaveChangesAsync();
            storage.Delete(file.StoredName);

            return Results.NoContent();
        })
        .WithName("DeleteFile");

        // ── POST /api/files/{id}/links ─────────────────────────────────────────
        group.MapPost("/{id:guid}/links", async (
            Guid id,
            CreateFileLinkRequest req,
            ClaimsPrincipal user,
            AppDbContext db,
            ITokenService tokenService) =>
        {
            var businessId = GetBusinessId(user);
            if (businessId == Guid.Empty) return Results.Unauthorized();

            var name = req.RecipientName?.Trim() ?? string.Empty;
            var email = string.IsNullOrWhiteSpace(req.RecipientEmail) ? null : req.RecipientEmail.Trim();

            if (name.Length == 0)
                return Results.BadRequest(new { error = "Indica el nombre del destinatario." });
            if (name.Length > 120)
                return Results.BadRequest(new { error = "El nombre es demasiado largo (máx. 120)." });
            if (email is not null && (email.Length > 254 || !MailAddress.TryCreate(email, out _)))
                return Results.BadRequest(new { error = "El email del destinatario no es válido." });

            var exists = await db.SharedFiles
                .AnyAsync(f => f.Id == id && f.BusinessId == businessId);
            if (!exists) return Results.NotFound();

            var token = await tokenService.GenerateUniqueAsync(async t =>
                await db.FileLinks.AnyAsync(l => l.Token == t));

            var link = new FileLink
            {
                SharedFileId = id,
                Token = token,
                RecipientName = name,
                RecipientEmail = email
            };

            db.FileLinks.Add(link);
            await db.SaveChangesAsync();

            return Results.Created($"/api/files/links/{link.Id}", new
            {
                link.Id,
                link.Token,
                link.RecipientName,
                link.RecipientEmail,
                link.IsActive,
                link.CreatedAt,
                link.OpenCount,
                link.DownloadCount,
                link.FirstOpenedAt,
                link.FirstDownloadedAt,
                link.LastDownloadedAt
            });
        })
        .WithName("CreateFileLink");

        // ── DELETE /api/files/links/{linkId} ───────────────────────────────────
        group.MapDelete("/links/{linkId:guid}", async (
            Guid linkId,
            ClaimsPrincipal user,
            AppDbContext db) =>
        {
            var businessId = GetBusinessId(user);
            if (businessId == Guid.Empty) return Results.Unauthorized();

            var link = await db.FileLinks
                .FirstOrDefaultAsync(l => l.Id == linkId && l.SharedFile.BusinessId == businessId);
            if (link is null) return Results.NotFound();

            db.FileLinks.Remove(link);
            await db.SaveChangesAsync();
            return Results.NoContent();
        })
        .WithName("DeleteFileLink");

        // ── GET /api/files/links/{linkId}/events ───────────────────────────────
        group.MapGet("/links/{linkId:guid}/events", async (
            Guid linkId,
            ClaimsPrincipal user,
            AppDbContext db) =>
        {
            var businessId = GetBusinessId(user);
            if (businessId == Guid.Empty) return Results.Unauthorized();

            var owned = await db.FileLinks
                .AnyAsync(l => l.Id == linkId && l.SharedFile.BusinessId == businessId);
            if (!owned) return Results.NotFound();

            var events = await db.FileLinkEvents
                .AsNoTracking()
                .Where(ev => ev.FileLinkId == linkId)
                .OrderByDescending(ev => ev.Timestamp)
                .Take(100)
                .Select(ev => new { ev.Type, ev.Timestamp, ev.UserAgent })
                .ToListAsync();

            return Results.Ok(events);
        })
        .WithName("GetFileLinkEvents");
    }

    /// <summary>Deja solo el nombre (sin rutas) y quita caracteres de control.</summary>
    public static string SanitizeFileName(string? raw)
    {
        var name = Path.GetFileName((raw ?? string.Empty).Replace('\\', '/'));
        name = new string(name.Where(c => !char.IsControl(c) && c != '"').ToArray()).Trim();
        if (name.Length == 0) name = "fichero";
        if (name.Length > 255)
        {
            var ext = Path.GetExtension(name);
            if (ext.Length > 20) ext = string.Empty;
            name = name[..(255 - ext.Length)] + ext;
        }
        return name;
    }

    private static Guid GetBusinessId(ClaimsPrincipal user)
    {
        var sub = user.FindFirstValue(ClaimTypes.NameIdentifier)
               ?? user.FindFirstValue("sub");
        return Guid.TryParse(sub, out var id) ? id : Guid.Empty;
    }
}
