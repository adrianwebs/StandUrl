using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace StandUrl.Api.Services;

public record TokenPair(string AccessToken, string RefreshToken);

public interface IJwtService
{
    TokenPair GenerateTokenPair(Guid businessId, string email, string plan, string role);
    ClaimsPrincipal? ValidateAccessToken(string token);
    string GenerateRefreshToken();
}

public class JwtService(IConfiguration config) : IJwtService
{
    private readonly string _secret = config["Jwt:Secret"]
        ?? throw new InvalidOperationException("Jwt:Secret no configurado");
    private readonly int _expiryMinutes = config.GetValue<int>("Jwt:ExpiryMinutes", 60);
    private readonly string _issuer = config["Jwt:Issuer"] ?? "standurl-api";
    private readonly string _audience = config["Jwt:Audience"] ?? "standurl-web";

    public TokenPair GenerateTokenPair(Guid businessId, string email, string plan, string role)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, businessId.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, email),
            new Claim("plan", plan),
            new Claim("role", role),
            new Claim(ClaimTypes.Role, role),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: _issuer,
            audience: _audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_expiryMinutes),
            signingCredentials: creds
        );

        return new TokenPair(
            AccessToken: new JwtSecurityTokenHandler().WriteToken(token),
            RefreshToken: GenerateRefreshToken()
        );
    }

    public ClaimsPrincipal? ValidateAccessToken(string token)
    {
        try
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secret));
            var handler = new JwtSecurityTokenHandler();
            return handler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateIssuer = true,
                ValidIssuer = _issuer,
                ValidateAudience = true,
                ValidAudience = _audience,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            }, out _);
        }
        catch
        {
            return null;
        }
    }

    public string GenerateRefreshToken()
    {
        var bytes = RandomNumberGenerator.GetBytes(64);
        return Convert.ToBase64String(bytes);
    }
}
