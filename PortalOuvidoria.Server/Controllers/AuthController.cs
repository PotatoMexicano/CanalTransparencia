using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PortalOuvidoria.Domain.DTOs.Auth;
using PortalOuvidoria.Domain.Interfaces;
using PortalOuvidoria.Domain.Utils;
using PortalOuvidoria.Infra.Data.Identity;

namespace PortalOuvidoria.WebServer.Controllers;
[Route("api/auth")]
[ApiController]
public class AuthController(AuthInterface.IAuthService service, SignInManager<ApplicationUser> signInManager) : ControllerBase
{
    [HttpPost("login/step/generate")]
    public async Task<IActionResult> SendOneTimePasswordToken([FromBody] LoginDTO request, CancellationToken cancellation)
    {
        if (String.IsNullOrEmpty(request.Email))
        {
            return BadRequest(new ProblemDetails
            {
                Status = StatusCodes.Status400BadRequest,
                Detail = "Email não fornecido"
            });
        }

        Result<AuthInterface.IApplicationUser> result = await service.ObterUsuario(request.Email, cancellation);

        if (result.IsFailure)
        {
            return BadRequest(new ProblemDetails
            {
                Title = "Usuário não encontrado.",
                Detail = result.Error.Description,
            });
        }

        _ = await service.GerarCodigoOTP(result.Value, cancellation);

        return StatusCode(StatusCodes.Status202Accepted);

    }

    [HttpPost("login/step/validate")]
    public async Task<IActionResult> Login([FromBody] LoginDTO request, CancellationToken cancellation = default)
    {
        if (String.IsNullOrEmpty(request.Email))
        {
            return BadRequest(new ProblemDetails
            {
                Title = "Email não fornecido",
                Detail = "Email é um campo obrigatório"
            });
        }

        if (String.IsNullOrEmpty(request.Code))
        {
            return BadRequest(new ProblemDetails
            {
                Title = "Código OTP não fornecido",
                Detail = "Código OTP é um campo obrigatório"
            });
        }

        Result<AuthInterface.IApplicationUser> result = await service.ValidarOTP(request.Email, request.Code, cancellation);

        if (result.IsSuccess)
        {
            await signInManager.SignInAsync((ApplicationUser)result.Value, isPersistent: true);
            return Ok(new
            {
                result.Value.Id,
                result.Value.FullName,
                result.Value.Email,
            });
        }

        return Unauthorized(new ProblemDetails
        {
            Title = "OTP inválido ou expirado.",
            Detail = result.Error.Description
        });
    }

    [HttpPost("logout")]
    public async Task Logout(CancellationToken cancellation = default)
    {
        await signInManager.SignOutAsync();
    }

    [Authorize]
    [HttpGet("login/check")]
    public IActionResult CheckAuth()
    {
        if (User.Identity?.IsAuthenticated ?? false)
        {
            return Ok(new { isAuthenticated = true });
        }
        return Unauthorized(new { isAuthenticated = false });
    }

}
