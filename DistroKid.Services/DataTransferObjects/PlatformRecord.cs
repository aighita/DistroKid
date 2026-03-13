namespace DistroKid.Services.DataTransferObjects;


public class PlatformRecord
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public List<ReleaseRecord> Releases { get; set; } = new List<ReleaseRecord>();
}
