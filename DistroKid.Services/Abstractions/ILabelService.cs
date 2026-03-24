using DistroKid.Infrastructure.Requests;
using DistroKid.Infrastructure.Responses;
using DistroKid.Services.DataTransferObjects;

namespace DistroKid.Services.Abstractions;

public interface ILabelService
{
    public Task<ServiceResponse<LabelRecord>> GetLabelById(Guid id, CancellationToken cancellationToken = default);
    public Task<ServiceResponse<PagedResponse<LabelRecord>>> GetLabels(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> AddLabel(LabelAddRecord label, UserRecord requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> UpdateLabel(Guid id, LabelUpdateRecord label, UserRecord requestingUser, CancellationToken cancellationToken = default);
    public Task<ServiceResponse> DeleteLabel(Guid id, UserRecord requestingUser, CancellationToken cancellationToken = default);
}
