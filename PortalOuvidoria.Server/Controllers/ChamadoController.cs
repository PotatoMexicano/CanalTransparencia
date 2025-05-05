using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using PortalOuvidoria.Application.Services;
using PortalOuvidoria.Domain.Constants;
using PortalOuvidoria.Domain.DTOs.Chamado;
using PortalOuvidoria.Domain.Interfaces;
using PortalOuvidoria.Domain.Utils;

namespace PortalOuvidoria.WebServer.Controllers;

[Route("api/chamado")]
[ApiController]
public partial class ChamadoController(ChamadoInterface.IChamadoService service, IHubContext<NotificationService> hubContext) : ControllerBase
{
    [HttpPost("acompanhar")]
    public async Task<IActionResult> List([FromBody] AcompanharChamadoDTO request, CancellationToken cancellation = default)
    {
        Result<ChamadoDTO> chamado = await service.ObterChamadoSimples(request.TokenAcompanhamento, cancellation);

        return chamado.Match<ChamadoDTO, IActionResult>(
            onSuccess: value => Ok(value),
            onFailure: error => BadRequest(new ProblemDetails
            {
                Title = "Falha ao buscar chamado",
                Detail = error.Description,
            }));
    }

    [HttpPost("registrar")]
    public async Task<IActionResult> Register([FromForm] RegistrarChamadoDTO request, CancellationToken cancellation = default)
    {
        Result<ChamadoDTO> response = await service.Registrar(request, cancellation);

        return response.Match<ChamadoDTO, IActionResult>(
            onSuccess: value => Ok(new ProblemDetails
            {
                Title = "Chamado salvo com sucesso.",
                Detail = value.TokenAcompanhamento
            }),
            onFailure: error => BadRequest(new ProblemDetails
            {
                Title = "Falha ao registrar chamado.",
                Detail = error.Description
            }));
    }
}

public partial class ChamadoController
{
    [HttpGet("invalidate-tags")]
    public async Task<IActionResult> wwfjwf()
    {
        await hubContext.Clients.All.SendAsync("AtualizarDados");
        return Ok();
    }

    [HttpGet("info/contagem")]
    [Authorize]
    public async Task<IActionResult> ContagemDeChamados(CancellationToken cancellation = default)
    {
        Result<Dictionary<Int32, Int32>> contagemPorSituacao = await service.ContarChamadosPorSituacao(cancellation);
        Result<Int32> contagemChamados3Mes = await service.ContarChamados(3, cancellation);

        if (contagemPorSituacao.IsSuccess && contagemChamados3Mes.IsSuccess)
        {
            return Ok(new
            {
                ContagemTresMeses = contagemChamados3Mes.Value,
                ContagemPorSituacao = new
                {
                    Registrado = contagemPorSituacao.Value[Situacao.Registrado],
                    Finalizado = contagemPorSituacao.Value[Situacao.Finalizado],
                    Analisando = contagemPorSituacao.Value[Situacao.Analisando],
                    AtribuidoComentarios = contagemPorSituacao.Value[Situacao.AtribuidoComentarios],
                    VerificandoEvidencias = contagemPorSituacao.Value[Situacao.VerificandoEvidencias],
                }
            });
        }

        return Ok(new { Contagem = 0 });
    }

    [HttpGet("pendentes")]
    [Authorize]
    public async Task<IActionResult> ObterChamadosPendentes(CancellationToken cancellation = default)
    {
        Result<ChamadoDTO[]> response = await service.ObterChamadosPorSituacao(cancellation, Situacao.Registrado);

        return response.Match(
            onSuccess: Ok,
            onFailure: (error) => StatusCode(error.Code, error.Description));
    }

    [HttpGet("abertos")]
    [Authorize]
    public async Task<IActionResult> ObterChamadosAbertos(CancellationToken cancellation = default)
    {
        Result<ChamadoDTO[]> response = await service.ObterChamadosPorSituacao(cancellation, Situacao.Analisando, Situacao.VerificandoEvidencias, Situacao.AtribuidoComentarios);

        return response.Match(
            onSuccess: Ok,
            onFailure: (error) => StatusCode(error.Code, error.Description));
    }

    [HttpGet("encerrados")]
    [Authorize]
    public async Task<IActionResult> ObterChamadosEncerrados(CancellationToken cancellation = default)
    {
        Result<ChamadoDTO[]> response = await service.ObterChamadosPorSituacao(cancellation, Situacao.Finalizado);

        return response.Match(
            onSuccess: Ok,
            onFailure: (error) => StatusCode(error.Code, error.Description));
    }
}
