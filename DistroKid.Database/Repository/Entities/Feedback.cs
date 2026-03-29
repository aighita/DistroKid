using DistroKid.Infrastructure.BaseObjects;

namespace DistroKid.Database.Repository.Entities;

public class Feedback : BaseEntity
{
    public string Type { get; set; } = null!; // Suggestion, Bug, Other
    public int Rating { get; set; } // 1-5
    public bool IsAnonymous { get; set; }
    public string Comment { get; set; } = null!;
    
    public Guid? UserId { get; set; }
    public User? User { get; set; }
}
