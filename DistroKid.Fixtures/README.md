# DistroKid Fixtures Module

This module is responsible for seeding the database with fixture data for development and testing.

## Running Fixtures

To seed platforms and other fixtures:

```bash
cd DistroKid.Fixtures
dotnet run
```

## Features

- **Platforms**: Seeds all major music streaming platforms (Spotify, Apple Music, YouTube Music, Tidal, Amazon Music, Deezer, SoundCloud, Pandora, iHeartRadio, Bandcamp, Audiomack, JioSaavn)
- **Database Migrations**: Automatically applies any pending migrations before seeding
- **Idempotent**: Checks if data already exists to avoid duplicates

## Adding New Fixtures

1. Update `Program.cs` with new seed functions
2. Follow the pattern:
   ```csharp
   private static async Task SeedNewData(WebAppDatabaseContext context)
   {
       // Check if exists
       // If not, add and save
   }
   ```
3. Call from Main method

## Configuration

Update `appsettings.json` with the correct database connection string if needed.
