namespace DistroKid.Services.DataTransferObjects;


public class EventRecord
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Location { get; set; } = null!;
    public DateTime Date { get; set; }
    public UserRecord Artist { get; set; } = null!;
}
