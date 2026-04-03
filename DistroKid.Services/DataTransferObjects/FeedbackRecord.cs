namespace DistroKid.Services.DataTransferObjects;

public record FeedbackAddRecord(
    string Type,
    int Rating,
    bool IsAnonymous,
    string Comment
);

public record FeedbackRecord
{
    public Guid Id { get; init; }
    public string Type { get; init; } = null!;
    public int Rating { get; init; }
    public bool IsAnonymous { get; init; }
    public string Comment { get; init; } = null!;
    public UserRecord? User { get; init; }
}
