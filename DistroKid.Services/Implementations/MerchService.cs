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

public class MerchService : IMerchService
{
    public async Task<ServiceResponse<MerchRecord>> GetMerchById(Guid id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceResponse> AddMerch(MerchAddRecord Merch, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceResponse> UpdateMerch(Guid id, MerchUpdateRecord Merch, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceResponse> DeleteMerch(Guid id, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
