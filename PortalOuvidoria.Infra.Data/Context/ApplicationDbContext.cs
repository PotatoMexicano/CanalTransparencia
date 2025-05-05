using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PortalOuvidoria.Domain.Entities;
using PortalOuvidoria.Infra.Data.Identity;
using PortalOuvidoria.Infra.Data.Mapping;

namespace PortalOuvidoria.Infra.Data.Context;
public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Int32>, Int32>
{
    public ApplicationDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Chamado> Chamados { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.MapChamadoDbSet();
        base.OnModelCreating(builder);
    }
}
