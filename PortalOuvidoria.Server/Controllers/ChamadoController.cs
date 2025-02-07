using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PortalOuvidoria.Server.Controllers;

[Route("api/chamado")]
[ApiController]
public class ChamadoController : ControllerBase
{
    [HttpGet]
    public IActionResult Index()
    {
        return Ok(new ProblemDetails { Detail = "Success" });
    }
}
