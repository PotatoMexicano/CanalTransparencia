using PortalOuvidoria.Domain.Utils;

namespace PortalOuvidoria.Domain.Interfaces;

public static class AuthInterface
{
    public interface IApplicationUser
    {
        public Int32 Id { get; set; }
        public String FullName { get; set; }
        public String Email { get; set; }
    }

    public interface IAuthService
    {
        Task<Result<IApplicationUser>> ObterUsuario(String email, CancellationToken cancellation);
        Task<String> GerarCodigoOTP(IApplicationUser user, CancellationToken cancellation);
        Task<Result<IApplicationUser>> ValidarOTP(String email, String OTP, CancellationToken cancellation);
    }

    public interface IAuthRepository
    {
        Task<IApplicationUser?> ObterUsuarioAsync(String email, CancellationToken cancellation);
    }
}
