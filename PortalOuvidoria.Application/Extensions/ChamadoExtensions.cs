using PortalOuvidoria.Domain.DTOs.Chamado;
using PortalOuvidoria.Domain.Entities;

namespace PortalOuvidoria.Application.Extensions;
public static class ChamadoExtensions
{
    public static ChamadoDTO ToMinimalDTO(this Chamado entity)
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
            PossuiEvidencia = null,
        };
    }

    public static ChamadoDTO ToDTO(this Chamado entity)
    {
        return new ChamadoDTO
        {
            Id = entity.Id.ToString("N"),
            ComentarioFinalizado = entity.ComentarioFinalizado,
            IdSituacao = entity.IdSituacao,
            TokenAcompanhamento = entity.TokenAcompanhamento,
            UTC_DataAnalise = entity.UTC_DataAnalise,
            UTC_DataComentario = entity.UTC_DataComentario,
            UTC_DataEvidencia = entity.UTC_DataEvidencia,
            UTC_DataFinalizado = entity.UTC_DataFinalizado,
            UTC_DataRegistro = entity.UTC_DataRegistro,
            PossuiEvidencia = entity.PossuiEvidencia,
            NomeEvidencia = entity.NomeEvidencia,
            Assunto = entity.Assunto,
            Mensagem = entity.Mensagem,
            UTC_DataRegistro_10Dias = entity.UTC_DataRegistro_10Dias,
            UTC_DataRegistro_25Dias = entity.UTC_DataRegistro_25Dias            
        };
    }
}
