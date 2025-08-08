import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { User } from '../services/user';

export const authGuard: CanActivateFn = async(route, state) => {
  const userSrv: User = inject(User);
  const router: Router = inject(Router);

  const user = await userSrv.getUsername();
  if (!user) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
