﻿using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using DistroKid.Database.Repository.Entities;
using DistroKid.Services.DataTransferObjects;

namespace DistroKid.Services.Specifications;

/// <summary>
/// This is a specification to filter the user file entities and map it to and UserFileRecord object via the constructors.
/// Note how the constructors call the base class's constructors. Also, this is a sealed class, meaning it cannot be further derived.
/// </summary>
public sealed class UserFileProjectionSpec : Specification<UserFile, UserFileRecord>
{
    /// <summary>
    /// Note that the specification projects the UserFile onto UserFileRecord together with the referenced User entity properties.
    /// </summary>
    public UserFileProjectionSpec(Guid userId) =>
        Query.Where(x => x.UserId == userId)
            .OrderByDescending(x => x.CreatedAt)
            .Select(e => new()
            {
                Id = e.Id,
                Name = e.Name,
                Description = e.Description,
                User = new()
                {
                    Id = e.User.Id,
                    Email = e.User.Email,
                    Name = e.User.Name,
                    Role = e.User.Role
                },
                CreatedAt = e.CreatedAt,
                UpdatedAt = e.UpdatedAt
            });

    public UserFileProjectionSpec(Guid userId, string? search) : this(userId)
    {
        search = !string.IsNullOrWhiteSpace(search) ? search.Trim() : null;

        if (search == null)
        {
            return;
        }

        var searchExpr = $"%{search.Replace(" ", "%")}%";

        Query.Where(e => EF.Functions.ILike(e.Name, searchExpr) ||
                         EF.Functions.ILike(e.Description!, searchExpr));
    }
}