using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactSkills.Models;
using Skills.Entities.Context;
using Skills.Entities.Entities;

namespace ReactSkills.Controllers
{
    public class LayoutsController : Controller
    {
        private readonly SkillsContext _skillsContext;

        public LayoutsController(SkillsContext skillsContext)
        {
            _skillsContext = skillsContext;
        }

        [HttpGet]
        [Route("getlayoutslist")]
        public async Task<IActionResult> GetAllAsync()
        {
            var layouts = await _skillsContext.Layout.ToListAsync();
            List<LayoutModel> result = new List<LayoutModel>();
            foreach (var layout in layouts)
            {
                result.Add(new LayoutModel()
                {
                    LayoutId = layout.LayoutId,
                    LayoutName = layout.LayoutName,
                });
            }

            return Ok(result);
        }

        [HttpPost]
        [Route("savelayout")]
        public async Task<IActionResult> PostLayoutAsync(LayoutModel layoutModel)
        {
            Layout layout = new Layout
            {
                LayoutName = layoutModel.LayoutName
            };

            _skillsContext.Layout.Add(layout);
            await _skillsContext.SaveChangesAsync();
            return Created($"/getlayoutbyid?id={layout.LayoutId}", layout);
        }
    }
}
