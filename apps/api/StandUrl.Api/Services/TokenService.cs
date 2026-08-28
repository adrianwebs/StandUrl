using System.Security.Cryptography;

namespace StandUrl.Api.Services;

public interface ITokenService
{
    string Generate();
    Task<string> GenerateUniqueAsync(Func<string, Task<bool>> existsAsync);
}

public class TokenService : ITokenService
{
    private const string Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private const int TokenLength = 8;

    public string Generate()
    {
        var bytes = RandomNumberGenerator.GetBytes(TokenLength * 2);
        var chars = new char[TokenLength];
        for (int i = 0; i < TokenLength; i++)
        {
            // Usar módulo sobre 62 — los bytes altos se descartan para evitar sesgo
            var value = BitConverter.ToUInt16(bytes, i * 2) % Alphabet.Length;
            chars[i] = Alphabet[value];
        }
        return new string(chars);
    }

    public async Task<string> GenerateUniqueAsync(Func<string, Task<bool>> existsAsync)
    {
        const int maxAttempts = 10;
        for (int i = 0; i < maxAttempts; i++)
        {
            var token = Generate();
            if (!await existsAsync(token))
                return token;
        }
        throw new InvalidOperationException("No se pudo generar un token único tras varios intentos.");
    }
}
