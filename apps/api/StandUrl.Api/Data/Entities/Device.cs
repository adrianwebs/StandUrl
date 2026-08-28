namespace StandUrl.Api.Data.Entities;

public class Device
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid BusinessId { get; set; }
    public Business Business { get; set; } = null!;

    /// <summary>8 caracteres base62 aleatorios — NUNCA correlativo</summary>
    public string Token { get; set; } = string.Empty;
    public string Label { get; set; } = string.Empty;       // "Entrada", "Barra"…
    public string DestinationUrl { get; set; } = string.Empty;
    public string Status { get; set; } = "active";          // active | inactive
    public string ModelType { get; set; } = "generico";     // pesa | tijeras | taza | plato | generico
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Interaction> Interactions { get; set; } = [];
    public ICollection<DestinationHistory> History { get; set; } = [];
}
