using System.Text;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StackExchange.Redis;
using StandUrl.Api.Data;
using StandUrl.Api.Endpoints;
using StandUrl.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// ── Base de datos SQL Server ─────────────────────────────────────────────────
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        sql => sql.EnableRetryOnFailure(3)
    )
);

// ── Redis ────────────────────────────────────────────────────────────────────
var redisConn = builder.Configuration["Redis:ConnectionString"]
    ?? "localhost:6379";
builder.Services.AddSingleton<IConnectionMultiplexer>(sp =>
{
    var options = ConfigurationOptions.Parse(redisConn);
    options.AbortOnConnectFail = false;
    options.ConnectTimeout = 5000;
    options.SyncTimeout = 5000;
    return ConnectionMultiplexer.Connect(options);
});

// ── Servicios propios ────────────────────────────────────────────────────────
builder.Services.AddSingleton<ITokenService, TokenService>();
builder.Services.AddSingleton<IRedisService, RedisService>();
builder.Services.AddScoped<IInteractionService, InteractionService>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IEmailService, EmailService>();

// ── JWT Authentication ───────────────────────────────────────────────────────
var jwtSecret = builder.Configuration["Jwt:Secret"]
    ?? throw new InvalidOperationException("Jwt:Secret no configurado.");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)),
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"] ?? "standurl-api",
            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"] ?? "standurl-web",
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("SuperAdmin", policy =>
        policy.RequireAssertion(ctx =>
            ctx.User.IsInRole("superadmin") || ctx.User.HasClaim("role", "superadmin")));
});

// ── CORS ─────────────────────────────────────────────────────────────────────
var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>() ?? ["http://localhost:3000"];

builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials()
    )
);

// ── Rate Limiting ────────────────────────────────────────────────────────────
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("auth", o =>
    {
        o.PermitLimit = builder.Configuration.GetValue<int>("RateLimit:AuthMaxRequestsPerMinute", 100);
        o.Window = TimeSpan.FromMinutes(1);
    });

    options.AddFixedWindowLimiter("api", o =>
    {
        o.PermitLimit = builder.Configuration.GetValue<int>("RateLimit:ApiMaxRequestsPerMinute", 500);
        o.Window = TimeSpan.FromMinutes(1);
    });

    options.RejectionStatusCode = 429;
});

// ── OpenAPI / Scalar ─────────────────────────────────────────────────────────
builder.Services.AddOpenApi();

// ────────────────────────────────────────────────────────────────────────────
var app = builder.Build();

// ── Middleware ───────────────────────────────────────────────────────────────
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi(); // Accesible en /openapi/v1.json
}

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseCors();
app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();

// ── Migración automática de base de datos ────────────────────────────────────
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    try
    {
        logger.LogInformation("Aplicando migraciones automáticas de Entity Framework Core...");
        await db.Database.MigrateAsync();
        logger.LogInformation("Migraciones aplicadas con éxito sobre la base de datos.");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Error crítico al aplicar las migraciones de base de datos: {Message}", ex.Message);
        throw;
    }
}

// ── Endpoints ────────────────────────────────────────────────────────────────
app.MapHealthEndpoints();
app.MapRedirectEndpoints();
app.MapAuthEndpoints();
app.MapBusinessEndpoints();
app.MapDeviceEndpoints();
app.MapProtoRequestEndpoints();
app.MapAdminEndpoints();

app.Run();

// Necesario para que los tests de integración puedan acceder al Program
public partial class Program { }
