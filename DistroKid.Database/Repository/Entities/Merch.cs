using DistroKid.Infrastructure.BaseObjects;

namespace DistroKid.Database.Repository.Entities;

public class Merch : BaseEntity
{
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public decimal Price { get; set; }
    public int Stock { get; set; }

    /// <summary>
    /// Explicit FK to the artist (User) who owns this merch item.
    /// </summary>
    public Guid ArtistId { get; set; }

    /// <summary>
    /// Navigation property to the owning artist.
    /// </summary>
    public User Artist { get; set; } = null!;
}
