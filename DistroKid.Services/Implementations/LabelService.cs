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
using DistroKid.Services.Specifications;

namespace DistroKid.Services.Implementations;

public class LabelService(IRepository<WebAppDatabaseContext> repository) : ILabelService
{
    public async Task<ServiceResponse<LabelRecord>> GetLabelById(Guid id, CancellationToken cancellationToken = default)
    {
        var entity = await repository.GetAsync(new LabelSpec(id), cancellationToken);

        if (entity == null)
            return ServiceResponse.FromError<LabelRecord>(CommonErrors.LabelNotFound);

        return ServiceResponse.ForSuccess(new LabelRecord
        {
            Id = entity.Id,
            Name = entity.Name,
            Website = entity.Website,
            Releases = entity.Releases.Select(r => new ReleaseRecord
            {
                Id = r.Id,
                Title = r.Title,
                ReleaseDate = r.ReleaseDate,
                Label = r.Label,
                ReleaseType = r.ReleaseType
            }).ToList(),
            Artists = entity.Artists.Select(u => new UserRecord
            {
                Id = u.Id,
                Name = u.Name,
                Email = u.Email,
                Role = u.Role
            }).ToList(),
            Managers = entity.Managers.Select(u => new UserRecord
            {
                Id = u.Id,
                Name = u.Name,
                Email = u.Email,
                Role = u.Role
            }).ToList()
        });
    }

    public async Task<ServiceResponse<PagedResponse<LabelRecord>>> GetLabels(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default)
    {
        var result = await repository.PageAsync(pagination, new LabelProjectionSpec(pagination.Search), cancellationToken);
        return ServiceResponse.ForSuccess(result);
    }

    public async Task<ServiceResponse> AddLabel(LabelAddRecord label, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser.Role != UserRoleEnum.Admin)
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only admins can add labels!", ErrorCodes.CannotAdd));

        await repository.AddAsync(new Label
        {
            Name = label.Name,
            Website = label.Website
        }, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> UpdateLabel(Guid id, LabelUpdateRecord label, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser.Role != UserRoleEnum.Admin)
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only admins can update labels!", ErrorCodes.CannotUpdate));

        var entity = await repository.GetAsync(new LabelSpec(id), cancellationToken);

        if (entity == null)
            return ServiceResponse.FromError(CommonErrors.LabelNotFound);

        entity.Name = label.Name ?? entity.Name;
        entity.Website = label.Website ?? entity.Website;

        await repository.UpdateAsync(entity, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteLabel(Guid id, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser.Role != UserRoleEnum.Admin)
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only admins can delete labels!", ErrorCodes.CannotDelete));

        await repository.DeleteAsync<Label>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}
