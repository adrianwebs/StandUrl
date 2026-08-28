using System.Text.RegularExpressions;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Utils;

namespace StandUrl.Api.Services;

public interface IEmailService
{
    Task SendProtoRequestNotificationAsync(string businessName, string sector,
        string city, string contact, string? googleMapsUrl);
    Task SendWelcomeEmailAsync(string businessName, string email, string tempPassword, bool isResend = false);
}

public class EmailService(IConfiguration config, ILogger<EmailService> logger) : IEmailService
{
    private readonly string _smtpHost = config["Smtp:Host"] ?? string.Empty;
    private readonly int _smtpPort = config.GetValue<int>("Smtp:Port", 465);
    private readonly bool _smtpUseSsl = config.GetValue<bool>("Smtp:UseSsl", true);
    private readonly string _smtpUser = config["Smtp:User"] ?? string.Empty;
    private readonly string _smtpPassword = config["Smtp:Password"] ?? string.Empty;
    private readonly string _fromEmail = config["Smtp:FromEmail"] ?? "adrian@webadir.es";
    private readonly string _fromName = config["Smtp:FromName"] ?? "StandUrl";
    private readonly string _notificationEmail = config["Smtp:NotificationEmail"] ?? "dev@standurl.com";
    private readonly string _siteUrl = config["App:SiteUrl"] ?? "http://localhost:3000";

    public async Task SendProtoRequestNotificationAsync(string businessName, string sector,
        string city, string contact, string? googleMapsUrl)
    {
        if (string.IsNullOrWhiteSpace(_smtpHost) || _smtpHost.StartsWith("#{"))
        {
            logger.LogInformation(
                "[DEV] Prototipo solicitado: {Name} | {Sector} | {City} | {Contact} | {Maps}",
                businessName, sector, city, contact, googleMapsUrl);
            return;
        }

        var subject = $"Nuevo prototipo solicitado: {businessName}";

        var textBody = $"""
            Nuevo prototipo solicitado:
            - Negocio: {businessName}
            - Sector: {sector}
            - Ciudad: {city}
            - Contacto: {contact}
            - Google Maps: {googleMapsUrl ?? "No proporcionado"}

            StandUrl API · Notificación automática
            """;

        var html = $"""
            <!DOCTYPE html>
            <html>
            <head><meta charset="utf-8"></head>
            <body style="font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;margin:0;padding:20px;background:#0A0A0A;color:#FAFAFA;">
              <div style="max-width:600px;margin:0 auto;background:#111111;color:#FAFAFA;padding:32px;border-radius:12px;border:1px solid #222;">
                <h2 style="color:#F5A623;margin-top:0;">Nuevo prototipo solicitado</h2>
                <table style="width:100%;border-collapse:collapse;color:#DDD;font-size:14px;margin-top:16px;">
                  <tr style="border-bottom:1px solid #222;"><td style="padding:10px 0;color:#888;width:140px;"><strong>Negocio:</strong></td><td style="font-weight:600;color:#FFF;">{businessName}</td></tr>
                  <tr style="border-bottom:1px solid #222;"><td style="padding:10px 0;color:#888;"><strong>Sector:</strong></td><td>{sector}</td></tr>
                  <tr style="border-bottom:1px solid #222;"><td style="padding:10px 0;color:#888;"><strong>Ciudad:</strong></td><td>{city}</td></tr>
                  <tr style="border-bottom:1px solid #222;"><td style="padding:10px 0;color:#888;"><strong>Contacto:</strong></td><td>{contact}</td></tr>
                  <tr style="border-bottom:1px solid #222;"><td style="padding:10px 0;color:#888;"><strong>Google Maps:</strong></td><td><a href="{googleMapsUrl}" style="color:#F5A623;">{googleMapsUrl ?? "No proporcionado"}</a></td></tr>
                </table>
                <p style="color:#555;font-size:12px;margin-top:24px;">StandUrl API · Notificación automática</p>
              </div>
            </body>
            </html>
            """;

        await SendEmailAsync(_notificationEmail, subject, html, textBody);
    }

