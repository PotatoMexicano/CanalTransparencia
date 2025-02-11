using MimeTypes;
using PortalOuvidoria.Application.Extensions;
using PortalOuvidoria.Domain.DTOs.Chamado;
using PortalOuvidoria.Domain.Entities;
using PortalOuvidoria.Domain.Interfaces;

namespace PortalOuvidoria.Application.Services;
public class ChamadoService(IChamadoRepository repository) : IChamadoService
{
    public async Task<ChamadoDTO?> ObterChamado(String token, CancellationToken cancellation)
    {
        Chamado? chamado = await repository.ObterChamadoAsync(token, cancellation);

        if (chamado == null) return null;

        return chamado.ToDTO();
    }

    public async Task<ChamadoDTO> Registrar(RegistrarChamadoDTO request, CancellationToken cancellation)
    {
        Chamado chamado = new Chamado(request.Assunto, request.Mensagem);

        if (!String.IsNullOrEmpty(request.File))
        {
            Byte[] fileBytes = Convert.FromBase64String(request.File);
            String fileType = MimeTypeMap.GetExtension(request.MimeType);

            String fileName = Path.Combine("uploads", $"{chamado.TokenAcompanhamento}{fileType}");
            File.WriteAllBytes(fileName, fileBytes);
        }

        Chamado resultado = await repository.RegisterAsync(chamado, cancellation);

        return resultado.ToDTO();

    }
}
