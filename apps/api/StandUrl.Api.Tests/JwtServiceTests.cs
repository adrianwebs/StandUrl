using Microsoft.Extensions.Configuration;
using StandUrl.Api.Services;
using Xunit;

namespace StandUrl.Api.Tests;

public class JwtServiceTests
{
    private readonly IJwtService _jwt;

    public JwtServiceTests()
    {
        var inMemorySettings = new Dictionary<string, string?>
        {
            {"Jwt:Secret", "this_is_a_very_secure_and_long_jwt_secret_key_for_unit_tests_12345!"},
            {"Jwt:Issuer", "standurl-api"},
            {"Jwt:Audience", "standurl-web"},
            {"Jwt:ExpiryMinutes", "60"}
        };

        IConfiguration configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(inMemorySettings)
            .Build();

        _jwt = new JwtService(configuration);
    }

    [Fact]
    public void GenerateTokenPair_IncludesRoleClaim()
    {
        var businessId = Guid.NewGuid();
        var email = "admin@standurl.com";
        var plan = "pro";
        var role = "superadmin";

        var pair = _jwt.GenerateTokenPair(businessId, email, plan, role);

        Assert.NotNull(pair.AccessToken);
        Assert.NotNull(pair.RefreshToken);

        var principal = _jwt.ValidateAccessToken(pair.AccessToken);
        Assert.NotNull(principal);

        var roleClaim = principal.FindFirst(System.Security.Claims.ClaimTypes.Role)?.Value
            ?? principal.FindFirst("role")?.Value;
        Assert.Equal("superadmin", roleClaim);
        Assert.True(principal.IsInRole("superadmin"));

        var planClaim = principal.FindFirst("plan")?.Value;
        Assert.Equal("pro", planClaim);
    }
}