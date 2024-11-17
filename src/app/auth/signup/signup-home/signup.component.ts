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
import {
  signupPasswordValidator,
  signupPasswordMatchValidator,
} from '../validators/signup-password.validator';
import { CommonModule } from '@angular/common';
import { ExecutedProcessDialogComponent } from '../../../shared/components/executed-process-dialog/executed-process-dialog.component';
import { SignupFormErrorsModel } from '../../../core/data/models';

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
        username: ['', [Validators.required]],
        password: ['', [Validators.required, signupPasswordValidator]],
        confirmPassword: ['', [Validators.required, signupPasswordValidator]],
      },
      {
        validators: signupPasswordMatchValidator,
        updateOn: 'change',
      }
    );

    this.signupForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.onFormValueChanges());
  }

  /**
   * Handles form submission
   */
  public onSubmit(): void {
    if (this.signupForm.invalid) {
      this.validateAllFormFields();
      return;
    }

    const { username, password } = this.signupForm.value;

    this.authService
      .signup(username, password)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.handleSignupSuccess(username, password),
        error: (error) => this.handleSignupError(error),
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
          this.localStorageService.setUserId(response.user.id.toString());
          this.showSuccessDialog();
        },
        error: () =>
          this.showErrorDialog('Error al iniciar sesión después del registro'),
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
   * Validates all form fields
   */
  private validateAllFormFields(): void {
    Object.keys(this.signupForm.controls).forEach((field) => {
      const control = this.signupForm.get(field);
      control?.markAsTouched();
    });
  }

  /**
   * Handles form value changes
   */
  private onFormValueChanges(): void {
    if (!this.signupForm) return;

    Object.keys(this.formErrors).forEach((field) => {
      this.formErrors[field as keyof SignupFormErrorsModel] = '';
      const control = this.signupForm.get(field);

      if (control?.invalid && control.touched) {
        const messages = this.getValidationMessages(field, control.errors);
        this.formErrors[field as keyof SignupFormErrorsModel] = messages[0];
      }
    });
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
   * Cleans up subscriptions on component destruction
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
