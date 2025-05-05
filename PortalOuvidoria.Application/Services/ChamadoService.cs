using Microsoft.AspNetCore.SignalR;
using MimeTypes;
using PortalOuvidoria.Application.Extensions;
using PortalOuvidoria.Domain.DTOs.Chamado;
using PortalOuvidoria.Domain.Entities;
using PortalOuvidoria.Domain.Interfaces;
using PortalOuvidoria.Domain.Utils;
using System.Net;

namespace PortalOuvidoria.Application.Services;
public class ChamadoService(ChamadoInterface.IChamadoRepository repository, IHubContext<NotificationService> notificationService) : ChamadoInterface.IChamadoService
{
    public async Task<Result<Dictionary<Int32, Int32>>> ContarChamadosPorSituacao(CancellationToken cancellation)
    {
        try
        {
            Dictionary<Int32, Int32> contagemPorSituacao = await repository.ContarChamadoPorSituacaoAsync(cancellation);
            return Result<Dictionary<Int32, Int32>>.Success(contagemPorSituacao);
        }
        catch (Exception ex)
        {
            return Result<Dictionary<Int32, Int32>>.Failure(new Error((Int32)HttpStatusCode.InternalServerError, ex.Message));
        }
    }

    public async Task<Result<Int32>> ContarChamados(Int32 months, CancellationToken cancellation)
    {
        try
        {
            months = months > 12 ? 12 : months;
            Int32 contagem = await repository.ContarChamadoAsync(months, cancellation);
            return Result<Int32>.Success(contagem);
        }
        catch (Exception ex)
        {
            return Result<Int32>.Failure(new Error((Int32)HttpStatusCode.InternalServerError, ex.Message));
        }
    }

    public async Task<Result<ChamadoDTO>> ObterChamado(String token, CancellationToken cancellation)
    {
        Chamado? chamado = await repository.ObterChamadoAsync(token, cancellation);

        if (chamado == null) return Result<ChamadoDTO>.Failure(new Error((Int32)HttpStatusCode.NotFound, "Chamado não encontrado."));

        return Result<ChamadoDTO>.Success(chamado.ToDTO());
    }

    public async Task<Result<ChamadoDTO>> ObterChamadoSimples(String token, CancellationToken cancellation)
    {
        Chamado? chamado = await repository.ObterChamadoAsync(token, cancellation);

        if (chamado == null) return Result<ChamadoDTO>.Failure(new Error((Int32)HttpStatusCode.NotFound, "Chamado não encontrado."));

        return Result<ChamadoDTO>.Success(chamado.ToMinimalDTO());
    }

    public async Task<Result<ChamadoDTO>> Registrar(RegistrarChamadoDTO request, CancellationToken cancellation)
    {
        Chamado chamado = new Chamado(request.Assunto, request.Mensagem);

        if (!String.IsNullOrEmpty(request.File))
        {
            try
            {
                Byte[] fileBytes = Convert.FromBase64String(request.File);
                String fileType = MimeTypeMap.GetExtension(request.MimeType);

                Directory.CreateDirectory(Path.Combine("uploads", chamado.TokenAcompanhamento));

                String fileName = $"{chamado.TokenAcompanhamento}{fileType}";
                String directoryFile = Path.Combine("uploads", chamado.TokenAcompanhamento, fileName);
                File.WriteAllBytes(directoryFile, fileBytes);

                chamado.DefinirEvidencia(fileName);
            }
            catch (Exception ex)
            {
                return Result<ChamadoDTO>.Failure(new Error((Int32)HttpStatusCode.InternalServerError, ex.Message));
            }
        }

        try
        {
            Chamado? resultado = await repository.RegisterAsync(chamado, cancellation);

            if (resultado is null)
            {
                return Result<ChamadoDTO>.Failure(new Error((Int32)HttpStatusCode.BadRequest, "Não foi possível registrar o chamado."));
            }

            await notificationService.Clients.All.SendAsync("AtualizarDados", cancellation);
            return Result<ChamadoDTO>.Success(resultado.ToDTO());
        }
        catch (Exception ex)
        {
            return Result<ChamadoDTO>.Failure(new Error((Int32)HttpStatusCode.BadRequest, ex.Message));
        }
    }

    public async Task<Result<ChamadoDTO[]>> ObterChamadosPorSituacao(CancellationToken cancellation, params Int32[] situacao)
    {
        try
        {
            Chamado[] chamados = await repository.ObterChamadosPorSituacaoAsync(cancellation, situacao: situacao);

            ChamadoDTO[] response = chamados.Select(ChamadoExtensions.ToDTO).ToArray();

            return Result<ChamadoDTO[]>.Success(response);
        }
        catch (Exception ex)
        {
            return Result<ChamadoDTO[]>.Failure(new Error((Int32)HttpStatusCode.InternalServerError, ex.Message));
        }
    }
}
