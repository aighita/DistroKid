using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using DistroKid.Database.Repository.Entities;
using DistroKid.Services.DataTransferObjects;

namespace DistroKid.Services.Specifications;

/// <summary>
/// Projects Merch entities to MerchRecord DTOs for pagination list views.
/// </summary>
public sealed class MerchProjectionSpec : Specification<Merch, MerchRecord>
{
    public MerchProjectionSpec(bool orderByName = false) =>
        Query
            .OrderBy(m => m.Name, orderByName)
            .Select(m => new MerchRecord
            {
                Id = m.Id,
                Name = m.Name,
                Description = m.Description,
                Price = m.Price,
                Stock = m.Stock,
                ArtistId = m.ArtistId
            });

    /// <summary>Used by GetMerch (pagination) — orders by name and optionally filters by search.</summary>
    public MerchProjectionSpec(string? search) : this(true)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";
        Query.Where(m => EF.Functions.ILike(m.Name, searchExpr));
    }
}
