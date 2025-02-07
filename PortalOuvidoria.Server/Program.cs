using PortalOuvidoria.Server.Extensions;
using PortalOuvidoria.WebServer.Extensions;
using Scalar.AspNetCore;

namespace PortalOuvidoria.Server;

public class Program
{
    public static void Main(String[] args)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

        builder.Configuration.AddJsonFile("appsettings.json").AddUserSecrets<Program>();

        builder.Services.AddInfraestructure(builder.Configuration);

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddOpenApi();

        builder.Services.AddControllers();

        WebApplication app = builder.Build();

        app.MapControllers();

        if (app.Environment.IsDevelopment())
        {
            app.SeedDatabase();
            app.MapOpenApi();
            app.MapScalarApiReference(options =>
            {
                options.WithDownloadButton(true)
                .WithTheme(ScalarTheme.Purple)
                .WithDefaultHttpClient(ScalarTarget.JavaScript, ScalarClient.Axios);

            });
        }

        app.Run();
    }
}
