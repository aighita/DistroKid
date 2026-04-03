using DistroKid.Infrastructure.Requests;
using DistroKid.Infrastructure.Responses;
using DistroKid.Services.DataTransferObjects;

namespace DistroKid.Services.Abstractions;

public interface ITrackService
{
    public Task<ServiceResponse<TrackRecord>> GetTrackById(Guid id, UserRecord requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<TrackRecord>>> GetTracks(PaginationSearchQueryParams pagination, UserRecord requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddTrack(TrackAddRecord track, UserRecord requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdateTrack(Guid id, TrackUpdateRecord track, UserRecord requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteTrack(Guid id, UserRecord requestingUser, CancellationToken cancellationToken = default);
}
