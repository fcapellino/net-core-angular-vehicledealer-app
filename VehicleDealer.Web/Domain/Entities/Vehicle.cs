namespace VehicleDealer.Domain.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using VehicleDealer.Domain.Common;

    [Table("Vehicles")]
    public class Vehicle : IEntity
    {
        public Vehicle()
        {
            Features = new List<VehicleFeature>();
            Images = new List<ImageFile>();
        }

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required, MaxLength(255)]
        public string ContactName { get; set; }

        [MaxLength(255)]
        public string ContactEmail { get; set; }

        [Required, MaxLength(255)]
        public string ContactPhone { get; set; }

        [ForeignKey("Model")]
        public Guid ModelId { get; set; }
        public Model Model { get; set; }

        [InverseProperty("Vehicle")]
        public IList<VehicleFeature> Features { get; set; }

        [InverseProperty("Vehicle")]
        public IList<ImageFile> Images { get; set; }

        [Required]
        public bool IsRegistered { get; set; }

        [Required]
        public DateTime LastUpdate { get; set; }

        [Required]
        public bool IsDeleted { get; set; }
    }
}
