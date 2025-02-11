using PortalOuvidoria.Domain.DTOs.Chamado;
using PortalOuvidoria.Domain.Entities;

namespace PortalOuvidoria.Application.Extensions;
public static class ChamadoExtensions
{
    public static ChamadoDTO ToDTO(this Chamado entity)
    {
        return new ChamadoDTO
        {
            ComentarioFinalizado = entity.ComentarioFinalizado,
            IdSituacao = entity.IdSituacao,
            TokenAcompanhamento = entity.TokenAcompanhamento,
            UTC_DataAnalise = entity.UTC_DataAnalise,
            UTC_DataComentario = entity.UTC_DataComentario,
            UTC_DataEvidencia = entity.UTC_DataEvidencia,
            UTC_DataFinalizado = entity.UTC_DataFinalizado,
            UTC_DataRegistro = entity.UTC_DataRegistro,
            Situacao = Domain.Constants.Situacao.GetNome(entity.IdSituacao)
        };
    }
}
