﻿using System.Text.Json.Serialization;

namespace DistroKid.Infrastructure.Errors;

/// <summary>
/// This enumeration represents codes for common errors and should be used to better identify the error by the client. You may add or remove codes as you see fit.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum ErrorCodes
{
    Unknown,
    TechnicalError,
    EntityNotFound,
    PhysicalFileNotFound,
    UserAlreadyExists,
    WrongPassword,
    CannotRead,
    CannotAdd,
    CannotUpdate,
    CannotDelete,
    MailSendFailed,
    UserNotArtist
}
