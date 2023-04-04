namespace VehicleDealer.Domain.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using VehicleDealer.Domain.Common;

    [Table("Features")]
    public class Feature : IEntity
    {
        public Feature()
        {
            Features = new List<VehicleFeature>();
        }

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required, MaxLength(255)]
        public string Name { get; set; }

        [InverseProperty("Feature")]
        public IList<VehicleFeature> Features { get; set; }

        [Required]
        public bool IsDeleted { get; set; }
    }
}
