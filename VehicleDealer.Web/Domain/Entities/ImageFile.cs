namespace VehicleDealer.Domain.Entities
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using VehicleDealer.Domain.Common;

    [Table("ImageFiles")]
    public class ImageFile : IEntity
    {
        public ImageFile()
        {
        }

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required, MaxLength(255)]
        public string FileName { get; set; }

        [ForeignKey("Vehicle")]
        public Guid VehicleId { get; set; }
        public Vehicle Vehicle { get; set; }

        [Required]
        public bool IsDeleted { get; set; }
    }
}
