using Microsoft.AspNetCore.Mvc;

namespace ReactSkills.Controllers
{
    public class UsersController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
