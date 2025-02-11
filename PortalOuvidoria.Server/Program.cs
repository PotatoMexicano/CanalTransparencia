using PortalOuvidoria.Server.Extensions;
using PortalOuvidoria.WebServer.Extensions;
using Scalar.AspNetCore;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace PortalOuvidoria.WebServer;

public class Program
{
    public static void Main(String[] args)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

        builder.Configuration.AddJsonFile("appsettings.json").AddUserSecrets<Program>();

        builder.Services.AddInfraestructure(builder.Configuration);

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddOpenApi();

        builder.Services.AddControllers().AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
            options.JsonSerializerOptions.WriteIndented = true;
            options.JsonSerializerOptions.RespectNullableAnnotations = true;
            options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower;
        });

        builder.Services.AddCors(options =>
        {
            if (builder.Environment.IsDevelopment())
            {
                options.AddDefaultPolicy(builder =>
                    {
                        builder.WithOrigins("http://localhost:5173", "https://localhost:5173", "http://192.168.245.75:5173")
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                    });
            }
            else
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins("http://*.equilibrioflorestal.com.br/*", "http://*.equilibrioflorestal.com.br/*")
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                });
            }
        });

        WebApplication app = builder.Build();

        app.UseCors();

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
