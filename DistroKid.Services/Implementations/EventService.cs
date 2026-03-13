using DistroKid.Database.Repository;
using DistroKid.Database.Repository.Entities;
using DistroKid.Infrastructure.Errors;
using DistroKid.Infrastructure.Repositories.Interfaces;
using DistroKid.Infrastructure.Requests;
using DistroKid.Infrastructure.Responses;
using DistroKid.Services.Abstractions;
using DistroKid.Services.Constants;
using DistroKid.Services.DataTransferObjects;
using DistroKid.Services.Specifications;

namespace DistroKid.Services.Implementations;

public class EventService(IRepository<WebAppDatabaseContext> repository) : IEventService
{
    public async Task<ServiceResponse<EventRecord>> GetEventById(Guid id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceResponse> AddEvent(EventAddRecord Event, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceResponse> UpdateEvent(Guid id, EventUpdateRecord Event, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceResponse> DeleteEvent(Guid id, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
