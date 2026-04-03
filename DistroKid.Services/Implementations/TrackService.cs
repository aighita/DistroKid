using System.Net;
using DistroKid.Database.Repository;
using DistroKid.Database.Repository.Entities;
using DistroKid.Database.Repository.Enums;
using DistroKid.Infrastructure.Errors;
using DistroKid.Infrastructure.Repositories.Interfaces;
using DistroKid.Infrastructure.Requests;
using DistroKid.Infrastructure.Responses;
using DistroKid.Services.Abstractions;
using DistroKid.Services.DataTransferObjects;
using DistroKid.Services.Helpers;
using DistroKid.Services.Specifications;

namespace DistroKid.Services.Implementations;

public class TrackService(IRepository<WebAppDatabaseContext> repository) : ITrackService
{
    public async Task<ServiceResponse<TrackRecord>> GetTrackById(Guid id, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        var accessibleArtistIds = await AccessScopeHelper.GetAccessibleArtistIds(repository, requestingUser, cancellationToken);
        var entity = await repository.GetAsync(new TrackSpec(id), cancellationToken);

        if (entity == null)
            return ServiceResponse.FromError<TrackRecord>(CommonErrors.TrackNotFound);

        if (!AccessScopeHelper.CanAccessArtist(requestingUser, entity.ArtistId, accessibleArtistIds))
            return ServiceResponse.FromError<TrackRecord>(new(HttpStatusCode.Forbidden, "You cannot access this track!", ErrorCodes.CannotRead));

        var result = await repository.GetAsync(new TrackProjectionSpec(id), cancellationToken);

        return result != null
            ? ServiceResponse.ForSuccess(result)
            : ServiceResponse.FromError<TrackRecord>(CommonErrors.TrackNotFound);
    }

    public async Task<ServiceResponse<PagedResponse<TrackRecord>>> GetTracks(PaginationSearchQueryParams pagination, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        var accessibleArtistIds = await AccessScopeHelper.GetAccessibleArtistIds(repository, requestingUser, cancellationToken);
        var result = await repository.PageAsync(pagination, new TrackProjectionSpec(pagination.Search, accessibleArtistIds), cancellationToken);
        return ServiceResponse.ForSuccess(result);
    }

    public async Task<ServiceResponse> AddTrack(TrackAddRecord track, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser.Role != UserRoleEnum.Artist)
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only artists can add tracks!", ErrorCodes.CannotAdd));

        await repository.AddAsync(new Track
        {
            Title = track.Title,
            DurationInSeconds = track.DurationInSeconds,
            ISRC = track.ISRC,
            ArtistId = requestingUser.Id // always set from JWT, not from the DTO
        }, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> UpdateTrack(Guid id, TrackUpdateRecord track, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser.Role != UserRoleEnum.Artist && requestingUser.Role != UserRoleEnum.Admin)
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only artists or admins can update tracks!", ErrorCodes.CannotUpdate));

        var entity = await repository.GetAsync(new TrackSpec(id), cancellationToken);

        if (entity == null)
            return ServiceResponse.FromError(CommonErrors.TrackNotFound);

        if (requestingUser.Role == UserRoleEnum.Artist && entity.ArtistId != requestingUser.Id)
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Artists can only update their own tracks!", ErrorCodes.CannotUpdate));

        if (!string.IsNullOrWhiteSpace(track.Title)) entity.Title = track.Title;
        if (track.DurationInSeconds > 0) entity.DurationInSeconds = track.DurationInSeconds;
        if (!string.IsNullOrWhiteSpace(track.ISRC)) entity.ISRC = track.ISRC;

        await repository.UpdateAsync(entity, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteTrack(Guid id, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser.Role != UserRoleEnum.Artist && requestingUser.Role != UserRoleEnum.Admin)
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only artists or admins can delete tracks!", ErrorCodes.CannotDelete));

        var entity = await repository.GetAsync(new TrackSpec(id), cancellationToken);

        if (entity == null)
            return ServiceResponse.FromError(CommonErrors.TrackNotFound);

        if (requestingUser.Role == UserRoleEnum.Artist && entity.ArtistId != requestingUser.Id)
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Artists can only delete their own tracks!", ErrorCodes.CannotDelete));

        await repository.DeleteAsync<Track>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}
