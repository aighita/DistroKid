using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using DistroKid.Database.Repository.Entities;

namespace DistroKid.Database.Repository.EntityConfigurations;


public class LabelConfiguration : IEntityTypeConfiguration<Label>
{
    public void Configure(EntityTypeBuilder<Label> builder)
    {
        builder.Property(e => e.Id)
            .IsRequired();
        builder.HasKey(x => x.Id);
        builder.Property(e => e.Name)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.Website)
            .HasMaxLength(500)
            .IsRequired();
        builder.HasMany(e => e.Releases)
            .WithOne()
            .HasForeignKey("LabelId")
            .OnDelete(DeleteBehavior.SetNull);
        builder.HasMany(e => e.Artists)
            .WithOne()
            .HasForeignKey("ArtistLabelId")
            .OnDelete(DeleteBehavior.SetNull);
        builder.HasMany(e => e.Managers)
            .WithOne()
            .HasForeignKey("ManagerLabelId")
            .OnDelete(DeleteBehavior.SetNull);
    }
}
