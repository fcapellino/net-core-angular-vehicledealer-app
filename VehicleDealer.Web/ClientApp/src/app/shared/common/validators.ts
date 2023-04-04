import { Directive } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';


@Directive({
    selector: '[notNullOrEmpty][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: NotNullOrEmptyValidator, multi: true }
    ]
})
export class NotNullOrEmptyValidator implements Validator {
    validator: ValidatorFn;

    constructor() {
        this.validator = this.validateFactory();
    }

    validateFactory(): ValidatorFn {
        return (c: AbstractControl) => {
            var isValid = (!!c.value && (null === c.value.match(/^ *$/)))
            if (isValid) {
                return null;
            } else {
                return {
                    notNullOrEmpty: { valid: false }
                };
            }
        }
    }
    validate(c: FormControl) {
        return this.validator(c);
    }
}
