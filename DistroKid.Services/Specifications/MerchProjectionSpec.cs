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
    public MerchProjectionSpec() =>
        Query
            .Include(m => m.Artist)
            .OrderBy(m => m.Name)
            .Select(m => new MerchRecord
            {
                Id = m.Id,
                Name = m.Name,
                Description = m.Description,
                Price = m.Price,
                Stock = m.Stock,
                ArtistId = m.ArtistId,
                Artist = new UserRecord
                {
                    Id = m.Artist.Id,
                    Name = m.Artist.Name,
                    Email = m.Artist.Email,
                    Role = m.Artist.Role
                }
            });

    /// <summary>Used by GetMerch (pagination) — orders by name and optionally filters by search.</summary>
    public MerchProjectionSpec(string? search, IEnumerable<Guid>? artistIds = null) : this()
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (artistIds != null)
        {
            var scopedArtistIds = artistIds.ToList();
            Query.Where(m => scopedArtistIds.Contains(m.ArtistId));
        }

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";
        Query.Where(m => EF.Functions.ILike(m.Name, searchExpr));
    }
}
