using StackExchange.Redis;

namespace StandUrl.Api.Services;

public interface IRedisService
{
    Task<string?> GetDeviceDestinationAsync(string token);
    Task SetDeviceDestinationAsync(string token, string destination, TimeSpan? expiry = null);
    Task InvalidateDeviceAsync(string token);
}

public class RedisService(IConnectionMultiplexer redis, ILogger<RedisService> logger) : IRedisService
{
    private static string Key(string token) => $"device:{token}";

    public async Task<string?> GetDeviceDestinationAsync(string token)
    {
        try
        {
            if (!redis.IsConnected) return null;
            var db = redis.GetDatabase();
            var value = await db.StringGetAsync(Key(token));
            return value.HasValue ? value.ToString() : null;
        }
        catch (Exception ex)
        {
            logger.LogWarning(ex, "Redis no disponible al obtener token {Token}, fallback a BD", token);
            return null;
        }
    }

    public async Task SetDeviceDestinationAsync(string token, string destination, TimeSpan? expiry = null)
    {
        try
        {
            if (!redis.IsConnected) return;
            var db = redis.GetDatabase();
            await db.StringSetAsync(Key(token), destination, expiry ?? TimeSpan.FromHours(1));
        }
        catch (Exception ex)
        {
            logger.LogWarning(ex, "Redis no disponible al cachear token {Token}", token);
        }
    }

    public async Task InvalidateDeviceAsync(string token)
    {
        try
        {
            if (!redis.IsConnected) return;
            var db = redis.GetDatabase();
            await db.KeyDeleteAsync(Key(token));
        }
        catch (Exception ex)
        {
            logger.LogWarning(ex, "Redis no disponible al invalidar token {Token}", token);
        }
    }
}
