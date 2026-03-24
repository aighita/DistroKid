using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using DistroKid.Database.Repository.Entities;

namespace DistroKid.Database.Repository.EntityConfigurations;


public class MerchConfiguration : IEntityTypeConfiguration<Merch>
{
    public void Configure(EntityTypeBuilder<Merch> builder)
    {
        builder.Property(e => e.Id) 
            .IsRequired();
        builder.HasKey(x => x.Id);
        builder.Property(e => e.Name)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.Description)
            .HasMaxLength(1000)
            .IsRequired();
        builder.Property(e => e.Price)
            .IsRequired();
        builder.Property(e => e.Stock)
            .IsRequired();
        builder.HasOne(e => e.Artist)
            .WithMany()
            .HasForeignKey(e => e.ArtistId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
