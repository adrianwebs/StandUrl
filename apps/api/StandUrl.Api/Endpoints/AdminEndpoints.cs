using System.Security.Claims;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using StandUrl.Api.Data;
using StandUrl.Api.Data.Entities;
using StandUrl.Api.Models.Requests;
using StandUrl.Api.Services;

namespace StandUrl.Api.Endpoints;

public static class AdminEndpoints
{
    public static void MapAdminEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/admin")
            .WithTags("Admin")
            .RequireAuthorization("SuperAdmin");

        // GET /api/admin/stats
        group.MapGet("/stats", async (AppDbContext db) =>
        {
            var now = DateTime.UtcNow;
            var startOfMonth = new DateTime(now.Year, now.Month, 1, 0, 0, 0, DateTimeKind.Utc);

            var totalBusinesses = await db.Businesses.CountAsync(b => b.Role != "superadmin");
            var activeBusinesses = await db.Businesses.CountAsync(b => b.Role != "superadmin" && b.IsActive);
            var totalDevices = await db.Devices.CountAsync();
            var activeDevices = await db.Devices.CountAsync(d => d.Status == "active");
            var totalScansMonth = await db.Interactions.CountAsync(i => i.Timestamp >= startOfMonth);
            var totalScansAllTime = await db.Interactions.CountAsync();

            return Results.Ok(new { totalBusinesses, activeBusinesses, totalDevices, activeDevices, totalScansMonth, totalScansAllTime });
        }).WithName("AdminGetStats");

        // GET /api/admin/businesses
        group.MapGet("/businesses", async (AppDbContext db) =>
        {
            var businesses = await db.Businesses
                .AsNoTracking()
                .Where(b => b.Role != "superadmin")
                .OrderByDescending(b => b.CreatedAt)
                .Select(b => new
                {
                    b.Id, b.Name, b.Slug, b.Email, b.Sector, b.Plan, b.IsActive, b.CreatedAt,
                    DeviceCount = b.Devices.Count,
                    TotalScans = b.Devices.Sum(d => d.Interactions.Count)
                })
                .ToListAsync();
            return Results.Ok(businesses);
        }).WithName("AdminListBusinesses");

