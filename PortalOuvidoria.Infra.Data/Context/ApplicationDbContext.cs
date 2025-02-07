using Microsoft.EntityFrameworkCore;
using PortalOuvidoria.Domain.Entities;
using PortalOuvidoria.Infra.Data.Mapping;

namespace PortalOuvidoria.Infra.Data.Context;
public class ApplicationDbContext(DbContextOptions options) : DbContext(options)
{

    public DbSet<Chamado> Chamados { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.MapChamadoDbSet();
        base.OnModelCreating(builder);
    }
}
