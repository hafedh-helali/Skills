using Microsoft.EntityFrameworkCore;
using Skills.Entities.Entities;

//using WebApiCoreWithEF.Models;

namespace Skills.Entities.Context
{
    public class SkillsContext : DbContext
    {
        public SkillsContext(DbContextOptions options)
           : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }

        public DbSet<Profile> Profiles { get; set; }
    }
}