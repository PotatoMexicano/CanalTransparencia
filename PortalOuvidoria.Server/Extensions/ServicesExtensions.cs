using Microsoft.EntityFrameworkCore;
using PortalOuvidoria.Application.Services;
using PortalOuvidoria.Domain.Interfaces;
using PortalOuvidoria.Infra.Data.Context;
using PortalOuvidoria.Infra.Data.Repositories;

namespace PortalOuvidoria.Server.Extensions;

public static class ServicesExtensions
{
    private static IServiceCollection AddServices(this IServiceCollection services)
    {

        services.AddScoped<IChamadoService, ChamadoService>();

        return services;
    }

    private static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IChamadoRepository, ChamadoRepository>();

        return services;
    }

    public static IServiceCollection AddInfraestructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            String connectionString = configuration.GetConnectionString("ApplicationConnection") ?? throw new ArgumentNullException("Cannot found connectionString [ApplicationConnection]");

            options.UseSqlite(connectionString);
        });

        services.AddServices();
        services.AddRepositories();

        return services;
    }
}
