import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CreditCardValidator {
    public static date(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const valid = /^\d{2}\/\d{2}$/.test(control.value);

            if (!valid) return { 'date': true };
            return null;
        }
    }

    public static cvv(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const valid = /^\d{3}$/.test(control.value);
            
            if (!valid) return { 'cvv': true };
            return null;
        }
    }

    public static nameOnCard(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const valid = /^.+\s(.+\s?)+$/.test(control.value);
            
            if (!valid) return { 'nameOnCard': true };
            return null;
        }
    }

	public static number(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const valid = /^(\d{4}\s?){4}$/.test(control.value);

            if (!valid) return { 'number': true };
            return (null);
        }
    }
}