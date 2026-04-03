using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using DistroKid.Database.Repository.Entities;
using DistroKid.Services.DataTransferObjects;

namespace DistroKid.Services.Specifications;

/// <summary>
/// Projects Feedback entities to FeedbackRecord DTOs for pagination list views.
/// Includes the User if the feedback is not anonymous.
/// </summary>
public sealed class FeedbackProjectionSpec : Specification<Feedback, FeedbackRecord>
{
    public FeedbackProjectionSpec() =>
        Query
            .Include(f => f.User)
            .OrderByDescending(f => f.UpdatedAt)
            .Select(f => new FeedbackRecord
            {
                Id = f.Id,
                Type = f.Type,
                Rating = f.Rating,
                Comment = f.Comment,
                IsAnonymous = f.IsAnonymous,
                User = !f.IsAnonymous && f.User != null ? new UserRecord
                {
                    Id = f.User.Id,
                    Name = f.User.Name,
                    Email = f.User.Email,
                    Role = f.User.Role
                } : null
            });

    public FeedbackProjectionSpec(string? search) : this()
    {
        if (string.IsNullOrWhiteSpace(search)) return;

        var searchExpr = $"%{search.Trim().Replace(" ", "%")}%";
        Query.Where(f => EF.Functions.ILike(f.Comment, searchExpr) || EF.Functions.ILike(f.Type, searchExpr));
    }
}
