using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using DistroKid.Infrastructure.Authorization;
using DistroKid.Infrastructure.Requests;
using DistroKid.Infrastructure.Responses;
using DistroKid.Services.Abstractions;
using DistroKid.Services.Authorization;
using DistroKid.Services.DataTransferObjects;
using DistroKid.Services.Implementations;

namespace DistroKid.Api.Controllers;


[ApiController]
[Route("api/[controller]/[action]")]
public class LabelController(ILogger<LabelController> logger, IUserService userService, ILabelService labelService) : AuthorizedController(logger, userService)
{
    protected readonly ILabelService LabelService = labelService;

    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<LabelRecord>>> GetById([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await LabelService.GetLabelById(id)) :
            ErrorMessageResult<LabelRecord>(currentUser.Error);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<LabelRecord>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await LabelService.GetLabels(pagination)) :
            ErrorMessageResult<PagedResponse<LabelRecord>>(currentUser.Error);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] LabelAddRecord label)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await LabelService.AddLabel(label, currentUser.Result)) :
            ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Update([FromRoute] Guid id, [FromBody] LabelUpdateRecord label)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await LabelService.UpdateLabel(id, label, currentUser.Result)) :
            ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await LabelService.DeleteLabel(id, currentUser.Result)) :
            ErrorMessageResult(currentUser.Error);
    }
}
