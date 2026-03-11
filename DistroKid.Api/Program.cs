using DistroKid.Database.Repository;
using DistroKid.Infrastructure.Extensions;
using DistroKid.Services.Extensions;
using Microsoft.AspNetCore.Rewrite;
using NextjsStaticHosting.AspNetCore;

namespace DistroKid.Api;

public static class Program
{
    private const string ApplicationName = "Distro Kid API";
    
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        
        builder.AddCorsConfiguration()
            .AddRepository()
            .AddAuthorizationWithSwagger(ApplicationName)
            .AddServices()
            .UseLogger()
            .AddWorkers()
            .AddApi();

        builder.Services.AddNextjsStaticHosting(options =>
        {
            options.RootPath = "wwwroot";
        });

        var app = builder.Build();

        // Configure API routes and middleware (Swagger, Auth, etc.)
        app.ConfigureApplication(ApplicationName)
            .MigrateDatabase<WebAppDatabaseContext>();

        // Rewrite clean URL paths to their corresponding static HTML files before serving
        var rewriteOptions = new RewriteOptions()
            .AddRewrite(@"^(?!(_next/|api/))([^/.]+)/.*$", "$2.html", skipRemainingRules: true);
        app.UseRewriter(rewriteOptions);

        app.UseDefaultFiles();
        app.UseStaticFiles();

        app.MapNextjsStaticHtmls();
        app.MapFallbackToFile("404.html");

        app.Run();
    }
}
