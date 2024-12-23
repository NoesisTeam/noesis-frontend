import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LocalStorageService } from '../../core/services/local-storage.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExecutedProcessDialogComponent } from '../../shared/components/executed-process-dialog/executed-process-dialog.component';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { LoginFormErrorsModel } from '../../core/data/models';
import { noSpacesValidator } from '../../core/validators/custom-validators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    ExecutedProcessDialogComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm!: FormGroup;
  public showPassword: boolean = false;
  public isLoading: boolean = false;
  public formErrors: LoginFormErrorsModel = {};
  public dialogMessage: string = '';
  public dialogActionText: string = '';
  public showDialog: boolean = false;

  private readonly destroyed$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  /**
   * Lifecycle hook - component initialization
   */
  public ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Lifecycle hook - component destruction
   */
  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Toggles password visibility
   */
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Handles form submission
   */
  public onSubmit(): void {
    if (this.loginForm.invalid) {
      this.validateAllFormFields(); // Force validation of all fields
      return;
    }

    const { username, password } = this.loginForm.value;

    this.isLoading = true;
    this.authService
      .login(username, password)
      .pipe(
        takeUntil(this.destroyed$),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (response) => {
          this.localStorageService.setUserId(response.user.id.toString());
          this.router.navigate(['/clubs']);
        },
        error: (err) => {
          this.dialogMessage = err.error?.message || 'Credenciales inválidas';
          this.dialogActionText = 'Reintentar';
          this.showDialog = true;
          this.handleLoginError(err);
        },
      });
  }

  /**
   * Initializes login form with validators
   */
  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, noSpacesValidator()]],
      password: [
        '',
        [Validators.required, Validators.minLength(6), noSpacesValidator()],
      ],
    });

    this.loginForm.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.onFormValueChanges());
  }

  /**
   * Handles form validation errors
   */
  private validateAllFormFields(): void {
    Object.keys(this.loginForm.controls).forEach((field) => {
      const control = this.loginForm.get(field);
      control?.markAsTouched();
    });
  }

  /**
   * Handles form value changes
   */
  private onFormValueChanges(): void {
    if (!this.loginForm) return;

    Object.keys(this.formErrors).forEach((field) => {
      this.formErrors[field as keyof LoginFormErrorsModel] = '';
      const control = this.loginForm.get(field);

      if (control && !control.valid && control.touched) {
        const messages = this.getValidationMessages(field, control.errors);
        this.formErrors[field as keyof LoginFormErrorsModel] = messages[0];
      }
    });
  }

  /**
   * Handles login errors
   */
  private handleLoginError(error: any): void {
    this.dialogMessage = 'Error al iniciar sesión';
    this.dialogActionText = 'Reintentar';
    this.showDialog = true;
  }

  /**
   * Gets validation messages for form fields
   */
  private getValidationMessages(field: string, errors: any): string[] {
    const messages: string[] = [];
    // Add validation messages based on error types
    return messages;
  }

  /**
   * Closes the dialog
   */
  public closeDialog(): void {
    this.showDialog = false;
  }
}
