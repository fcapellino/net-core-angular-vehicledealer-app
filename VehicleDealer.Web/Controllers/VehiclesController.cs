namespace VehicleDealer.Web.Controllers
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Transactions;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;
    using VehicleDealer.DataAccess.ApplicationContext;
    using VehicleDealer.Domain.Entities;
    using VehicleDealer.Web.Custom;
    using VehicleDealer.Web.Requests.Vehicle;

    [AllowAnonymous]
    [Route("Api/[controller]/[action]")]
    public class VehiclesController : Controller
    {
        private readonly IDbContext _applicationDbContext;

        public VehiclesController(IServiceProvider serviceProvider)
        {
            _applicationDbContext = serviceProvider.GetRequiredService<IDbContext>();
        }

        [HttpGet]
        public async Task<IActionResult> GetVehicle(Guid id)
        {
            var vehicle = await _applicationDbContext.Set<Vehicle>()
                    .Include(x => x.Features)
                    .Include(x => x.Images)
                .FirstOrDefaultAsync(x => x.Id.Equals(id));

            if (vehicle == null)
            {
                throw new CustomException("Invalid vehicle specified.");
            }

            var item = new
            {
                vehicle.Id,
                vehicle.ContactName,
                vehicle.ContactEmail,
                vehicle.ContactPhone,
                vehicle.ModelId,
                FeaturesIds = vehicle.Features.Select(f => f.FeatureId),
                Images = vehicle.Images.Select(i => i.FileName),
                vehicle.IsRegistered
            };

            return new SuccessResult(item);
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] CreateUpdateVehicleRequest request)
        {
            using (var transactionScope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var newVehicle = new Vehicle()
                {
                    ContactName = request.ContactEmail,
                    ContactEmail = request.ContactEmail.NullIfEmpty(),
                    ContactPhone = request.ContactPhone,
                    ModelId = request.ModelId,
                    Features = request.FeaturesIds
                        .Select(id => new VehicleFeature() { FeatureId = id }).ToList(),
                    IsRegistered = request.IsRegistered,
                    LastUpdate = DateTime.Now
                };

                _applicationDbContext.Set<Vehicle>().Add(newVehicle);
                await _applicationDbContext.SaveChangesAsync();
                transactionScope.Complete();
            }

            return new SuccessResult();
        }

        [HttpPost]
        public async Task<IActionResult> UpdateVehicle(Guid id, [FromBody] CreateUpdateVehicleRequest request)
        {
            using (var transactionScope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var vehicle = _applicationDbContext.Set<Vehicle>()
                        .Include(x => x.Features)
                    .FirstOrDefault(x => x.Id.Equals(id));

                if (vehicle == null)
                {
                    throw new CustomException("Invalid vehicle specified.");
                }

                vehicle.ContactName = request.ContactEmail;
                vehicle.ContactEmail = request.ContactEmail.NullIfEmpty();
                vehicle.ContactPhone = request.ContactPhone;
                vehicle.ModelId = request.ModelId;
                vehicle.IsRegistered = request.IsRegistered;
                vehicle.LastUpdate = DateTime.Now;

                // remove unselected features
                var removedFeatures = vehicle.Features
                    .Where(f => !request.FeaturesIds.Contains(f.FeatureId)).ToList();
                removedFeatures.ForEach(f => vehicle.Features.Remove(f));

                // add new features
                var addedFeatures = request.FeaturesIds
                    .Where(id => !vehicle.Features.Any(f => f.FeatureId.Equals(id)))
                    .Select(id => new VehicleFeature { FeatureId = id }).ToList();
                addedFeatures.ForEach(f => vehicle.Features.Add(f));

                await _applicationDbContext.SaveChangesAsync();
                transactionScope.Complete();
            }

            return new SuccessResult();
        }

        [HttpPost]
        public async Task<IActionResult> DeleteVehicle(Guid id)
        {
            using (var transactionScope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var vehicle = _applicationDbContext.Set<Vehicle>()
                        .FirstOrDefault(x => x.Id.Equals(id));

                if (vehicle == null)
                {
                    throw new CustomException("Invalid vehicle specified.");
                }

                vehicle.IsDeleted = true;
                await _applicationDbContext.SaveChangesAsync();
                transactionScope.Complete();
            }

            return new SuccessResult();
        }

        protected override void Dispose(bool disposing)
        {
            base.Dispose(disposing);
            _applicationDbContext?.Dispose();
        }
    }
}
