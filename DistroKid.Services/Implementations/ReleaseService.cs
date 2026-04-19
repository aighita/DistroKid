using System.Net;
using Microsoft.EntityFrameworkCore;
using DistroKid.Database.Repository;
using DistroKid.Database.Repository.Entities;
using DistroKid.Database.Repository.Enums;
using DistroKid.Infrastructure.Errors;
using DistroKid.Infrastructure.Repositories.Interfaces;
using DistroKid.Infrastructure.Requests;
using DistroKid.Infrastructure.Responses;
using DistroKid.Services.Abstractions;
using DistroKid.Services.Constants;
using DistroKid.Services.DataTransferObjects;
using DistroKid.Services.Helpers;
using DistroKid.Services.Specifications;

namespace DistroKid.Services.Implementations;

public class ReleaseService(IRepository<WebAppDatabaseContext> repository, IMailService mailService) : IReleaseService
{
    private static DateTime ToUtc(DateTime value) => value.Kind switch
    {
        DateTimeKind.Utc => value,
        DateTimeKind.Unspecified => DateTime.SpecifyKind(value, DateTimeKind.Utc),
        _ => value.ToUniversalTime(),
    };

    public async Task<ServiceResponse<ReleaseRecord>> GetReleaseById(Guid id, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        var accessibleArtistIds = await AccessScopeHelper.GetAccessibleArtistIds(repository, requestingUser, cancellationToken);
        var entity = await repository.GetAsync(new ReleaseSpec(id), cancellationToken);

        if (entity == null)
            return ServiceResponse.FromError<ReleaseRecord>(CommonErrors.ReleaseNotFound);

        if (!AccessScopeHelper.CanAccessArtist(requestingUser, entity.ArtistId, accessibleArtistIds))
            return ServiceResponse.FromError<ReleaseRecord>(new(HttpStatusCode.Forbidden, "You cannot access this release!", ErrorCodes.CannotRead));

        return ServiceResponse.ForSuccess(new ReleaseRecord
        {
            Id = entity.Id,
            Title = entity.Title,
            ReleaseDate = entity.ReleaseDate,
            Label = entity.Label,
            ReleaseType = entity.ReleaseType,
            Tracks = entity.Tracks.Select(t => new TrackRecord
            {
                Id = t.Id,
                Title = t.Title,
                DurationInSeconds = t.DurationInSeconds,
                ISRC = t.ISRC,
                ArtistId = t.ArtistId,
                Artist = new UserRecord
                {
                    Id = t.Artist.Id,
                    Name = t.Artist.Name,
                    Email = t.Artist.Email,
                    Role = t.Artist.Role
                }
            }).ToList(),
            Platforms = entity.Platforms.Select(p => new PlatformRecord
            {
                Id = p.Id,
                Name = p.Name,
                Url = p.Url
            }).ToList(),
            Artist = entity.Artist != null ? new UserRecord
            {
                Id = entity.Artist.Id,
                Name = entity.Artist.Name,
                Email = entity.Artist.Email,
                Role = entity.Artist.Role
            } : null
        });
    }

    public async Task<ServiceResponse<PagedResponse<ReleaseRecord>>> GetReleases(PaginationSearchQueryParams pagination, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        var accessibleArtistIds = await AccessScopeHelper.GetAccessibleArtistIds(repository, requestingUser, cancellationToken);
        var result = await repository.PageAsync(pagination, new ReleaseProjectionSpec(pagination.Search, accessibleArtistIds), cancellationToken);
        return ServiceResponse.ForSuccess(result);
    }

    public async Task<ServiceResponse> AddRelease(ReleaseAddRecord release, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser.Role != UserRoleEnum.Artist && requestingUser.Role != UserRoleEnum.Manager)
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only artists or managers can add releases!", ErrorCodes.CannotAdd));

        Guid artistId;
        string artistEmail;
        string artistName;

