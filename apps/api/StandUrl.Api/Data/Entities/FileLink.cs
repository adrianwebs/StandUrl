namespace StandUrl.Api.Data.Entities;

/// <summary>
/// Enlace personal de descarga: uno por destinatario, así se sabe QUIÉN lo ha abierto/descargado.
/// </summary>
public class FileLink
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid SharedFileId { get; set; }
    public SharedFile SharedFile { get; set; } = null!;

    /// <summary>8 caracteres base62 aleatorios — NUNCA correlativo</summary>
    public string Token { get; set; } = string.Empty;

    public string RecipientName { get; set; } = string.Empty;
    public string? RecipientEmail { get; set; }

    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Resumen desnormalizado para listar sin agregar eventos
    public int OpenCount { get; set; }
    public int DownloadCount { get; set; }
    public DateTime? FirstOpenedAt { get; set; }
    public DateTime? FirstDownloadedAt { get; set; }
    public DateTime? LastDownloadedAt { get; set; }

    public ICollection<FileLinkEvent> Events { get; set; } = [];
}
