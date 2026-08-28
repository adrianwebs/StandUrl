namespace StandUrl.Api.Models.Requests;

public record LoginRequest(string Email, string Password);

public record CreateDeviceRequest(
    string Label,
    string DestinationUrl,
    string? ModelType = "generico"
);

public record UpdateDeviceRequest(
    string? Label = null,
    string? DestinationUrl = null,
    string? Status = null
);

public record ProtoRequestModel(
    string BusinessName,
    string? Sector,
    string City,
    string Contact,
    string? GoogleMapsUrl = null
);

// ── Admin requests ────────────────────────────────────────────────────────────

public record CreateBusinessRequest(
    string Name,
    string Email,
    string? Sector = "otro",
    string? Plan = "free"
);

public record UpdateBusinessRequest(
    string? Name = null,
    string? Sector = null,
    string? Plan = null,
    bool? IsActive = null
);

public record ChangePasswordRequest(
    string CurrentPassword,
    string NewPassword
);
