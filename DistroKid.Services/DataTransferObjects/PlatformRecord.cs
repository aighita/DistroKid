namespace DistroKid.Services.DataTransferObjects;

public class PlatformRecord
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Url { get; set; } = null!;
}
