using DistroKid.Infrastructure.BaseObjects;

namespace DistroKid.Database.Repository.Entities;

public class Release : BaseEntity
{
    public string Title { get; set; } = null!;
    public DateTime ReleaseDate { get; set; }
    public string Genre { get; set; } = null!;

    /// <summary>
    /// The record label associated with the release, if any.
    /// </summary>
    public string Label { get; set; } = null!;

    /// <summary>
    /// The Universal Product Code (UPC) is a unique identifier for products, including music releases.
    /// It is used to track sales and inventory across different platforms and retailers.
    /// </summary>
    public string UPC { get; set; } = null!;

    /// <summary>
    /// The International Standard Recording Code (ISRC) is a unique identifier for sound recordings.
    /// It is used to track sales and streams of the recording across different platforms and services.
    /// </summary>
    public string ISRC { get; set; } = null!;

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
