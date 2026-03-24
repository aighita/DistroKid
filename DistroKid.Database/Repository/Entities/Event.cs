using DistroKid.Infrastructure.BaseObjects;

namespace DistroKid.Database.Repository.Entities;


public class Event : BaseEntity
{
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Location { get; set; } = null!;
    public DateTime Date { get; set; }

    /// <summary>
    /// Explicit FK to the artist (User) who created this event.
    /// </summary>
    public Guid ArtistId { get; set; }

    /// <summary>
    /// Navigation property to the owning artist.
    /// </summary>
    public User Artist { get; set; } = null!;
}
