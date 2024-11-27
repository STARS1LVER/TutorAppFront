import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RegisterService } from '../../features/auth/register/service/register.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(RegisterService);
  const router = inject(Router);
  
  if (authService.getToken()) {
    return true;
  }
  
  router.navigate(['/login']);
  return false;
};