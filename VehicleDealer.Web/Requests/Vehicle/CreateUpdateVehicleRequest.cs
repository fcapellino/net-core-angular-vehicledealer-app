namespace VehicleDealer.Web.Requests.Vehicle
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using FluentValidation;

    public class CreateUpdateVehicleRequest
    {
        public string ContactName { get; set; }
        public string ContactEmail { get; set; }
        public string ContactPhone { get; set; }
        public Guid ModelId { get; set; }
        public IList<Guid> FeaturesIds { get; set; }
        public bool IsRegistered { get; set; }
    }

    public class CreateUpdateVehicleRequestValidator
        : AbstractValidator<CreateUpdateVehicleRequest>
    {
        public CreateUpdateVehicleRequestValidator()
        {
            RuleFor(x => x.ContactName)
                .NotEmpty()
                .MaximumLength(255);

            RuleFor(x => x.ContactEmail)
                .EmailAddress()
                .When(x => !string.IsNullOrEmpty(x.ContactEmail));

            RuleFor(x => x.ContactPhone)
                .NotEmpty()
                .MaximumLength(255);

            RuleFor(x => x.ModelId)
                .NotNull();

            RuleFor(x => x)
                .Must(x => x.FeaturesIds.Any());

            RuleFor(x => x.IsRegistered)
                .NotNull();
        }
    }
}
