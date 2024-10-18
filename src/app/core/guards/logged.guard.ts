import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loggedGuard: CanActivateFn = (route, state) => {
  const authService = new AuthService();
  return !!authService.getToken();
};
