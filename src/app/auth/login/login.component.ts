import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExecutedProcessDialogComponent } from '../../shared/components/executed-process-dialog/executed-process-dialog.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ExecutedProcessDialogComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword: boolean = false;
  showDialog: boolean = false;
  dialogMessage: string = '';
  dialogActionText: string = 'Aceptar';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Function to toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (response) => {
        // Saves the user ID and converts to string if necessary
        this.authService.setUserId(response.user.id.toString()); //
        this.dialogMessage = 'Ingreso exitoso';
        this.dialogActionText = 'Aceptar';
        this.showDialog = true;
      },
      error: (err) => {
        this.dialogMessage = err.error?.message || 'Error de inicio de sesión';
        this.dialogActionText = 'Reintentar';
        this.showDialog = true;
        console.error(err);
      },
    });
  }

  closeDialog() {
    this.showDialog = false;
    if (this.dialogMessage === 'Ingreso exitoso') {
      this.router.navigate(['/clubs']);
    }
  }
}
