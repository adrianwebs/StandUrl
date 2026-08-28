namespace StandUrl.Api.Endpoints;

public static class HealthEndpoints
{
    public static void MapHealthEndpoints(this WebApplication app)
    {
        app.MapGet("/health", () => Results.Ok(new
        {
            status = "ok",
            timestamp = DateTime.UtcNow,
            version = "1.0.0"
        }))
        .WithName("Health")
        .WithTags("Health")
        .AllowAnonymous();

        app.MapGet("/", () => Results.Ok(new
        {
            service = "StandUrl API",
            status = "online",
            docs = "/openapi/v1.json",
            timestamp = DateTime.UtcNow
        }))
        .WithName("Root")
        .WithTags("Health")
        .AllowAnonymous();
    }
}
