namespace VehicleDealer.Domain.Entities
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using VehicleDealer.Domain.Common;

    [Table("Models")]
    public class Model : IEntity
    {
        public Model()
        {
        }

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required, MaxLength(255)]
        public string Name { get; set; }

        [ForeignKey("Make")]
        public Guid MakeId { get; set; }
        public Make Make { get; set; }

        [Required]
        public bool IsDeleted { get; set; }
    }
}
