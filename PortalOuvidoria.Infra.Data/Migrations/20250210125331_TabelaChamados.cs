using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PortalOuvidoria.Infra.Data.Migrations
{
    /// <inheritdoc />
    public partial class TabelaChamados : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Chamados",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TokenAcompanhamento = table.Column<string>(type: "TEXT", maxLength: 10, nullable: false),
                    Mensagem = table.Column<string>(type: "TEXT", maxLength: 350, nullable: false),
                    Assunto = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    UTC_DataRegistro = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IdSituacao = table.Column<int>(type: "INTEGER", nullable: false),
                    UTC_DataRegistro_10Dias = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UTC_DataRegistro_25Dias = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UTC_DataAnalise = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UTC_DataEvidencia = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UTC_DataComentario = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UTC_DataFinalizado = table.Column<DateTime>(type: "TEXT", nullable: true),
                    ComentarioFinalizado = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chamados", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Chamados");
        }
    }
}
