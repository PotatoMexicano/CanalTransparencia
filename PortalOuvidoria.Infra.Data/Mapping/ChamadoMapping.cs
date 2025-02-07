using Microsoft.EntityFrameworkCore;
using PortalOuvidoria.Domain.Entities;

namespace PortalOuvidoria.Infra.Data.Mapping;
public static class ChamadoMapping
{
    public static void MapChamadoDbSet(this ModelBuilder builder)
    {
        builder.Entity<Chamado>().HasKey(x => x.Id);

        builder.Entity<Chamado>().Property(x => x.TokenAcompanhamento).HasMaxLength(10).IsRequired();
        builder.Entity<Chamado>().Property(x => x.Mensagem).HasMaxLength(350).IsRequired();
        builder.Entity<Chamado>().Property(x => x.Assunto).HasMaxLength(100).IsRequired();
        builder.Entity<Chamado>().Property(x => x.UTC_DataRegistro).IsRequired();
        builder.Entity<Chamado>().Property(x => x.IdSituacao).IsRequired();
    }
}
