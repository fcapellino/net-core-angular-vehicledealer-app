namespace VehicleDealer.Web.Requests.Image
{
    using System;
    using System.IO;
    using System.Linq;
    using FluentValidation;
    using Microsoft.AspNetCore.Http;

    public class UploadImageRequest
    {
        public Guid VehicleId { get; set; }
        public IFormFile File { get; set; }
    }

    public class UploadImageRequestValidator
        : AbstractValidator<UploadImageRequest>
    {
        private readonly string[] _allowedTypes = new[] { ".jpg", ".png" };
        private readonly int _maxBytes = 10 * 1024 * 1024;

        public UploadImageRequestValidator()
        {
            RuleFor(x => x.VehicleId)
                .NotEmpty();

            RuleFor(x => x.File)
                .NotNull()
                .Must(x =>
                {
                    return x.Length > 0 && x.Length < _maxBytes &&
                        _allowedTypes.Any(t => t.Equals(Path.GetExtension(x.FileName), StringComparison.OrdinalIgnoreCase));
                });
        }
    }
}
