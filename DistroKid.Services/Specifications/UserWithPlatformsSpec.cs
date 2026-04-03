using Ardalis.Specification;
using DistroKid.Database.Repository.Entities;

namespace DistroKid.Services.Specifications;

public sealed class UserWithPlatformsSpec : Specification<User>
{
    public UserWithPlatformsSpec(Guid id) =>
        Query
            .Where(user => user.Id == id)
            .Include(user => user.Platforms);
}