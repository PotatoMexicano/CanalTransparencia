using Microsoft.AspNetCore.Identity;
using PortalOuvidoria.Domain.Constants;
using PortalOuvidoria.Domain.Entities;
using PortalOuvidoria.Domain.Interfaces;
using PortalOuvidoria.Infra.Data.Identity;

namespace PortalOuvidoria.WebServer.Extensions;

public static class DbContextExtensions
{
    public static async void SeedDatabase(this WebApplication app)
    {
        IServiceScope scope = app.Services.CreateScope();

        ChamadoInterface.IChamadoRepository repository = scope.ServiceProvider.GetRequiredService<ChamadoInterface.IChamadoRepository>();
        UserManager<ApplicationUser> userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

        CancellationTokenRegistration cts = new CancellationTokenRegistration();

        Chamado[] chamados = new[]
        {
            new Chamado("Chamado - 0", "Teste de chamado", "AAAAAAAAAA", Situacao.Registrado),
            new Chamado("Chamado - 1", "Teste de chamado", "BBBBBBBBBB", Situacao.Analisando),
            new Chamado("Chamado - 2", "Teste de chamado", "CCCCCCCCCC", Situacao.VerificandoEvidencias),
            new Chamado("Chamado - 3", "Teste de chamado", "DDDDDDDDDD", Situacao.AtribuidoComentarios),
            new Chamado("Chamado - 4", "Teste de chamado", "EEEEEEEEEE", Situacao.Finalizado),
            new Chamado("Chamado - 5", "Teste de chamado", "FFFFFFFFFF", Situacao.Registrado),
            new Chamado("Chamado - 6", "Teste de chamado", "GGGGGGGGGG", Situacao.Analisando),
            new Chamado("Chamado - 7", "Teste de chamado", "HHHHHHHHHH", Situacao.VerificandoEvidencias),
            new Chamado("Chamado - 8", "Teste de chamado", "IIIIIIIIII", Situacao.AtribuidoComentarios),
            new Chamado("Chamado - 9", "Teste de chamado", "JJJJJJJJJJ", Situacao.Finalizado),
            new Chamado("Chamado - 10", "Teste de chamado", "KKKKKKKKKK", Situacao.Registrado),
            new Chamado("Chamado - 11", "Teste de chamado", "LLLLLLLLLL", Situacao.Analisando),
            new Chamado("Chamado - 12", "Teste de chamado", "MMMMMMMMMM", Situacao.VerificandoEvidencias),
            new Chamado("Chamado - 13", "Teste de chamado", "NNNNNNNNNN", Situacao.AtribuidoComentarios),
            new Chamado("Chamado - 14", "Teste de chamado", "OOOOOOOOOO", Situacao.Finalizado),
            new Chamado("Chamado - 15", "Teste de chamado", "PPPPPPPPPP", Situacao.Registrado),
            new Chamado("Chamado - 16", "Teste de chamado", "QQQQQQQQQQ", Situacao.Analisando),
            new Chamado("Chamado - 17", "Teste de chamado", "RRRRRRRRRR", Situacao.VerificandoEvidencias),
            new Chamado("Chamado - 18", "Teste de chamado", "SSSSSSSSSS", Situacao.AtribuidoComentarios),
            new Chamado("Chamado - 19", "Teste de chamado", "TTTTTTTTTT", Situacao.Finalizado),
            new Chamado("Chamado - 19", "Teste de chamado", "UUUUUUUUUU", Situacao.Registrado),
            new Chamado("Chamado - 19", "Teste de chamado", "VVVVVVVVVV", Situacao.Registrado),
            new Chamado("Chamado - 19", "Teste de chamado", "WWWWWWWWWW", Situacao.Registrado),
            new Chamado("Chamado - 19", "Teste de chamado", "XXXXXXXXXX", Situacao.Registrado),
            new Chamado("Chamado - 19", "Teste de chamado", "YYYYYYYYYY", Situacao.Registrado),
            new Chamado("Chamado - 19", "Teste de chamado", "ZZZZZZZZZZ", Situacao.Registrado),
        };

        foreach (Chamado? chamado in chamados)
        {
            Chamado? entity = await repository.ObterChamadoAsync(chamado.TokenAcompanhamento, cts.Token);

            if (entity == null)
            {
                await repository.RegisterAsync(chamado, cts.Token);
            }
        }


        ApplicationUser user = new ApplicationUser
        {
            Email = "admin@email.com",
            FullName = "Admin",
            UserName = "Admin"
        };

        IdentityResult result = userManager.CreateAsync(user, "Senha123").Result;
    }
}
