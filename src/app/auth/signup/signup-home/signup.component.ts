// src/app/auth/signup/signup.component.ts
import { Component, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { CommonModule } from '@angular/common';
import { ExecutedProcessDialogComponent } from '../../../shared/components/executed-process-dialog/executed-process-dialog.component';
import { SignupFormErrorsModel } from '../../../core/data/models';
import {
  noSpacesValidator,
  passwordsMatchValidator,
} from '../../../core/validators/custom-validators';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ExecutedProcessDialogComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnDestroy {
  // Public properties
  public signupForm!: FormGroup;
  public showPassword = false;
  public showConfirmPassword = false;
  public dialogMessage = '';
  public dialogActionText = 'Aceptar';
  public showDialog = false;
  public isSubmitting = false;
  public formErrors: SignupFormErrorsModel = {};

  // Private properties
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly localStorageService: LocalStorageService
  ) {
    this.initializeForm();
  }

  /**
   * Initializes the signup form with validators
   */
  private initializeForm(): void {
    this.signupForm = this.formBuilder.group(
      {
        username: ['', [Validators.required, noSpacesValidator()]],
        password: [
          '',
          [Validators.required, Validators.minLength(6), noSpacesValidator()],
        ],
        confirmPassword: [
          '',
          [Validators.required, Validators.minLength(6), noSpacesValidator()],
        ],
      },
      { validators: passwordsMatchValidator }
    );

    this.signupForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.onFormValueChanges());
  }

  /**
   * Handles form value changes
   */
  private onFormValueChanges(): void {
    if (!this.signupForm) return;

    Object.keys(this.signupForm.controls).forEach((field) => {
      const control = this.signupForm.get(field);
      this.formErrors[field as keyof SignupFormErrorsModel] = '';

      if (control && control.invalid && (control.dirty || control.touched)) {
        const messages = this.getValidationMessages(field, control.errors);
        this.formErrors[field as keyof SignupFormErrorsModel] = messages[0];
      }
    });

    // Check for form-level errors
    if (this.signupForm.errors) {
      this.formErrors['confirmPassword'] = this.signupForm.errors[
        'passwordsMismatch'
      ]
        ? 'Las contraseñas deben coincidir.'
        : '';
    }
  }

  /**
   * Gets validation messages for form fields
   */
  private getValidationMessages(field: string, errors: any): string[] {
    const messages: string[] = [];

    if (errors?.required) messages.push('Campo obligatorio');
    if (errors?.minLength)
      messages.push('Campo obligatorio con al menos 6 caracteres');
    if (errors?.mismatch) messages.push('Las contraseñas deben coincidir');

    return messages;
  }

  /**
   * Handles form submission
   */
  public onSubmit(): void {
    if (this.signupForm.invalid) {
      this.validateAllFormFields();
      return;
    }

    this.isSubmitting = true;

    const { username, password } = this.signupForm.value;

    this.authService
      .signup(username, password)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.handleSignupSuccess(username, password),
        error: (error) => {
          this.isSubmitting = false;
          this.handleSignupError(error);
        },
      });
  }

  /**
   * Validates all form fields
   */
  private validateAllFormFields(): void {
    Object.keys(this.signupForm.controls).forEach((field) => {
      const control = this.signupForm.get(field);
      control?.markAsTouched();
    });
  }

  /**
   * Handles successful signup
   */
  private handleSignupSuccess(username: string, password: string): void {
    this.authService
      .login(username, password)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.localStorageService.setUserId(response.user.id.toString());
          this.showSuccessDialog();
        },
        error: () => {
          this.isSubmitting = false;
          this.showErrorDialog('Error al iniciar sesión después del registro');
        },
      });
  }

  /**
   * Handles signup error
   */
  private handleSignupError(error: any): void {
    const message =
      error.error?.detail === 'User already exists'
        ? 'Usuario ya existente'
        : 'Error de registro';
    this.showErrorDialog(message);
  }

  /**
   * Shows success dialog
   */
  private showSuccessDialog(): void {
    this.dialogMessage = 'Registro exitoso';
    this.dialogActionText = 'Aceptar';
    this.showDialog = true;
  }

  /**
   * Shows error dialog
   */
  private showErrorDialog(message: string): void {
    this.dialogMessage = message;
    this.dialogActionText = 'Reintentar';
    this.showDialog = true;
  }

  /**
   * Toggles password visibility
   */
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Toggles confirm password visibility
   */
  public toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  /**
   * Closes the dialog
   */
  public closeDialog(): void {
    this.showDialog = false;
    if (this.dialogMessage === 'Registro exitoso') {
      this.router.navigate(['/clubs']);
    }
  }

  /**
   * Cleans up subscriptions on component destruction
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
