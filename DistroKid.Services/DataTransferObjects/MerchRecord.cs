namespace DistroKid.Services.DataTransferObjects;


public class MerchRecord
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public Guid ArtistId { get; set; }
    public UserRecord? Artist { get; set; }
}
