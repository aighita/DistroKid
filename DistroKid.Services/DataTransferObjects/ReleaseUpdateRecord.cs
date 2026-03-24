
using DistroKid.Database.Repository.Enums;

namespace DistroKid.Services.DataTransferObjects;

public class ReleaseUpdateRecord
{
    public string? Title { get; set; }
    public string? Label { get; set; }
    public ReleaseTypeEnum? ReleaseType { get; set; }
    public DateTime? ReleaseDate { get; set; }

    /// <summary>When provided, fully replaces the release's track list.</summary>
    public List<Guid>? TrackIds { get; set; }

    /// <summary>When provided, fully replaces the release's platform list.</summary>
    public List<Guid>? PlatformIds { get; set; }
}
