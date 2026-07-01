import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { AdminAuthService, AdminSession } from "./admin-auth.service";

@Injectable()
export class AdminAuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const session = this.readSession();
    const isAdminRequest = request.url.includes("/admin/");
    const authenticatedRequest = isAdminRequest && session?.accessToken
      ? request.clone({ setHeaders: { Authorization: `Bearer ${session.accessToken}` } })
      : request;

    return next.handle(authenticatedRequest).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401 && !request.url.endsWith("/admin/auth/login")) {
          localStorage.removeItem(AdminAuthService.storageKey);
          window.dispatchEvent(new Event("admin-auth-changed"));
        }
        return throwError(() => error);
      })
    );
  }

  private readSession(): AdminSession | null {
    try {
      return JSON.parse(localStorage.getItem(AdminAuthService.storageKey) || "null");
    } catch {
      return null;
    }
  }
}
