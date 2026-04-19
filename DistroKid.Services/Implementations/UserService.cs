using System.Net;
using Microsoft.EntityFrameworkCore;
using DistroKid.Database.Repository;
using DistroKid.Database.Repository.Entities;
using DistroKid.Database.Repository.Enums;
using DistroKid.Infrastructure.Errors;
using DistroKid.Infrastructure.Repositories.Interfaces;
using DistroKid.Infrastructure.Requests;
using DistroKid.Infrastructure.Responses;
using DistroKid.Services.Abstractions;
using DistroKid.Services.Constants;
using DistroKid.Services.DataTransferObjects;
using DistroKid.Services.Helpers;
using DistroKid.Services.Specifications;

namespace DistroKid.Services.Implementations;

/// <summary>
/// Inject the required services through the constructor.
/// </summary>
public class UserService(IRepository<WebAppDatabaseContext> repository, ILoginService loginService, IMailService mailService)
    : IUserService
{
    public async Task<ServiceResponse<UserRecord>> GetUser(Guid id, CancellationToken cancellationToken = default)
    {
        var result = await repository.GetAsync(new UserProjectionSpec(id), cancellationToken); // Get a user using a specification on the repository.

        return result != null ? 
            ServiceResponse.ForSuccess(result) : 
            ServiceResponse.FromError<UserRecord>(CommonErrors.UserNotFound); // Pack the result or error into a ServiceResponse.
    }

    public async Task<ServiceResponse<PagedResponse<UserRecord>>> GetUsers(PaginationSearchQueryParams pagination, CancellationToken cancellationToken = default)
    {
        var result = await repository.PageAsync(pagination, new UserProjectionSpec(pagination.Search), cancellationToken); // Use the specification and pagination API to get only some entities from the database.

        return ServiceResponse.ForSuccess(result);
    }

    public async Task<ServiceResponse<LoginResponseRecord>> Login(LoginRecord login, CancellationToken cancellationToken = default)
    {
        var result = await repository.GetAsync(new UserSpec(login.Email), cancellationToken);

        if (result == null) // Verify if the user is found in the database.
        {
            return ServiceResponse.FromError<LoginResponseRecord>(CommonErrors.UserNotFound); // Pack the proper error as the response.
        }

        if (result.Password != login.Password) // Verify if the password hash of the request is the same as the one in the database.
        {
            return ServiceResponse.FromError<LoginResponseRecord>(new(HttpStatusCode.BadRequest, "Incorrect password. Please try again.", ErrorCodes.WrongPassword));
        }

        var user = new UserRecord
        {
            Id = result.Id,
            Email = result.Email,
            Name = result.Name,
            Role = result.Role
        };

        return ServiceResponse.ForSuccess(new LoginResponseRecord
        {
            User = user,
            Token = loginService.GetToken(user, DateTime.UtcNow, new(7, 0, 0, 0)) // Get a JWT for the user issued now and that expires in 7 days.
        });
    }

    public async Task<ServiceResponse<LoginResponseRecord>> Register(RegisterRecord register, CancellationToken cancellationToken = default)
    {
        var result = await repository.GetAsync(new UserSpec(register.Email), cancellationToken);

        if (result != null) // Verify if the user already exists in the database.
        {
            return ServiceResponse.FromError<LoginResponseRecord>(new(HttpStatusCode.Conflict, "An account with this email already exists. Please log in instead.", ErrorCodes.UserAlreadyExists));
        }

        var newUser = new User
        {
            Email = register.Email,
            Name = register.Name,
            Role = register.Role,
            Password = register.Password,
            Profile = new UserProfile
            {
                Bio = register.Bio,
                SocialMediaLink = register.SocialMediaLink
            }
        };

        await using var transaction = await repository.DbContext.Database.BeginTransactionAsync(cancellationToken);

        try
        {
            await repository.DbContext.Set<User>().AddAsync(newUser, cancellationToken);
            await repository.DbContext.SaveChangesAsync(cancellationToken);

            var mailResult = await mailService.SendMail(
                register.Email,
                "Welcome!",
                MailTemplates.UserAddTemplate(register.Name),
                true,
                "DistroKid",
                cancellationToken);

            if (!mailResult.IsOk)
            {
                await transaction.RollbackAsync(cancellationToken);
                return ServiceResponse.FromError<LoginResponseRecord>(mailResult.Error);
            }

            await transaction.CommitAsync(cancellationToken);
        }
        catch (DbUpdateException)
        {
            await transaction.RollbackAsync(cancellationToken);
            throw;
        }

        var user = new UserRecord
        {
            Id = newUser.Id,
            Email = newUser.Email,
            Name = newUser.Name,
            Role = newUser.Role
        };

        return ServiceResponse.ForSuccess(new LoginResponseRecord
        {
            User = user,
            Token = loginService.GetToken(user, DateTime.UtcNow, new(7, 0, 0, 0)) // Get a JWT for the user issued now and that expires in 7 days.
        });
    }

    public async Task<ServiceResponse<int>> GetUserCount(CancellationToken cancellationToken = default) => 
        ServiceResponse.ForSuccess(await repository.GetCountAsync<User>(cancellationToken)); // Get the count of all user entities in the database.

    public async Task<ServiceResponse> AddUser(UserAddRecord user, UserRecord? requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin can add users!", ErrorCodes.CannotAdd));
        }

        var result = await repository.GetAsync(new UserSpec(user.Email), cancellationToken);

        if (result != null)
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Conflict, "A user with this email already exists.", ErrorCodes.UserAlreadyExists));
        }

        await repository.AddAsync(new User
        {
            Email = user.Email,
            Name = user.Name,
            Role = user.Role,
            Password = user.Password
        }, cancellationToken); // A new entity is created and persisted in the database.

        await mailService.SendMail(user.Email, "Welcome!", MailTemplates.UserAddTemplate(user.Name), true, "My App", cancellationToken); // You can send a notification on the user email. Change the email if you want.

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> UpdateUser(UserUpdateRecord user, UserRecord? requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin && requestingUser.Id != user.Id) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin or the own user can update the user!", ErrorCodes.CannotUpdate));
        }

        var entity = await repository.GetAsync(new UserSpec(user.Id), cancellationToken); 

        if (entity != null) // Verify if the user is not found, you cannot update a non-existing entity.
        {
            entity.Name = user.Name ?? entity.Name;
            entity.Password = user.Password ?? entity.Password;

            await repository.UpdateAsync(entity, cancellationToken); // Update the entity and persist the changes.
        }

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse> DeleteUser(Guid id, UserRecord? requestingUser = null, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Role != UserRoleEnum.Admin && requestingUser.Id != id) // Verify who can add the user, you can change this however you se fit.
        {
            return ServiceResponse.FromError(new(HttpStatusCode.Forbidden, "Only the admin or the own user can delete the user!", ErrorCodes.CannotDelete));
        }

        await repository.DeleteAsync<User>(id, cancellationToken); // Delete the entity.

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse<List<PlatformRecord>>> GetUserPlatforms(Guid id, UserRecord? requestingUser = null, CancellationToken cancellationToken = default)
    {
        if (requestingUser != null && requestingUser.Id != id)
        {
            if (requestingUser.Role != UserRoleEnum.Admin)
            {
                var accessibleArtistIds = await AccessScopeHelper.GetAccessibleArtistIds(repository, requestingUser, cancellationToken);
                if (!AccessScopeHelper.CanAccessArtist(requestingUser, id, accessibleArtistIds))
                {
                    return ServiceResponse.FromError<List<PlatformRecord>>(new(HttpStatusCode.Forbidden, "You cannot access the connected platforms for this user!", ErrorCodes.CannotRead));
                }
            }
        }

        var user = await repository.GetAsync(new UserWithPlatformsSpec(id), cancellationToken);

        if (user == null)
        {
            return ServiceResponse.FromError<List<PlatformRecord>>(CommonErrors.UserNotFound);
        }

        var platforms = (user.Platforms ?? []).Select(p => new PlatformRecord
        {
            Id = p.Id,
            Name = p.Name,
            Url = p.Url
        }).ToList();

        return ServiceResponse.ForSuccess(platforms);
    }

    public async Task<ServiceResponse<List<PlatformRecord>>> ConnectPlatform(Guid platformId, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser.Role != UserRoleEnum.Artist)
        {
            return ServiceResponse.FromError<List<PlatformRecord>>(new(HttpStatusCode.Forbidden, "Only artists can connect platforms to their account!", ErrorCodes.CannotUpdate));
        }

        var user = await repository.GetAsync(new UserWithPlatformsSpec(requestingUser.Id), cancellationToken);
        var platform = await repository.GetAsync(new PlatformSpec(platformId), cancellationToken);

        if (user == null)
            return ServiceResponse.FromError<List<PlatformRecord>>(CommonErrors.UserNotFound);

        if (platform == null)
            return ServiceResponse.FromError<List<PlatformRecord>>(CommonErrors.PlatformNotFound);

        if (!user.Platforms.Any(existingPlatform => existingPlatform.Id == platformId))
        {
            user.Platforms.Add(platform);
            await repository.DbContext.SaveChangesAsync(cancellationToken);
        }

        return ServiceResponse.ForSuccess(user.Platforms.Select(connectedPlatform => new PlatformRecord
        {
            Id = connectedPlatform.Id,
            Name = connectedPlatform.Name,
            Url = connectedPlatform.Url
        }).ToList());
    }

    public async Task<ServiceResponse<List<PlatformRecord>>> DisconnectPlatform(Guid platformId, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        if (requestingUser.Role != UserRoleEnum.Artist)
        {
            return ServiceResponse.FromError<List<PlatformRecord>>(new(HttpStatusCode.Forbidden, "Only artists can disconnect platforms from their account!", ErrorCodes.CannotUpdate));
        }

        var user = await repository.GetAsync(new UserWithPlatformsSpec(requestingUser.Id), cancellationToken);

        if (user == null)
            return ServiceResponse.FromError<List<PlatformRecord>>(CommonErrors.UserNotFound);

        var platform = user.Platforms.FirstOrDefault(existingPlatform => existingPlatform.Id == platformId);
        if (platform != null)
        {
            user.Platforms.Remove(platform);
            await repository.DbContext.SaveChangesAsync(cancellationToken);
        }

        return ServiceResponse.ForSuccess(user.Platforms.Select(connectedPlatform => new PlatformRecord
        {
            Id = connectedPlatform.Id,
            Name = connectedPlatform.Name,
            Url = connectedPlatform.Url
        }).ToList());
    }
}
