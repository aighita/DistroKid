using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using DistroKid.Database.Repository.Entities;
using DistroKid.Services.DataTransferObjects;

namespace DistroKid.Services.Specifications;

public sealed class ReleaseProjectionSpec : Specification<Release, ReleaseRecord>
{
    public ReleaseProjectionSpec(bool orderByDate = false) =>
        Query
            .OrderByDescending(r => r.ReleaseDate, orderByDate)
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
                    ArtistId = t.ArtistId
                }).ToList(),
                Platforms = r.Platforms.Select(p => new PlatformRecord
                {
                    Id = p.Id,
                    Name = p.Name,
                    Url = p.Url
                }).ToList()
            });

    /// <summary>Used by GetReleases (pagination) â€” orders descending by release date and optionally filters by title.</summary>
    public ReleaseProjectionSpec(string? search) : this(true)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";
        Query.Where(r => EF.Functions.ILike(r.Title, searchExpr));
    }
}
