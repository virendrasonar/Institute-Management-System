import { Injectable, computed, signal } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, finalize, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { EnrollmentResult, StudentDashboard } from "../models/course.model";

export interface StudentSession {
  accessToken: string;
  studentId: number;
  email: string;
  name: string;
  expiresAt: string;
}

@Injectable({ providedIn: "root" })
export class StudentAuthService {
  static readonly storageKey = "institute_student_session";
  private readonly sessionSignal = signal<StudentSession | null>(this.readSession());
  readonly session = this.sessionSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.sessionSignal());

  constructor(private readonly http: HttpClient) {
    window.addEventListener("storage", event => {
      if (event.key === StudentAuthService.storageKey) this.sessionSignal.set(this.readSession());
    });
  }

  login(email: string, password: string): Observable<StudentSession> {
    return this.http.post<StudentSession>(`${environment.apiUrl}/api/student/auth/login`, { email, password })
      .pipe(tap(session => this.saveSession(session)));
  }

  getDashboard(): Observable<StudentDashboard> {
    return this.http.get<StudentDashboard>(`${environment.apiUrl}/api/student/dashboard`, {
      headers: this.authHeaders(),
    });
  }

  enrollInCourse(courseId: number): Observable<EnrollmentResult> {
    return this.http.post<EnrollmentResult>(`${environment.apiUrl}/api/student/courses/${courseId}/enroll`, {}, {
      headers: this.authHeaders(),
    });
  }

  logout(): void {
    const token = this.sessionSignal()?.accessToken;
    const request = token ? this.http.post<void>(`${environment.apiUrl}/api/student/auth/logout`, {}, {
      headers: this.authHeaders(),
    }) : null;
    if (request) request.pipe(finalize(() => this.clearSession())).subscribe({ error: () => undefined });
    else this.clearSession();
  }

  private authHeaders(): HttpHeaders {
    const token = this.sessionSignal()?.accessToken;
    return new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
  }

  private saveSession(session: StudentSession): void {
    localStorage.setItem(StudentAuthService.storageKey, JSON.stringify(session));
    this.sessionSignal.set(session);
  }

  clearSession(): void {
    localStorage.removeItem(StudentAuthService.storageKey);
    this.sessionSignal.set(null);
  }

  private readSession(): StudentSession | null {
    try {
      const session = JSON.parse(localStorage.getItem(StudentAuthService.storageKey) || "null") as StudentSession | null;
      if (!session || new Date(session.expiresAt).getTime() <= Date.now()) {
        localStorage.removeItem(StudentAuthService.storageKey);
        return null;
      }
      return session;
    } catch {
      localStorage.removeItem(StudentAuthService.storageKey);
      return null;
    }
  }
}
