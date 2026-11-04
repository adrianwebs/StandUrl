using Xunit;
using StandUrl.Api.Endpoints;

namespace StandUrl.Api.Tests;

public class FileSharingTests
{
    [Theory]
    [InlineData("presupuesto.pdf", "presupuesto.pdf")]
    [InlineData("C:\\Users\\ana\\Desktop\\oferta.docx", "oferta.docx")]
    [InlineData("../../etc/passwd", "passwd")]
    [InlineData("mal\"nombre.txt", "malnombre.txt")]
    [InlineData("", "fichero")]
    [InlineData(null, "fichero")]
    public void SanitizeFileName_QuitaRutasYCaracteresPeligrosos(string? input, string expected)
    {
        Assert.Equal(expected, FileEndpoints.SanitizeFileName(input));
    }

    [Fact]
    public void SanitizeFileName_RecortaNombresLargosConservandoExtension()
    {
        var name = new string('a', 400) + ".pdf";
        var result = FileEndpoints.SanitizeFileName(name);

        Assert.Equal(255, result.Length);
        Assert.EndsWith(".pdf", result);
    }

    [Theory]
    [InlineData(512, "512 B")]
    [InlineData(2048, "2 KB")]
    [InlineData(5 * 1024 * 1024, "5 MB")]
    public void FormatSize_DevuelveUnidadLegible(long bytes, string expected)
    {
        Assert.Equal(expected, DownloadEndpoints.FormatSize(bytes).Replace(',', '.'));
    }
}
