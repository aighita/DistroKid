using DistroKid.Infrastructure.Requests;
using DistroKid.Infrastructure.Responses;
using DistroKid.Services.DataTransferObjects;

namespace DistroKid.Services.Abstractions;


public interface IPlatformService
{
    public Task<ServiceResponse<PlatformRecord>> GetPlatformById(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddPlatform(PlatformAddRecord platform, UserRecord requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdatePlatform(Guid id, PlatformUpdateRecord platform, UserRecord requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeletePlatform(Guid id, UserRecord requestingUser, CancellationToken cancellationToken = default);
}
