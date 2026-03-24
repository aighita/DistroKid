namespace DistroKid.Services.DataTransferObjects;

public class EventAddRecord
{
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Location { get; set; } = null!;
    public DateTime Date { get; set; }
    // ArtistId is taken from the JWT of the authenticated artist — not required in the body.
}
