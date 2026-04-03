using DistroKid.Infrastructure.Requests;
using DistroKid.Infrastructure.Responses;
using DistroKid.Services.DataTransferObjects;

namespace DistroKid.Services.Abstractions;

public interface IFeedbackService
{
    Task<ServiceResponse> AddFeedback(FeedbackAddRecord feedback, Guid? userId, CancellationToken cancellationToken = default);
    Task<ServiceResponse<PagedResponse<FeedbackRecord>>> GetFeedbackPage(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);
}
