namespace DistroKid.Services.DataTransferObjects;

public record FeedbackAddRecord(
    string Type,
    int Rating,
    bool IsAnonymous,
    string Comment
);
