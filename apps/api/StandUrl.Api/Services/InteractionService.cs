using Microsoft.EntityFrameworkCore;
using StandUrl.Api.Data;
using StandUrl.Api.Data.Entities;

namespace StandUrl.Api.Services;

public interface IInteractionService
{
    Task RecordAsync(Guid deviceId, string source, string? userAgent);
}

/// <summary>
/// Registra interacciones de forma asíncrona y no bloqueante.
/// NUNCA debe usarse de forma que bloquee el redirect.
/// </summary>
public class InteractionService(IServiceScopeFactory scopeFactory, ILogger<InteractionService> logger)
    : IInteractionService
{
    public async Task RecordAsync(Guid deviceId, string source, string? userAgent)
    {
        try
        {
            // Scope propio porque DbContext no es thread-safe
            await using var scope = scopeFactory.CreateAsyncScope();
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            db.Interactions.Add(new Interaction
            {
                DeviceId = deviceId,
                Source = source,
                UserAgent = userAgent?.Length > 512 ? userAgent[..512] : userAgent,
                Timestamp = DateTime.UtcNow
            });

            await db.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            // La analítica no puede tumbar el negocio — solo log
            logger.LogWarning(ex, "Error al registrar interacción para device {DeviceId}", deviceId);
        }
    }
}
