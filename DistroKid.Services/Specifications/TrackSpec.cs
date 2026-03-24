using Ardalis.Specification;
using DistroKid.Database.Repository.Entities;

namespace DistroKid.Services.Specifications;

/// <summary>
/// Raw entity specification for Track — returns tracked entities suitable for updates/deletes.
/// </summary>
public sealed class TrackSpec : Specification<Track>
{
    /// <summary>Fetches a single track by its primary key.</summary>
    public TrackSpec(Guid id) => Query.Where(t => t.Id == id);
}
