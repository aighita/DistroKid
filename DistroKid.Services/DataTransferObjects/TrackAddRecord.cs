namespace DistroKid.Services.DataTransferObjects;

public class TrackAddRecord
{
    public string Title { get; set; } = null!;
    public int DurationInSeconds { get; set; }
    public string ISRC { get; set; } = null!;
    public Guid ArtistId { get; set; }
}
