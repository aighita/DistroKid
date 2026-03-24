using DistroKid.Database.Repository.Enums;

namespace DistroKid.Services.DataTransferObjects;

public class ReleaseAddRecord
{
    public string Title { get; set; } = null!;

    /// <summary>The label name string (free text).</summary>
    public string Label { get; set; } = null!;

    public ReleaseTypeEnum ReleaseType { get; set; }
    public DateTime ReleaseDate { get; set; }

    /// <summary>IDs of tracks to associate with this release.</summary>
    public List<Guid> TrackIds { get; set; } = new();

    /// <summary>IDs of platforms this release is distributed on.</summary>
    public List<Guid> PlatformIds { get; set; } = new();

    /// <summary>
    /// Required when a Manager creates a release on behalf of one of their artists.
    /// Artists leave this null — their own ID is used automatically.
    /// </summary>
    public Guid? ArtistId { get; set; }
}
