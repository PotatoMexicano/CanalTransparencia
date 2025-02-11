namespace PortalOuvidoria.Domain.Constants;
public class Situacao
{
    public const Int32 Registrado = 0;
    public const Int32 Analisando = 1;
    public const Int32 VerificandoEvidencias = 2;
    public const Int32 AtribuidoComentarios = 3;
    public const Int32 Finalizado = 4;

    private static readonly Dictionary<Int32, String> _map = new()
    {
        {Registrado, nameof(Registrado)},
        {Analisando, nameof(Analisando) },
        {VerificandoEvidencias, nameof(VerificandoEvidencias) },
        {AtribuidoComentarios, nameof(AtribuidoComentarios) },
        {Finalizado, nameof(Finalizado) }
    };

    public static String GetNome(Int32 valor)
    {
        return _map.TryGetValue(valor, out String? nome) ? nome : "Desconhecido";
    }
}
