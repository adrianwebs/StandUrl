namespace StandUrl.Api.Data.Entities;

public class DestinationHistory
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid DeviceId { get; set; }
    public Device Device { get; set; } = null!;
    public string OldUrl { get; set; } = string.Empty;
    public string NewUrl { get; set; } = string.Empty;
    public DateTime ChangedAt { get; set; } = DateTime.UtcNow;
}
