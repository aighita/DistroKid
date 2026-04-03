using DistroKid.Database.Repository;
using DistroKid.Database.Repository.Entities;
using DistroKid.Database.Repository.Enums;
using DistroKid.Infrastructure.Repositories.Interfaces;
using DistroKid.Services.DataTransferObjects;
using DistroKid.Services.Specifications;

namespace DistroKid.Services.Helpers;

internal static class AccessScopeHelper
{
    public static async Task<HashSet<Guid>?> GetAccessibleArtistIds(
        IRepository<WebAppDatabaseContext> repository,
        UserRecord requestingUser,
        CancellationToken cancellationToken = default)
    {
        if (requestingUser.Role == UserRoleEnum.Admin)
        {
            return null;
        }

        if (requestingUser.Role == UserRoleEnum.Artist)
        {
            return [requestingUser.Id];
        }

        var requesterEntity = await repository.GetAsync(new UserSpec(requestingUser.Id), cancellationToken);
        var labelId = requesterEntity?.ManagerLabelId ?? requesterEntity?.ArtistLabelId;

        if (labelId == null)
        {
            return [];
        }

        var artists = await repository.ListAsync<User>(new UsersByArtistLabelSpec(labelId.Value), cancellationToken);

        return artists.Select(artist => artist.Id).ToHashSet();
    }

    public static bool CanAccessArtist(UserRecord requestingUser, Guid? artistId, HashSet<Guid>? accessibleArtistIds)
    {
        if (requestingUser.Role == UserRoleEnum.Admin)
        {
            return true;
        }

        return artistId.HasValue && accessibleArtistIds != null && accessibleArtistIds.Contains(artistId.Value);
    }
}