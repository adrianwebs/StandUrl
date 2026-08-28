using Microsoft.EntityFrameworkCore;
using StandUrl.Api.Data.Entities;

namespace StandUrl.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Business> Businesses => Set<Business>();
    public DbSet<Device> Devices => Set<Device>();
    public DbSet<Interaction> Interactions => Set<Interaction>();
    public DbSet<DestinationHistory> DestinationHistories => Set<DestinationHistory>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // ── Business ────────────────────────────────────────────────────────
        modelBuilder.Entity<Business>(e =>
        {
            e.HasKey(b => b.Id);
            e.HasIndex(b => b.Slug).IsUnique();
            e.HasIndex(b => b.Email).IsUnique();
            e.Property(b => b.Sector)
                .HasDefaultValue("otro")
                .HasMaxLength(20);
            e.Property(b => b.Plan)
                .HasDefaultValue("free")
                .HasMaxLength(10);
            e.Property(b => b.Role)
                .HasDefaultValue("business")
                .HasMaxLength(20);
            e.Property(b => b.IsActive)
                .HasDefaultValue(true);
        });

        // ── Device ──────────────────────────────────────────────────────────
        modelBuilder.Entity<Device>(e =>
        {
            e.HasKey(d => d.Id);
            e.HasIndex(d => d.Token).IsUnique();
            e.Property(d => d.Token).HasMaxLength(8).IsFixedLength();
            e.Property(d => d.Status)
                .HasDefaultValue("active")
                .HasMaxLength(10);
            e.Property(d => d.ModelType)
                .HasDefaultValue("generico")
                .HasMaxLength(20);

            e.HasOne(d => d.Business)
                .WithMany(b => b.Devices)
                .HasForeignKey(d => d.BusinessId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // ── Interaction ──────────────────────────────────────────────────────
        modelBuilder.Entity<Interaction>(e =>
        {
            e.HasKey(i => i.Id);
            e.HasIndex(i => i.DeviceId);
            e.HasIndex(i => i.Timestamp);
            e.Property(i => i.Source)
                .HasDefaultValue("unknown")
                .HasMaxLength(10);

            e.HasOne(i => i.Device)
                .WithMany(d => d.Interactions)
                .HasForeignKey(i => i.DeviceId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // ── DestinationHistory ───────────────────────────────────────────────
        modelBuilder.Entity<DestinationHistory>(e =>
        {
            e.HasKey(h => h.Id);
            e.HasIndex(h => h.DeviceId);

            e.HasOne(h => h.Device)
                .WithMany(d => d.History)
                .HasForeignKey(h => h.DeviceId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
