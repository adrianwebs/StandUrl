using System.Security.Cryptography;

namespace StandUrl.Api.Services;

public interface IFileStorageService
{
    /// <summary>Guarda el contenido y devuelve el nombre interno con el que quedó en disco.</summary>
    Task<string> SaveAsync(Stream content, CancellationToken ct = default);
    Stream? OpenRead(string storedName);
    void Delete(string storedName);
}

/// <summary>
/// Almacenamiento en disco local (montar un volumen Docker en producción).
/// Los nombres internos son aleatorios y hex: nunca se usa el nombre que sube el usuario,
/// así no hay path traversal ni colisiones.
/// </summary>
public class LocalFileStorageService : IFileStorageService
{
    private readonly string _root;

    public LocalFileStorageService(IConfiguration config, IWebHostEnvironment env)
    {
        var configured = config["Storage:FilesPath"];
        _root = string.IsNullOrWhiteSpace(configured) || configured.StartsWith("#{")
            ? Path.Combine(env.ContentRootPath, "data", "files")
            : configured;
        Directory.CreateDirectory(_root);
    }

    public async Task<string> SaveAsync(Stream content, CancellationToken ct = default)
    {
        var storedName = Convert.ToHexString(RandomNumberGenerator.GetBytes(16)).ToLowerInvariant();
        var path = Path.Combine(_root, storedName);
        await using var fs = new FileStream(path, FileMode.CreateNew, FileAccess.Write, FileShare.None, 81920, useAsync: true);
        await content.CopyToAsync(fs, ct);
        return storedName;
    }

    public Stream? OpenRead(string storedName)
    {
        var path = ResolvePath(storedName);
        return path is not null && File.Exists(path)
            ? new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read, 81920, useAsync: true)
            : null;
    }

    public void Delete(string storedName)
    {
        var path = ResolvePath(storedName);
        if (path is not null && File.Exists(path)) File.Delete(path);
    }

    private string? ResolvePath(string storedName)
    {
        // Solo nombres generados por nosotros (32 hex)
        if (storedName.Length != 32 || !storedName.All(Uri.IsHexDigit)) return null;
        return Path.Combine(_root, storedName);
    }
}
