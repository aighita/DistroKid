﻿using System.Net;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using DistroKid.Infrastructure.Configurations;
using DistroKid.Infrastructure.Errors;
using DistroKid.Infrastructure.Responses;
using DistroKid.Services.Abstractions;

namespace DistroKid.Services.Implementations;

/// <summary>
/// Inject the required service configuration from the application.json or environment variables.
/// </summary>
public class MailService(IOptions<MailConfiguration> mailConfiguration) : IMailService
{
    private readonly MailConfiguration _mailConfiguration = mailConfiguration.Value;


    public async Task<ServiceResponse> SendMail(string recipientEmail, string subject, string body, bool isHtmlBody = false, 
        string? senderTitle = null, CancellationToken cancellationToken = default)
    {
        if (!_mailConfiguration.MailEnable)
        {
            return ServiceResponse.ForSuccess();
        }

        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(senderTitle ?? _mailConfiguration.MailAddress, _mailConfiguration.MailAddress));
        message.To.Add(new MailboxAddress(recipientEmail, recipientEmail)); // Add the recipient mail address.
        message.Subject = subject; // Set the subject.
        message.Body = new TextPart(isHtmlBody ? "html" : "plain") { Text = body }; 

        try
        {
            using var client = new SmtpClient(); =
            await client.ConnectAsync(_mailConfiguration.MailHost, _mailConfiguration.MailPort, SecureSocketOptions.Auto, cancellationToken);
            client.AuthenticationMechanisms.Remove("XOAUTH2");
            await client.AuthenticateAsync(_mailConfiguration.MailUser, _mailConfiguration.MailPassword, cancellationToken); 
            await client.SendAsync(message, cancellationToken);
            await client.DisconnectAsync(true, cancellationToken);
        }
        catch
        {
            return ServiceResponse.FromError(new(HttpStatusCode.ServiceUnavailable, "Mail couldn't be send!", ErrorCodes.MailSendFailed));
        }

        return ServiceResponse.ForSuccess();
    }
}
