using System.Collections.Specialized;

namespace PortalOuvidoria.Domain.Entities;

public class Chamado
{
    public Guid Id { get; set; }

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
    public String ComentarioFinalizado { get; set; }

    public String NomeEvidencia { get; set; }
    public Boolean PossuiEvidencia { get; set; }

    public Chamado(String assunto, String mensagem)
    {
        this.Id = Guid.CreateVersion7();
        this.Assunto = assunto;
        this.Mensagem = mensagem;
        this.IdSituacao = Constants.Situacao.Registrado;
        this.UTC_DataRegistro = DateTime.UtcNow;
        this.TokenAcompanhamento = GerarTokenAcompanhamento();
        this.PossuiEvidencia = false;
        this.NomeEvidencia = String.Empty;
        this.ComentarioFinalizado = String.Empty;

        this.UTC_DataRegistro_10Dias = DateTime.UtcNow.AddDays(10); // 10 dias a partir do registro
        this.UTC_DataRegistro_25Dias = DateTime.UtcNow.AddDays(25); // 25 dias a partir do registro
    }

    public Chamado(String assunto, String mensagem, String? tokenAcompanhamento = null)
    {
        this.Id = Guid.CreateVersion7();
        this.Assunto = assunto;
        this.Mensagem = mensagem;
        this.IdSituacao = Constants.Situacao.Registrado;
        this.UTC_DataRegistro = DateTime.UtcNow;
        this.TokenAcompanhamento = tokenAcompanhamento ?? GerarTokenAcompanhamento();
        this.PossuiEvidencia = false;
        this.NomeEvidencia = String.Empty;
        this.ComentarioFinalizado = String.Empty;

        this.UTC_DataRegistro_10Dias = DateTime.UtcNow.AddDays(10); // 10 dias a partir do registro
        this.UTC_DataRegistro_25Dias = DateTime.UtcNow.AddDays(25); // 25 dias a partir do registro
    }

    public Chamado(String assunto, String mensagem, String? tokenAcompanhamento = null, Int32? idSituacao = null)
    {
        this.Id = Guid.CreateVersion7();
        this.Assunto = assunto;
        this.Mensagem = mensagem;
        this.IdSituacao = idSituacao ?? Constants.Situacao.Registrado;
        this.TokenAcompanhamento = tokenAcompanhamento ?? GerarTokenAcompanhamento();
        this.PossuiEvidencia = false;
        this.NomeEvidencia = String.Empty;
        this.ComentarioFinalizado = String.Empty;

        this.UTC_DataRegistro = DateTime.UtcNow;
        this.UTC_DataRegistro_10Dias = DateTime.UtcNow.AddDays(10); // 10 dias a partir do registro
        this.UTC_DataRegistro_25Dias = DateTime.UtcNow.AddDays(25); // 25 dias a partir do registro
    }

    private static String GerarTokenAcompanhamento()
    {
        return Guid.NewGuid().ToString("N").ToUpper().Substring(0, 10);
    }

    public void DefinirEvidencia(String nomeArquivoEvidencia)
    {
        if (!String.IsNullOrEmpty(nomeArquivoEvidencia))
        {
            this.PossuiEvidencia = true;
            this.NomeEvidencia = nomeArquivoEvidencia;
        }
    }
}
