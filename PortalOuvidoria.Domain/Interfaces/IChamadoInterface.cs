using PortalOuvidoria.Domain.DTOs.Chamado;
using PortalOuvidoria.Domain.Entities;

namespace PortalOuvidoria.Domain.Interfaces;

public interface IChamadoService
{
    Task<ChamadoDTO?> ObterChamado(String token, CancellationToken cancellation);
    Task<ChamadoDTO> Registrar(RegistrarChamadoDTO request, CancellationToken cancellation);
}

public interface IChamadoRepository
{
    Task<Chamado?> ObterChamadoAsync(String token, CancellationToken cancellation);
    Task<Chamado> RegisterAsync(Chamado chamado, CancellationToken cancellation);
}

