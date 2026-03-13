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
public class ReleaseController(ILogger<ReleaseController> logger, IUserService userService, IReleaseService releaseService) : AuthorizedController(logger, userService)
{
    protected readonly IReleaseService ReleaseService = releaseService;

    
}
