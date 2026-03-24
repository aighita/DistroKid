namespace DistroKid.Services.DataTransferObjects;

public class EventUpdateRecord
{
    public string? Name { get; set; }
    public string? Description { get; set; }
    public string? Location { get; set; }
    public DateTime? Date { get; set; }
    // Artist ownership cannot be changed after creation.
}
