import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { StudentAuthService } from "../services/student-auth.service";

export const studentGuard: CanActivateFn = () => {
  const auth = inject(StudentAuthService);
  return auth.isAuthenticated() ? true : inject(Router).createUrlTree(["/student/login"]);
};