        if (requestingUser.Role == UserRoleEnum.Artist)
        {
            artistId = requestingUser.Id;
            artistEmail = requestingUser.Email;
            artistName = requestingUser.Name;
        }
        else // Manager must specify which artist the release belongs to
        {
            if (release.ArtistId == null)
                return ServiceResponse.FromError(new(HttpStatusCode.BadRequest, "Managers must specify an ArtistId for the release!", ErrorCodes.CannotAdd));

            var selectedArtist = await repository.GetAsync(new UserSpec(release.ArtistId.Value), cancellationToken);

            if (selectedArtist == null)
                return ServiceResponse.FromError(CommonErrors.UserNotFound);

            if (selectedArtist.Role != UserRoleEnum.Artist)
                return ServiceResponse.FromError(CommonErrors.UserNotArtist);

            // Validate that the manager is responsible for this artist (they share a label)
            var manager = await repository.GetAsync(new UserSpec(requestingUser.Id), cancellationToken);

            if (manager?.ManagerLabelId == null || selectedArtist.ArtistLabelId != manager.ManagerLabelId)
                return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Managers can only create releases for artists in their label!", ErrorCodes.CannotAdd));

            artistId = selectedArtist.Id;
            artistEmail = selectedArtist.Email;
            artistName = selectedArtist.Name;
        }

        var artist = await repository.GetAsync(new UserWithPlatformsSpec(artistId), cancellationToken);

        if (artist == null)
            return ServiceResponse.FromError(CommonErrors.UserNotFound);

