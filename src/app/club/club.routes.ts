import {Routes} from '@angular/router';
import { RankingComponent } from './ranking/ranking.component';
import {WelcomeComponent} from "../auth/welcome/welcome.component";
import {LoginComponent} from "../auth/login/login.component";
import {SignupComponent} from "../auth/signup/signup.component";

export const CLUB_ROUTES: Routes = [
  { path: 'ranking', component: RankingComponent }
];
