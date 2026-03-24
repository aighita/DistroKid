using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using DistroKid.Database.Repository.Entities;
using DistroKid.Services.DataTransferObjects;

namespace DistroKid.Services.Specifications;

/// <summary>
/// Projects Event entities to EventRecord DTOs for pagination list views.
/// The Artist navigation property is included via a JOIN since EventRecord requires it.
/// </summary>
public sealed class EventProjectionSpec : Specification<Event, EventRecord>
{
    public EventProjectionSpec(bool orderByDate = false) =>
        Query
            .OrderBy(e => e.Date, orderByDate)
            .Select(e => new EventRecord
            {
                Id = e.Id,
                Name = e.Name,
                Description = e.Description,
                Location = e.Location,
                Date = e.Date,
                Artist = new UserRecord
                {
                    Id = e.Artist.Id,
                    Name = e.Artist.Name,
                    Email = e.Artist.Email,
                    Role = e.Artist.Role
                }
            });

    /// <summary>Used by GetEvents (pagination) — orders by date ascending and optionally filters by name.</summary>
    public EventProjectionSpec(string? search) : this(true)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";
        Query.Where(e => EF.Functions.ILike(e.Name, searchExpr));
    }
}
