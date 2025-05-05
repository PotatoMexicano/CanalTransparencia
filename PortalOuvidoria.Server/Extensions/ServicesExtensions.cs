using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PortalOuvidoria.Application.Services;
using PortalOuvidoria.Domain.Interfaces;
using PortalOuvidoria.Infra.Data.Context;
using PortalOuvidoria.Infra.Data.Identity;
using PortalOuvidoria.Infra.Data.Repositories;

namespace PortalOuvidoria.WebServer.Extensions;

public static class ServicesExtensions
{
    private static IServiceCollection AddServices(this IServiceCollection services)
    {
        services.AddScoped<AuthInterface.IAuthService, AuthService>();
        services.AddScoped<ChamadoInterface.IChamadoService, ChamadoService>();

        return services;
    }

    private static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<AuthInterface.IAuthRepository, AuthRepository>();
        services.AddScoped<ChamadoInterface.IChamadoRepository, ChamadoRepository>();

        return services;
    }

    public static IServiceCollection AddInfraestructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddMemoryCache();

        services.AddDbContext<ApplicationDbContext>(options =>
        {
            String connectionString = configuration.GetConnectionString("ApplicationConnection") ?? throw new ArgumentNullException("Cannot found connectionString [ApplicationConnection]");

            options.UseSqlite(connectionString);
        });

        services.AddIdentity<ApplicationUser, IdentityRole<Int32>>(options =>
        {
            options.Password.RequireDigit = true;
            options.Password.RequiredLength = 6;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = false;
            options.Password.RequireLowercase = false;
        })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

        services.AddServices();
        services.AddRepositories();

        return services;
    }
}
