using Ardalis.Specification;
using DistroKid.Database.Repository.Entities;

namespace DistroKid.Services.Specifications;

/// <summary>
/// Raw entity specification for Release.
/// Always eagerly loads Tracks, Artist and Platforms so the service
/// can read or update all relationship data without additional queries.
/// </summary>
public sealed class ReleaseSpec : Specification<Release>
{
    public ReleaseSpec(Guid id) =>
        Query
            .Where(r => r.Id == id)
            .Include(r => r.Tracks)
            .Include(r => r.Artist)
            .Include(r => r.Platforms);
}
