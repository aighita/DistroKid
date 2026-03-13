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

public class ReleaseService(IRepository<WebAppDatabaseContext> repository) : IReleaseService
{
    public async Task<ServiceResponse<ReleaseRecord>> GetReleaseById(Guid id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceResponse> AddRelease(ReleaseAddRecord Release, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceResponse> UpdateRelease(Guid id, ReleaseUpdateRecord Release, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceResponse> DeleteRelease(Guid id, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
