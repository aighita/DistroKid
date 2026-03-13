using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using DistroKid.Database.Repository.Entities;

namespace DistroKid.Database.Repository.EntityConfigurations;


public class ReleaseConfiguration : IEntityTypeConfiguration<Release>
{
    public void Configure(EntityTypeBuilder<Release> builder)
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
        builder.Property(e => e.Location)
            .HasMaxLength(500)
            .IsRequired();
        builder.Property(e => e.Date)
            .IsRequired();
        builder.HasOne(e => e.Artist)
            .WithMany()
            .HasForeignKey("ArtistId")
            .OnDelete(DeleteBehavior.Cascade);
    }
}
