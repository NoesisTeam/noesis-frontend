import { Routes } from '@angular/router';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { userIdLoggedGuard } from '../core/guards/user-id-logged.guard';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    component: ProfileHomeComponent,
    canActivate: [userIdLoggedGuard],
  },
];
