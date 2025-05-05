using PortalOuvidoria.Application.Services;
using PortalOuvidoria.WebServer.Extensions;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace PortalOuvidoria.WebServer;

public class Program
{
    public static void Main(String[] args)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

        builder.WebHost.UseKestrel(options =>
        {
            options.ListenAnyIP(5299);
        });

        builder.Configuration.AddJsonFile("appsettings.json").AddUserSecrets<Program>();

        builder.Services.AddInfraestructure(builder.Configuration);

        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddControllers().AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
            options.JsonSerializerOptions.WriteIndented = true;
            options.JsonSerializerOptions.RespectNullableAnnotations = true;
            options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower;
        });

        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins("http://192.168.7.128:5299", "http://192.168.7.128:5173")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
                });
        });

        builder.Services.AddSignalR();

        WebApplication app = builder.Build();

        app.MapHub<NotificationService>("/hub/notification");

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseDefaultFiles();
        app.MapStaticAssets();

        app.MapFallbackToFile("/index.html");

        app.UseCors();

        app.MapControllers();

        if (app.Environment.IsDevelopment())
        {
            app.SeedDatabase();
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.Run();
    }
}
