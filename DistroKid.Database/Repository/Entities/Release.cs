using DistroKid.Infrastructure.BaseObjects;
using DistroKid.Database.Repository.Enums;

namespace DistroKid.Database.Repository.Entities;

public class Release : BaseEntity
{
    public string Title { get; set; } = null!;
    public DateTime ReleaseDate { get; set; }

    /// <summary>
    /// The record label name associated with the release.
    /// </summary>
    public string Label { get; set; } = null!;

    /// <summary>
    /// The type of release (Single, EP, Album)
    /// </summary>
    public ReleaseTypeEnum ReleaseType { get; set; }

    /// <summary>
    /// FK to the artist (User) who owns this release.
    /// Nullable so that deleting the artist doesn't cascade-delete the release.
    /// </summary>
    public Guid? ArtistId { get; set; }

    /// <summary>
    /// Navigation property to the owning artist.
    /// </summary>
    public User? Artist { get; set; }

    /// <summary>
    /// List of tracks in the release (many-to-many via ReleaseTrack join table).
    /// </summary>
    public List<Track> Tracks { get; set; } = new List<Track>();

    /// <summary>
    /// Platforms this release is distributed on (many-to-many via ReleasePlatform join table).
    /// </summary>
    public List<Platform> Platforms { get; set; } = new List<Platform>();
}
