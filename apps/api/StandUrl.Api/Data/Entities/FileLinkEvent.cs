namespace StandUrl.Api.Data.Entities;

/// <summary>Cada apertura de la página o descarga real del fichero.</summary>
public class FileLinkEvent
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid FileLinkId { get; set; }
    public FileLink FileLink { get; set; } = null!;

    public string Type { get; set; } = "open"; // open | download
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public string? UserAgent { get; set; }
}
