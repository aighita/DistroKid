using DistroKid.Infrastructure.BaseObjects;

namespace DistroKid.Database.Repository.Entities;

public class Label : BaseEntity
{
    public string Name { get; set; } = null!;
    public string Website { get; set; } = null!;
}
