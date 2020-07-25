namespace VehicleDealer.Web.Dependencies.ApplicationContext
{
    using System;
    using System.Linq;
    using System.Linq.Expressions;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Query;
    using VehicleDealer.Domain.Common;
    using VehicleDealer.Domain.Entities;

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid,
        IdentityUserClaim<Guid>,
        ApplicationUserRole,
        IdentityUserLogin<Guid>,
        IdentityRoleClaim<Guid>,
        IdentityUserToken<Guid>>
    {
        public ApplicationDbContext()
        {
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<ApplicationUserRole>(userRole =>
            {
                userRole
                    .HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole
                    .HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });
            builder.Entity<VehicleFeature>()
                .HasIndex(p => new { p.VehicleId, p.FeatureId }).IsUnique();
            builder.ApplyGlobalFilters<IEntity>(e => !e.IsDeleted);
        }

        public DbSet<Feature> Features { get; set; }
        public DbSet<ImageFile> ImageFiles { get; set; }
        public DbSet<Make> Makes { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<VehicleFeature> VehicleFeatures { get; set; }
    }

    public static class EntityFrameworkExtensions
    {
        public static void ApplyGlobalFilters<TInterface>(this ModelBuilder builder, Expression<Func<TInterface, bool>> expression)
        {
            builder.Model.GetEntityTypes()
                .Where(e => e.ClrType.GetInterface(typeof(TInterface).Name) != null)
                .Select(e => e.ClrType).ToList().ForEach(entity =>
                {
                    var parameter = Expression.Parameter(entity);
                    var body = ReplacingExpressionVisitor.Replace(expression.Parameters.Single(), parameter, expression.Body);
                    builder.Entity(entity).HasQueryFilter(Expression.Lambda(body, parameter));
                });
        }
    }
}
