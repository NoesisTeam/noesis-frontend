import { Routes } from '@angular/router';
import { ExploreHomeComponent } from './explore-home/explore-home.component';
import { userIdLoggedGuard } from '../core/guards/user-id-logged.guard';

export const EXPLORE_ROUTES: Routes = [
  {
    path: '',
    component: ExploreHomeComponent,
    canActivate: [userIdLoggedGuard],
  },
];
