import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, ActivatedRoute, RouterModule } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AdminAuthService } from "../../services/admin-auth.service";

@Component({
  selector: "app-admin-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  template: `
    <section class="login-page">
      <mat-card class="login-card">
        <div class="login-icon"><mat-icon>admin_panel_settings</mat-icon></div>
        <h1>Admin Login</h1>
        <p>Access the institute workspace for courses, students, enrollments, messages, and reports.</p>

        <div class="access-note" aria-label="Admin workspace access note">
          <mat-icon>verified_user</mat-icon>
          <span>Admin workspace</span>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="submit()">
          <mat-form-field appearance="outline">
            <mat-label>Admin Email</mat-label>
            <input matInput type="email" formControlName="email" autocomplete="username" />
            <mat-icon matSuffix>email</mat-icon>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Password</mat-label>
            <input matInput type="password" formControlName="password" autocomplete="current-password" />
            <mat-icon matSuffix>lock</mat-icon>
          </mat-form-field>
          <div class="login-error" *ngIf="errorMessage">{{ errorMessage }}</div>
          <button mat-raised-button type="submit" [disabled]="loginForm.invalid || submitting">
            <mat-spinner *ngIf="submitting" diameter="20"></mat-spinner>
            <mat-icon *ngIf="!submitting">login</mat-icon>
            {{ submitting ? "Signing in..." : "Sign In" }}
          </button>
        </form>
        <a routerLink="/home" class="back-link">← Return to website</a>
      </mat-card>
    </section>
  `,
  styles: [`
    .login-page { min-height: calc(100vh - 128px); display: grid; place-items: center; padding: 48px 20px;
      background: linear-gradient(135deg, #eef2ff, #f5f3ff); }
    .login-card { width: min(430px, 100%); padding: 38px; border-radius: 22px; text-align: center;
      box-shadow: 0 22px 55px rgba(67,56,202,.16); border: 1px solid rgba(99,102,241,.16); }
    .login-icon { width: 72px; height: 72px; margin: 0 auto 18px; display: grid; place-items: center;
      border-radius: 20px; color: white; background: linear-gradient(135deg,#4338ca,#8b5cf6); }
    .login-icon mat-icon { width: 38px; height: 38px; font-size: 38px; }
    h1 { margin: 0 0 8px; color: #1f2937; font-size: 2rem; }
    p { margin: 0 0 22px; color: #6b7280; line-height: 1.6; }
    .access-note { display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      margin: 0 0 22px; padding: 10px 14px; border-radius: 999px;
      background: #eef2ff; border: 1px solid #c7d2fe; color: #4338ca; font-weight: 800; }
    .access-note mat-icon { width: 18px; height: 18px; font-size: 18px; }
    form { display: grid; gap: 12px; }
    mat-form-field { width: 100%; }
    button { height: 50px; border-radius: 12px; color: white !important;
      background: linear-gradient(135deg,#4338ca,#7c3aed) !important; }
    button mat-spinner { display: inline-block; margin-right: 8px; }
    .login-error { padding: 10px; border-radius: 8px; color: #b91c1c; background: #fef2f2; }
    .back-link { display: inline-block; margin-top: 24px; color: #4338ca; text-decoration: none; font-weight: 600; }
  `]
})
export class AdminLoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AdminAuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  submitting = false;
  errorMessage = "";
  readonly loginForm = this.fb.group({
    email: ["admin@example.com", [Validators.required, Validators.email]],
    password: ["Admin@123", Validators.required]
  });

  submit(): void {
    if (this.loginForm.invalid || this.submitting) return;
    this.submitting = true;
    this.errorMessage = "";
    const { email, password } = this.loginForm.getRawValue();
    this.auth.login(email!, password!).subscribe({
      next: () => this.router.navigateByUrl(this.route.snapshot.queryParamMap.get("returnUrl") || "/dashboard"),
      error: () => { this.errorMessage = "Invalid email or password."; this.submitting = false; }
    });
  }
}
