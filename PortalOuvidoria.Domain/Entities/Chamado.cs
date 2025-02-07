namespace PortalOuvidoria.Domain.Entities;

public class Chamado
{
    public Int32 Id { get; set; }

    public String TokenAcompanhamento { get; private set; }
    public String Mensagem { get; set; }
    public String Assunto { get; set; }

    public DateTime UTC_DataRegistro { get; private set; }
    public Int32 IdSituacao { get; private set; }


    public DateTime? UTC_DataRegistro_10Dias { get; set; }
    public DateTime? UTC_DataRegistro_25Dias { get; set; }

    public DateTime? UTC_DataAnalise { get; set; }
    public DateTime? UTC_DataEvidencia { get; set; }
    public DateTime? UTC_DataComentario { get; set; }

    public DateTime? UTC_DataFinalizado { get; set; }
    public String? ComentarioFinalizado { get; set; }

    public Chamado(String assunto, String mensagem)
    {
        this.Assunto = assunto;
        this.Mensagem = mensagem;
        this.IdSituacao = Constants.Situacao.Registrado;
        this.UTC_DataRegistro = DateTime.UtcNow;
        this.TokenAcompanhamento = GerarTokenAcompanhamento();
    }


    private String GerarTokenAcompanhamento()
    {
        return Guid.NewGuid().ToString("N").ToUpper().Substring(0, 10);
    }
}
