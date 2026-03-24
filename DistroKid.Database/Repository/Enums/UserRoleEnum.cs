﻿namespace DistroKid.Database.Repository.Enums;

/// <summary>
/// Enum for user roles, you can modify it however you see fit.
/// </summary>
public enum UserRoleEnum
{
    // Upload new tracks and manage their profile. Can create releases but not manage artists.
    Artist,
    // Manage artists and their tracks. Can be used for label accounts. Can create releases.
    Manager,
    // Manage the entire label, including artists and releases. Approves releases before they go live.
    Label,
    // Full access to the system, including managing users and settings.
    Admin
}
