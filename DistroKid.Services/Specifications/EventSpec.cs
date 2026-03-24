using Ardalis.Specification;
using DistroKid.Database.Repository.Entities;

namespace DistroKid.Services.Specifications;

/// <summary>
/// Raw entity specification for Event.
/// Always includes the Artist navigation property so the service
/// can return the full EventRecord with artist details.
/// </summary>
public sealed class EventSpec : Specification<Event>
{
    public EventSpec(Guid id) =>
        Query
            .Where(e => e.Id == id)
            .Include(e => e.Artist);
}
