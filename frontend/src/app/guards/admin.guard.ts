import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AdminAuthService } from "../services/admin-auth.service";

export const adminGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AdminAuthService);
  const router = inject(Router);
  return auth.isAuthenticated()
    ? true
    : router.createUrlTree(["/admin/login"], { queryParams: { returnUrl: state.url } });
};
