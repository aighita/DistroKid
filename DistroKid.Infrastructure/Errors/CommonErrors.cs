﻿using System.Net;

namespace DistroKid.Infrastructure.Errors;

/// <summary>
/// Common error messages that may be reused in various places in the code.
/// </summary>
public static class CommonErrors
{
    public static ErrorMessage UserNotFound => new(HttpStatusCode.NotFound, "User doesn't exist!", ErrorCodes.EntityNotFound);
    public static ErrorMessage FileNotFound => new(HttpStatusCode.NotFound, "File not found on disk!", ErrorCodes.PhysicalFileNotFound);
    public static ErrorMessage TechnicalSupport => new(HttpStatusCode.InternalServerError, "An unknown error occurred, contact the technical support!", ErrorCodes.TechnicalError);
    public static ErrorMessage TrackNotFound => new(HttpStatusCode.NotFound, "Track doesn't exist!", ErrorCodes.EntityNotFound);
    public static ErrorMessage ReleaseNotFound => new(HttpStatusCode.NotFound, "Release doesn't exist!", ErrorCodes.EntityNotFound);
    public static ErrorMessage PlatformNotFound => new(HttpStatusCode.NotFound, "Platform doesn't exist!", ErrorCodes.EntityNotFound);
    public static ErrorMessage NoPlatformsFound => new(HttpStatusCode.NotFound, "No platforms found!", ErrorCodes.EntityNotFound);
    public static ErrorMessage UserNotArtist => new(HttpStatusCode.BadRequest, "User is not an artist!", ErrorCodes.UserNotArtist);
    public static ErrorMessage LabelNotFound => new(HttpStatusCode.NotFound, "Label doesn't exist!", ErrorCodes.EntityNotFound);
    public static ErrorMessage EventNotFound => new(HttpStatusCode.NotFound, "Event doesn't exist!", ErrorCodes.EntityNotFound);
    public static ErrorMessage MerchNotFound => new(HttpStatusCode.NotFound, "Merch item doesn't exist!", ErrorCodes.EntityNotFound);
}
