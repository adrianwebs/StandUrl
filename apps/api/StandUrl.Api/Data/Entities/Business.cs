namespace StandUrl.Api.Data.Entities;

public class Business
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Sector { get; set; } = "otro"; // gimnasio | peluqueria | restaurante | otro
    public string Plan { get; set; } = "free";   // free | pro
    public string Role { get; set; } = "business"; // business | superadmin
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Device> Devices { get; set; } = [];
}
