using DistroKid.Infrastructure.BaseObjects;

namespace DistroKid.Database.Repository.Entities;

public class Platform : BaseEntity
{
    public string Name { get; set; } = null!;
    public string Url { get; set; } = null!;
    public List<Release> Releases { get; set; } = new List<Release>();
}
