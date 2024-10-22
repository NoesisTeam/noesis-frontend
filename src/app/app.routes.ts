import { Routes } from '@angular/router';
import { loggedGuard } from './core/guards/logged.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
];
