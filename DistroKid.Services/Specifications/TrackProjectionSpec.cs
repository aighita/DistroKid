using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using DistroKid.Database.Repository.Entities;
using DistroKid.Services.DataTransferObjects;

namespace DistroKid.Services.Specifications;

/// <summary>
/// Projects Track entities to TrackRecord DTOs.
/// The base constructor establishes the Select projection; other constructors chain into it.
/// </summary>
public sealed class TrackProjectionSpec : Specification<Track, TrackRecord>
{
    public TrackProjectionSpec() =>
        Query
            .Include(t => t.Artist)
            .OrderBy(t => t.Title)
            .Select(t => new TrackRecord
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
            });

    /// <summary>Used by GetTrackById — no ordering needed.</summary>
    public TrackProjectionSpec(Guid id) : this() => Query.Where(t => t.Id == id);

    /// <summary>Used by GetTracks (pagination) — orders by title and optionally filters by search.</summary>
    public TrackProjectionSpec(string? search, IEnumerable<Guid>? artistIds = null) : this()
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (artistIds != null)
        {
            var scopedArtistIds = artistIds.ToList();
            Query.Where(t => scopedArtistIds.Contains(t.ArtistId));
        }

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";
        Query.Where(t => EF.Functions.ILike(t.Title, searchExpr));
    }
}
