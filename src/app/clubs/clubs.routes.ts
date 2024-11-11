import { Routes } from '@angular/router';
import { ClubsHomeComponent } from './home/clubs-home/clubs-home.component';
import { ClubsResourcesComponent } from './resources/clubs-resources/clubs-resources.component';

export const CLUBS_ROUTES: Routes = [
  { path: '', component: ClubsHomeComponent },
  { path: 'resources', component: ClubsResourcesComponent },
];