        // Resolve Track entities by the provided IDs
        var tracks = new List<Track>();
        foreach (var trackId in release.TrackIds ?? new List<Guid>())
        {
            var track = await repository.GetAsync(new TrackSpec(trackId), cancellationToken);
            if (track == null)
                continue;

            if (track.ArtistId != artistId)
                return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "A release can only contain tracks owned by the selected artist!", ErrorCodes.CannotAdd));

            tracks.Add(track);
        }

        // Resolve Platform entities by the provided IDs
        var platforms = new List<Platform>();
        foreach (var platformId in release.PlatformIds ?? new List<Guid>())
        {
            var platform = await repository.GetAsync(new PlatformSpec(platformId), cancellationToken);
            if (platform == null)
                continue;

            if (!artist.Platforms.Any(connectedPlatform => connectedPlatform.Id == platformId))
                return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only platforms connected to the artist account can be attached to a release!", ErrorCodes.CannotAdd));

            platforms.Add(platform);
        }

        await using var transaction = await repository.DbContext.Database.BeginTransactionAsync(cancellationToken);

        try
        {
            await repository.DbContext.Set<Release>().AddAsync(new Release
            {
                Title = release.Title,
                ReleaseDate = ToUtc(release.ReleaseDate),
                Label = release.Label,
                ReleaseType = release.ReleaseType,
                ArtistId = artistId,
                Tracks = tracks,
                Platforms = platforms
            }, cancellationToken);

            await repository.DbContext.SaveChangesAsync(cancellationToken);

            var mailResult = await mailService.SendMail(
                artistEmail,
                "New Release Published!",
                MailTemplates.ReleaseAddTemplate(artistName, release.Title),
                true,
                "DistroKid",
                cancellationToken);

            if (!mailResult.IsOk)
            {
                await transaction.RollbackAsync(cancellationToken);
                return mailResult;
            }

            await transaction.CommitAsync(cancellationToken);
        }
        catch (DbUpdateException)
        {
            await transaction.RollbackAsync(cancellationToken);
            throw;
        }

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> UpdateRelease(Guid id, ReleaseUpdateRecord release, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser.Role != UserRoleEnum.Artist && requestingUser.Role != UserRoleEnum.Manager && requestingUser.Role != UserRoleEnum.Admin)
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only artists, managers or admins can update releases!", ErrorCodes.CannotUpdate));

        var entity = await repository.GetAsync(new ReleaseSpec(id), cancellationToken);

        if (entity == null)
            return ServiceResponse.FromError(CommonErrors.ReleaseNotFound);

        if (requestingUser.Role == UserRoleEnum.Artist && entity.ArtistId.HasValue && entity.ArtistId.Value != requestingUser.Id)
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Artists can only update their own releases!", ErrorCodes.CannotUpdate));

        if ((requestingUser.Role == UserRoleEnum.Manager || requestingUser.Role == UserRoleEnum.Label) && entity.ArtistId.HasValue)
        {
            var accessibleArtistIds = await AccessScopeHelper.GetAccessibleArtistIds(repository, requestingUser, cancellationToken);
            if (!AccessScopeHelper.CanAccessArtist(requestingUser, entity.ArtistId, accessibleArtistIds))
                return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "You can only update releases for artists in your scope!", ErrorCodes.CannotUpdate));
        }

        if (requestingUser.Role == UserRoleEnum.Admin && release.PlatformIds != null)
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Admins cannot change platform assignments for releases!", ErrorCodes.CannotUpdate));

        entity.Title = release.Title ?? entity.Title;
        entity.Label = release.Label ?? entity.Label;
        if (release.ReleaseType.HasValue) entity.ReleaseType = release.ReleaseType.Value;
        if (release.ReleaseDate.HasValue) entity.ReleaseDate = ToUtc(release.ReleaseDate.Value);

        var releaseArtist = entity.ArtistId.HasValue
            ? await repository.GetAsync(new UserWithPlatformsSpec(entity.ArtistId.Value), cancellationToken)
            : null;

        if (release.TrackIds != null)
        {
            var newTracks = new List<Track>();
            foreach (var trackId in release.TrackIds)
            {
                var track = await repository.GetAsync(new TrackSpec(trackId), cancellationToken);
                if (track == null)
                    continue;

                if (!entity.ArtistId.HasValue || track.ArtistId != entity.ArtistId.Value)
                    return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "A release can only contain tracks owned by its artist!", ErrorCodes.CannotUpdate));

                newTracks.Add(track);
            }

            entity.Tracks.Clear();
            foreach (var track in newTracks) entity.Tracks.Add(track);
        }

        if (release.PlatformIds != null)
        {
            var newPlatforms = new List<Platform>();
            foreach (var platformId in release.PlatformIds)
            {
                var platform = await repository.GetAsync(new PlatformSpec(platformId), cancellationToken);
                if (platform == null)
                    continue;

                if (releaseArtist == null || !releaseArtist.Platforms.Any(connectedPlatform => connectedPlatform.Id == platformId))
                    return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only platforms connected to the artist account can be attached to a release!", ErrorCodes.CannotUpdate));

                newPlatforms.Add(platform);
            }

            entity.Platforms.Clear();
            foreach (var platform in newPlatforms) entity.Platforms.Add(platform);
        }

        entity.UpdateTime();
        await repository.DbContext.SaveChangesAsync(cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteRelease(Guid id, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser.Role != UserRoleEnum.Artist && requestingUser.Role != UserRoleEnum.Manager && requestingUser.Role != UserRoleEnum.Admin)
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only artists, managers or admins can delete releases!", ErrorCodes.CannotDelete));

        var entity = await repository.GetAsync(new ReleaseSpec(id), cancellationToken);

        if (entity == null)
            return ServiceResponse.FromError(CommonErrors.ReleaseNotFound);

        if (requestingUser.Role == UserRoleEnum.Artist && entity.ArtistId.HasValue && entity.ArtistId.Value != requestingUser.Id)
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Artists can only delete their own releases!", ErrorCodes.CannotDelete));

        if ((requestingUser.Role == UserRoleEnum.Manager || requestingUser.Role == UserRoleEnum.Label) && entity.ArtistId.HasValue)
        {
            var accessibleArtistIds = await AccessScopeHelper.GetAccessibleArtistIds(repository, requestingUser, cancellationToken);
            if (!AccessScopeHelper.CanAccessArtist(requestingUser, entity.ArtistId, accessibleArtistIds))
                return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "You can only delete releases for artists in your scope!", ErrorCodes.CannotDelete));
        }

        await repository.DeleteAsync<Release>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}
