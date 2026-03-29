using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DistroKid.Database.Repository.Entities;

namespace DistroKid.Database.Repository.EntityConfigurations;

public class FeedbackConfiguration : IEntityTypeConfiguration<Feedback>
{
    public void Configure(EntityTypeBuilder<Feedback> builder)
    {
        builder.Property(e => e.Id)
            .IsRequired();
        builder.HasKey(x => x.Id);

        builder.Property(e => e.Type)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(e => e.Rating)
            .IsRequired();

        builder.Property(e => e.IsAnonymous)
            .IsRequired();

        builder.Property(e => e.Comment)
            .HasMaxLength(2000)
            .IsRequired();

        // Optional relationship with User
        builder.HasOne(e => e.User)
            .WithMany()
            .HasForeignKey(e => e.UserId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
