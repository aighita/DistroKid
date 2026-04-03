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
                
                Console.WriteLine("Seeding artist users and related data...");
                await SeedArtistUsers(context);

                Console.WriteLine("Seeding admin user...");
                await SeedAdminUser(context);
                
                Console.WriteLine("Seeding label and manager...");
                await SeedLabelAndManager(context);
                
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

    private static async Task SeedArtistUsers(WebAppDatabaseContext context)
    {
        // Clear existing users, tracks, releases, merch, and events
        var existingUsers = await context.Set<User>().ToListAsync();
        if (existingUsers.Count > 0)
        {
            Console.WriteLine($"   Clearing existing users and related data...");
            context.Set<User>().RemoveRange(existingUsers);
            await context.SaveChangesAsync();
        }

        // Create first artist user - "Artist"
        var artist1Id = Guid.NewGuid();
        var artist1 = new User
        {
            Id = artist1Id,
            Name = "Artist",
            Email = "artist@example.com",
            Password = PasswordUtils.HashPassword("artist"),
            Role = UserRoleEnum.Artist,
            Platforms = new List<Platform>()
        };

        await context.Set<User>().AddAsync(artist1);
        await context.SaveChangesAsync();

        Console.WriteLine("   Artist user created");

        // Create tracks for first artist
        var artist1Tracks = new List<Track>();
        string[] artist1TrackTitles = { 
            "Midnight Echoes", "Neon Dreams", "Electric Soul", "Cyber Heartbeat", 
            "Synthwave Sunset", "Digital Rain", "Pixelated Reality", "Infinite Loop",
            "Glitch in the Matrix", "Robotic Symphony", "Circuit Breaker", "Virtual Horizon",
            "Analog Memories", "Frequency Modulation", "Quantum Oscillation"
        };

        for (int i = 0; i < artist1TrackTitles.Length; i++)
        {
            artist1Tracks.Add(new Track
            {
                Id = Guid.NewGuid(),
                Title = artist1TrackTitles[i],
                DurationInSeconds = 180 + (i * 15),
                ISRC = $"USRC17607{839 + i:D3}",
                Artist = artist1
            });
        }

        await context.Set<Track>().AddRangeAsync(artist1Tracks);
        await context.SaveChangesAsync();

        Console.WriteLine($"   {artist1Tracks.Count} tracks created for Artist");

        // Create releases for first artist
        var artist1Releases = new List<Release>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Neon Nights",
                ReleaseDate = DateTime.UtcNow.AddMonths(-2),
                Label = "Independent",
                ReleaseType = ReleaseTypeEnum.EP,
                Tracks = new List<Track> { artist1Tracks[0], artist1Tracks[1], artist1Tracks[2], artist1Tracks[3] }
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Digital Horizons",
                ReleaseDate = DateTime.UtcNow.AddMonths(-6),
                Label = "Independent",
                ReleaseType = ReleaseTypeEnum.Album,
                Tracks = artist1Tracks.GetRange(0, 10)
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Cybernetic Pulse",
                ReleaseDate = DateTime.UtcNow.AddMonths(-1),
                Label = "Electronic Records",
                ReleaseType = ReleaseTypeEnum.Single,
                Tracks = new List<Track> { artist1Tracks[4] }
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Retrowave Anthems",
                ReleaseDate = DateTime.UtcNow.AddDays(-15),
                Label = "Independent",
                ReleaseType = ReleaseTypeEnum.EP,
                Tracks = new List<Track> { artist1Tracks[5], artist1Tracks[6], artist1Tracks[7] }
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "The Final Frontier",
                ReleaseDate = DateTime.UtcNow.AddYears(-1),
                Label = "Galaxy Music",
                ReleaseType = ReleaseTypeEnum.Album,
                Tracks = artist1Tracks
            }
        };

        await context.Set<Release>().AddRangeAsync(artist1Releases);
        await context.SaveChangesAsync();

        Console.WriteLine($"   {artist1Releases.Count} releases created for Artist");

        // Create merch for first artist
        var artist1Merch = new List<Merch>
        {
            new() { Id = Guid.NewGuid(), Name = "Neon Nights T-Shirt", Description = "Official merchandise from the Neon Nights EP", Price = 24.99m, Stock = 50, Artist = artist1 },
            new() { Id = Guid.NewGuid(), Name = "Limited Edition Hoodie", Description = "Exclusive hoodie with digital album artwork", Price = 59.99m, Stock = 25, Artist = artist1 },
            new() { Id = Guid.NewGuid(), Name = "Vinyl Record - Digital Horizons", Description = "180g vinyl pressing of the full album", Price = 34.99m, Stock = 100, Artist = artist1 },
            new() { Id = Guid.NewGuid(), Name = "Artist Logo Hat", Description = "Classic snapback with embroidered logo", Price = 19.99m, Stock = 75, Artist = artist1 },
            new() { Id = Guid.NewGuid(), Name = "Poster Set", Description = "Set of 3 high-quality posters", Price = 14.99m, Stock = 200, Artist = artist1 }
        };

        await context.Set<Merch>().AddRangeAsync(artist1Merch);
        await context.SaveChangesAsync();

        Console.WriteLine($"   {artist1Merch.Count} merch items created for Artist");

        // Create events for first artist
        var artist1Events = new List<Event>
        {
            new() { Id = Guid.NewGuid(), Name = "Neon Dreams Tour - NYC", Description = "Live performance of tracks from Neon Nights EP", Location = "Brooklyn Steel, New York, NY", Date = DateTime.UtcNow.AddMonths(2), Artist = artist1 },
            new() { Id = Guid.NewGuid(), Name = "Digital Horizons Release Party", Description = "Album release party for Digital Horizons", Location = "Flash Factory, Los Angeles, CA", Date = DateTime.UtcNow.AddMonths(3), Artist = artist1 },
            new() { Id = Guid.NewGuid(), Name = "Summer Festival - Music Stage", Description = "Featured artist at annual summer music festival", Location = "Desert Sky Festival, Las Vegas, NV", Date = DateTime.UtcNow.AddMonths(5), Artist = artist1 },
            new() { Id = Guid.NewGuid(), Name = "London Underground Session", Description = "Intimate acoustic set in a secret location", Location = "The Vault, London, UK", Date = DateTime.UtcNow.AddMonths(7), Artist = artist1 },
            new() { Id = Guid.NewGuid(), Name = "Tokyo Synth Expo", Description = "Keynote performance for synth enthusiasts", Location = "Tokyo Dome, Tokyo, JP", Date = DateTime.UtcNow.AddMonths(9), Artist = artist1 }
        };

        await context.Set<Event>().AddRangeAsync(artist1Events);
        await context.SaveChangesAsync();

        Console.WriteLine($"   {artist1Events.Count} events created for Artist");

        // =============== CREATE SECOND ARTIST ===============
        // Create second artist user - "Other"
        var artist2Id = Guid.NewGuid();
        var artist2 = new User
        {
            Id = artist2Id,
            Name = "Other",
            Email = "other@example.com",
            Password = PasswordUtils.HashPassword("other"),
            Role = UserRoleEnum.Artist,
            Platforms = new List<Platform>()
        };

        await context.Set<User>().AddAsync(artist2);
        await context.SaveChangesAsync();

        Console.WriteLine("   Other user created");

        // Create tracks for second artist
        var artist2Tracks = new List<Track>();
        string[] artist2TrackTitles = { 
            "Morning Light", "Desert Wind", "Ocean Waves", "Starlight",
            "Aurora", "Thunder", "Rainfall", "Sunset",
            "Sunrise", "Moonlight", "Fireflies", "Storm",
            "Echo", "Harmony", "Symphony"
        };

        for (int i = 0; i < artist2TrackTitles.Length; i++)
        {
            artist2Tracks.Add(new Track
            {
                Id = Guid.NewGuid(),
                Title = artist2TrackTitles[i],
                DurationInSeconds = 200 + (i * 10),
                ISRC = $"GBRC17607{900 + i:D3}",
                Artist = artist2
            });
        }

        await context.Set<Track>().AddRangeAsync(artist2Tracks);
        await context.SaveChangesAsync();

        Console.WriteLine($"   {artist2Tracks.Count} tracks created for Other");

        // Create releases for second artist
        var artist2Releases = new List<Release>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Nature's Call",
                ReleaseDate = DateTime.UtcNow.AddMonths(-3),
                Label = "Wind Records",
                ReleaseType = ReleaseTypeEnum.Album,
                Tracks = artist2Tracks.GetRange(0, 8)
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Timeless Moments",
                ReleaseDate = DateTime.UtcNow.AddMonths(-1),
                Label = "Indie Vibes",
                ReleaseType = ReleaseTypeEnum.EP,
                Tracks = new List<Track> { artist2Tracks[8], artist2Tracks[9], artist2Tracks[10] }
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "Eternal Waves",
                ReleaseDate = DateTime.UtcNow.AddDays(-10),
                Label = "Nature Sounds",
                ReleaseType = ReleaseTypeEnum.Single,
                Tracks = new List<Track> { artist2Tracks[2] }
            }
        };

        await context.Set<Release>().AddRangeAsync(artist2Releases);
        await context.SaveChangesAsync();

        Console.WriteLine($"   {artist2Releases.Count} releases created for Other");

        // Create merch for second artist
        var artist2Merch = new List<Merch>
        {
            new() { Id = Guid.NewGuid(), Name = "Other Essentials T-Shirt", Description = "Classic t-shirt with original artwork", Price = 22.99m, Stock = 60, Artist = artist2 },
            new() { Id = Guid.NewGuid(), Name = "Cozy Sweatshirt", Description = "Warm sweatshirt for cooler days", Price = 54.99m, Stock = 40, Artist = artist2 },
            new() { Id = Guid.NewGuid(), Name = "Coffee Mug", Description = "Ceramic mug with album artwork", Price = 12.99m, Stock = 150, Artist = artist2 },
            new() { Id = Guid.NewGuid(), Name = "Tote Bag", Description = "Eco-friendly cotton tote bag", Price = 16.99m, Stock = 80, Artist = artist2 }
        };

        await context.Set<Merch>().AddRangeAsync(artist2Merch);
        await context.SaveChangesAsync();

        Console.WriteLine($"   {artist2Merch.Count} merch items created for Other");

        // Create events for second artist
        var artist2Events = new List<Event>
        {
            new() { Id = Guid.NewGuid(), Name = "Nature Sounds Retreat", Description = "Immersive concert experience in nature", Location = "Central Park, New York, NY", Date = DateTime.UtcNow.AddMonths(1), Artist = artist2 },
            new() { Id = Guid.NewGuid(), Name = "Timeless Moments Tour", Description = "World tour for new EP release", Location = "Royal Albert Hall, London, UK", Date = DateTime.UtcNow.AddMonths(4), Artist = artist2 },
            new() { Id = Guid.NewGuid(), Name = "Beach Music Festival", Description = "Beachside music festival performance", Location = "Malibu Beach, Los Angeles, CA", Date = DateTime.UtcNow.AddMonths(6), Artist = artist2 }
        };

        await context.Set<Event>().AddRangeAsync(artist2Events);
        await context.SaveChangesAsync();

        Console.WriteLine($"   {artist2Events.Count} events created for Other");
    }

    private static async Task SeedLabelAndManager(WebAppDatabaseContext context)
    {
        // Clear existing labels
        var existingLabels = await context.Set<Label>().ToListAsync();
        if (existingLabels.Count > 0)
        {
            Console.WriteLine($"   Clearing {existingLabels.Count} existing label(s)...");
            context.Set<Label>().RemoveRange(existingLabels);
            await context.SaveChangesAsync();
        }

        // Create a label
        var labelId = Guid.NewGuid();
        var label = new Label
        {
            Id = labelId,
            Name = "Sonic Records",
            Website = "https://sonicrecords.example.com",
            Artists = new List<User>(),
            Managers = new List<User>()
        };

        await context.Set<Label>().AddAsync(label);
        await context.SaveChangesAsync();

        Console.WriteLine("   Label 'Sonic Records' created");

        // Create a manager user for the label
        var managerId = Guid.NewGuid();
        var manager = new User
        {
            Id = managerId,
            Name = "Label Manager",
            Email = "manager@sonicrecords.com",
            Password = PasswordUtils.HashPassword("manager123"),
            Role = UserRoleEnum.Manager,
            ManagerLabelId = labelId,
            Platforms = new List<Platform>()
        };

        await context.Set<User>().AddAsync(manager);
        await context.SaveChangesAsync();

        Console.WriteLine("   Manager user created for 'Sonic Records'");
    }

    private static async Task SeedAdminUser(WebAppDatabaseContext context)
    {
        var admin = new User
        {
            Id = Guid.NewGuid(),
            Name = "Administrator",
            Email = "admin@distrokid.com",
            Password = PasswordUtils.HashPassword("admin"),
            Role = UserRoleEnum.Admin
        };

        if (!await context.Set<User>().AnyAsync(u => u.Email == admin.Email))
        {
            await context.Set<User>().AddAsync(admin);
            await context.SaveChangesAsync();
            Console.WriteLine("   Admin user created");
        }
        else
        {
            Console.WriteLine("   Admin user already exists");
        }
    }
}
