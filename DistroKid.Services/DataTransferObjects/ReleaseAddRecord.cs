namespace DistroKid.Services.DataTransferObjects;


public class ReleaseAddRecord
{
    public string Title { get; set; } = null!;
    public string Label { get; set; } = null!;
    public List<TrackRecord> Tracks { get; set; } = null!;
    public List<PlatformRecord> Platforms { get; set; } = null!;
}
