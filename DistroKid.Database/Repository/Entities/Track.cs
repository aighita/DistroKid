using DistroKid.Infrastructure.BaseObjects;

namespace DistroKid.Database.Repository.Entities;

public class Track : BaseEntity
{
    public string Title { get; set; } = null!;
    public int DurationInSeconds { get; set; }
    public string ISRC { get; set; } = null!;
    public User Artist { get; set; } = null!;
    public List<Release> Releases { get; set; } = new List<Release>();
}
