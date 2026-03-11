using DistroKid.Infrastructure.BaseObjects;

namespace DistroKid.Database.Repository.Entities;

public class Track : BaseEntity
{
    public string Title { get; set; } = null!;
    public int DurationInSeconds { get; set; }
    public int ReleaseId { get; set; }
    public Release Release { get; set; } = null!;
}
