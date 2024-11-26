import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validator for not containing any spaces
export function noSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';
    const isValid = !/\s/.test(value);
    return isValid ? null : { noSpaces: true };
  };
}
