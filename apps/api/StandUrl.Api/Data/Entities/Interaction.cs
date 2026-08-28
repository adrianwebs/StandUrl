namespace StandUrl.Api.Data.Entities;

public class Interaction
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid DeviceId { get; set; }
    public Device Device { get; set; } = null!;
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public string Source { get; set; } = "unknown"; // nfc | qr | unknown
    public string? UserAgent { get; set; }
}
