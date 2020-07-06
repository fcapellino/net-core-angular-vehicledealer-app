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
    using VehicleDealer.DataAccess.ApplicationContext;
    using VehicleDealer.Domain.Entities;
    using VehicleDealer.Web.Custom;

    [AllowAnonymous]
    [Route("Api/[controller]/[action]")]
    public class MakesController : Controller
    {
        private readonly IDbContext _applicationDbContext;

        public MakesController(IServiceProvider serviceProvider)
        {
            _applicationDbContext = serviceProvider.GetRequiredService<IDbContext>();
        }

        [HttpGet]
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
