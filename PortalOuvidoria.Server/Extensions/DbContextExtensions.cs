using PortalOuvidoria.Domain.Entities;
using PortalOuvidoria.Domain.Interfaces;

namespace PortalOuvidoria.WebServer.Extensions;

public static class DbContextExtensions
{
    public static async void SeedDatabase(this WebApplication app)
    {
        IServiceScope scope = app.Services.CreateScope();

        IChamadoRepository repository = scope.ServiceProvider.GetRequiredService<IChamadoRepository>();

        CancellationTokenRegistration cts = new CancellationTokenRegistration();

        Chamado[] chamados = new[]
        {
            new Chamado("Chamado - 1", "Teste de chamado"),
            new Chamado("Chamado - 2", "Teste de chamado"),
            new Chamado("Chamado - 3", "Teste de chamado"),
            new Chamado("Chamado - 4", "Teste de chamado"),
            new Chamado("Chamado - 5", "Teste de chamado"),
        };

        foreach (Chamado? chamado in chamados)
        {
            Chamado? entity = await repository.ObterChamadoAsync(chamado.TokenAcompanhamento, cts.Token);

            if (entity == null)
            {
                await repository.RegisterAsync(chamado, cts.Token);
            }
        }
    }
}
