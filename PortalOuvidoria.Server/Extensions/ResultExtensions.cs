using Microsoft.AspNetCore.Mvc;
using PortalOuvidoria.Domain.Utils;

namespace PortalOuvidoria.WebServer.Extensions;

public static class ResultExtensions
{
    public static IActionResult ToActionResult<T>(this Result<T> result)
    {
        return result.Match(
            onSuccess: value => new OkObjectResult(value),
            onFailure: error =>
            {
                return error.Code switch
                {
                    StatusCodes.Status404NotFound => new NotFoundObjectResult(new { Code = error.Code, Description = error.Description }),
                    StatusCodes.Status500InternalServerError => new ObjectResult(new { Code = error.Code, Description = error.Description }) { StatusCode = 500 },
                    _ => new BadRequestObjectResult(new { Code = error.Code, Description = error.Description })
                };
            });
    }
}
