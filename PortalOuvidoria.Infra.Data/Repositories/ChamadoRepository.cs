using Microsoft.EntityFrameworkCore;
using PortalOuvidoria.Domain.Entities;
using PortalOuvidoria.Domain.Interfaces;
using PortalOuvidoria.Infra.Data.Context;

namespace PortalOuvidoria.Infra.Data.Repositories;

public class ChamadoRepository(ApplicationDbContext context) : IChamadoRepository
{
    public async Task<Chamado?> ObterChamadoAsync(String token, CancellationToken cancellation)
    {
        Chamado? chamado = await context.Chamados.Where(x => x.TokenAcompanhamento.ToUpper() == token.ToUpper()).FirstOrDefaultAsync();
        return chamado;
    }

    public async Task<Chamado> RegisterAsync(Chamado chamado, CancellationToken cancellation)
    {
        context.Add(chamado);

        await context.SaveChangesAsync(cancellation);

        return chamado;
    }
}
