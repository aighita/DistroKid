using DistroKid.Infrastructure.BaseObjects;
using DistroKid.Database.Repository.Enums;

namespace DistroKid.Database.Repository.Entities;

public class Release : BaseEntity
{
    public string Title { get; set; } = null!;
    public DateTime ReleaseDate { get; set; }

    /// <summary>
    /// The record label associated with the release, if any.
    /// </summary>
    public string Label { get; set; } = null!;

    /// <summary>
    /// The type of release (Single, EP, Album)
    /// </summary>
    public ReleaseTypeEnum ReleaseType { get; set; }

    /// <summary>
    /// List of tracks in the release
    /// </summary>
    public List<Track> Tracks { get; set; } = new List<Track>();

    /// <summary>
    /// List of platforms where the release is available
    /// </summary>
    public List<Platform> Platforms { get; set; } = new List<Platform>();
}
