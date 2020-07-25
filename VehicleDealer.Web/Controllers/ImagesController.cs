namespace VehicleDealer.Web.Controllers
{
    using System;
    using System.Drawing;
    using System.Drawing.Imaging;
    using System.IO;
    using System.Linq;
    using System.Threading.Tasks;
    using System.Transactions;
    using MainProject.Web.Custom.Resources;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;
    using VehicleDealer.Domain.Entities;
    using VehicleDealer.Web.Custom;
    using VehicleDealer.Web.Custom.Enumerations;
    using VehicleDealer.Web.Dependencies.ApplicationContext;
    using VehicleDealer.Web.Requests.Image;
    using IO = System.IO;

    [Authorize]
    [Route("Api/[controller]/[action]")]
    public class ImagesController : Controller
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly ApplicationDbContext _applicationDbContext;

        public ImagesController(IServiceProvider serviceProvider)
        {
            _hostingEnvironment = serviceProvider.GetService<IWebHostEnvironment>();
            _applicationDbContext = serviceProvider.GetService<ApplicationDbContext>();
        }

        [HttpGet]
        [Authorization(UserRoles.Administrator, UserRoles.Regular)]
        public async Task<IActionResult> GetImagesList(GetImagesListRequest request)
        {
            var items = await _applicationDbContext.Set<ImageFile>()
                .Where(x => x.VehicleId.Equals(request.VehicleId))
                .Select(x => new
                {
                    x.Id,
                    x.FileName
                })
                .ToListAsync();

            return new SuccessResult(new ListResource(items));
        }

        [HttpPost]
        [Authorization(UserRoles.Administrator)]
        public async Task<IActionResult> UploadImage([FromForm] UploadImageRequest request)
        {
            using (var transactionScope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var vehicle = await _applicationDbContext.Set<Vehicle>()
                        .Include(x => x.Images)
                    .FirstOrDefaultAsync(x => x.Id.Equals(request.VehicleId));

                if (vehicle == null)
                {
                    throw new CustomException("Invalid vehicle specified.");
                }

                var fileName = Guid.NewGuid();
                var relativePath = $"ve_images\\{fileName}.jpg";
                var absolutePath = Path.Combine(_hostingEnvironment.WebRootPath, relativePath);

                using var memoryStream = new MemoryStream();
                await request.File.CopyToAsync(memoryStream);

                using var img = Image.FromStream(memoryStream);
                var thumbnail = img.GetThumbnailImage(960, 540, () => false, IntPtr.Zero);
                var fileInfo = new FileInfo(absolutePath);
                fileInfo.Directory.Create();
                thumbnail.Save(absolutePath, ImageFormat.Jpeg);

                var imageFile = new ImageFile() { FileName = relativePath };
                vehicle.Images.Add(imageFile);

                await _applicationDbContext.SaveChangesAsync();
                transactionScope.Complete();
            }

            return new SuccessResult();
        }

        [HttpPost]
        [Authorization(UserRoles.Administrator)]
        public async Task<IActionResult> DeleteImage(Guid id)
        {
            using (var transactionScope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                var imageFile = _applicationDbContext.Set<ImageFile>()
                    .FirstOrDefault(x => x.Id.Equals(id));

                if (imageFile == null)
                {
                    throw new CustomException("Invalid image specified.");
                }

                var absolutePath = Path.Combine(_hostingEnvironment.WebRootPath, imageFile.FileName);
                if (!IO.File.Exists(absolutePath))
                {
                    throw new InvalidOperationException();
                }

                IO.File.Delete(absolutePath);
                imageFile.IsDeleted = true;
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
