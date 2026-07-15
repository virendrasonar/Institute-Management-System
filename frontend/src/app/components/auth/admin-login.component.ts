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
        <p>Sign in to access institute management tools.</p>

        <div class="demo-credentials" aria-label="Default admin login credentials">
          <span>Default admin access</span>
          <strong>Email:</strong>
          <code>admin&#64;example.com</code>
          <strong>Password:</strong>
          <code>Admin&#64;123</code>
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
    p { margin: 0 0 28px; color: #6b7280; }
    .demo-credentials { display: grid; grid-template-columns: auto 1fr; gap: 8px 10px; align-items: center;
      margin: 0 0 22px; padding: 14px 16px; border-radius: 14px; text-align: left;
      background: #f5f3ff; border: 1px solid #ddd6fe; color: #4c1d95; }
    .demo-credentials span { grid-column: 1 / -1; font-size: .78rem; font-weight: 800; letter-spacing: .08em;
      text-transform: uppercase; color: #6d28d9; }
    .demo-credentials strong { font-size: .88rem; }
    .demo-credentials code { padding: 3px 8px; border-radius: 8px; background: white; color: #312e81;
      font-family: inherit; font-weight: 700; word-break: break-all; }
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
