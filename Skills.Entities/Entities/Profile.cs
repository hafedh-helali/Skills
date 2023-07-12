using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Skills.Entities.Entities
{
    [Table("PROFILE")]
    public class Profile
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public decimal PROFILE_ID { get; set; }

        public int PROFILE { get; set; }

        public string? DESCRIPTION { get; set; }

        public bool IS_ACTIVE { get; set; }

        //[InverseProperty("PROFILE_ID")]
        //public ICollection<Employee>? Employees { get; set; }
    }
}