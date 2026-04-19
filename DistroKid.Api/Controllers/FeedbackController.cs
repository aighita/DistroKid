using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using DistroKid.Database.Repository.Enums;
using DistroKid.Infrastructure.Errors;
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
        Guid? userId = null;

        if (User.Identity?.IsAuthenticated == true)
        {
            var currentUser = await GetCurrentUser();

            if (currentUser.Result == null)
            {
                return ErrorMessageResult(currentUser.Error);
            }

            if (currentUser.Result.Role == UserRoleEnum.Admin)
            {
                return ErrorMessageResult(new ErrorMessage(HttpStatusCode.Forbidden, "Admins cannot submit feedback."));
            }

            userId = currentUser.Result.Id;
        }

        return FromServiceResponse(await _feedbackService.AddFeedback(feedback, userId));
    }
}
