import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validator for not containing any spaces
export function noSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';
    const isValid = !/\s/.test(value);
    return isValid ? null : { noSpaces: true };
  };
}

// Validator for matching passwords
export const passwordsMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }

  if (confirmPassword.errors && !confirmPassword.errors['passwordsMismatch']) {
    return null;
  }

  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordsMismatch: true });
  } else {
    confirmPassword.setErrors(null);
  }

  return null;
};

// Validator for containing only alphabetic characters
export function alphabeticValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';
    const isValid = /^[A-Za-z]+(?: [A-Za-z]+)*(?: [A-Za-z]+)?$/.test(value);
    return isValid ? null : { alphabetic: true };
  };
}

// Validator for containing only numeric characters
export function semesterNumericValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';
    const isValid = /^[0-9]{1,2}$/.test(value);
    return isValid ? null : { semesterNumeric: true };
  };
}

// Validator for containing only numeric characters
export function phoneNumericValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value || '';
    const isValid = /^[0-9]+$/.test(value);
    return isValid ? null : { phoneNumeric: true };
  };
}