    public async Task SendWelcomeEmailAsync(string businessName, string email, string tempPassword, bool isResend = false)
    {
        if (string.IsNullOrWhiteSpace(_smtpHost) || _smtpHost.StartsWith("#{"))
        {
            logger.LogInformation(
                "[DEV] {Type} a {Name} ({Email}) — contraseña temporal: {Pass}",
                isResend ? "Reenvío de acceso" : "Bienvenida", businessName, email, tempPassword);
            return;
        }

        var loginUrl = $"{_siteUrl.TrimEnd('/')}/login";
        var subject = isResend 
            ? "Tus nuevas credenciales de acceso — StandUrl"
            : "Bienvenido a StandUrl — Tus credenciales de acceso";

        var titleText = isResend ? "Tus nuevas credenciales de acceso" : $"¡Bienvenido a StandUrl, {businessName}!";
        var introText = isResend
            ? "Se ha generado una nueva contraseña temporal para acceder a tu panel de cliente de StandUrl:"
            : "Tu cuenta de cliente en StandUrl ha sido creada. Aquí tienes tus credenciales de acceso para gestionar tus stands NFC y consultar estadísticas:";

        var textBody = $"""
            {titleText}

            {introText}

            • Email de acceso: {email}
            • Contraseña temporal: {tempPassword}

            Accede a tu panel desde el siguiente enlace:
            {loginUrl}

            Recomendación de seguridad: Te sugerimos cambiar tu contraseña temporal desde tu panel tras iniciar sesión.

            ¿Tienes alguna duda o necesitas soporte? Responde directamente a este correo.

            © {DateTime.UtcNow.Year} StandUrl · Dispositivos Inteligentes NFC
            """;

        var html = $"""
            <!DOCTYPE html>
            <html lang="es">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>{subject}</title>
            </head>
            <body style="margin:0;padding:0;background-color:#0A0A0A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#FAFAFA;">
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;margin:30px auto;background-color:#111111;border:1px solid #222;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.5);">
                <!-- Header -->
                <tr>
                  <td align="center" style="padding:36px 30px 20px;border-bottom:1px solid #1A1A1A;">
                    <div style="font-size:26px;font-weight:800;letter-spacing:-0.5px;color:#F5A623;">
                      Stand<span style="color:#FAFAFA;">Url</span>
                    </div>
                    <div style="color:#777;font-size:13px;margin-top:4px;">Portal de Gestión de Stands NFC</div>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding:32px 30px;">
                    <h1 style="font-size:20px;font-weight:700;margin:0 0 16px;color:#FAFAFA;line-height:1.3;">
                      {titleText}
                    </h1>
                    <p style="font-size:14px;color:#AAA;line-height:1.6;margin:0 0 24px;">
                      {introText}
                    </p>

                    <!-- Credentials Box -->
                    <div style="background-color:#161616;border:1px solid #2A2A2A;border-radius:12px;padding:22px;margin:0 0 24px;">
                      <div style="margin-bottom:16px;">
                        <span style="display:block;font-size:11px;font-weight:700;color:#777;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Email de acceso</span>
                        <span style="font-size:15px;color:#FAFAFA;font-weight:600;">{email}</span>
                      </div>
                      <div>
                        <span style="display:block;font-size:11px;font-weight:700;color:#777;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Contraseña temporal</span>
                        <span style="font-family:ui-monospace,Menlo,Monaco,Consolas,monospace;font-size:20px;color:#F5A623;font-weight:700;letter-spacing:2px;background:#201808;padding:6px 12px;border-radius:6px;border:1px dashed #F5A623;display:inline-block;">{tempPassword}</span>
                      </div>
                    </div>

                    <p style="font-size:13px;color:#888;margin:0 0 24px;line-height:1.5;">
                      🔒 <strong>Recomendación de seguridad:</strong> Te sugerimos cambiar tu contraseña temporal desde tu panel tras iniciar sesión.
                    </p>

                    <!-- CTA Button -->
                    <div align="center" style="margin:30px 0 16px;">
                      <a href="{loginUrl}" style="background-color:#F5A623;color:#0A0A0A;padding:14px 32px;font-size:14px;font-weight:700;text-decoration:none;border-radius:8px;display:inline-block;box-shadow:0 4px 14px rgba(245,166,35,0.3);">
                        Acceder al Portal del Cliente →
                      </a>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding:24px 30px;background-color:#0A0A0A;border-top:1px solid #1A1A1A;text-align:center;">
                    <p style="font-size:12px;color:#555;margin:0 0 6px;">
                      ¿Tienes alguna duda o necesitas soporte? Responde directamente a este correo.
                    </p>
                    <p style="font-size:11px;color:#444;margin:0;">
                      © {DateTime.UtcNow.Year} StandUrl · Dispositivos Inteligentes NFC
                    </p>
                  </td>
                </tr>
              </table>
            </body>
            </html>
            """;

        await SendEmailAsync(email, subject, html, textBody);
    }

    private async Task SendEmailAsync(string toEmail, string subject, string htmlBody, string? textBody = null)
    {
        try
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(_fromName, _fromEmail));
            message.To.Add(MailboxAddress.Parse(toEmail));
            message.Subject = subject;
            message.Date = DateTimeOffset.UtcNow;

            var fromDomain = _fromEmail.Contains('@') ? _fromEmail.Split('@')[1] : "standurl.com";
            message.MessageId = MimeUtils.GenerateMessageId(fromDomain);
            message.Headers.Add("X-Mailer", "StandUrl Mailer");

            // Multipart/Alternative: clave fundamental para evitar filtros de SPAM
            var plainText = !string.IsNullOrWhiteSpace(textBody)
                ? textBody
                : Regex.Replace(htmlBody, "<[^>]*>", " ").Trim();

            var builder = new BodyBuilder
            {
                HtmlBody = htmlBody,
                TextBody = plainText
            };

            message.Body = builder.ToMessageBody();

            using var client = new SmtpClient();
            client.Timeout = 10000; // Timeout de 10s para evitar bloqueos
            client.ServerCertificateValidationCallback = (s, c, h, e) => true;

            var socketOption = _smtpPort switch
            {
                465 => SecureSocketOptions.SslOnConnect,
                587 => SecureSocketOptions.StartTls,
                _ => _smtpUseSsl ? SecureSocketOptions.Auto : SecureSocketOptions.None
            };

            await client.ConnectAsync(_smtpHost, _smtpPort, socketOption);

            // Optimización de handshake de autenticación
            client.AuthenticationMechanisms.Remove("XOAUTH2");

            if (!string.IsNullOrWhiteSpace(_smtpUser) && !string.IsNullOrWhiteSpace(_smtpPassword))
            {
                await client.AuthenticateAsync(_smtpUser, _smtpPassword);
            }

            await client.SendAsync(message);
            await client.DisconnectAsync(false); // Cierre rápido sin esperar ACK redundante

            logger.LogInformation("Email enviado con éxito a {ToEmail} (Asunto: {Subject})", toEmail, subject);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error enviando email SMTP a {ToEmail}: {Message}", toEmail, ex.Message);
            throw;
        }
    }
}
