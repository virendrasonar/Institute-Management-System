import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { EnrollmentSummary } from "../../models/course.model";
import { CourseService } from "../../services/course.service";

@Component({
  selector: "app-enrollment-admin",
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatProgressBarModule, MatProgressSpinnerModule],
  template: `
    <main class="admin-shell">
      <header>
        <div>
          <span>Admin learning analytics</span>
          <h1>Enrollments & Progress</h1>
          <p>Track student enrollment, course access, and lesson completion.</p>
        </div>
        <mat-icon>monitoring</mat-icon>
      </header>

      <div *ngIf="loading" class="state"><mat-spinner diameter="48"></mat-spinner></div>

      <ng-container *ngIf="!loading">
        <section class="stats">
          <div><mat-icon>groups</mat-icon><strong>{{ uniqueStudents }}</strong><span>Students</span></div>
          <div><mat-icon>library_books</mat-icon><strong>{{ enrollments.length }}</strong><span>Enrollments</span></div>
          <div><mat-icon>task_alt</mat-icon><strong>{{ completedCount }}</strong><span>Completed</span></div>
          <div><mat-icon>insights</mat-icon><strong>{{ averageProgress }}%</strong><span>Average progress</span></div>
        </section>

        <section class="empty" *ngIf="enrollments.length === 0">
          <mat-icon>person_search</mat-icon>
          <h2>No enrollments yet</h2>
        </section>

        <mat-card class="table-card" *ngIf="enrollments.length">
          <div class="table-toolbar">
            <div>
              <h2>Enrollment Records</h2>
              <p>{{ enrollments.length }} records synced from course enrollments</p>
            </div>
            <span class="status-pill">{{ completedCount }} completed</span>
          </div>

          <div class="admin-table">
            <div class="table-head">
              <span>Student</span>
              <span>Course</span>
              <span>Enrolled</span>
              <span>Status</span>
              <span>Progress</span>
            </div>

            <div class="table-row" *ngFor="let item of enrollments">
              <div class="student">
                <span>{{ initials(item.studentName) }}</span>
                <div><strong>{{ item.studentName }}</strong><small>{{ item.studentEmail }}</small></div>
              </div>
              <div class="course"><strong>{{ item.courseName }}</strong><small>Course #{{ item.courseId }}</small></div>
              <div class="date"><strong>{{ item.enrolledAt | date:'mediumDate' }}</strong><small *ngIf="item.completedAt">Finished {{ item.completedAt | date:'mediumDate' }}</small></div>
              <div><span class="badge" [class.complete]="item.progressPercent === 100">{{ item.progressPercent === 100 ? 'Completed' : 'In progress' }}</span></div>
              <div class="progress">
                <strong>{{ item.progressPercent }}%</strong>
                <mat-progress-bar mode="determinate" [value]="item.progressPercent"></mat-progress-bar>
              </div>
            </div>
          </div>
        </mat-card>
      </ng-container>
    </main>
  `,
  styles: [`
    :host{display:block;min-height:100vh;background:#f5f7ff}.admin-shell{max-width:1200px;margin:auto;padding:40px 22px 70px}header{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:32px 36px;border-radius:22px;background:linear-gradient(135deg,#1d4ed8,#4338ca 52%,#7c3aed);color:#fff;box-shadow:0 18px 42px rgba(67,56,202,.26)}header span{text-transform:uppercase;letter-spacing:1.2px;font-size:11px;font-weight:850;color:#dbeafe}header h1{margin:7px 0 8px;font-size:34px;letter-spacing:0}header p{margin:0;color:#dbeafe}header>mat-icon{font-size:58px;width:58px;height:58px;opacity:.9}.state{min-height:45vh;display:grid;place-items:center}
    .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin:24px 0}.stats>div{display:grid;grid-template-columns:auto 1fr;align-items:center;column-gap:12px;padding:20px;border-radius:16px;background:#fff;border:1px solid #e0e7ff;box-shadow:0 8px 24px rgba(15,23,42,.06)}.stats mat-icon{grid-row:1/3;width:42px;height:42px;display:grid;place-items:center;border-radius:12px;background:#eef2ff;color:#4338ca}.stats strong{font-size:23px;color:#111827}.stats span{font-size:12px;color:#64748b}
    .table-card{overflow:hidden;border:1px solid #e0e7ff;border-radius:18px!important;box-shadow:0 12px 32px rgba(15,23,42,.08)}.table-toolbar{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:22px 24px;border-bottom:1px solid #e5e7eb}.table-toolbar h2{margin:0;color:#111827}.table-toolbar p{margin:5px 0 0;color:#64748b}.status-pill{padding:8px 12px;border-radius:999px;background:#eef2ff;color:#4338ca;font-weight:850}
    .admin-table{overflow-x:auto}.table-head,.table-row{display:grid;grid-template-columns:1.3fr 1.4fr .85fr .75fr 1fr;gap:20px;align-items:center;min-width:900px}.table-head{position:sticky;top:0;padding:13px 24px;background:#f8fafc;color:#64748b;text-transform:uppercase;letter-spacing:.06em;font-size:11px;font-weight:850}.table-row{padding:16px 24px;border-top:1px solid #eef2f7;background:#fff}.table-row:hover{background:#f8fafc}.student{display:flex;align-items:center;gap:11px;min-width:0}.student>span{display:grid;flex:0 0 38px;width:38px;height:38px;place-items:center;border-radius:12px;background:#eef2ff;color:#4338ca;font-weight:850}.student div,.course,.date{display:grid;gap:3px;min-width:0}.table-row strong{overflow:hidden;color:#111827;text-overflow:ellipsis;white-space:nowrap}.table-row small{overflow:hidden;color:#64748b;text-overflow:ellipsis;white-space:nowrap}.badge{display:inline-flex;padding:6px 10px;border-radius:999px;background:#fff7ed;color:#c2410c;font-size:12px;font-weight:850}.badge.complete{background:#dcfce7;color:#15803d}.progress{display:grid;gap:7px}.progress strong{font-size:12px;color:#4338ca}
    .empty{text-align:center;padding:70px;background:#fff;border-radius:18px;border:1px solid #e0e7ff}.empty mat-icon{font-size:54px;width:54px;height:54px;color:#4338ca}@media(max-width:850px){.stats{grid-template-columns:repeat(2,1fr)}}@media(max-width:520px){.admin-shell{padding:24px 14px 50px}header{padding:28px 22px}header h1{font-size:27px}header>mat-icon{display:none}.stats{grid-template-columns:1fr 1fr}.table-toolbar{align-items:flex-start;flex-direction:column}}
  `],
})
export class EnrollmentAdminComponent implements OnInit {
  enrollments: EnrollmentSummary[] = [];
  loading = true;

  constructor(private readonly courses: CourseService) {}

  ngOnInit(): void {
    this.courses.getEnrollments().subscribe({
      next: enrollments => { this.enrollments = enrollments; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }

  get uniqueStudents(): number { return new Set(this.enrollments.map(item => item.studentId)).size; }
  get completedCount(): number { return this.enrollments.filter(item => item.progressPercent === 100).length; }
  get averageProgress(): number { return this.enrollments.length ? Math.round(this.enrollments.reduce((sum, item) => sum + item.progressPercent, 0) / this.enrollments.length) : 0; }
  initials(name: string): string { return name.split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase(); }
}
