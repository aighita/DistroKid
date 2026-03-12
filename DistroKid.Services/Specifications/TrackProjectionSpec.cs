using Ardalis.Specification;
using Microsoft.EntityFrameworkCore;
using DistroKid.Database.Repository.Entities;
using DistroKid.Services.DataTransferObjects;

namespace DistroKid.Services.Specifications;

public sealed class TrackProjectionSpec : Specification<Track, TrackRecord>
{
    public TrackProjectionSpec(Guid id) => Query.Where(t => t.Id == id);
}
