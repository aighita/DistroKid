﻿using System.Net;
using DistroKid.Database.Repository;
using DistroKid.Database.Repository.Entities;
using DistroKid.Database.Repository.Enums;
using DistroKid.Infrastructure.DataTransferObjects;
using DistroKid.Infrastructure.Errors;
using DistroKid.Infrastructure.Repositories.Interfaces;
using DistroKid.Infrastructure.Requests;
using DistroKid.Infrastructure.Responses;
using DistroKid.Services.Abstractions;
using DistroKid.Services.DataTransferObjects;
using DistroKid.Services.Specifications;

namespace DistroKid.Services.Implementations;

/// <summary>
/// Inject the required services through the constructor.
/// </summary>
public class UserFileService(IRepository<WebAppDatabaseContext> repository, IFileRepository fileRepository) : IUserFileService
{
    /// <summary>
    /// This static method creates the path for a user to where it has to store the files, each user should have an own folder.
    /// </summary>
    private static string GetFileDirectory(Guid userId) => Path.Join(userId.ToString(), IUserFileService.UserFilesDirectory);


    public async Task<ServiceResponse<PagedResponse<UserFileRecord>>> GetUserFiles(PaginationSearchQueryParams pagination, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        var result = await repository.PageAsync(pagination, new UserFileProjectionSpec(requestingUser.Id, pagination.Search), cancellationToken);

        return ServiceResponse.ForSuccess(result);
    }

    public async Task<ServiceResponse> SaveFile(UserFileAddRecord file, UserRecord requestingUser, CancellationToken cancellationToken = default)
    {
        var fileName = fileRepository.SaveFile(file.File, GetFileDirectory(requestingUser.Id)); // First save the file on the filesystem.

        if (fileName.Result == null) // If not successful respond with the error.
        {
            return fileName.ToResponse();
        }

        await repository.AddAsync(new UserFile
        {
            Name = file.File.FileName,
            Description = file.Description,
            Path = fileName.Result,
            UserId = requestingUser.Id
        }, cancellationToken); // When the file is saved on the filesystem save the returned file path in the database to identify the file.

        return ServiceResponse.ForSuccess();
    }

    public async Task<ServiceResponse<FileRecord>> GetFileDownload(Guid id, UserRecord requestingUser, CancellationToken cancellationToken = default) // If not successful respond with the error.
    {
        var userFile = await repository.GetAsync<UserFile>(id, cancellationToken); // First get the file entity from the database to find the location on the filesystem.

        if (userFile == null)
        {
            return ServiceResponse.FromError<FileRecord>(new(HttpStatusCode.NotFound, "File entry not found!", ErrorCodes.EntityNotFound));
        }

        if (requestingUser.Role != UserRoleEnum.Admin && userFile.UserId != requestingUser.Id)
        {
            return ServiceResponse.FromError<FileRecord>(new(HttpStatusCode.Forbidden, "You cannot access this file!", ErrorCodes.CannotRead));
        }

        return fileRepository.GetFile(Path.Join(GetFileDirectory(userFile.UserId), userFile.Path), userFile.Name);
    }
}
