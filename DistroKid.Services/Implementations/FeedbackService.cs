using DistroKid.Database.Repository;
using DistroKid.Database.Repository.Entities;
using DistroKid.Infrastructure.Repositories.Interfaces;
using DistroKid.Infrastructure.Requests;
using DistroKid.Infrastructure.Responses;
using DistroKid.Services.Abstractions;
using DistroKid.Services.DataTransferObjects;
using DistroKid.Services.Specifications;

namespace DistroKid.Services.Implementations;

public class FeedbackService(IRepository<WebAppDatabaseContext> repository) : IFeedbackService
{
    public async Task<ServiceResponse> AddFeedback(FeedbackAddRecord feedback, Guid? userId, CancellationToken cancellationToken = default)
    {
        await repository.AddAsync(new Feedback
        {
            Type = feedback.Type,
            Rating = feedback.Rating,
            IsAnonymous = feedback.IsAnonymous,
            Comment = feedback.Comment,
            UserId = feedback.IsAnonymous ? null : userId
        }, cancellationToken);

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse<PagedResponse<FeedbackRecord>>> GetFeedbackPage(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default)
    {
        var result = await repository.PageAsync(pagination, new FeedbackProjectionSpec(pagination.Search), cancellationToken);
        return ServiceResponse.ForSuccess(result);
    }
}
