using DistroKid.Database.Repository.Enums;

namespace DistroKid.Services.DataTransferObjects;


public class ReleaseRecord
{
    public Guid Id { get; set; }
    public string Title { get; set; } = null!;
    public DateTime ReleaseDate { get; set; }
    public string Label { get; set; } = null!;
    public ReleaseTypeEnum ReleaseType { get; set; }
    public List<TrackRecord> Tracks { get; set; } = new List<TrackRecord>();
    public List<PlatformRecord> Platforms { get; set; } = new List<PlatformRecord>();
}
