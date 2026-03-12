using DistroKid.Infrastructure.BaseObjects;

namespace DistroKid.Database.Repository.Entities;

public class Event : BaseEntity
{
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Location { get; set; } = null!;
    public DateTime Date { get; set; }
    public User Artist { get; set; } = null!;
}
