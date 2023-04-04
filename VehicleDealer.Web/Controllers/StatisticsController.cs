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
    public class StatisticsController : Controller
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public StatisticsController(IServiceProvider serviceProvider)
        {
            _applicationDbContext = serviceProvider.GetService<ApplicationDbContext>();
        }

        [HttpGet]
        [Authorization(UserRoles.Administrator, UserRoles.Regular)]
        public async Task<IActionResult> GetStatistics()
        {
            var items = await _applicationDbContext.Set<Vehicle>()
                .Include(x => x.Model)
                .GroupBy(z => new
                {
                    z.Model.Make.Id,
                    z.Model.Make.Name
                })
                .Select(g => new
                {
                    g.Key.Id,
                    g.Key.Name,
                    Count = g.Count()
                })
                .OrderBy(x => x.Name)
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
