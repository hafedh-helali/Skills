using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Skills.Entities.Context;
using Skills.Entities.Entities;

namespace ReactSkills.Controllers
{
    public class EmployeesController : Controller
    {
        private readonly SkillsContext _skillsContext;
        public EmployeesController(SkillsContext skillsContext)
        {
            _skillsContext = skillsContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var employees = await _skillsContext.Employees.ToListAsync();
            return Ok(employees);
        }

        [HttpGet]
        [Route("getemployeebyid")]
        public async Task<IActionResult> GetEmployeeByIdAsync(decimal id)
        {
            var employee = await _skillsContext.Employees.FindAsync(id);
            return Ok(employee);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync(Employee employee)
        {
            _skillsContext.Employees.Add(employee);
            await _skillsContext.SaveChangesAsync();
            return Created($"/getemployeebyid?id={employee.EMPLOYEE_ID}", employee);
        }
    }
}
