using Skills.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Skills.Logic.Interfaces
{
    public interface IEmployeeRepository : IBaseRepository<Employee>
    {
        /// <summary>
        /// Get employees
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        List<Employee> GetALlEmployees(int id);
    }
}
