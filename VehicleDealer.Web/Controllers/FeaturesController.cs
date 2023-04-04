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
    public class FeaturesController : Controller
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public FeaturesController(IServiceProvider serviceProvider)
        {
            _applicationDbContext = serviceProvider.GetService<ApplicationDbContext>();
        }

        [HttpGet]
        [Authorization(UserRoles.Administrator, UserRoles.Regular)]
        public async Task<IActionResult> GetFeaturesList()
        {
            var items = await _applicationDbContext.Set<Feature>()
                .OrderBy(x => x.Name)
                .Select(x => new
                {
                    x.Id,
                    x.Name
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
