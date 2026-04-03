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

public class MerchService(IRepository<WebAppDatabaseContext> repository) : IMerchService
{
    public async Task<ServiceResponse<MerchRecord>> GetMerchById(Guid id, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        var accessibleArtistIds = await AccessScopeHelper.GetAccessibleArtistIds(repository, requestingUser, cancellationToken);
        var entity = await repository.GetAsync(new MerchSpec(id), cancellationToken);

        if (entity == null)
            return ServiceResponse.FromError<MerchRecord>(CommonErrors.MerchNotFound);

        if (!AccessScopeHelper.CanAccessArtist(requestingUser, entity.ArtistId, accessibleArtistIds))
            return ServiceResponse.FromError<MerchRecord>(new(HttpStatusCode.Forbidden, "You cannot access this merch item!", ErrorCodes.CannotRead));

        return ServiceResponse.ForSuccess(new MerchRecord
        {
            Id = entity.Id,
            Name = entity.Name,
            Description = entity.Description,
            Price = entity.Price,
            Stock = entity.Stock,
            ArtistId = entity.ArtistId
        });
    }

    public async Task<ServiceResponse<PagedResponse<MerchRecord>>> GetMerch(PaginationSearchQueryParams pagination, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        var accessibleArtistIds = await AccessScopeHelper.GetAccessibleArtistIds(repository, requestingUser, cancellationToken);
        var result = await repository.PageAsync(pagination, new MerchProjectionSpec(pagination.Search, accessibleArtistIds), cancellationToken);
        return ServiceResponse.ForSuccess(result);
    }

    public async Task<ServiceResponse> AddMerch(MerchAddRecord merch, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser.Role != UserRoleEnum.Artist)
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only artists can add merch!", ErrorCodes.CannotAdd));

        await repository.AddAsync(new Merch
        {
            Name = merch.Name,
            Description = merch.Description,
            Price = merch.Price,
            Stock = merch.Stock,
            ArtistId = requestingUser.Id
        }, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> UpdateMerch(Guid id, MerchUpdateRecord merch, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser.Role != UserRoleEnum.Artist && requestingUser.Role != UserRoleEnum.Admin)
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only artists or admins can update merch!", ErrorCodes.CannotUpdate));

        var entity = await repository.GetAsync(new MerchSpec(id), cancellationToken);

        if (entity == null)
            return ServiceResponse.FromError(CommonErrors.MerchNotFound);

        if (requestingUser.Role == UserRoleEnum.Artist && entity.ArtistId != requestingUser.Id)
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Artists can only update their own merch!", ErrorCodes.CannotUpdate));

        entity.Name = merch.Name ?? entity.Name;
        entity.Description = merch.Description ?? entity.Description;
        if (merch.Price.HasValue) entity.Price = merch.Price.Value;
        if (merch.Stock.HasValue) entity.Stock = merch.Stock.Value;

        await repository.UpdateAsync(entity, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteMerch(Guid id, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser.Role != UserRoleEnum.Artist && requestingUser.Role != UserRoleEnum.Admin)
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only artists or admins can delete merch!", ErrorCodes.CannotDelete));

        var entity = await repository.GetAsync(new MerchSpec(id), cancellationToken);

        if (entity == null)
            return ServiceResponse.FromError(CommonErrors.MerchNotFound);

        if (requestingUser.Role == UserRoleEnum.Artist && entity.ArtistId != requestingUser.Id)
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Artists can only delete their own merch!", ErrorCodes.CannotDelete));

        await repository.DeleteAsync<Merch>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}
