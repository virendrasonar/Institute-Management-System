import { Injectable, computed, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap, finalize } from "rxjs";
import { environment } from "src/environments/environment";

export interface AdminSession {
  accessToken: string;
  email: string;
  name: string;
  expiresAt: string;
}

@Injectable({ providedIn: "root" })
export class AdminAuthService {
  static readonly storageKey = "institute_admin_session";
  private readonly sessionSignal = signal<AdminSession | null>(this.readSession());

  readonly session = this.sessionSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.sessionSignal());

  constructor(private http: HttpClient) {
    window.addEventListener("admin-auth-changed", () => this.sessionSignal.set(this.readSession()));
    window.addEventListener("storage", event => {
      if (event.key === AdminAuthService.storageKey) this.sessionSignal.set(this.readSession());
    });
  }

  login(email: string, password: string): Observable<AdminSession> {
    return this.http.post<AdminSession>(`${environment.apiUrl}/admin/auth/login`, { email, password }).pipe(
      tap(session => this.saveSession(session))
    );
  }

  logout(): void {
    const token = this.sessionSignal()?.accessToken;
    const request = token
      ? this.http.post<void>(`${environment.apiUrl}/admin/auth/logout`, {})
      : null;
    if (request) request.pipe(finalize(() => this.clearSession())).subscribe({ error: () => undefined });
    else this.clearSession();
  }

  private saveSession(session: AdminSession): void {
    localStorage.setItem(AdminAuthService.storageKey, JSON.stringify(session));
    this.sessionSignal.set(session);
  }

  private clearSession(): void {
    localStorage.removeItem(AdminAuthService.storageKey);
    this.sessionSignal.set(null);
  }

  private readSession(): AdminSession | null {
    try {
      const session = JSON.parse(localStorage.getItem(AdminAuthService.storageKey) || "null") as AdminSession | null;
      if (!session || new Date(session.expiresAt).getTime() <= Date.now()) {
        localStorage.removeItem(AdminAuthService.storageKey);
        return null;
      }
      return session;
    } catch {
      localStorage.removeItem(AdminAuthService.storageKey);
      return null;
    }
  }
}
