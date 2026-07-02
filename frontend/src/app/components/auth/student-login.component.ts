import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { StudentAuthService } from "../../services/student-auth.service";

@Component({
  selector: "app-student-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatButtonModule, MatCardModule,
    MatFormFieldModule, MatIconModule, MatInputModule, MatProgressSpinnerModule],
  template: `
    <main class="login-shell">
      <mat-card class="login-card">
        <div class="accent"></div>
        <span class="login-icon"><mat-icon>school</mat-icon></span>
        <span class="eyebrow">Student access</span>
        <h1>Welcome back</h1>
        <p>Sign in with the email and password you used when enrolling.</p>
        <form [formGroup]="form" (ngSubmit)="login()">
          <mat-form-field appearance="outline">
            <mat-label>Email address</mat-label>
            <input matInput type="email" formControlName="email" autocomplete="email" />
            <mat-icon matSuffix>email</mat-icon>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Password</mat-label>
            <input matInput [type]="showPassword ? 'text' : 'password'" formControlName="password"
              autocomplete="current-password" />
            <button mat-icon-button matSuffix type="button" (click)="showPassword = !showPassword"
              [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'">
              <mat-icon>{{ showPassword ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
          </mat-form-field>
          <div class="error" *ngIf="error"><mat-icon>error_outline</mat-icon>{{ error }}</div>
          <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || submitting">
            <mat-spinner *ngIf="submitting" diameter="20"></mat-spinner>
            <mat-icon *ngIf="!submitting">login</mat-icon>
            {{ submitting ? 'Signing in…' : 'Open My Dashboard' }}
          </button>
        </form>
        <small>Not enrolled yet? <a routerLink="/courses">Browse courses</a> and create your student access.</small>
      </mat-card>
    </main>
  `,
  styles: [`
    :host{display:block;min-height:calc(100vh - 64px);background:linear-gradient(145deg,#f8f9ff,#eeeaff)}
    .login-shell{min-height:calc(100vh - 64px);display:grid;place-items:center;padding:36px 18px}.login-card{position:relative;width:min(100%,440px);overflow:hidden;border-radius:22px;padding:38px;border:1px solid #e5e1ff;box-shadow:0 24px 60px #312e8124;text-align:center}.accent{position:absolute;inset:0 0 auto;height:4px;background:linear-gradient(90deg,#4f46e5,#c45ee5)}.login-icon{display:grid;width:62px;height:62px;margin:0 auto 18px;place-items:center;border-radius:18px;background:#ede9fe;color:#5b21b6}.login-icon mat-icon{font-size:31px;width:31px;height:31px}.eyebrow{text-transform:uppercase;letter-spacing:1.2px;color:#6d4ed1;font-size:11px;font-weight:800}.login-card h1{margin:7px 0 8px;color:#25205c;font-size:30px}.login-card>p{margin:0 auto 25px;color:#686779;line-height:1.55}.login-card form{display:grid;gap:8px;text-align:left}.login-card mat-form-field{width:100%}.login-card form>button{height:52px;border-radius:11px;font-weight:700}.login-card form>button mat-spinner{display:inline-block;margin-right:8px}.error{display:flex;align-items:center;gap:7px;margin:-2px 0 8px;color:#b42318;font-size:13px}.error mat-icon{font-size:18px;width:18px;height:18px}.login-card small{display:block;margin-top:22px;color:#777}.login-card small a{color:#4f46e5;font-weight:700;text-decoration:none}@media(max-width:480px){.login-card{padding:30px 22px}}
  `],
})
export class StudentLoginComponent {
  submitting = false;
  showPassword = false;
  error = "";
  readonly form = this.fb.nonNullable.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8)]],
  });

  constructor(private readonly fb: FormBuilder, private readonly auth: StudentAuthService,
              private readonly router: Router) {}

  login(): void {
    if (this.form.invalid) return;
    this.submitting = true;
    this.error = "";
    this.auth.login(this.form.getRawValue().email.trim(), this.form.getRawValue().password).subscribe({
      next: () => this.router.navigate(["/student/dashboard"]),
      error: () => { this.submitting = false; this.error = "Email or password is incorrect."; },
    });
  }
}
