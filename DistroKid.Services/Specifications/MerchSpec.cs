using Ardalis.Specification;
using DistroKid.Database.Repository.Entities;

namespace DistroKid.Services.Specifications;

/// <summary>
/// Raw entity specification for Merch — returns tracked entities suitable for updates/deletes.
/// </summary>
public sealed class MerchSpec : Specification<Merch>
{
    public MerchSpec(Guid id) => Query.Where(m => m.Id == id);
}
