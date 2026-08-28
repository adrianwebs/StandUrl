using StandUrl.Api.Services;
using Xunit;

namespace StandUrl.Api.Tests;

public class TokenServiceTests
{
    private readonly TokenService _service = new();

    [Fact]
    public void Generate_Returns8CharBase62String()
    {
        var token = _service.Generate();

        Assert.NotNull(token);
        Assert.Equal(8, token.Length);
        Assert.Matches("^[a-zA-Z0-9]{8}$", token);
    }

    [Fact]
    public async Task GenerateUniqueAsync_ReturnsUniqueToken()
    {
        var used = new HashSet<string>();
        
        var token = await _service.GenerateUniqueAsync(t => Task.FromResult(used.Contains(t)));

        Assert.NotNull(token);
        Assert.Equal(8, token.Length);
    }
}
