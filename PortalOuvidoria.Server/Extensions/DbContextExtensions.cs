using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PortalOuvidoria.Domain.Interfaces;
using PortalOuvidoria.Infra.Data.Context;
using PortalOuvidoria.Infra.Data.Identity;

namespace PortalOuvidoria.WebServer.Extensions;

public static class DbContextExtensions
{
    public static async void SeedDatabase(this WebApplication app)
    {
        IServiceScope scope = app.Services.CreateScope();

        ChamadoInterface.IChamadoRepository repository = scope.ServiceProvider.GetRequiredService<ChamadoInterface.IChamadoRepository>();
        UserManager<ApplicationUser> userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

        ApplicationDbContext context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        await context.Database.MigrateAsync();

        ApplicationUser user = new ApplicationUser
        {
            Email = "admin@email.com",
            FullName = "Admin",
            UserName = "Admin"
        };

        IdentityResult result = userManager.CreateAsync(user, "Senha123").Result;
    }
}
