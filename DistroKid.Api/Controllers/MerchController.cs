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
public class MerchController(ILogger<MerchController> logger, IUserService userService, IMerchService MerchService) : AuthorizedController(logger, userService)
{
    protected readonly IMerchService MerchService = MerchService;

    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<MerchRecord>>> GetById([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await MerchService.GetMerchById(id)) :
            ErrorMessageResult<MerchRecord>(currentUser.Error);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<MerchRecord>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await MerchService.GetMerch(pagination)) :
            ErrorMessageResult<PagedResponse<MerchRecord>>(currentUser.Error);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] MerchAddRecord Merch)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await MerchService.AddMerch(Merch, currentUser.Result)) :
            ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Update([FromRoute] Guid id, [FromBody] MerchUpdateRecord Merch)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await MerchService.UpdateMerch(id, Merch, currentUser.Result)) :
            ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await MerchService.DeleteMerch(id, currentUser.Result)) :
            ErrorMessageResult(currentUser.Error);
    }
}
