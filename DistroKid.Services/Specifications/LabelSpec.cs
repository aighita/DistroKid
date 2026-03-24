using Ardalis.Specification;
using DistroKid.Database.Repository.Entities;

namespace DistroKid.Services.Specifications;

/// <summary>
/// Raw entity specification for Label.
/// The ID constructor eagerly loads Releases, Artists and Managers for the full detail view.
/// The parameterless constructor returns all labels ordered by name (used for pagination count).
/// </summary>
public sealed class LabelSpec : Specification<Label>
{
    /// <summary>Returns all labels ordered by name.</summary>
    public LabelSpec() => Query.OrderBy(l => l.Name);

    /// <summary>Fetches a single label with all related data included.</summary>
    public LabelSpec(Guid id) =>
        Query
            .Where(l => l.Id == id)
            .Include(l => l.Releases)
            .Include(l => l.Artists)
            .Include(l => l.Managers);
}
