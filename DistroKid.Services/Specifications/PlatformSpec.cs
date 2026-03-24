using Ardalis.Specification;
using DistroKid.Database.Repository.Entities;

namespace DistroKid.Services.Specifications;


public sealed class PlatformSpec : Specification<Platform>
{
    public PlatformSpec() => Query.OrderBy(e => e.Name);

    public PlatformSpec(Guid id) => Query.Where(e => e.Id == id);
}
