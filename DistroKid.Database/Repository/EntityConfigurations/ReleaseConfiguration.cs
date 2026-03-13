using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using DistroKid.Database.Repository.Entities;
using DistroKid.Database.Repository.Enums;

namespace DistroKid.Database.Repository.EntityConfigurations;


public class ReleaseConfiguration : IEntityTypeConfiguration<Release>
{
    public void Configure(EntityTypeBuilder<Release> builder)
    {
        builder.Property(e => e.Id)
            .IsRequired();
        builder.HasKey(x => x.Id);
        builder.Property(e => e.Title)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.ReleaseDate)
            .IsRequired();
        builder.Property(e => e.Label)
            .HasMaxLength(255)
            .IsRequired();
        builder.Property(e => e.ReleaseType)
            .HasConversion(new EnumToStringConverter<ReleaseTypeEnum>())
            .IsRequired();
        builder.HasMany(e => e.Tracks)
            .WithMany(t => t.Releases)
            .UsingEntity("ReleaseTrack");
        builder.HasMany(e => e.Platforms)
            .WithMany(p => p.Releases)
            .UsingEntity("PlatformReleases");
    }
}
