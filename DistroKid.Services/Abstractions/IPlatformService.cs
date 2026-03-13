using DistroKid.Infrastructure.Requests;
using DistroKid.Infrastructure.Responses;
using DistroKid.Services.DataTransferObjects;

namespace DistroKid.Services.Abstractions;


public interface IPlatformService
{
    public Task<ServiceResponse<PlatformRecord>> GetMerchById(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddMerch(PlatformAddRecord merch, UserRecord requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdateMerch(Guid id, PlatformUpdateRecord merch, UserRecord requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteMerch(Guid id, UserRecord requestingUser, CancellationToken cancellationToken = default);
}
