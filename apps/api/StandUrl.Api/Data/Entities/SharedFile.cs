namespace StandUrl.Api.Data.Entities;

/// <summary>
/// Fichero subido por un negocio para compartirlo con enlaces de descarga con seguimiento.
/// </summary>
public class SharedFile
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid BusinessId { get; set; }
    public Business Business { get; set; } = null!;

    /// <summary>Nombre original con el que se subió (el que verá quien lo descarga).</summary>
    public string OriginalName { get; set; } = string.Empty;

    /// <summary>Nombre interno en disco (aleatorio, nunca derivado del nombre original).</summary>
    public string StoredName { get; set; } = string.Empty;

    public string ContentType { get; set; } = "application/octet-stream";
    public long SizeBytes { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<FileLink> Links { get; set; } = [];
}
