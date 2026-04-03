using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using DistroKid.Database.Repository.Entities;
using DistroKid.Services.DataTransferObjects;

namespace DistroKid.Services.Specifications;

public sealed class ReleaseProjectionSpec : Specification<Release, ReleaseRecord>
{
    public ReleaseProjectionSpec() =>
        Query
            .Include(r => r.Artist)
            .Include(r => r.Tracks)
            .ThenInclude(t => t.Artist)
            .OrderByDescending(r => r.ReleaseDate)
            .Select(r => new ReleaseRecord
            {
                Id = r.Id,
                Title = r.Title,
                ReleaseDate = r.ReleaseDate,
                Label = r.Label,
                ReleaseType = r.ReleaseType,
                Tracks = r.Tracks.Select(t => new TrackRecord
                {
                    Id = t.Id,
                    Title = t.Title,
                    DurationInSeconds = t.DurationInSeconds,
                    ISRC = t.ISRC,
                    ArtistId = t.ArtistId,
                    Artist = new UserRecord
                    {
                        Id = t.Artist.Id,
                        Name = t.Artist.Name,
                        Email = t.Artist.Email,
                        Role = t.Artist.Role
                    }
                }).ToList(),
                Platforms = r.Platforms.Select(p => new PlatformRecord
                {
                    Id = p.Id,
                    Name = p.Name,
                    Url = p.Url
                }).ToList(),
                Artist = r.Artist != null ? new UserRecord
                {
                    Id = r.Artist.Id,
                    Name = r.Artist.Name,
                    Email = r.Artist.Email,
                    Role = r.Artist.Role
                } : null
            });

    /// <summary>Used by GetReleases (pagination) â€” orders descending by release date and optionally filters by title.</summary>
    public ReleaseProjectionSpec(string? search, IEnumerable<Guid>? artistIds = null) : this()
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (artistIds != null)
        {
            var scopedArtistIds = artistIds.ToList();
            Query.Where(r => r.ArtistId.HasValue && scopedArtistIds.Contains(r.ArtistId.Value));
        }

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";
        Query.Where(r => EF.Functions.ILike(r.Title, searchExpr));
    }
}
