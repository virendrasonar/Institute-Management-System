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
    <main class="page-shell">
      <div *ngIf="loading" class="state"><mat-spinner diameter="48"></mat-spinner></div>
      <div *ngIf="error" class="state error-state">
        <mat-icon>error_outline</mat-icon><h2>Course not found</h2>
        <a mat-raised-button color="primary" routerLink="/courses">Browse Courses</a>
      </div>

      <ng-container *ngIf="course as item">
        <section class="hero">
          <div class="thumbnail" [class.with-image]="item.thumbnailUrl"
               [style.background-image]="item.thumbnailUrl ? 'url(' + item.thumbnailUrl + ')' : null">
            <mat-icon *ngIf="!item.thumbnailUrl">{{ item.icon || 'school' }}</mat-icon>
          </div>
          <div class="hero-copy">
            <a routerLink="/courses" class="back-link">← All courses</a>
            <span class="eyebrow">{{ item.category || 'Online course' }}</span>
            <h1>{{ item.name }}</h1>
            <p>{{ item.description }}</p>
            <div class="meta">
              <span><mat-icon>person</mat-icon>{{ item.instructor || 'Expert instructor' }}</span>
              <span><mat-icon>schedule</mat-icon>{{ item.duration || 'Self-paced' }}</span>
              <span><mat-icon>trending_up</mat-icon>{{ item.level || 'All levels' }}</span>
            </div>
          </div>
        </section>

        <div class="content-grid">
          <section class="details">
            <mat-card class="info-card video-preview">
              <span class="preview-icon"><mat-icon>lock</mat-icon></span>
              <div class="preview-copy">
                <h2>{{ item.hasVideo ? 'Course video included' : 'Course learning area' }}</h2>
                <p>The full video and course resources become available inside this website immediately after enrollment.</p>
              </div>
            </mat-card>

            <mat-card class="info-card" *ngIf="item.features">
              <h2>What you will learn</h2><p class="preserve-lines">{{ item.features }}</p>
            </mat-card>
            <mat-card class="info-card" *ngIf="item.prerequisites">
              <h2>Prerequisites</h2><p class="preserve-lines">{{ item.prerequisites }}</p>
            </mat-card>
            <mat-card class="info-card" *ngIf="item.materialsPreview?.length">
              <h2>Course content</h2>
              <div class="material" *ngFor="let material of item.materialsPreview">
                <mat-icon>check_circle</mat-icon><span>{{ material }}</span>
              </div>
            </mat-card>
          </section>

          <aside>
            <mat-card class="enroll-card">
              <div class="enroll-heading">
                <span class="enroll-icon"><mat-icon>school</mat-icon></span>
                <div>
                  <span class="eyebrow">Enrollment</span>
                  <h2>Enroll and start learning</h2>
                </div>
              </div>
              <p>Enter your details to unlock this course on the learner dashboard.</p>
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
                  <input matInput [type]="showPassword ? 'text' : 'password'" formControlName="password"
                    autocomplete="new-password" />
                  <button mat-icon-button matSuffix type="button" (click)="showPassword = !showPassword"
                    [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'">
                    <mat-icon>{{ showPassword ? 'visibility_off' : 'visibility' }}</mat-icon>
                  </button>
                  <mat-hint>Use this to access all your enrolled courses.</mat-hint>
                  <mat-error *ngIf="enrollmentForm.controls.password.invalid">Use at least 8 characters</mat-error>
                </mat-form-field>
                <button mat-raised-button color="primary" type="submit" [disabled]="submitting">
                  <mat-spinner *ngIf="submitting" diameter="20"></mat-spinner>
                  <mat-icon *ngIf="!submitting">school</mat-icon>
                  {{ submitting ? 'Enrolling…' : 'Enroll Now' }}
                </button>
              </form>
              <small><mat-icon>lock</mat-icon> Video stays inside the learning dashboard.</small>
            </mat-card>
          </aside>
        </div>
      </ng-container>
    </main>
  `,
  styles: [`
    :host{display:block;min-height:100vh;background:linear-gradient(145deg,#f8f9ff 0%,#f1edff 100%)}
    .page-shell{width:min(1240px,calc(100% - 40px));margin:auto;padding:42px 0 72px}.state{min-height:55vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px}.error-state mat-icon{font-size:54px;width:54px;height:54px;color:#6d4ed1}
    .hero{display:grid;grid-template-columns:minmax(320px,42%) minmax(0,1fr);min-height:380px;overflow:hidden;border-radius:26px;background:linear-gradient(135deg,#3730a3,#7c3aed);color:#fff;box-shadow:0 22px 54px rgba(67,56,202,.23)}
    .thumbnail{min-height:380px;display:grid;place-items:center;background-color:#4f46b8;background-size:cover;background-position:center}.thumbnail.with-image{position:relative}.thumbnail.with-image:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent 70%,rgba(55,48,163,.32))}.thumbnail mat-icon{font-size:110px;width:110px;height:110px;opacity:.9}
    .hero-copy{display:flex;flex-direction:column;justify-content:center;padding:44px 50px}.back-link{align-self:flex-start;color:#ede9fe;text-decoration:none;font-weight:600}.back-link:hover{text-decoration:underline}.eyebrow{display:block;margin-top:30px;text-transform:uppercase;letter-spacing:1.4px;font-size:12px;font-weight:700}.hero h1{font-size:clamp(34px,4vw,50px);line-height:1.08;margin:10px 0 16px}.hero p{max-width:680px;margin:0;font-size:17px;line-height:1.65;color:#ede9fe}.meta{display:flex;flex-wrap:wrap;gap:20px;margin-top:28px}.meta span{display:flex;align-items:center;gap:7px;font-weight:500}.meta mat-icon{font-size:19px;width:19px;height:19px}
    .content-grid{display:grid;grid-template-columns:minmax(0,1fr) 380px;align-items:start;gap:30px;margin-top:30px}.details{display:grid;gap:20px;min-width:0}.info-card,.enroll-card{box-sizing:border-box;border-radius:18px;padding:28px;border:1px solid #e6e1ff;box-shadow:0 10px 30px rgba(49,46,129,.07)}.info-card h2,.enroll-card h2{margin:0 0 12px;color:#25205c}.info-card p{line-height:1.7;color:#525266}
    .video-preview{display:grid!important;grid-template-columns:64px minmax(0,1fr);align-items:center;gap:20px;min-height:150px;background:#fff}.preview-icon{width:58px;height:58px;display:grid;place-items:center;border-radius:18px;background:#ede9fe;color:#6d4ed1}.preview-icon mat-icon{font-size:30px;width:30px;height:30px}.preview-copy{min-width:0}.video-preview h2{margin-bottom:6px}.video-preview p{margin:0}.preserve-lines{white-space:pre-line}.material{display:flex;align-items:flex-start;gap:10px;padding:10px 0;color:#424056}.material mat-icon{flex:0 0 auto;color:#6d4ed1}
    aside{min-width:0}.enroll-card{position:relative;width:100%;overflow:hidden;background:#fff;padding:30px}.enroll-card:before{content:"";position:absolute;inset:0 0 auto;height:4px;background:linear-gradient(90deg,#4f46e5,#c45ee5)}.enroll-heading{display:flex;align-items:center;gap:14px;margin-bottom:18px}.enroll-heading .eyebrow{margin:0 0 4px;color:#6d4ed1}.enroll-heading h2{margin:0}.enroll-icon{display:grid;flex:0 0 48px;width:48px;height:48px;place-items:center;border-radius:14px;background:#ede9fe;color:#6d4ed1}.enroll-icon mat-icon{font-size:25px;width:25px;height:25px}.enroll-card>p{margin:0;color:#666;line-height:1.55}.enroll-card form{display:grid;gap:12px;margin-top:24px}.enroll-card mat-form-field{width:100%}.enroll-card button{height:52px;border-radius:11px;font-weight:700}.enroll-card button mat-spinner{display:inline-block;margin-right:8px}.enroll-card small{display:flex;align-items:center;justify-content:center;gap:5px;margin-top:16px;color:#777;text-align:center}.enroll-card small mat-icon{font-size:15px;width:15px;height:15px}
    @media(max-width:900px){.page-shell{width:min(100% - 30px,760px);padding-top:26px}.hero{grid-template-columns:1fr}.thumbnail{min-height:260px}.hero-copy{padding:32px}.content-grid{grid-template-columns:1fr}.content-grid aside{order:-1}}
    @media(max-width:520px){.page-shell{width:calc(100% - 24px);padding:18px 0 45px}.thumbnail{min-height:210px}.hero-copy{padding:24px 20px 28px}.hero h1{font-size:30px}.hero p{font-size:15px}.meta{display:grid;gap:10px}.info-card,.enroll-card{padding:20px}.video-preview{grid-template-columns:1fr!important;text-align:left}.preview-icon{width:50px;height:50px}}
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
    private readonly snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (!Number.isFinite(id)) { this.loading = false; this.error = true; return; }
    this.courseService.getPublicCourseById(id).subscribe({
      next: (course) => { this.course = course; this.loading = false; },
      error: () => { this.loading = false; this.error = true; },
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
        this.snackBar.open("Enrollment successful. Welcome to your course!", "Close", { duration: 3000 });
        this.router.navigate(["/learn", result.accessToken]);
      },
      error: () => {
        this.submitting = false;
        this.snackBar.open("Could not complete enrollment. Check your details and try again.", "Close", { duration: 4500 });
      },
    });
  }
}
