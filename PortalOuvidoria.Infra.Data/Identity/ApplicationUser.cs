using Microsoft.AspNetCore.Identity;
using static PortalOuvidoria.Domain.Interfaces.AuthInterface;

namespace PortalOuvidoria.Infra.Data.Identity;
public class ApplicationUser : IdentityUser<Int32>, IApplicationUser
{
    public String FullName { get; set; } = null!;

    // Explicitly implement the Email property to match the non-nullable type in IApplicationUser
    String IApplicationUser.Email
    {
        get => Email ?? String.Empty;
        set => Email = value;
    }
}
