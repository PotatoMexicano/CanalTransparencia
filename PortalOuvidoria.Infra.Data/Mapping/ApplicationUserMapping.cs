using Microsoft.EntityFrameworkCore;
using PortalOuvidoria.Infra.Data.Identity;

namespace PortalOuvidoria.Infra.Data.Mapping;

public static class ApplicationUserMapping
{
    public static void MapApplicationUserDbSet(this ModelBuilder builder)
    {
        builder.Entity<ApplicationUser>()
            .Property(u => u.Id)
            .ValueGeneratedOnAdd();
    }
}