using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DistroKid.Infrastructure.Requests;
using DistroKid.Infrastructure.Responses;
using DistroKid.Services.Abstractions;
using DistroKid.Services.Authorization;
using DistroKid.Services.DataTransferObjects;

namespace DistroKid.Api.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class FeedbackController(ILogger<FeedbackController> logger, IUserService userService, IFeedbackService feedbackService) : AuthorizedController(logger, userService)
{
    private readonly IFeedbackService _feedbackService = feedbackService;

    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<FeedbackRecord>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await _feedbackService.GetFeedbackPage(pagination)) :
            ErrorMessageResult<PagedResponse<FeedbackRecord>>(currentUser.Error);
    }

    [HttpPost]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] FeedbackAddRecord feedback)
    {
        var currentUser = await GetCurrentUser();
        // If user is not logged in, we still allow feedback (it will be anonymous if specified, or just null UserId)
        Guid? userId = currentUser.Result?.Id;

        return FromServiceResponse(await _feedbackService.AddFeedback(feedback, userId));
    }
}
