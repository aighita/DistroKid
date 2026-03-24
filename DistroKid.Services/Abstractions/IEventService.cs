using DistroKid.Infrastructure.Requests;
using DistroKid.Infrastructure.Responses;
using DistroKid.Services.DataTransferObjects;

namespace DistroKid.Services.Abstractions;

public interface IEventService
{
    public Task<ServiceResponse<EventRecord>> GetEventById(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<EventRecord>>> GetEvents(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddEvent(EventAddRecord eventRecord, UserRecord requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdateEvent(Guid id, EventUpdateRecord eventRecord, UserRecord requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteEvent(Guid id, UserRecord requestingUser, CancellationToken cancellationToken = default);
}
