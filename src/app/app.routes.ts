import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'clubs-home',
    loadChildren: () =>
      import('./clubs/clubs.routes').then((m) => m.CLUBS_ROUTES),
  },
];
