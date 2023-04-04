namespace VehicleDealer.Web.Controllers
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Transactions;
    using MainProject.Web.Custom.Resources;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;
    using VehicleDealer.Domain.Entities;
    using VehicleDealer.Web.Custom;
    using VehicleDealer.Web.Custom.Enumerations;
    using VehicleDealer.Web.Dependencies.ApplicationContext;
    using VehicleDealer.Web.Requests.Vehicle;

    [Authorize]
    [Route("Api/[controller]/[action]")]
    public class VehiclesController : Controller
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public VehiclesController(IServiceProvider serviceProvider)
        {
            _applicationDbContext = serviceProvider.GetService<ApplicationDbContext>();
        }

        [HttpGet]
        [Authorization(UserRoles.Administrator, UserRoles.Regular)]
        public async Task<IActionResult> GetVehicle(Guid id)
        {
            var vehicle = await _applicationDbContext.Set<Vehicle>()
                    .Include(x => x.Model)
                        .ThenInclude(m => m.Make)
                    .Include(x => x.Features)
                        .ThenInclude(vf => vf.Feature)
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
                Make = new
                {
                    vehicle.Model.Make.Id,
                    vehicle.Model.Make.Name
                },
                Model = new
                {
                    vehicle.Model.Id,
                    vehicle.Model.Name,
                },
                Features = vehicle.Features
                    .Select(f => new
                    {
                        f.Feature.Id,
                        f.Feature.Name
                    })
                    .ToList(),
                vehicle.LastUpdate,
                vehicle.IsRegistered
            };

            return new SuccessResult(item);
        }

        [HttpGet]
        [Authorization(UserRoles.Administrator, UserRoles.Regular)]
        public async Task<IActionResult> GetVehiclesList(GetVehiclesListRequest request)
        {
            var query = _applicationDbContext.Set<Vehicle>()
                .Include(x => x.Model)
                    .ThenInclude(m => m.Make)
                .Include(x => x.Features)
                    .ThenInclude(vf => vf.Feature)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(request.SearchQuery))
            {
                query = query.Where(item => item.ContactName.ToLower()
                                .Contains(request.SearchQuery.ToLower().Trim()));
            }

            if (!request.MakeId.Equals(Guid.Empty))
            {
                query = query.Where(item => item.Model.MakeId.Equals(request.MakeId));
            }

            if (!request.ModelId.Equals(Guid.Empty))
            {
                query = query.Where(item => item.ModelId.Equals(request.ModelId));
            }

            var pagedListResult = new PagedListResource()
            {
                TotalItemCount = await query.CountAsync(),
                ItemsList = await query
                    .Select(item => new
                    {
                        item.Id,
                        item.ContactName,
                        item.ContactPhone,
                        Make = new
                        {
                            item.Model.Make.Id,
                            item.Model.Make.Name
                        },
                        Model = new
                        {
                            item.Model.Id,
                            item.Model.Name,
                        }
                    })
                    .ApplyOrdering(request.OrderByColumn)
                    .ApplyPaging(request.Page, request.PageSize)
                    .ToListAsync()
            };

            return new SuccessResult(pagedListResult);
        }

        [HttpPost]
        [Authorization(UserRoles.Administrator)]
        public async Task<IActionResult> CreateVehicle([FromBody] CreateUpdateVehicleRequest request)
        {
            using (var transactionScope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var newVehicle = new Vehicle()
                {
                    ContactName = request.ContactName.Trim(),
                    ContactEmail = request.ContactEmail.NullIfEmpty(),
                    ContactPhone = request.ContactPhone.Trim(),
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
        [Authorization(UserRoles.Administrator)]
        public async Task<IActionResult> UpdateVehicle([FromBody] CreateUpdateVehicleRequest request)
        {
            using (var transactionScope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var vehicle = _applicationDbContext.Set<Vehicle>()
                        .Include(x => x.Features)
                    .FirstOrDefault(x => x.Id.Equals(request.Id));

                if (vehicle == null)
                {
                    throw new CustomException("Invalid vehicle specified.");
                }

                vehicle.ContactName = request.ContactName.Trim();
                vehicle.ContactEmail = request.ContactEmail.NullIfEmpty();
                vehicle.ContactPhone = request.ContactPhone.Trim();
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
        [Authorization(UserRoles.Administrator)]
        public async Task<IActionResult> DeleteVehicle(Guid id)
        {
            using (var transactionScope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var vehicle = _applicationDbContext.Set<Vehicle>()
                        .Include(x => x.Features)
                        .Include(x => x.Images)
                    .FirstOrDefault(x => x.Id.Equals(id));

                if (vehicle == null)
                {
                    throw new CustomException("Invalid vehicle specified.");
                }

                vehicle.IsDeleted = true;
                vehicle.Features.ToList().ForEach(f => f.IsDeleted = true);
                vehicle.Images.ToList().ForEach(i => i.IsDeleted = true);
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
