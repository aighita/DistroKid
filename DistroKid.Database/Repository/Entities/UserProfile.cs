using DistroKid.Infrastructure.BaseObjects;

namespace DistroKid.Database.Repository.Entities;

/// <summary>
/// This entity represents the user's profile and serves as an example for a One-To-One relation.
/// </summary>
public class UserProfile : BaseEntity
{
    public string? Bio { get; set; }
    public string? SocialMediaLink { get; set; }

    /// <summary>
    /// This property is used as a foreign key to the user table and must be unique for a One-To-One relationship.
    /// </summary>
    public Guid UserId { get; set; }

    /// <summary>
    /// Navigation property for the User entity.
    /// </summary>
    public User User { get; set; } = null!;
}
