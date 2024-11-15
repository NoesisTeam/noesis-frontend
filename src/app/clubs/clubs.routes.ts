import { Routes } from '@angular/router';
import { ClubsHomeComponent } from './home/clubs-home/clubs-home.component';
import { ResourcesHomeComponent } from './resources/home/resources-home/resources-home.component';
import { QuizzesHomeComponent } from './quizzes/quizzes-home/quizzes-home.component';
import { ResourceDetailHomeComponent } from './resources/resource-detail/resource-detail-home/resource-list-detail.component';

export const CLUBS_ROUTES: Routes = [
  { path: '', component: ClubsHomeComponent },
  { path: 'resources', component: ResourcesHomeComponent },
  { path: 'resources/detail', component: ResourceDetailHomeComponent },
  { path: 'resources/detail/quiz', component: QuizzesHomeComponent },
];
