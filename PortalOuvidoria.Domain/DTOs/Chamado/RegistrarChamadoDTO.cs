namespace PortalOuvidoria.Domain.DTOs.Chamado;
public class RegistrarChamadoDTO
{
    public required String Assunto { get; set; }
    public required String Mensagem { get; set; }
    public String? File { get; set; }
    public String? MimeType { get; set; }
}
