import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { Course } from "../../../models/course.model";
import { CourseService } from "../../../services/course.service";
import { StudentAuthService } from "../../../services/student-auth.service";

@Component({
  selector: "app-course-details",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  template: `
    <main class="course-detail-page">
      <div *ngIf="loading" class="state">
        <mat-spinner diameter="48"></mat-spinner>
      </div>

      <div *ngIf="error" class="state error-state">
        <mat-icon>error_outline</mat-icon>
        <h2>Course not found</h2>
        <a mat-raised-button color="primary" routerLink="/courses">Browse Courses</a>
      </div>

      <ng-container *ngIf="course as item">
        <a routerLink="/courses" class="back-link">
          <mat-icon>arrow_back</mat-icon>
          All courses
        </a>

        <section class="course-hero">
          <div class="hero-media" [class.with-image]="item.thumbnailUrl">
            <img
              *ngIf="item.thumbnailUrl; else courseIcon"
              [src]="item.thumbnailUrl"
              [alt]="item.name + ' course cover'"
            />
            <ng-template #courseIcon>
              <mat-icon>{{ item.icon || "school" }}</mat-icon>
            </ng-template>
          </div>

          <div class="hero-copy">
            <span class="eyebrow">{{ item.category || "Online course" }}</span>
            <h1>{{ item.name }}</h1>
            <p>{{ item.description }}</p>

            <div class="meta-grid">
              <span>
                <mat-icon>person</mat-icon>
                <strong>{{ item.instructor || "Expert instructor" }}</strong>
                <small>Instructor</small>
              </span>
              <span>
                <mat-icon>schedule</mat-icon>
                <strong>{{ item.duration || "Self-paced" }}</strong>
                <small>Duration</small>
              </span>
              <span>
                <mat-icon>trending_up</mat-icon>
                <strong>{{ item.level || "All levels" }}</strong>
                <small>Level</small>
              </span>
            </div>
          </div>
        </section>

        <div class="content-grid">
          <section class="details">
            <mat-card class="info-card learning-card">
              <span class="preview-icon"><mat-icon>{{ item.hasVideo ? "play_circle" : "menu_book" }}</mat-icon></span>
              <div>
                <h2>{{ item.hasVideo ? "Video-supported learning" : "Structured learning area" }}</h2>
                <p>
                  Enrollment opens the course learning area inside the website, including the
                  available video and course resources.
                </p>
              </div>
            </mat-card>

            <mat-card class="info-card" *ngIf="item.features">
              <h2>What you will learn</h2>
              <p class="preserve-lines">{{ item.features }}</p>
            </mat-card>

            <mat-card class="info-card" *ngIf="item.prerequisites">
              <h2>Prerequisites</h2>
              <p class="preserve-lines">{{ item.prerequisites }}</p>
            </mat-card>

            <mat-card class="info-card" *ngIf="item.materialsPreview?.length">
              <h2>Course content</h2>
              <div class="material" *ngFor="let material of item.materialsPreview">
                <mat-icon>check_circle</mat-icon>
                <span>{{ material }}</span>
              </div>
            </mat-card>
          </section>

          <aside class="enrollment-panel">
            <mat-card class="enroll-card">
              <div class="enroll-heading">
                <span class="enroll-icon"><mat-icon>school</mat-icon></span>
                <div>
                  <span>Enrollment</span>
                  <h2>Start this course</h2>
                </div>
              </div>

              <ng-container *ngIf="studentAuth.isAuthenticated(); else publicEnrollmentForm">
                <p class="enroll-copy">
                  Enroll as {{ studentAuth.session()?.name }} and continue directly to the course dashboard.
                </p>
                <button class="student-enroll-btn" mat-raised-button color="primary" type="button"
                  (click)="enrollLoggedInStudent()" [disabled]="submitting">
                  <mat-spinner *ngIf="submitting" diameter="20"></mat-spinner>
                  <mat-icon *ngIf="!submitting">how_to_reg</mat-icon>
                  {{ submitting ? "Enrolling..." : "Enroll with Student Account" }}
                </button>
              </ng-container>

              <ng-template #publicEnrollmentForm>
              <p class="enroll-copy">
                Create your learner access and continue directly to the course dashboard.
              </p>

              <form [formGroup]="enrollmentForm" (ngSubmit)="enroll()">
                <mat-form-field appearance="outline">
                  <mat-label>Your name</mat-label>
                  <input matInput formControlName="name" autocomplete="name" />
                  <mat-error *ngIf="enrollmentForm.controls.name.invalid">Name is required</mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Email address</mat-label>
                  <input matInput type="email" formControlName="email" autocomplete="email" />
                  <mat-error *ngIf="enrollmentForm.controls.email.invalid">Enter a valid email</mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Create student password</mat-label>
                  <input
                    matInput
                    [type]="showPassword ? 'text' : 'password'"
                    formControlName="password"
                    autocomplete="new-password"
                  />
                  <button
                    mat-icon-button
                    matSuffix
                    type="button"
                    (click)="showPassword = !showPassword"
                    [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'"
                  >
                    <mat-icon>{{ showPassword ? "visibility_off" : "visibility" }}</mat-icon>
                  </button>
                  <mat-hint>Use this password to access enrolled courses.</mat-hint>
                  <mat-error *ngIf="enrollmentForm.controls.password.invalid">Use at least 8 characters</mat-error>
                </mat-form-field>

                <button mat-raised-button color="primary" type="submit" [disabled]="submitting">
                  <mat-spinner *ngIf="submitting" diameter="20"></mat-spinner>
                  <mat-icon *ngIf="!submitting">school</mat-icon>
                  {{ submitting ? "Enrolling..." : "Enroll Now" }}
                </button>
              </form>
              </ng-template>

              <div class="trust-note">
                <mat-icon>lock</mat-icon>
                Course access is created after successful enrollment.
              </div>
            </mat-card>
          </aside>
        </div>
      </ng-container>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: #f5f7ff;
    }

    .course-detail-page {
      width: min(1200px, calc(100% - 40px));
      margin: 0 auto;
      padding: 32px 0 72px;
    }

    .state {
      min-height: 55vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 14px;
      text-align: center;
    }

    .error-state mat-icon {
      width: 54px;
      height: 54px;
      font-size: 54px;
      color: #4338ca;
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 18px;
      color: #4338ca;
      font-weight: 800;
      text-decoration: none;
    }

    .back-link:hover {
      color: #1d4ed8;
    }

    .back-link mat-icon {
      width: 18px;
      height: 18px;
      font-size: 18px;
    }

    .course-hero {
      display: grid;
      grid-template-columns: minmax(300px, 40%) minmax(0, 1fr);
      overflow: hidden;
      border: 1px solid #e5e7eb;
      border-radius: 24px;
      background: #ffffff;
      box-shadow: 0 16px 42px rgba(15, 23, 42, 0.08);
    }

    .hero-media {
      min-height: 360px;
      display: grid;
      place-items: center;
      background: linear-gradient(135deg, #4338ca, #818cf8);
      color: #ffffff;
      overflow: hidden;
    }

    .hero-media img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }

    .hero-media mat-icon {
      width: 96px;
      height: 96px;
      font-size: 96px;
    }

    .hero-copy {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 42px;
    }

    .eyebrow {
      align-self: flex-start;
      display: inline-flex;
      margin-bottom: 14px;
      padding: 6px 12px;
      border-radius: 999px;
      background: #eef2ff;
      color: #4338ca;
      font-size: 0.76rem;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    h1 {
      margin: 0;
      color: #111827;
      font-size: clamp(2rem, 4vw, 3.35rem);
      font-weight: 850;
      line-height: 1.05;
    }

    .hero-copy > p {
      margin: 16px 0 0;
      color: #64748b;
      font-size: 1.02rem;
      line-height: 1.7;
    }

    .meta-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      margin-top: 28px;
    }

    .meta-grid span {
      min-width: 0;
      display: grid;
      grid-template-columns: 28px minmax(0, 1fr);
      gap: 2px 8px;
      padding: 14px;
      border: 1px solid #e0e7ff;
      border-radius: 16px;
      background: #f8fafc;
    }

    .meta-grid mat-icon {
      grid-row: span 2;
      width: 22px;
      height: 22px;
      font-size: 22px;
      color: #4338ca;
    }

    .meta-grid strong,
    .meta-grid small {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .meta-grid strong {
      color: #111827;
      font-size: 0.94rem;
    }

    .meta-grid small {
      color: #64748b;
      font-weight: 700;
    }

    .content-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 380px;
      align-items: start;
      gap: 28px;
      margin-top: 28px;
    }

    .details {
      display: grid;
      gap: 18px;
      min-width: 0;
    }

    .info-card,
    .enroll-card {
      border: 1px solid #e5e7eb;
      border-radius: 18px !important;
      background: #ffffff;
      box-shadow: 0 10px 28px rgba(15, 23, 42, 0.07);
    }

    .info-card {
      padding: 26px;
    }

    .info-card h2,
    .enroll-card h2 {
      margin: 0 0 10px;
      color: #111827;
      font-size: 1.25rem;
    }

    .info-card p {
      margin: 0;
      color: #526173;
      line-height: 1.75;
    }

    .learning-card {
      display: grid !important;
      grid-template-columns: 64px minmax(0, 1fr);
      align-items: center;
      gap: 18px;
      background: linear-gradient(135deg, rgba(37, 99, 235, 0.07), rgba(129, 140, 248, 0.08)), #ffffff;
    }

    .preview-icon {
      width: 58px;
      height: 58px;
      display: grid;
      place-items: center;
      border-radius: 18px;
      background: #eef2ff;
      color: #4338ca;
    }

    .preview-icon mat-icon {
      width: 30px;
      height: 30px;
      font-size: 30px;
    }

    .preserve-lines {
      white-space: pre-line;
    }

    .material {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 10px 0;
      color: #475569;
      line-height: 1.5;
    }

    .material mat-icon {
      flex: 0 0 auto;
      color: #22c55e;
    }

    .enrollment-panel {
      min-width: 0;
      position: sticky;
      top: 94px;
    }

    .enroll-card {
      padding: 26px;
      overflow: hidden;
    }

    .enroll-card::before {
      content: "";
      display: block;
      height: 4px;
      margin: -26px -26px 24px;
      background: linear-gradient(90deg, #2563eb, #818cf8);
    }

    .enroll-heading {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 14px;
    }

    .enroll-heading span:not(.enroll-icon) {
      display: block;
      color: #4338ca;
      font-size: 0.76rem;
      font-weight: 850;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .enroll-heading h2 {
      margin: 3px 0 0;
    }

    .enroll-icon {
      flex: 0 0 48px;
      width: 48px;
      height: 48px;
      display: grid;
      place-items: center;
      border-radius: 16px;
      background: #eef2ff;
      color: #4338ca;
    }

    .enroll-icon mat-icon {
      width: 25px;
      height: 25px;
      font-size: 25px;
    }

    .enroll-copy {
      margin: 0;
      color: #64748b;
      line-height: 1.6;
    }

    .enroll-card form {
      display: grid;
      gap: 12px;
      margin-top: 22px;
    }

    .enroll-card mat-form-field {
      width: 100%;
    }

    .enroll-card button[type="submit"] {
      height: 50px;
      border-radius: 12px;
      font-weight: 800;
    }

    .student-enroll-btn {
      width: 100%;
      height: 50px;
      margin-top: 22px;
      border-radius: 12px;
      font-weight: 800;
    }

    .enroll-card button[type="submit"] mat-spinner {
      display: inline-block;
      margin-right: 8px;
    }

    .trust-note {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #e5e7eb;
      color: #64748b;
      font-size: 0.86rem;
      text-align: center;
    }

    .trust-note mat-icon {
      width: 16px;
      height: 16px;
      font-size: 16px;
      color: #4338ca;
    }

    @media (max-width: 980px) {
      .course-hero,
      .content-grid {
        grid-template-columns: 1fr;
      }

      .hero-media {
        min-height: 260px;
      }

      .enrollment-panel {
        position: static;
        order: -1;
      }
    }

    @media (max-width: 640px) {
      .course-detail-page {
        width: calc(100% - 24px);
        padding-top: 22px;
      }

      .hero-copy,
      .info-card,
      .enroll-card {
        padding: 20px;
      }

      .enroll-card::before {
        margin: -20px -20px 20px;
      }

      .meta-grid,
      .learning-card {
        grid-template-columns: 1fr !important;
      }
    }
  `],
})
export class CourseDetailsComponent implements OnInit {
  course?: Course;
  loading = true;
  error = false;
  submitting = false;
  showPassword = false;

