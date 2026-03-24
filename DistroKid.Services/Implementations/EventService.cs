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

public class EventService(IRepository<WebAppDatabaseContext> repository) : IEventService
{
    public async Task<ServiceResponse<EventRecord>> GetEventById(Guid id, CancellationToken cancellationToken = default)
    {
        var entity = await repository.GetAsync(new EventSpec(id), cancellationToken);

        if (entity == null)
            return ServiceResponse.FromError<EventRecord>(CommonErrors.EventNotFound);

        return ServiceResponse.ForSuccess(new EventRecord
        {
            Id = entity.Id,
            Name = entity.Name,
            Description = entity.Description,
            Location = entity.Location,
            Date = entity.Date,
            Artist = new UserRecord
            {
                Id = entity.Artist.Id,
                Name = entity.Artist.Name,
                Email = entity.Artist.Email,
                Role = entity.Artist.Role
            }
        });
    }

    public async Task<ServiceResponse<PagedResponse<EventRecord>>> GetEvents(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default)
    {
        var result = await repository.PageAsync(pagination, new EventProjectionSpec(pagination.Search), cancellationToken);
        return ServiceResponse.ForSuccess(result);
    }

    public async Task<ServiceResponse> AddEvent(EventAddRecord eventRecord, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser.Role != UserRoleEnum.Artist)
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only artists can add events!", ErrorCodes.CannotAdd));

        await repository.AddAsync(new Event
        {
            Name = eventRecord.Name,
            Description = eventRecord.Description,
            Location = eventRecord.Location,
            Date = eventRecord.Date,
            ArtistId = requestingUser.Id
        }, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> UpdateEvent(Guid id, EventUpdateRecord eventRecord, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser.Role != UserRoleEnum.Artist && requestingUser.Role != UserRoleEnum.Admin)
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only artists or admins can update events!", ErrorCodes.CannotUpdate));

        var entity = await repository.GetAsync(new EventSpec(id), cancellationToken);

        if (entity == null)
            return ServiceResponse.FromError(CommonErrors.EventNotFound);

        if (requestingUser.Role == UserRoleEnum.Artist && entity.ArtistId != requestingUser.Id)
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Artists can only update their own events!", ErrorCodes.CannotUpdate));

        entity.Name = eventRecord.Name ?? entity.Name;
        entity.Description = eventRecord.Description ?? entity.Description;
        entity.Location = eventRecord.Location ?? entity.Location;
        if (eventRecord.Date.HasValue) entity.Date = eventRecord.Date.Value;

        await repository.UpdateAsync(entity, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteEvent(Guid id, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser.Role != UserRoleEnum.Artist && requestingUser.Role != UserRoleEnum.Admin)
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only artists or admins can delete events!", ErrorCodes.CannotDelete));

        var entity = await repository.GetAsync(new EventSpec(id), cancellationToken);

        if (entity == null)
            return ServiceResponse.FromError(CommonErrors.EventNotFound);

        if (requestingUser.Role == UserRoleEnum.Artist && entity.ArtistId != requestingUser.Id)
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Artists can only delete their own events!", ErrorCodes.CannotDelete));

        await repository.DeleteAsync<Event>(id, cancellationToken);

        return ServiceResponse.ForSuccess();
    }
}
