import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const signupPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const value = control.value;

  if (value.length < 6) {
    return { minLength: true };
  }

  return null;
};

export const signupPasswordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) return null;

  if (password.value?.length >= 6 && confirmPassword.value?.length >= 6) {
    const match = password.value === confirmPassword.value;
    if (!match) {
      return { mismatch: true };
    }
  }

  return null;
};
