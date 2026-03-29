using DistroKid.Infrastructure.Responses;
using DistroKid.Services.DataTransferObjects;

namespace DistroKid.Services.Abstractions;

public interface IFeedbackService
{
    Task<ServiceResponse> AddFeedback(FeedbackAddRecord feedback, Guid? userId, CancellationToken cancellationToken = default);
}
