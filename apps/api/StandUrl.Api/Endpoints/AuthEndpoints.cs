using Microsoft.EntityFrameworkCore;
using StandUrl.Api.Data;
using StandUrl.Api.Models.Requests;
using StandUrl.Api.Services;

namespace StandUrl.Api.Endpoints;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/auth").WithTags("Auth");

        // ── POST /api/auth/login ──────────────────────────────────────────────
        group.MapPost("/login", async (LoginRequest req, AppDbContext db, IJwtService jwt) =>
        {
            if (string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrWhiteSpace(req.Password))
                return Results.BadRequest(new { error = "Email y contraseña son obligatorios." });

            var business = await db.Businesses
                .AsNoTracking()
                .FirstOrDefaultAsync(b => b.Email == req.Email.ToLowerInvariant());

            if (business is null || !BCrypt.Net.BCrypt.Verify(req.Password, business.PasswordHash))
                return Results.Unauthorized();

            if (!business.IsActive)
                return Results.Forbid();

            var tokens = jwt.GenerateTokenPair(business.Id, business.Email, business.Plan, business.Role);

            return Results.Ok(new
            {
                accessToken = tokens.AccessToken,
                businessId = business.Id,
                name = business.Name,
                plan = business.Plan,
                role = business.Role
            });
        })
        .WithName("Login")
        .AllowAnonymous();

        // ── POST /api/auth/logout ──────────────────────────────────────────────
        group.MapPost("/logout", (HttpContext ctx) =>
        {
            ctx.Response.Cookies.Delete("refresh_token");
            return Results.Ok(new { message = "Sesión cerrada." });
        })
        .WithName("Logout")
        .RequireAuthorization();
    }
}
