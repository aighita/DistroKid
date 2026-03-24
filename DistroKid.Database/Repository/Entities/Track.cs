using DistroKid.Infrastructure.BaseObjects;

namespace DistroKid.Database.Repository.Entities;

public class Track : BaseEntity
{
    public string Title { get; set; } = null!;
    public int DurationInSeconds { get; set; }
    public string ISRC { get; set; } = null!;

    /// <summary>
    /// Explicit FK to the artist (User) who owns this track.
    /// </summary>
    public Guid ArtistId { get; set; }

    /// <summary>
    /// Navigation property to the owning artist.
    /// </summary>
    public User Artist { get; set; } = null!;

    public List<Release> Releases { get; set; } = new List<Release>();
}
