using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Skills.Entities.Entities
{
    [Table("EMPLOYEE")]
    public class Employee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public decimal EMPLOYEE_ID { get; set; }

        public string? FIRST_NAME { get; set; }

        public string? LAST_NAME { get; set; }

        public string? EMAIL { get; set; }

        //public DateOnly? ENTRY_DATE { get; set; }

        //public DateTime? END_DATE { get; set; }

        public bool IS_ACTIVE { get; set; }

        public decimal MANAGER_ID { get; set; }

        public string? EMPLOYEE_NUMBER { get; set; }


        public decimal PROFILE_ID { get; set; }

        [ForeignKey(nameof(PROFILE_ID))]
        public Profile Profile { get; set; } = default!;
    }
}