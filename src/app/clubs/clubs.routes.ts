import { Routes } from '@angular/router';
import { ClubsHomeComponent } from './home/clubs-home/clubs-home.component';
import { ResourcesHomeComponent } from './resources/home/resources-home/resources-home.component';
import { QuizzesHomeComponent } from './quizzes/quizzes-home/quizzes-home.component';
import { ResourceDetailHomeComponent } from './resources/resource-detail/resource-detail-home/resource-list-detail.component';
import { userIdLoggedGuard } from '../core/guards/user-id-logged.guard';
import { tokenLoggedGuard } from '../core/guards/token-logged.guard';

export const CLUBS_ROUTES: Routes = [
  { path: '', component: ClubsHomeComponent, canActivate: [userIdLoggedGuard] },
  {
    path: 'resources',
    component: ResourcesHomeComponent,
    canActivate: [tokenLoggedGuard],
  },
  {
    path: 'resources/detail',
    component: ResourceDetailHomeComponent,
    canActivate: [tokenLoggedGuard],
  },
  {
    path: 'resources/detail/quiz',
    component: QuizzesHomeComponent,
    canActivate: [tokenLoggedGuard],
  },
];
