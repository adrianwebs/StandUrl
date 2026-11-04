using Microsoft.EntityFrameworkCore;
using StandUrl.Api.Data;
using StandUrl.Api.Data.Entities;

namespace StandUrl.Api.Services;

public interface IFileTrackingService
{
    Task RecordAsync(Guid fileLinkId, string type, string? userAgent);
}

/// <summary>
/// Registra aperturas y descargas en background (igual que InteractionService)
/// y avisa por email al negocio la PRIMERA vez que un destinatario descarga el fichero.
/// </summary>
public class FileTrackingService(IServiceScopeFactory scopeFactory, ILogger<FileTrackingService> logger)
    : IFileTrackingService
{
    public async Task RecordAsync(Guid fileLinkId, string type, string? userAgent)
    {
        try
        {
            await using var scope = scopeFactory.CreateAsyncScope();
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var now = DateTime.UtcNow;

            db.FileLinkEvents.Add(new FileLinkEvent
            {
                FileLinkId = fileLinkId,
                Type = type,
                Timestamp = now,
                UserAgent = userAgent?.Length > 512 ? userAgent[..512] : userAgent
            });
            await db.SaveChangesAsync();

            // Actualizaciones atómicas de los contadores (evita carreras entre peticiones simultáneas)
            var links = db.FileLinks.Where(l => l.Id == fileLinkId);
            var firstDownload = false;

            if (type == "download")
            {
                // Solo una petición gana el "primer descarga" → un único email de aviso
                firstDownload = await links
                    .Where(l => l.FirstDownloadedAt == null)
                    .ExecuteUpdateAsync(s => s.SetProperty(l => l.FirstDownloadedAt, (DateTime?)now)) > 0;

                await links.ExecuteUpdateAsync(s => s
                    .SetProperty(l => l.DownloadCount, l => l.DownloadCount + 1)
                    .SetProperty(l => l.LastDownloadedAt, (DateTime?)now));
            }
            else
            {
                await links
                    .Where(l => l.FirstOpenedAt == null)
                    .ExecuteUpdateAsync(s => s.SetProperty(l => l.FirstOpenedAt, (DateTime?)now));

                await links.ExecuteUpdateAsync(s => s
                    .SetProperty(l => l.OpenCount, l => l.OpenCount + 1));
            }

            if (firstDownload)
            {
                var info = await db.FileLinks
                    .AsNoTracking()
                    .Where(l => l.Id == fileLinkId)
                    .Select(l => new
                    {
                        l.RecipientName,
                        l.RecipientEmail,
                        FileName = l.SharedFile.OriginalName,
                        BusinessName = l.SharedFile.Business.Name,
                        BusinessEmail = l.SharedFile.Business.Email
                    })
                    .FirstOrDefaultAsync();

                if (info is not null)
                {
                    var email = scope.ServiceProvider.GetRequiredService<IEmailService>();
                    await email.SendFileDownloadedNotificationAsync(
                        info.BusinessEmail, info.BusinessName, info.RecipientName,
                        info.RecipientEmail, info.FileName, now);
                }
            }
        }
        catch (Exception ex)
        {
            // El seguimiento nunca puede romper la descarga — solo log
            logger.LogWarning(ex, "Error al registrar evento {Type} del enlace {LinkId}", type, fileLinkId);
        }
    }
}
