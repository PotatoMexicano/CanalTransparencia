using Microsoft.AspNetCore.Mvc;
using PortalOuvidoria.Domain.DTOs.Chamado;
using PortalOuvidoria.Domain.Interfaces;

namespace PortalOuvidoria.WebServer.Controllers;

[Route("api/chamado")]
[ApiController]
public class ChamadoController(IChamadoService service) : ControllerBase
{
    [HttpPost("acompanhar")]
    public async Task<IActionResult> List([FromBody] AcompanharChamadoDTO request, CancellationToken cancellation = default)
    {
        try
        {
            ChamadoDTO? chamado = await service.ObterChamado(request.TokenAcompanhamento, cancellation);

            if (chamado != null)
            {
                return Ok(chamado);
            }

            return StatusCode(StatusCodes.Status404NotFound, new ProblemDetails
            {
                Title = "Chamado não encontrado.",
                Detail = "Token de acompanhamento não corresponde a um chamado válido."
            });

        }
        catch (Exception ex)
        {
            return BadRequest(new ProblemDetails
            {
                Title = "Falha ao buscar chamado",
                Detail = ex.Message
            });
        }
    }

    [HttpPost("registrar")]
    public async Task<IActionResult> Register([FromForm] RegistrarChamadoDTO request, CancellationToken cancellation = default)
    {
        try
        {
            ChamadoDTO response = await service.Registrar(request, cancellation);

            return Ok(new ProblemDetails
            {
                Title = "Chamado salvo com sucesso.",
                Detail = response.TokenAcompanhamento
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new ProblemDetails
            {
                Title = "Falha ao registrar chamado.",
                Detail = ex.Message
            });
        }

    }

}
