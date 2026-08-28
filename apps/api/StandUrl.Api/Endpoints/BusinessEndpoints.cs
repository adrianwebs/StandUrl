using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using StandUrl.Api.Data;
using StandUrl.Api.Models.Requests;

namespace StandUrl.Api.Endpoints;

public static class BusinessEndpoints
{
    public static void MapBusinessEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/businesses")
            .WithTags("Businesses")
            .RequireAuthorization();

        // ── GET /api/businesses/me ─────────────────────────────────────────────
        group.MapGet("/me", async (ClaimsPrincipal user, AppDbContext db) =>
        {
            var businessId = GetBusinessId(user);
            if (businessId == Guid.Empty) return Results.Unauthorized();

            var business = await db.Businesses
                .AsNoTracking()
                .Where(b => b.Id == businessId)
                .Select(b => new
                {
                    b.Id,
                    b.Name,
                    b.Slug,
                    b.Email,
                    b.Sector,
                    b.Plan,
                    b.CreatedAt,
                    DeviceCount = b.Devices.Count
                })
                .FirstOrDefaultAsync();

            return business is null ? Results.NotFound() : Results.Ok(business);
        })
        .WithName("GetMe");

        // ── GET /api/businesses/me/stats ──────────────────────────────────────
        group.MapGet("/me/stats", async (ClaimsPrincipal user, AppDbContext db) =>
        {
            var businessId = GetBusinessId(user);
            if (businessId == Guid.Empty) return Results.Unauthorized();

            var now = DateTime.UtcNow;
            var startOfMonth = new DateTime(now.Year, now.Month, 1, 0, 0, 0, DateTimeKind.Utc);
            var startOfLastMonth = startOfMonth.AddMonths(-1);

            var deviceIds = await db.Devices
                .Where(d => d.BusinessId == businessId)
                .Select(d => d.Id)
                .ToListAsync();

            var thisMonth = await db.Interactions
                .Where(i => deviceIds.Contains(i.DeviceId) && i.Timestamp >= startOfMonth)
                .CountAsync();

            var lastMonth = await db.Interactions
                .Where(i => deviceIds.Contains(i.DeviceId)
                    && i.Timestamp >= startOfLastMonth
                    && i.Timestamp < startOfMonth)
                .CountAsync();

            var trend = lastMonth == 0 ? 0.0
                : Math.Round((thisMonth - lastMonth) / (double)lastMonth * 100, 1);

            return Results.Ok(new
            {
                thisMonth,
                lastMonth,
                trendPercent = trend,
                totalDevices = deviceIds.Count
            });
        })
        .WithName("GetMyStats");

        // ── POST /api/businesses/me/change-password ───────────────────────────
        group.MapPost("/me/change-password", async (ChangePasswordRequest req, ClaimsPrincipal user, AppDbContext db) =>
        {
            var businessId = GetBusinessId(user);
            if (businessId == Guid.Empty) return Results.Unauthorized();

            if (string.IsNullOrWhiteSpace(req.CurrentPassword) || string.IsNullOrWhiteSpace(req.NewPassword))
                return Results.BadRequest(new { error = "La contraseña actual y la nueva son obligatorias." });

            if (req.NewPassword.Length < 6)
                return Results.BadRequest(new { error = "La nueva contraseña debe tener al menos 6 caracteres." });

            var business = await db.Businesses.FirstOrDefaultAsync(b => b.Id == businessId);
            if (business is null) return Results.NotFound();

            if (!BCrypt.Net.BCrypt.Verify(req.CurrentPassword, business.PasswordHash))
                return Results.BadRequest(new { error = "La contraseña actual no es correcta." });

            business.PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.NewPassword);
            await db.SaveChangesAsync();

            return Results.Ok(new { message = "Contraseña actualizada correctamente." });
        })
        .WithName("ChangeMyPassword");
    }

    private static Guid GetBusinessId(ClaimsPrincipal user)
    {
        var sub = user.FindFirstValue(ClaimTypes.NameIdentifier)
               ?? user.FindFirstValue("sub");
        return Guid.TryParse(sub, out var id) ? id : Guid.Empty;
    }
}
