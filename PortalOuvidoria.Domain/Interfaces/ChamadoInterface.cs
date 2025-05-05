using PortalOuvidoria.Domain.DTOs.Chamado;
using PortalOuvidoria.Domain.Entities;
using PortalOuvidoria.Domain.Utils;

namespace PortalOuvidoria.Domain.Interfaces;

public static class ChamadoInterface
{
    public interface IChamadoService
    {
        Task<Result<ChamadoDTO>> ObterChamado(String token, CancellationToken cancellation);
        Task<Result<ChamadoDTO>> ObterChamadoSimples(String token, CancellationToken cancellation);

        Task<Result<ChamadoDTO>> Registrar(RegistrarChamadoDTO request, CancellationToken cancellation);
        Task<Result<Dictionary<Int32, Int32>>> ContarChamadosPorSituacao(CancellationToken cancellation);
        Task<Result<ChamadoDTO[]>> ObterChamadosPorSituacao(CancellationToken cancellation, params Int32[] situacao);

        Task<Result<Int32>> ContarChamados(Int32 months, CancellationToken cancellation);
    }

    public interface IChamadoRepository
    {
        Task<Chamado?> ObterChamadoAsync(String token, CancellationToken cancellation);
        Task<Chamado?> RegisterAsync(Chamado chamado, CancellationToken cancellation);
        Task<Dictionary<Int32, Int32>> ContarChamadoPorSituacaoAsync(CancellationToken cancellation);
        Task<Chamado[]> ObterChamadosPorSituacaoAsync(CancellationToken cancellation, params Int32[] situacao);

        Task<Int32> ContarChamadoAsync(Int32 months, CancellationToken cancellation);
    }
}
