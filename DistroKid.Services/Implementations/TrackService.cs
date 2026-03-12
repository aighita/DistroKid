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

public class TrackService(IRepository<WebAppDatabaseContext> repository) : ITrackService
{
    public async Task<ServiceResponse<TrackRecord>> GetTrackById(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await repository.GetAsync(new TrackProjectionSpec(id), cancellationToken);
        
        return result != null ?
            ServiceResponse.ForSuccess(result) :
            ServiceResponse.FromError<TrackRecord>(CommonErrors.TrackNotFound);
    }

    public Task<ServiceResponse> AddTrack(TrackAddRecord track, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceResponse> UpdateTrack(Guid id, TrackUpdateRecord track, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }

    public Task<ServiceResponse> DeleteTrack(Guid id, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        throw new NotImplementedException();
    }
}
