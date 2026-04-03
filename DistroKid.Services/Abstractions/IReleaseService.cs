using DistroKid.Infrastructure.Requests;
using DistroKid.Infrastructure.Responses;
using DistroKid.Services.DataTransferObjects;

namespace DistroKid.Services.Abstractions;

public interface IReleaseService
{
    public Task<ServiceResponse<ReleaseRecord>> GetReleaseById(Guid id, UserRecord requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<ReleaseRecord>>> GetReleases(PaginationSearchQueryParams pagination, UserRecord requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddRelease(ReleaseAddRecord release, UserRecord requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdateRelease(Guid id, ReleaseUpdateRecord release, UserRecord requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteRelease(Guid id, UserRecord requestingUser, CancellationToken cancellationToken = default);
}
