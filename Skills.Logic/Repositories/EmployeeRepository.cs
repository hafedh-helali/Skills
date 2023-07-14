using Skills.Entities.Entities;
using Skills.Logic.Interfaces;

namespace Skills.Logic.Repositories
{
    public class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
    {
        public List<Employee> GetALlEmployees(int id)
        {
            return GetAll().ToList();
        }
    }
}