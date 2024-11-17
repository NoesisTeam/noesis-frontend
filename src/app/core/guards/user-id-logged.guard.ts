import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { inject } from '@angular/core';

export const userIdLoggedGuard: CanActivateFn = (route, state) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);
  const userId = localStorageService.getUserId();

  if (!userId) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
