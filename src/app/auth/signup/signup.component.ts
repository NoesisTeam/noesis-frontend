import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { ExecutedProcessDialogComponent } from '../../shared/components/executed-process-dialog/executed-process-dialog.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ExecutedProcessDialogComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signupForm: FormGroup;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  dialogMessage: string = '';
  dialogActionText: string = 'Aceptar';
  showDialog: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    // Initialization of the form with validators
    this.signupForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator, // Assigns the validator to the group
      }
    );
  }

  // Password validator
  private passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const group = control as FormGroup; // Ensures that it is treated as FormGroup
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  };

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    if (this.signupForm.invalid) return;

    const { username, password } = this.signupForm.value;

    this.authService.signup(username, password).subscribe({
      next: (response) => {
        this.authService.login(username, password).subscribe({
          next: (response) => {
            this.authService.setUserId(response.user.id.toString());
            this.dialogMessage = 'Registro exitoso';
            this.dialogActionText = 'Aceptar';
            this.showDialog = true;
          },
          error: (err) => {
            console.error(err.error?.detail || 'Error de inicio de sesión');
            this.dialogMessage = 'Error al iniciar sesión después del registro';
            this.dialogActionText = 'Reintentar';
            this.showDialog = true;
          },
        });
      },
      error: (err) => {
        this.dialogMessage =
          err.error?.detail === 'User already exists'
            ? 'Usuario ya existente'
            : 'Error de registro';
        this.dialogActionText = 'Reintentar';
        this.showDialog = true;
        console.error(err.error?.detail || 'Error de registro');
      },
    });
  }

  closeDialog(): void {
    this.showDialog = false;
    if (this.dialogMessage === 'Registro exitoso') {
      this.router.navigate(['/clubs']);
    }
  }
}
