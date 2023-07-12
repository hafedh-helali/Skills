using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Skills.Entities.Models;
using EmployeeModel = ReactSkills.Models.EmployeeModel;

namespace ReactSkills.Controllers
{
    public class EmployeesController : Controller
    {
        private readonly SKILLS_DEVContext _skillsContext;

        public EmployeesController(SKILLS_DEVContext skillsContext)
        {
            _skillsContext = skillsContext;
        }

        [HttpGet]
        [Route("getemployeeslist")]
        public async Task<IActionResult> GetAllAsync()
        {
            var employees = await _skillsContext.Employee.ToListAsync();
            return Ok(employees);
        }

        [HttpGet]
        [Route("getemployeebyid")]
        public async Task<IActionResult> GetEmployeeByIdAsync(decimal id)
        {
            var employee = await _skillsContext.Employee.FindAsync(id);
            return Ok(employee);
        }

        [HttpPost]
        [Route("saveemployee")]
        public async Task<IActionResult> PostEmployeeAsync(EmployeeModel employee)
        {
            Employee emp = new Employee
            {
                LastName = employee.LastName,
                FirstName = employee.FirstName,
                ProfileId = employee.ProfileId,
                AgencyId = employee.AgencyId,
                Email = employee.Email,
                EntryDate = employee.EntryDate
            };

            _skillsContext.Employee.Add(emp);
            await _skillsContext.SaveChangesAsync();
            return Created($"/getemployeebyid?id={employee.EmployeeId}", employee);
        }
    }
}