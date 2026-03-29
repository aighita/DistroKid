using Microsoft.AspNetCore.Mvc;
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

    [HttpPost]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] FeedbackAddRecord feedback)
    {
        var currentUser = await GetCurrentUser();
        // If user is not logged in, we still allow feedback (it will be anonymous if specified, or just null UserId)
        Guid? userId = currentUser.Result?.Id;

        return FromServiceResponse(await _feedbackService.AddFeedback(feedback, userId));
    }
}
