import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { StudentDashboard } from "../../models/course.model";
import { StudentAuthService } from "../../services/student-auth.service";

@Component({
  selector: "app-student-dashboard",
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatCardModule, MatIconModule,
    MatProgressBarModule, MatProgressSpinnerModule],
  template: `
    <main class="dashboard-shell">
      <div *ngIf="loading" class="state"><mat-spinner diameter="48"></mat-spinner></div>
      <ng-container *ngIf="dashboard as data">
        <header class="student-hero">
          <div><span class="eyebrow">My learning dashboard</span><h1>Welcome, {{ data.studentName }}</h1>
            <p>Continue your courses and keep an eye on your progress.</p></div>
          <button mat-stroked-button (click)="logout()"><mat-icon>logout</mat-icon> Sign Out</button>
        </header>

        <section class="summary-grid">
          <div><mat-icon>library_books</mat-icon><strong>{{ data.courses.length }}</strong><span>Enrolled courses</span></div>
          <div><mat-icon>task_alt</mat-icon><strong>{{ completedCount }}</strong><span>Completed</span></div>
          <div><mat-icon>insights</mat-icon><strong>{{ averageProgress }}%</strong><span>Overall progress</span></div>
        </section>

        <section class="empty" *ngIf="data.courses.length === 0">
          <mat-icon>menu_book</mat-icon><h2>No enrolled courses yet</h2>
          <p>Choose a course to begin your learning journey.</p>
          <a mat-raised-button color="primary" routerLink="/courses">Browse Courses</a>
        </section>

        <section class="course-grid" *ngIf="data.courses.length">
          <mat-card class="course-card" *ngFor="let course of data.courses">
            <div class="course-image" [style.background-image]="course.thumbnailUrl ? 'url(' + course.thumbnailUrl + ')' : null">
              <mat-icon *ngIf="!course.thumbnailUrl">school</mat-icon>
              <span [class.complete]="course.progressPercent === 100">{{ course.progressPercent === 100 ? 'Completed' : 'In progress' }}</span>
            </div>
            <mat-card-content>
              <h2>{{ course.courseName }}</h2><p>{{ course.description }}</p>
              <div class="meta"><span><mat-icon>person</mat-icon>{{ course.instructor || 'Expert instructor' }}</span>
                <span><mat-icon>schedule</mat-icon>{{ course.duration || 'Self-paced' }}</span></div>
              <div class="progress-heading"><strong>{{ course.progressPercent }}% complete</strong><span>{{ course.hasVideo ? 'Video available' : 'Resources available' }}</span></div>
              <mat-progress-bar mode="determinate" [value]="course.progressPercent"></mat-progress-bar>
            </mat-card-content>
            <mat-card-actions><a mat-raised-button color="primary" [routerLink]="['/learn', course.accessToken]">
              <mat-icon>{{ course.progressPercent === 100 ? 'replay' : 'play_circle' }}</mat-icon>
              {{ course.progressPercent === 100 ? 'Review Course' : 'Continue Learning' }}</a></mat-card-actions>
          </mat-card>
        </section>
      </ng-container>
    </main>
  `,
  styles: [`
    :host{display:block;min-height:100vh;background:linear-gradient(145deg,#f8f9ff,#f1edff)}.dashboard-shell{max-width:1180px;margin:auto;padding:38px 22px 70px}.state{min-height:55vh;display:grid;place-items:center}.student-hero{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;padding:38px 42px;border-radius:24px;background:linear-gradient(135deg,#3730a3,#7c3aed);color:#fff;box-shadow:0 20px 48px #312e8130}.eyebrow{text-transform:uppercase;letter-spacing:1.3px;font-size:11px;font-weight:800;color:#ddd6fe}.student-hero h1{margin:8px 0;font-size:38px}.student-hero p{margin:0;color:#ede9fe}.student-hero button{border-color:#c4b5fd;color:#fff}.summary-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin:24px 0}.summary-grid>div{display:grid;grid-template-columns:auto 1fr;align-items:center;column-gap:13px;padding:22px;border-radius:17px;background:#fff;border:1px solid #e6e1ff;box-shadow:0 9px 25px #312e8110}.summary-grid mat-icon{grid-row:1/3;display:grid;place-items:center;width:44px;height:44px;border-radius:13px;background:#ede9fe;color:#6d4ed1}.summary-grid strong{font-size:24px;color:#25205c}.summary-grid span{color:#777;font-size:13px}.course-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}.course-card{display:flex;flex-direction:column;overflow:hidden;border-radius:19px;border:1px solid #e6e1ff;box-shadow:0 10px 30px #312e8112}.course-image{position:relative;height:175px;display:grid;place-items:center;background:#4f46b8 center/cover no-repeat;color:#fff}.course-image>mat-icon{font-size:54px;width:54px;height:54px}.course-image>span{position:absolute;left:14px;bottom:14px;padding:7px 11px;border-radius:999px;background:#312e81e8;font-size:11px;font-weight:800}.course-image>span.complete{background:#166534e8}.course-card mat-card-content{display:flex;flex:1;flex-direction:column;padding:22px}.course-card h2{margin:0 0 10px;color:#25205c;font-size:20px}.course-card p{flex:1;color:#626174;line-height:1.55;font-size:14px}.meta{display:grid;gap:7px;margin:10px 0 20px;color:#625e78;font-size:13px}.meta span{display:flex;align-items:center;gap:6px}.meta mat-icon{font-size:17px;width:17px;height:17px;color:#6d4ed1}.progress-heading{display:flex;justify-content:space-between;gap:8px;margin-bottom:9px;font-size:12px;color:#777}.progress-heading strong{color:#4f46e5}.course-card mat-card-actions{padding:0 22px 22px}.course-card mat-card-actions a{width:100%;height:44px;border-radius:10px}.empty{text-align:center;padding:70px;background:#fff;border-radius:20px}.empty>mat-icon{font-size:56px;width:56px;height:56px;color:#6d4ed1}@media(max-width:900px){.course-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:650px){.student-hero{align-items:flex-start;flex-direction:column;padding:30px 24px}.student-hero h1{font-size:29px}.summary-grid,.course-grid{grid-template-columns:1fr}.dashboard-shell{padding:24px 14px 50px}}
  `],
})
export class StudentDashboardComponent implements OnInit {
  dashboard?: StudentDashboard;
  loading = true;

  constructor(private readonly auth: StudentAuthService, private readonly router: Router) {}
  ngOnInit(): void { this.auth.getDashboard().subscribe({
    next: data => { this.dashboard = data; this.loading = false; },
    error: () => { this.auth.clearSession(); this.router.navigate(["/student/login"]); },
  }); }
  get completedCount(): number { return this.dashboard?.courses.filter(course => course.progressPercent === 100).length || 0; }
  get averageProgress(): number { const courses = this.dashboard?.courses || []; return courses.length ? Math.round(courses.reduce((sum, course) => sum + course.progressPercent, 0) / courses.length) : 0; }
  logout(): void { this.auth.logout(); this.router.navigate(["/home"]); }
}
