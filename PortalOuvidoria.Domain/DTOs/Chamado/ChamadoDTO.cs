namespace PortalOuvidoria.Domain.DTOs.Chamado;
public class ChamadoDTO
{
    public String Id { get; set; } = null!;
    public String? TokenAcompanhamento { get; set; }

    public String? Mensagem { get; set; }
    public String? Assunto { get; set; }

    public DateTime UTC_DataRegistro { get; set; }
    public DateTime? UTC_DataRegistro_10Dias { get; set; }
    public DateTime? UTC_DataRegistro_25Dias { get; set; }

    public Int32 IdSituacao { get; set; }
    public String Situacao
    {
        get
        {
            return Constants.Situacao.GetNome(this.IdSituacao);
        }
    }

    public DateTime? UTC_DataAnalise { get; set; }
    public DateTime? UTC_DataEvidencia { get; set; }
    public DateTime? UTC_DataComentario { get; set; }

    public DateTime? UTC_DataFinalizado { get; set; }
    public String? ComentarioFinalizado { get; set; }

    public Boolean? PossuiEvidencia { get; set; }
    public String? NomeEvidencia { get; set; }
}