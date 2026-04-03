using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using DistroKid.Database.Repository.Entities;
using DistroKid.Services.DataTransferObjects;

namespace DistroKid.Services.Specifications;

/// <summary>
/// Projects Label entities to lightweight LabelRecord DTOs for pagination list views.
/// Nested collections (Releases, Artists, Managers) are omitted — use
/// LabelService.GetLabelById (which uses LabelSpec with Includes) for the full detail view.
/// </summary>
public sealed class LabelProjectionSpec : Specification<Label, LabelRecord>
{
    public LabelProjectionSpec() =>
        Query
            .OrderBy(l => l.Name)
            .Select(l => new LabelRecord
            {
                Id = l.Id,
                Name = l.Name,
                Website = l.Website
                // Releases, Artists, Managers default to empty lists — fetch via GetById for full detail
            });

    /// <summary>Used by GetLabels (pagination) — orders by name and optionally filters by search.</summary>
    public LabelProjectionSpec(string? search) : this()
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";
        Query.Where(l => EF.Functions.ILike(l.Name, searchExpr));
    }
}
