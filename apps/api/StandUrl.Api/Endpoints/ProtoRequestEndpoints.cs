using StandUrl.Api.Models.Requests;
using StandUrl.Api.Services;

namespace StandUrl.Api.Endpoints;

public static class ProtoRequestEndpoints
{
    public static void MapProtoRequestEndpoints(this WebApplication app)
    {
        app.MapPost("/api/proto-request", async (
            ProtoRequestModel req,
            IEmailService email,
            ILogger<Program> logger) =>
        {
            if (string.IsNullOrWhiteSpace(req.BusinessName)
                || string.IsNullOrWhiteSpace(req.City)
                || string.IsNullOrWhiteSpace(req.Contact))
            {
                return Results.BadRequest(new
                {
                    error = "Nombre del negocio, ciudad y contacto son obligatorios."
                });
            }

            logger.LogInformation(
                "Prototipo solicitado: {Name} | {Sector} | {City}",
                req.BusinessName, req.Sector, req.City);

            await email.SendProtoRequestNotificationAsync(
                req.BusinessName,
                req.Sector ?? "otro",
                req.City,
                req.Contact,
                req.GoogleMapsUrl
            );

            return Results.Ok(new
            {
                message = "¡Recibido! Te contactaremos en menos de 24 horas."
            });
        })
        .WithName("ProtoRequest")
        .WithTags("ProtoRequest")
        .AllowAnonymous();
    }
}
