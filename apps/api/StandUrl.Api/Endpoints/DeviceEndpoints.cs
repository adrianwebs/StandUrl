using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using StandUrl.Api.Data;
using StandUrl.Api.Data.Entities;
using StandUrl.Api.Models.Requests;
using StandUrl.Api.Services;

namespace StandUrl.Api.Endpoints;

public static class DeviceEndpoints
{
    public static void MapDeviceEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/devices")
            .WithTags("Devices")
            .RequireAuthorization();

        // ── GET /api/devices ───────────────────────────────────────────────────
        group.MapGet("/", async (ClaimsPrincipal user, AppDbContext db) =>
        {
            var businessId = GetBusinessId(user);
            if (businessId == Guid.Empty) return Results.Unauthorized();

            var devices = await db.Devices
                .AsNoTracking()
                .Where(d => d.BusinessId == businessId)
                .OrderBy(d => d.CreatedAt)
                .Select(d => new
                {
                    d.Id,
                    d.Token,
                    d.Label,
                    d.DestinationUrl,
                    d.Status,
                    d.ModelType,
                    d.CreatedAt,
                    InteractionCount = d.Interactions.Count
                })
                .ToListAsync();

            return Results.Ok(devices);
        })
        .WithName("ListDevices");

        // ── POST /api/devices (uso interno / admin) ────────────────────────────
        group.MapPost("/", async (
            CreateDeviceRequest req,
            ClaimsPrincipal user,
            AppDbContext db,
            ITokenService tokenService) =>
        {
            var businessId = GetBusinessId(user);
            if (businessId == Guid.Empty) return Results.Unauthorized();

            if (string.IsNullOrWhiteSpace(req.Label) || string.IsNullOrWhiteSpace(req.DestinationUrl))
                return Results.BadRequest(new { error = "Label y DestinationUrl son obligatorios." });

            if (!Uri.TryCreate(req.DestinationUrl, UriKind.Absolute, out _))
                return Results.BadRequest(new { error = "DestinationUrl no es una URL válida." });

            var token = await tokenService.GenerateUniqueAsync(async t =>
                await db.Devices.AnyAsync(d => d.Token == t));

            var device = new Device
            {
                BusinessId = businessId,
                Token = token,
                Label = req.Label,
                DestinationUrl = req.DestinationUrl,
                ModelType = req.ModelType ?? "generico"
            };

            db.Devices.Add(device);
            await db.SaveChangesAsync();

            return Results.Created($"/api/devices/{device.Id}", new
            {
                device.Id,
                device.Token,
                device.Label,
                device.DestinationUrl,
                device.Status,
                device.ModelType,
                device.CreatedAt
            });
        })
        .WithName("CreateDevice");

        // ── PATCH /api/devices/{id} ────────────────────────────────────────────
        group.MapPatch("/{id:guid}", async (
            Guid id,
            UpdateDeviceRequest req,
            ClaimsPrincipal user,
            AppDbContext db,
            IRedisService redis) =>
        {
            var businessId = GetBusinessId(user);
            if (businessId == Guid.Empty) return Results.Unauthorized();

            var device = await db.Devices
                .FirstOrDefaultAsync(d => d.Id == id && d.BusinessId == businessId);

            if (device is null) return Results.NotFound();

            // Guardar historial si cambia la URL de destino
            if (!string.IsNullOrWhiteSpace(req.DestinationUrl)
                && req.DestinationUrl != device.DestinationUrl)
            {
                if (!Uri.TryCreate(req.DestinationUrl, UriKind.Absolute, out _))
                    return Results.BadRequest(new { error = "DestinationUrl no es una URL válida." });

                db.DestinationHistories.Add(new Data.Entities.DestinationHistory
                {
                    DeviceId = device.Id,
                    OldUrl = device.DestinationUrl,
                    NewUrl = req.DestinationUrl
                });

                device.DestinationUrl = req.DestinationUrl;

                // CRÍTICO: invalidar cache Redis para que el próximo redirect use la URL nueva
                await redis.InvalidateDeviceAsync(device.Token);
            }

            if (!string.IsNullOrWhiteSpace(req.Label))
                device.Label = req.Label;

            if (req.Status is not null)
                device.Status = req.Status;

            await db.SaveChangesAsync();

            return Results.Ok(new
            {
                device.Id,
                device.Token,
                device.Label,
                device.DestinationUrl,
                device.Status,
                device.ModelType
            });
        })
        .WithName("UpdateDevice");

        // ── GET /api/devices/{id}/stats ────────────────────────────────────────
        group.MapGet("/{id:guid}/stats", async (
            Guid id,
            ClaimsPrincipal user,
            AppDbContext db) =>
        {
            var businessId = GetBusinessId(user);
            if (businessId == Guid.Empty) return Results.Unauthorized();

            var device = await db.Devices
                .AsNoTracking()
                .FirstOrDefaultAsync(d => d.Id == id && d.BusinessId == businessId);

            if (device is null) return Results.NotFound();

            var now = DateTime.UtcNow;
            var startOfMonth = new DateTime(now.Year, now.Month, 1, 0, 0, 0, DateTimeKind.Utc);

            var total = await db.Interactions.CountAsync(i => i.DeviceId == id);
            var thisMonth = await db.Interactions.CountAsync(
                i => i.DeviceId == id && i.Timestamp >= startOfMonth);

            var recent = await db.Interactions
                .AsNoTracking()
                .Where(i => i.DeviceId == id)
                .OrderByDescending(i => i.Timestamp)
                .Take(20)
                .Select(i => new { i.Timestamp, i.Source, i.UserAgent })
                .ToListAsync();

            return Results.Ok(new { total, thisMonth, recent });
        })
        .WithName("GetDeviceStats");
    }

    private static Guid GetBusinessId(ClaimsPrincipal user)
    {
        var sub = user.FindFirstValue(ClaimTypes.NameIdentifier)
               ?? user.FindFirstValue("sub");
        return Guid.TryParse(sub, out var id) ? id : Guid.Empty;
    }
}
