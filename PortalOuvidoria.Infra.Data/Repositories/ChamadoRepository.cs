using Microsoft.EntityFrameworkCore;
using PortalOuvidoria.Domain.Entities;
using PortalOuvidoria.Domain.Interfaces;
using PortalOuvidoria.Infra.Data.Context;

namespace PortalOuvidoria.Infra.Data.Repositories;

public class ChamadoRepository(ApplicationDbContext context) : ChamadoInterface.IChamadoRepository
{
    public async Task<Dictionary<Int32, Int32>> ContarChamadoPorSituacaoAsync(CancellationToken cancellation)
    {
        Dictionary<Int32, Int32> contagemPorSituacao = await context.Chamados
            .GroupBy(c => c.IdSituacao)
            .ToDictionaryAsync(g => g.Key, g => g.Count(), cancellation);
        return contagemPorSituacao;
    }

    public async Task<Int32> ContarChamadoAsync(Int32 months, CancellationToken cancellation)
    {
        DateTime dataLimite = DateTime.UtcNow.AddMonths(-months);
        Int32 contagem = await context.Chamados
            .Where(c => c.UTC_DataRegistro >= dataLimite)
            .CountAsync(cancellation);
        return contagem;
    }

    public async Task<Chamado?> ObterChamadoAsync(String token, CancellationToken cancellation)
    {
        Chamado? chamado = await context.Chamados
            .Where(x => x.TokenAcompanhamento.ToUpper() == token.ToUpper())
            .AsNoTracking()
            .FirstOrDefaultAsync(cancellation);
        return chamado;
    }

    public async Task<Chamado?> RegisterAsync(Chamado chamado, CancellationToken cancellation)
    {
        try
        {
            if (chamado.Id == Guid.Empty)
            {
                chamado.Id = Guid.CreateVersion7();
            }

            context.Add(chamado);

            await context.SaveChangesAsync(cancellation);

            return chamado;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<Chamado[]> ObterChamadosPorSituacaoAsync(CancellationToken cancellation, params Int32[] situacao)
    {
        Chamado[] chamados = await context.Chamados
            .Where(c => situacao.Contains(c.IdSituacao))
            .OrderByDescending(c => c.UTC_DataRegistro)
            .AsNoTracking()
            .ToArrayAsync(cancellation);

        return chamados;
    }
}
