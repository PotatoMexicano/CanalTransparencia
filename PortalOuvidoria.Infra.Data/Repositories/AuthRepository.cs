using Microsoft.AspNetCore.Identity;
using PortalOuvidoria.Domain.Interfaces;
using PortalOuvidoria.Infra.Data.Identity;

namespace PortalOuvidoria.Infra.Data.Repositories;
public class AuthRepository(UserManager<ApplicationUser> userManager) : AuthInterface.IAuthRepository
{
    public async Task<AuthInterface.IApplicationUser?> ObterUsuarioAsync(String email, CancellationToken cancellation)
    {
        ApplicationUser? usuario = await userManager.FindByEmailAsync(email);

        if (usuario is null) return null;

        return usuario;
    }
}