  readonly enrollmentForm = this.fb.nonNullable.group({
    name: ["", [Validators.required, Validators.minLength(2)]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly courseService: CourseService,
    public readonly studentAuth: StudentAuthService,
    private readonly snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));

    if (!Number.isFinite(id)) {
      this.loading = false;
      this.error = true;
      return;
    }

    this.courseService.getPublicCourseById(id).subscribe({
      next: (course) => {
        this.course = course;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }

  enroll(): void {
    if (!this.course?.id || this.enrollmentForm.invalid) {
      this.enrollmentForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const { name, email, password } = this.enrollmentForm.getRawValue();

    this.courseService.enroll(this.course.id, name.trim(), email.trim(), password).subscribe({
      next: (result) => {
        localStorage.setItem(`course_access_${result.courseId}`, result.accessToken);
        this.snackBar.open("Enrollment successful. Opening your course.", "Close", { duration: 3000 });
        this.router.navigate(["/learn", result.accessToken]);
      },
      error: () => {
        this.submitting = false;
        this.snackBar.open("Could not complete enrollment. Check your details and try again.", "Close", { duration: 4500 });
      },
    });
  }

  enrollLoggedInStudent(): void {
    if (!this.course?.id) return;

    this.submitting = true;
    this.studentAuth.enrollInCourse(this.course.id).subscribe({
      next: (result) => {
        localStorage.setItem(`course_access_${result.courseId}`, result.accessToken);
        this.snackBar.open("Enrollment successful. Opening your course.", "Close", { duration: 3000 });
        this.router.navigate(["/learn", result.accessToken]);
      },
      error: () => {
        this.submitting = false;
        this.snackBar.open("Could not enroll with your student account. Please sign in again.", "Close", { duration: 4500 });
      },
    });
  }
}
