import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validator for not starting with space
export function noLeadingSpaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.trim() || '';
    const isValid = value && !value.startsWith(' ');
    return isValid ? null : { noLeadingSpace: true };
  };
}

// Validator for not containing more than two consecutive spaces
export function noMultipleSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.trim() || '';
    const isValid = value && !/ {3,}/.test(value);
    return isValid ? null : { noMultipleSpaces: true };
  };
}
