using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using DistroKid.Database.Repository;
using DistroKid.Database.Repository.Entities;
using DistroKid.Database.Repository.Enums;
using DistroKid.Infrastructure.Authorization;
using DistroKid.Infrastructure.Extensions;

namespace DistroKid.Fixtures;

public static class Program
{
    private const string WebAppDatabaseConnectionKey = "WebAppDatabase";

    public static async Task Main(string[] args)
    {
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .Build();

        var services = new ServiceCollection();
        
        // Configure DbContext
        services.AddDbContext<WebAppDatabaseContext>(options =>
            options.UseNpgsql(configuration.GetConnectionString(WebAppDatabaseConnectionKey),
                o => o.UseQuerySplittingBehavior(QuerySplittingBehavior.SingleQuery)
                    .CommandTimeout((int)TimeSpan.FromMinutes(15).TotalSeconds)));

        var serviceProvider = services.BuildServiceProvider();
        
        try
        {
            using (var scope = serviceProvider.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<WebAppDatabaseContext>();
                
                Console.WriteLine("Applying migrations...");
                await context.Database.MigrateAsync();
                
                Console.WriteLine("Seeding platforms...");
                await SeedPlatforms(context);
                
                Console.WriteLine("Seeding artist user and related data...");
                await SeedArtistUser(context);
                
                Console.WriteLine("Fixtures completed successfully!");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            if (ex.InnerException != null)
            {
                Console.WriteLine($"   Inner: {ex.InnerException.Message}");
            }
            Environment.Exit(1);
        }
    }

    private static async Task SeedPlatforms(WebAppDatabaseContext context)
    {
        // Clear existing platforms
        var existingPlatforms = await context.Set<Platform>().ToListAsync();
        if (existingPlatforms.Count > 0)
        {
            Console.WriteLine($"   Clearing {existingPlatforms.Count} existing platform(s)...");
            context.Set<Platform>().RemoveRange(existingPlatforms);
            await context.SaveChangesAsync();
        }

        var platforms = new List<Platform>
        {
            new() { Id = Guid.NewGuid(), Name = "Spotify", Url = "https://open.spotify.com" },
            new() { Id = Guid.NewGuid(), Name = "Apple Music", Url = "https://music.apple.com" },
            new() { Id = Guid.NewGuid(), Name = "YouTube Music", Url = "https://music.youtube.com" },
            new() { Id = Guid.NewGuid(), Name = "Tidal", Url = "https://tidal.com" },
            new() { Id = Guid.NewGuid(), Name = "Amazon Music", Url = "https://music.amazon.com" },
            new() { Id = Guid.NewGuid(), Name = "Deezer", Url = "https://www.deezer.com" },
            new() { Id = Guid.NewGuid(), Name = "SoundCloud", Url = "https://soundcloud.com" },
            new() { Id = Guid.NewGuid(), Name = "Pandora", Url = "https://www.pandora.com" },
            new() { Id = Guid.NewGuid(), Name = "iHeartRadio", Url = "https://www.iheart.com" },
            new() { Id = Guid.NewGuid(), Name = "Bandcamp", Url = "https://bandcamp.com" },
            new() { Id = Guid.NewGuid(), Name = "Audiomack", Url = "https://audiomack.com" },
            new() { Id = Guid.NewGuid(), Name = "JioSaavn", Url = "https://www.jiosaavn.com" }
        };

        await context.Set<Platform>().AddRangeAsync(platforms);
        await context.SaveChangesAsync();
        
        Console.WriteLine($"   {platforms.Count} platforms added to database");
    }

    private static async Task SeedArtistUser(WebAppDatabaseContext context)
    {
        // Clear existing users, tracks, releases, merch, and events
        var existingUsers = await context.Set<User>().ToListAsync();
        if (existingUsers.Count > 0)
        {
            Console.WriteLine($"   Clearing existing users and related data...");
            context.Set<User>().RemoveRange(existingUsers);
            await context.SaveChangesAsync();
        }

        // Create artist user
        var artistId = Guid.NewGuid();
        var artist = new User
        {
            Id = artistId,
            Name = "Artist",
            Email = "artist@example.com",
            Password = PasswordUtils.HashPassword("artist"),
            Role = UserRoleEnum.Artist,
            Platforms = new List<Platform>()
        };

        await context.Set<User>().AddAsync(artist);
        await context.SaveChangesAsync();

        Console.WriteLine("   Artist user created");

        // Create tracks for the artist
        var tracks = new List<Track>();
        string[] trackTitles = { 
            "Midnight Echoes", "Neon Dreams", "Electric Soul", "Cyber Heartbeat", 
            "Synthwave Sunset", "Digital Rain", "Pixelated Reality", "Infinite Loop",
            "Glitch in the Matrix", "Robotic Symphony", "Circuit Breaker", "Virtual Horizon",
            "Analog Memories", "Frequency Modulation", "Quantum Oscillation"
        };

        for (int i = 0; i < trackTitles.Length; i++)
        {
            tracks.Add(new Track
            {
                Id = Guid.NewGuid(),
                Title = trackTitles[i],
                DurationInSeconds = 180 + (i * 15),
                ISRC = $"USRC17607{839 + i:D3}",
                Artist = artist
            });
        }

        await context.Set<Track>().AddRangeAsync(tracks);
        await context.SaveChangesAsync();

        Console.WriteLine($"   {tracks.Count} tracks created for artist");

        // Create releases for the artist
        var releases = new List<Release>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Neon Nights",
                ReleaseDate = DateTime.UtcNow.AddMonths(-2),
                Label = "Independent",
                ReleaseType = ReleaseTypeEnum.EP,
                Tracks = new List<Track> { tracks[0], tracks[1], tracks[2], tracks[3] }
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Digital Horizons",
                ReleaseDate = DateTime.UtcNow.AddMonths(-6),
                Label = "Independent",
                ReleaseType = ReleaseTypeEnum.Album,
                Tracks = tracks.GetRange(0, 10)
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Cybernetic Pulse",
                ReleaseDate = DateTime.UtcNow.AddMonths(-1),
                Label = "Electronic Records",
                ReleaseType = ReleaseTypeEnum.Single,
                Tracks = new List<Track> { tracks[4] }
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Retrowave Anthems",
                ReleaseDate = DateTime.UtcNow.AddDays(-15),
                Label = "Independent",
                ReleaseType = ReleaseTypeEnum.EP,
                Tracks = new List<Track> { tracks[5], tracks[6], tracks[7] }
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "The Final Frontier",
                ReleaseDate = DateTime.UtcNow.AddYears(-1),
                Label = "Galaxy Music",
                ReleaseType = ReleaseTypeEnum.Album,
                Tracks = tracks
            }
        };

