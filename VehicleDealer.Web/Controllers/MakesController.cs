namespace VehicleDealer.Web.Controllers
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using MainProject.Web.Custom.Resources;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;
    using VehicleDealer.Domain.Entities;
    using VehicleDealer.Web.Custom;
    using VehicleDealer.Web.Custom.Enumerations;
    using VehicleDealer.Web.Dependencies.ApplicationContext;

    [Authorize]
    [Route("Api/[controller]/[action]")]
    public class MakesController : Controller
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public MakesController(IServiceProvider serviceProvider)
        {
            _applicationDbContext = serviceProvider.GetService<ApplicationDbContext>();
        }

        [HttpGet]
        [Authorization(UserRoles.Administrator, UserRoles.Regular)]
        public async Task<IActionResult> GetMakesList()
        {
            var items = await _applicationDbContext.Set<Make>()
                    .Include(x => x.Models)
                .OrderBy(x => x.Name)
                .Select(x => new
                {
                    x.Id,
                    x.Name,
                    Models = x.Models
                        .OrderBy(m => m.Name)
                        .Select(m => new
                        {
                            m.Id,
                            m.Name
                        })
                        .ToList()
                })
                .ToListAsync();

            return new SuccessResult(new ListResource(items));
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            _applicationDbContext?.Dispose();
        }
    }
}
