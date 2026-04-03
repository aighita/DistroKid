using DistroKid.Infrastructure.Requests;
using DistroKid.Infrastructure.Responses;
using DistroKid.Services.DataTransferObjects;

namespace DistroKid.Services.Abstractions;

public interface IMerchService
{
    public Task<ServiceResponse<MerchRecord>> GetMerchById(Guid id, UserRecord requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<MerchRecord>>> GetMerch(PaginationSearchQueryParams pagination, UserRecord requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddMerch(MerchAddRecord merch, UserRecord requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdateMerch(Guid id, MerchUpdateRecord merch, UserRecord requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteMerch(Guid id, UserRecord requestingUser, CancellationToken cancellationToken = default);
}