        // POST /api/admin/businesses
        group.MapPost("/businesses", async (CreateBusinessRequest req, AppDbContext db, IEmailService emailService, ILogger<Program> logger) =>
        {
            if (string.IsNullOrWhiteSpace(req.Name) || string.IsNullOrWhiteSpace(req.Email))
                return Results.BadRequest(new { error = "Nombre y email son obligatorios." });

            var emailNorm = req.Email.ToLowerInvariant().Trim();
            if (await db.Businesses.AnyAsync(b => b.Email == emailNorm))
                return Results.Conflict(new { error = "Ya existe un negocio con ese email." });

            var tempPassword = GenerateTempPassword();
            var slug = GenerateSlug(req.Name);
            var slugBase = slug;
            var i = 1;
            while (await db.Businesses.AnyAsync(b => b.Slug == slug))
                slug = $"{slugBase}-{i++}";

            var business = new Business
            {
                Name = req.Name.Trim(), Slug = slug, Email = emailNorm,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(tempPassword),
                Sector = req.Sector ?? "otro", Plan = req.Plan ?? "free",
                Role = "business", IsActive = true
            };

            db.Businesses.Add(business);
            await db.SaveChangesAsync();

            try
            {
                await emailService.SendWelcomeEmailAsync(business.Name, business.Email, tempPassword);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "No se pudo enviar el email de bienvenida para {Email}", business.Email);
            }

            logger.LogInformation("Negocio creado por admin: {Name} ({Email})", business.Name, business.Email);

            return Results.Created($"/api/admin/businesses/{business.Id}", new
            {
                business.Id, business.Name, business.Slug, business.Email,
                business.Sector, business.Plan, business.IsActive, business.CreatedAt,
                DeviceCount = 0,
                TotalScans = 0
            });
        }).WithName("AdminCreateBusiness");

        // GET /api/admin/businesses/{id}
        group.MapGet("/businesses/{id:guid}", async (Guid id, AppDbContext db) =>
        {
            var business = await db.Businesses.AsNoTracking()
                .Where(b => b.Id == id && b.Role != "superadmin")
                .Select(b => new
                {
                    b.Id, b.Name, b.Slug, b.Email, b.Sector, b.Plan, b.IsActive, b.CreatedAt,
                    DeviceCount = b.Devices.Count,
                    TotalScans = b.Devices.Sum(d => d.Interactions.Count)
                })
                .FirstOrDefaultAsync();
            return business is null ? Results.NotFound() : Results.Ok(business);
        }).WithName("AdminGetBusiness");

        // PATCH /api/admin/businesses/{id}
        group.MapPatch("/businesses/{id:guid}", async (Guid id, UpdateBusinessRequest req, AppDbContext db) =>
        {
            var business = await db.Businesses.FirstOrDefaultAsync(b => b.Id == id && b.Role != "superadmin");
            if (business is null) return Results.NotFound();

            if (!string.IsNullOrWhiteSpace(req.Name)) business.Name = req.Name.Trim();
            if (!string.IsNullOrWhiteSpace(req.Sector)) business.Sector = req.Sector;
            if (!string.IsNullOrWhiteSpace(req.Plan)) business.Plan = req.Plan;
            if (req.IsActive.HasValue) business.IsActive = req.IsActive.Value;

            await db.SaveChangesAsync();
            return Results.Ok(new { business.Id, business.Name, business.Sector, business.Plan, business.IsActive });
        }).WithName("AdminUpdateBusiness");

        // POST /api/admin/businesses/{id}/resend-access
        group.MapPost("/businesses/{id:guid}/resend-access", async (Guid id, AppDbContext db, IEmailService emailService, ILogger<Program> logger) =>
        {
            var business = await db.Businesses.FirstOrDefaultAsync(b => b.Id == id && b.Role != "superadmin");
            if (business is null) return Results.NotFound(new { error = "Negocio no encontrado." });

            var tempPassword = GenerateTempPassword();
            business.PasswordHash = BCrypt.Net.BCrypt.HashPassword(tempPassword);
            await db.SaveChangesAsync();

            try
            {
                await emailService.SendWelcomeEmailAsync(business.Name, business.Email, tempPassword, isResend: true);
                logger.LogInformation("Email de acceso reenviado a {Email} para negocio {Name}", business.Email, business.Name);
                return Results.Ok(new { message = "Email de acceso reenviado con éxito.", email = business.Email });
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error al enviar email de acceso a {Email}", business.Email);
                return Results.Problem("La contraseña fue actualizada pero ocurrió un error al enviar el correo electrónico: " + ex.Message, statusCode: 500);
            }
        }).WithName("AdminResendBusinessAccess");

        // GET /api/admin/businesses/{id}/devices
        group.MapGet("/businesses/{id:guid}/devices", async (Guid id, AppDbContext db) =>
        {
            if (!await db.Businesses.AnyAsync(b => b.Id == id)) return Results.NotFound();

            var devices = await db.Devices.AsNoTracking()
                .Where(d => d.BusinessId == id)
                .OrderBy(d => d.CreatedAt)
                .Select(d => new
                {
                    d.Id, d.Token, d.Label, d.DestinationUrl, d.Status, d.ModelType, d.CreatedAt,
                    InteractionCount = d.Interactions.Count,
                    LastScan = d.Interactions.OrderByDescending(i => i.Timestamp)
                        .Select(i => (DateTime?)i.Timestamp).FirstOrDefault()
                })
                .ToListAsync();
            return Results.Ok(devices);
        }).WithName("AdminGetBusinessDevices");

        // POST /api/admin/businesses/{id}/devices
        group.MapPost("/businesses/{id:guid}/devices", async (Guid id, CreateDeviceRequest req, AppDbContext db, ITokenService tokenService) =>
        {
            if (!await db.Businesses.AnyAsync(b => b.Id == id && b.IsActive)) return Results.NotFound();

            if (string.IsNullOrWhiteSpace(req.Label) || string.IsNullOrWhiteSpace(req.DestinationUrl))
                return Results.BadRequest(new { error = "Label y DestinationUrl son obligatorios." });

            if (!Uri.TryCreate(req.DestinationUrl, UriKind.Absolute, out _))
                return Results.BadRequest(new { error = "DestinationUrl no es una URL valida." });

            var token = await tokenService.GenerateUniqueAsync(async t => await db.Devices.AnyAsync(d => d.Token == t));

            var device = new Device
            {
                BusinessId = id, Token = token, Label = req.Label,
                DestinationUrl = req.DestinationUrl, ModelType = req.ModelType ?? "generico"
            };

            db.Devices.Add(device);
            await db.SaveChangesAsync();

            return Results.Created($"/api/admin/businesses/{id}/devices/{device.Id}", new
            {
                device.Id, device.Token, device.Label, device.DestinationUrl,
                device.Status, device.ModelType, device.CreatedAt,
                InteractionCount = 0,
                LastScan = (DateTime?)null
            });
        }).WithName("AdminCreateDevice");

        // PATCH /api/admin/devices/{deviceId}
        group.MapPatch("/devices/{deviceId:guid}", async (Guid deviceId, UpdateDeviceRequest req, AppDbContext db, IRedisService redis) =>
        {
            var device = await db.Devices.FirstOrDefaultAsync(d => d.Id == deviceId);
            if (device is null) return Results.NotFound();

            if (!string.IsNullOrWhiteSpace(req.DestinationUrl) && req.DestinationUrl != device.DestinationUrl)
            {
                if (!Uri.TryCreate(req.DestinationUrl, UriKind.Absolute, out _))
                    return Results.BadRequest(new { error = "DestinationUrl no es una URL valida." });

                db.DestinationHistories.Add(new DestinationHistory
                {
                    DeviceId = device.Id, OldUrl = device.DestinationUrl, NewUrl = req.DestinationUrl
                });

                device.DestinationUrl = req.DestinationUrl;
                await redis.InvalidateDeviceAsync(device.Token);
            }

            if (!string.IsNullOrWhiteSpace(req.Label)) device.Label = req.Label;
            if (req.Status is not null) device.Status = req.Status;

            await db.SaveChangesAsync();
            return Results.Ok(new { device.Id, device.Token, device.Label, device.DestinationUrl, device.Status, device.ModelType });
        }).WithName("AdminUpdateDevice");

        // POST /api/admin/bootstrap — solo en Development o con flag
        group.MapPost("/bootstrap", async (AppDbContext db, IConfiguration config, IHostEnvironment env, ILogger<Program> logger) =>
        {
            if (!env.IsDevelopment() && config["Admin:BootstrapEnabled"] != "true")
                return Results.NotFound();

            if (await db.Businesses.AnyAsync(b => b.Role == "superadmin"))
                return Results.Conflict(new { error = "Ya existe un superadmin." });

            var email = config["Admin:SuperAdminEmail"];
            var password = config["Admin:SuperAdminPassword"];

            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
                return Results.BadRequest(new { error = "Configura Admin:SuperAdminEmail y Admin:SuperAdminPassword." });

            var admin = new Business
            {
                Name = "Admin", Slug = "admin", Email = email.ToLowerInvariant(),
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
                Sector = "otro", Plan = "pro", Role = "superadmin", IsActive = true
            };

            db.Businesses.Add(admin);
            await db.SaveChangesAsync();

            logger.LogWarning("Superadmin creado: {Email}", email);
            return Results.Ok(new { message = "Superadmin creado.", email });
        })
        .WithName("AdminBootstrap")
        .AllowAnonymous();
    }

    private static string GenerateTempPassword()
    {
        const string chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#";
        var random = new Random();
        return new string(Enumerable.Repeat(chars, 12).Select(s => s[random.Next(s.Length)]).ToArray());
    }

    private static string GenerateSlug(string name)
    {
        var slug = name.ToLowerInvariant().Trim();
        slug = Regex.Replace(slug, @"[áàäâ]", "a");
        slug = Regex.Replace(slug, @"[éèëê]", "e");
        slug = Regex.Replace(slug, @"[íìïî]", "i");
        slug = Regex.Replace(slug, @"[óòöô]", "o");
        slug = Regex.Replace(slug, @"[úùüû]", "u");
        slug = Regex.Replace(slug, @"[ñ]", "n");
        slug = Regex.Replace(slug, @"[^a-z0-9\s-]", "");
        slug = Regex.Replace(slug, @"\s+", "-");
        slug = Regex.Replace(slug, @"-+", "-").Trim('-');
        return slug[..Math.Min(slug.Length, 50)];
    }
}
