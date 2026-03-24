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
public class EventController(ILogger<EventController> logger, IUserService userService, IEventService EventService) : AuthorizedController(logger, userService)
{
    protected readonly IEventService EventService = EventService;

    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RequestResponse<EventRecord>>> GetById([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await EventService.GetEventById(id)) :
            ErrorMessageResult<EventRecord>(currentUser.Error);
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<RequestResponse<PagedResponse<EventRecord>>>> GetPage([FromQuery] PaginationSearchQueryParams pagination)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await EventService.GetEvents(pagination)) :
            ErrorMessageResult<PagedResponse<EventRecord>>(currentUser.Error);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<RequestResponse>> Add([FromBody] EventAddRecord Event)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await EventService.AddEvent(Event, currentUser.Result)) :
            ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Update([FromRoute] Guid id, [FromBody] EventUpdateRecord Event)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await EventService.UpdateEvent(id, Event, currentUser.Result)) :
            ErrorMessageResult(currentUser.Error);
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult<RequestResponse>> Delete([FromRoute] Guid id)
    {
        var currentUser = await GetCurrentUser();

        return currentUser.Result != null ?
            FromServiceResponse(await EventService.DeleteEvent(id, currentUser.Result)) :
            ErrorMessageResult(currentUser.Error);
    }
}
