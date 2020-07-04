namespace VehicleDealer.Domain.Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using VehicleDealer.Domain.Common;

    [Table("Makes")]
    public class Make : IEntity
    {
        public Make()
        {
            Id = Guid.NewGuid();
            Models = new List<Model>();
        }

        [Key]
        public Guid Id { get; set; }

        [Required, MaxLength(255)]
        public string Name { get; set; }

        [InverseProperty("Make")]
        public IList<Model> Models { get; set; }

        [Required]
        public bool IsDeleted { get; set; }
    }
}
