namespace VehicleDealer.Web.Requests.Image
{
    using System;
    using FluentValidation;

    public class GetImagesListRequest
    {
        public Guid VehicleId { get; set; }
    }

    public class GetImagesListRequestValidator
        : AbstractValidator<GetImagesListRequest>
    {
        public GetImagesListRequestValidator()
        {
            RuleFor(x => x.VehicleId)
                .NotEmpty();
        }
    }
}