        await context.Set<Release>().AddRangeAsync(releases);
        await context.SaveChangesAsync();

        Console.WriteLine($"   {releases.Count} releases created for artist");

        // Create merch for the artist
        var merch = new List<Merch>
        {
            new() { Id = Guid.NewGuid(), Name = "Neon Nights T-Shirt", Description = "Official merchandise from the Neon Nights EP", Price = 24.99m, Stock = 50, Artist = artist },
            new() { Id = Guid.NewGuid(), Name = "Limited Edition Hoodie", Description = "Exclusive hoodie with digital album artwork", Price = 59.99m, Stock = 25, Artist = artist },
            new() { Id = Guid.NewGuid(), Name = "Vinyl Record - Digital Horizons", Description = "180g vinyl pressing of the full album", Price = 34.99m, Stock = 100, Artist = artist },
            new() { Id = Guid.NewGuid(), Name = "Artist Logo Hat", Description = "Classic snapback with embroidered logo", Price = 19.99m, Stock = 75, Artist = artist },
            new() { Id = Guid.NewGuid(), Name = "Poster Set", Description = "Set of 3 high-quality posters", Price = 14.99m, Stock = 200, Artist = artist }
        };

        await context.Set<Merch>().AddRangeAsync(merch);
        await context.SaveChangesAsync();

        Console.WriteLine($"   {merch.Count} merch items created for artist");

        // Create events for the artist
        var events = new List<Event>
        {
            new() { Id = Guid.NewGuid(), Name = "Neon Dreams Tour - NYC", Description = "Live performance of tracks from Neon Nights EP", Location = "Brooklyn Steel, New York, NY", Date = DateTime.UtcNow.AddMonths(2), Artist = artist },
            new() { Id = Guid.NewGuid(), Name = "Digital Horizons Release Party", Description = "Album release party for Digital Horizons", Location = "Flash Factory, Los Angeles, CA", Date = DateTime.UtcNow.AddMonths(3), Artist = artist },
            new() { Id = Guid.NewGuid(), Name = "Summer Festival - Music Stage", Description = "Featured artist at annual summer music festival", Location = "Desert Sky Festival, Las Vegas, NV", Date = DateTime.UtcNow.AddMonths(5), Artist = artist },
            new() { Id = Guid.NewGuid(), Name = "London Underground Session", Description = "Intimate acoustic set in a secret location", Location = "The Vault, London, UK", Date = DateTime.UtcNow.AddMonths(7), Artist = artist },
            new() { Id = Guid.NewGuid(), Name = "Tokyo Synth Expo", Description = "Keynote performance for synth enthusiasts", Location = "Tokyo Dome, Tokyo, JP", Date = DateTime.UtcNow.AddMonths(9), Artist = artist }
        };

        await context.Set<Event>().AddRangeAsync(events);
        await context.SaveChangesAsync();

        Console.WriteLine($"   {events.Count} events created for artist");
    }
}
