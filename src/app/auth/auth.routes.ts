import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const AUTH_ROUTES: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
];
