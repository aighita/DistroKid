using System.Net;
using DistroKid.Database.Repository;
using DistroKid.Database.Repository.Entities;
using DistroKid.Database.Repository.Enums;
using DistroKid.Infrastructure.Errors;
using DistroKid.Infrastructure.Repositories.Interfaces;
using DistroKid.Infrastructure.Responses;
using DistroKid.Services.Abstractions;
using DistroKid.Services.DataTransferObjects;
using DistroKid.Services.Specifications;

namespace DistroKid.Services.Implementations;

public class PlatformService(IRepository<WebAppDatabaseContext> repository) : IPlatformService
{
    public async Task<ServiceResponse<PlatformRecord>> GetPlatformById(Guid id, CancellationToken cancellationToken = default)
    {
        var entity = await repository.GetAsync(new PlatformSpec(id), cancellationToken);

        return entity != null
            ? ServiceResponse.ForSuccess(new PlatformRecord { Id = entity.Id, Name = entity.Name, Url = entity.Url })
            : ServiceResponse.FromError<PlatformRecord>(CommonErrors.PlatformNotFound);
    }

    public async Task<ServiceResponse> AddPlatform(PlatformAddRecord platform, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser.Role != UserRoleEnum.Admin)
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only admins can add platforms!", ErrorCodes.CannotAdd));

        await repository.AddAsync(new Platform
        {
            Name = platform.Name,
            Url = platform.Url
        }, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> UpdatePlatform(Guid id, PlatformUpdateRecord platform, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser.Role != UserRoleEnum.Admin)
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only admins can update platforms!", ErrorCodes.CannotUpdate));

        var entity = await repository.GetAsync(new PlatformSpec(id), cancellationToken);

        if (entity == null)
            return ServiceResponse.FromError(CommonErrors.PlatformNotFound);

        entity.Name = platform.Name ?? entity.Name;
        entity.Url = platform.Url ?? entity.Url;

        await repository.UpdateAsync(entity, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeletePlatform(Guid id, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser.Role != UserRoleEnum.Admin)
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only admins can delete platforms!", ErrorCodes.CannotDelete));

        await repository.DeleteAsync<Platform>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse<List<PlatformRecord>>> GetAllPlatforms(CancellationToken cancellationToken = default)
    {
        var result = await repository.ListAsync<Platform>(new PlatformSpec(), cancellationToken);

        if (result == null || result.Count == 0)
            return ServiceResponse.FromError<List<PlatformRecord>>(CommonErrors.NoPlatformsFound);

        return ServiceResponse.ForSuccess(result.Select(p => new PlatformRecord
        {
            Id = p.Id,
            Name = p.Name,
            Url = p.Url
        }).ToList());
    }
}
