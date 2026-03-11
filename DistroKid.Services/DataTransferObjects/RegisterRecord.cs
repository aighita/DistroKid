using DistroKid.Database.Repository.Enums;

namespace DistroKid.Services.DataTransferObjects;

public record RegisterRecord(string Name, string Email, string Password, string ConfirmPassword, UserRoleEnum Role);
