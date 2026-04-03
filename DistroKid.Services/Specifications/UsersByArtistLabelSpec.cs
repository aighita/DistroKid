using Ardalis.Specification;
using DistroKid.Database.Repository.Entities;
using DistroKid.Database.Repository.Enums;

namespace DistroKid.Services.Specifications;

public sealed class UsersByArtistLabelSpec : Specification<User>
{
    public UsersByArtistLabelSpec(Guid labelId) =>
        Query.Where(user => user.Role == UserRoleEnum.Artist && user.ArtistLabelId == labelId);
}