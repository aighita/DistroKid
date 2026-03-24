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
public class PlatformController(ILogger<PlatformController> logger, IUserService userService, IPlatformService PlatformService) : AuthorizedController(logger, userService)
{
    protected readonly IPlatformService PlatformService = PlatformService;

    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<PlatformRecord>>> GetById([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await PlatformService.GetPlatformById(id)) :
            ErrorMessageResult<PlatformRecord>(currentUser.Error);
    }

    [HttpGet]
    public async Task<ActionResult<RequestResponse<List<PlatformRecord>>>> GetAll()
    {
        return FromServiceResponse(await PlatformService.GetAllPlatforms());
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] PlatformAddRecord Platform)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await PlatformService.AddPlatform(Platform, currentUser.Result)) :
            ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Update([FromRoute] Guid id, [FromBody] PlatformUpdateRecord Platform)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await PlatformService.UpdatePlatform(id, Platform, currentUser.Result)) :
            ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await PlatformService.DeletePlatform(id, currentUser.Result)) :
            ErrorMessageResult(currentUser.Error);
    }
}
