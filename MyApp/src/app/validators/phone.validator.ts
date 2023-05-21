import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class PhoneValidator {
	public static validPhoneNumber(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null  => {
            const number: string = String(control.value);

		    let hasInvalid = /^\d+\s$/.test(control.value);
            let maxLength = (number.length > 10);

            const valid = !hasInvalid && maxLength;

            if (!valid)  return { 'validPhoneNumber': true }; 
            return null;    
	    }
    }
}