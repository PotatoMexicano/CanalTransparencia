using Microsoft.Extensions.Caching.Memory;
using PortalOuvidoria.Domain.Interfaces;
using PortalOuvidoria.Domain.Utils;
using System.Net;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;

namespace PortalOuvidoria.Application.Services;
public class AuthService(AuthInterface.IAuthRepository repository, IMemoryCache cache) : AuthInterface.IAuthService
{
    private static readonly Char[] AllowedChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".ToCharArray();
    private const Int32 OtpLength = 6;
    private const Int32 OtpExpirationMinutes = 5;


    public async Task<Result<AuthInterface.IApplicationUser>> ObterUsuario(String email, CancellationToken cancellation)
    {
        AuthInterface.IApplicationUser? result = await repository.ObterUsuarioAsync(email, cancellation);

        if (result is null) return Result<AuthInterface.IApplicationUser>.Failure(new Error((Int32)HttpStatusCode.NotFound, "Usuário não encontrado"));

        return Result<AuthInterface.IApplicationUser>.Success(result);
    }

    public async Task<String> GerarCodigoOTP(AuthInterface.IApplicationUser user, CancellationToken cancellation = default)
    {
        String OTPCode = GenerateOTPCode();

        await RegistrarOTP(OTPCode, user.Id);
        await EnviarCodigoOTP(OTPCode, user.Email);

        Console.WriteLine($"Nome: {user.FullName} - OTP: {OTPCode}");

        return OTPCode;
    }

    public async Task<Result<AuthInterface.IApplicationUser>> ValidarOTP(String email, String OTP, CancellationToken cancellation)
    {
        Result<AuthInterface.IApplicationUser> usuario = await ObterUsuario(email, cancellation);

        if (usuario is null)
        {
            return Result<AuthInterface.IApplicationUser>.Failure(new Error((Int32)HttpStatusCode.NotFound, "Usuário não encontrado"));
        }

        if (!cache.TryGetValue($"OTP_{usuario.Value.Id}", out String? storedOTPHash))
        {
            return Result<AuthInterface.IApplicationUser>.Failure(new Error((Int32)HttpStatusCode.NotFound, "OTP inválido."));
        }

        String otpHash = ComputeSha256Hash(OTP);

        Boolean isValid = storedOTPHash == otpHash;

        if (isValid)
        {
            cache.Remove($"OTP_{usuario.Value.Id}");
            return Result<AuthInterface.IApplicationUser>.Success(usuario.Value);
        }

        return Result<AuthInterface.IApplicationUser>.Failure(new Error((int)HttpStatusCode.Unauthorized, "Código OTP inválido ou expirado."));

    }

    private static Task EnviarCodigoOTP(String OTP, String email)
    {
        return Task.CompletedTask;
    }

    private Task RegistrarOTP(String OTP, Int32 userId)
    {
        String otpHash = ComputeSha256Hash(OTP);

        MemoryCacheEntryOptions cacheEntryOptions = new MemoryCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(OtpExpirationMinutes)
        };

        cache.Set($"OTP_{userId}", otpHash, cacheEntryOptions);

        return Task.CompletedTask;
    }

    private static String GenerateOTPCode()
    {
        Span<Char> otp = stackalloc Char[OtpLength];
        Span<Byte> randomBytes = stackalloc Byte[OtpLength];

        RandomNumberGenerator.Fill(randomBytes);

        for (Int32 i = 0; i < OtpLength; i++)
        {
            Int32 index = randomBytes[i] % AllowedChars.Length;
            otp[i] = AllowedChars[index];
        }

        return new String(otp);
    }

    private static String ComputeSha256Hash(String rawData)
    {
        using SHA256 sha256 = SHA256.Create();
        Byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(rawData));
        StringBuilder builder = new StringBuilder();
        foreach (Byte b in bytes)
        {
            builder.Append(b.ToString("x2"));
        }
        return builder.ToString();
    }

}
