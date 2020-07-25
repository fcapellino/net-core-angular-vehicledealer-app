namespace VehicleDealer.Domain.Entities
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using VehicleDealer.Domain.Common;

    [Table("VehicleFeatures")]
    public class VehicleFeature : IEntity
    {
        public VehicleFeature()
        {
        }

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [ForeignKey("Vehicle")]
        public Guid VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }

        [ForeignKey("Feature")]
        public Guid FeatureId { get; set; }
        public Feature Feature { get; set; }

        [Required]
        public bool IsDeleted { get; set; }
    }
}
