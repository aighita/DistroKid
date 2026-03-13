using DistroKid.Infrastructure.BaseObjects;

namespace DistroKid.Database.Repository.Entities;

public class Label : BaseEntity
{
    public string Name { get; set; } = null!;
    public string Website { get; set; } = null!;
    public List<Release> Releases { get; set; } = new List<Release>();
    public List<User> Artists { get; set; } = new List<User>();
    public List<User> Managers { get; set; } = new List<User>();
}
