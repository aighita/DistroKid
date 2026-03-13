namespace DistroKid.Services.DataTransferObjects;


public class LabelRecord
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Website { get; set; } = null!;
    public List<ReleaseRecord> Releases { get; set; } = new List<ReleaseRecord>();
    public List<UserRecord> Artists { get; set; } = new List<UserRecord>();
    public List<UserRecord> Managers { get; set; } = new List<UserRecord>();
}
