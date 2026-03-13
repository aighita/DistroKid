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

public class LabelService : ILabelService
{
    public async Task<ServiceResponse<LabelRecord>> GetLabelById(Guid id, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceResponse> AddLabel(LabelAddRecord Label, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceResponse> UpdateLabel(Guid id, LabelUpdateRecord Label, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceResponse> DeleteLabel(Guid id, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
