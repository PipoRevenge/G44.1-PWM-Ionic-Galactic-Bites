import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordValidator {
	public static strong(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null  => {
        let hasNumber = /\d/.test(control.value);
        let hasUpper = /[A-Z]/.test(control.value);
        let hasLower = /[a-z]/.test(control.value);
        
        const valid = hasNumber && hasUpper && hasLower;
        
        if (!valid) return { 'strong': true };
        return null;
    }
  }
}