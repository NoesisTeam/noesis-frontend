import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponse } from '../../core/models/login-response.model';
import { AuthRequest } from '../../core/models/auth-request.model';
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
  private loginURL: string = 'http://127.0.0.1:8000/login';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
      },
      {}
    );
  }

  // Function to toggle password visibility
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const loginData: AuthRequest = {
      user_name: this.loginForm.value.username,
      user_password: this.loginForm.value.password,
    };

    this.http.post<LoginResponse>(this.loginURL, loginData).subscribe({
      next: (response: LoginResponse) => {
        console.log('Login successful', response);
        this.authService.setUserId(response.user.id.toString());
        this.dialogMessage = 'Ingreso exitoso';
        this.dialogActionText = 'Aceptar'; //
        this.showDialog = true;
      },
      error: (err) => {
        this.dialogMessage = 'Error de ingreso';
        this.dialogActionText = 'Reintentar';
        this.showDialog = true;
        console.log(err.error?.detail || 'Error de inicio de sesión');
      },
    });
  }

  closeDialog() {
    this.showDialog = false;
    if (this.dialogMessage === 'Ingreso exitoso') {
      this.router.navigate(['/clubs-home']);
    }
  }
}
