﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactSkills.Models;
using Skills.Entities.Context;
using Skills.Entities.Entities;
//using Skills.Logic.Repositories;
using Skills.Logic.Interfaces;

namespace ReactSkills.Controllers
{
    public class EmployeesController : Controller
    {
        private readonly SkillsContext _skillsContext;
        private readonly IEmployeeRepository _employeeRepository;

        #region constructor

        public EmployeesController(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;

        }

        #endregion constructor

        //public EmployeesController(SkillsContext skillsContext)
        //{
        //    _skillsContext = skillsContext;
        //}

        [HttpGet]
        [Route("getemployeeslist")]
        public async Task<IActionResult> GetAllAsync()
        {
            var employeesfromrepo = _employeeRepository.GetAll();

            var employees = await _skillsContext.Employee.ToListAsync();
            List<EmployeeModel> result = new List<EmployeeModel>();
            foreach (var employee in employees)
            {
                _skillsContext.Entry(employee).Reference(e => e.Agency).Load();
                _skillsContext.Entry(employee).Reference(e => e.Profile).Load();
                result.Add(new EmployeeModel()
                {
                    FirstName = employee.FirstName,
                    LastName = employee.LastName,
                    AgencyId = employee.AgencyId,
                    Agency = employee.Agency.AgencyName,
                    ProfileId = employee.ProfileId,
                    Profile = employee.Profile.ProfileName,
                    ManagerId = employee.ManagerId,
                    Manager = employee.Manager.FirstName + " " + employee.Manager.LastName
                });
            }
            return Ok(result);
        }

        [HttpGet]
        [Route("getemployeebyid")]
        public async Task<IActionResult> GetEmployeeByIdAsync(decimal id)
        {
            var employee = await _skillsContext.Employee.FindAsync(id);

            if (employee == null)
            {
                return BadRequest("Employé Introuvable");
            }
            _skillsContext.Entry(employee).Reference(e => e.Agency).Load();
            _skillsContext.Entry(employee).Reference(e => e.Profile).Load();
            _skillsContext.Entry(employee).Reference(e => e.Manager).Load();

            EmployeeModel employeeModel = new EmployeeModel()
            {
                AgencyId = employee.AgencyId,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                ProfileId = employee.ProfileId,
                Profile = employee.Profile.ProfileName,
                ManagerId = employee.ManagerId,
                Manager = employee.Manager.FirstName + " " + employee.Manager.LastName,
                Agency = employee.Agency.AgencyName,
                Email = employee.Email,
                EmployeeId = employee.EmployeeId,
                EntryDate = employee.EntryDate
            };

            return Ok(employeeModel);
        }

        [HttpPost]
        [Route("saveemployee")]
        public async Task<IActionResult> PostEmployeeAsync(EmployeeModel employee)
        {
            try
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
            catch (Exception ex)
            {
                return BadRequest("Erreur lors de la création de la fiche employé");
            }
        }

        [HttpGet]
        [Route("getprofileslist")]
        public async Task<IActionResult> GetAllProfilesAsync()
        {
            var profiles = await _skillsContext.Profile.ToListAsync();
            List<ProfileModel> result = new();
            foreach (var profile in profiles)
            {
                result.Add(new ProfileModel()
                {
                    ProfileId = profile.ProfileId,
                    ProfileName = profile.ProfileName
                });
            }
            return Ok(result);
        }
    }
}