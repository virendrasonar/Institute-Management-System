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
      <header><div><span>Admin learning analytics</span><h1>Enrollments & Progress</h1>
        <p>See exactly which student joined each course and how far they have progressed.</p></div>
        <mat-icon>monitoring</mat-icon></header>
      <div *ngIf="loading" class="state"><mat-spinner diameter="48"></mat-spinner></div>
      <ng-container *ngIf="!loading">
        <section class="stats">
          <div><mat-icon>groups</mat-icon><strong>{{ uniqueStudents }}</strong><span>Students</span></div>
          <div><mat-icon>library_books</mat-icon><strong>{{ enrollments.length }}</strong><span>Enrollments</span></div>
          <div><mat-icon>task_alt</mat-icon><strong>{{ completedCount }}</strong><span>Completed</span></div>
          <div><mat-icon>insights</mat-icon><strong>{{ averageProgress }}%</strong><span>Average progress</span></div>
        </section>
        <section class="empty" *ngIf="enrollments.length === 0"><mat-icon>person_search</mat-icon><h2>No enrollments yet</h2></section>
        <section class="enrollment-list" *ngIf="enrollments.length">
          <div class="list-heading"><span>Student</span><span>Course</span><span>Enrolled</span><span>Completion</span></div>
          <mat-card class="enrollment-row" *ngFor="let item of enrollments">
            <div class="student"><span>{{ initials(item.studentName) }}</span><div><strong>{{ item.studentName }}</strong><small>{{ item.studentEmail }}</small></div></div>
            <div class="course"><strong>{{ item.courseName }}</strong><small>Course #{{ item.courseId }}</small></div>
            <div class="date"><strong>{{ item.enrolledAt | date:'mediumDate' }}</strong><small *ngIf="item.completedAt">Finished {{ item.completedAt | date:'mediumDate' }}</small></div>
            <div class="progress"><div><strong>{{ item.progressPercent }}%</strong><span [class.complete]="item.progressPercent === 100">{{ item.progressPercent === 100 ? 'Completed' : 'In progress' }}</span></div><mat-progress-bar mode="determinate" [value]="item.progressPercent"></mat-progress-bar></div>
          </mat-card>
        </section>
      </ng-container>
    </main>
  `,
  styles: [`
    :host{display:block;min-height:100vh;background:#f6f7ff}.admin-shell{max-width:1200px;margin:auto;padding:40px 22px 70px}header{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:34px 38px;border-radius:22px;background:linear-gradient(135deg,#3730a3,#7c3aed);color:#fff;box-shadow:0 18px 42px #312e812c}header span{text-transform:uppercase;letter-spacing:1.3px;font-size:11px;font-weight:800;color:#ddd6fe}header h1{margin:7px 0 8px;font-size:34px}header p{margin:0;color:#ede9fe}header>mat-icon{font-size:58px;width:58px;height:58px;opacity:.85}.state{min-height:45vh;display:grid;place-items:center}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin:24px 0}.stats>div{display:grid;grid-template-columns:auto 1fr;align-items:center;column-gap:12px;padding:20px;border-radius:16px;background:#fff;border:1px solid #e5e1ff}.stats mat-icon{grid-row:1/3;width:42px;height:42px;display:grid;place-items:center;border-radius:12px;background:#ede9fe;color:#6d4ed1}.stats strong{font-size:23px;color:#25205c}.stats span{font-size:12px;color:#777}.enrollment-list{display:grid;gap:10px}.list-heading,.enrollment-row{display:grid;grid-template-columns:1.1fr 1.5fr .8fr 1fr;gap:22px;align-items:center}.list-heading{padding:0 22px;color:#6b6880;text-transform:uppercase;letter-spacing:.8px;font-size:10px;font-weight:800}.enrollment-row{padding:18px 22px;border-radius:15px;border:1px solid #e8e5f6;box-shadow:0 5px 18px #312e810c}.student{display:flex;align-items:center;gap:11px;min-width:0}.student>span{display:grid;flex:0 0 40px;width:40px;height:40px;place-items:center;border-radius:12px;background:#ede9fe;color:#5b21b6;font-weight:800}.student div,.course,.date{display:grid;gap:3px;min-width:0}.enrollment-row strong{overflow:hidden;color:#292553;text-overflow:ellipsis}.enrollment-row small{overflow:hidden;color:#777;text-overflow:ellipsis}.progress>div{display:flex;justify-content:space-between;gap:8px;margin-bottom:8px;font-size:11px}.progress span{color:#7c3aed}.progress span.complete{color:#15803d}.empty{text-align:center;padding:70px;background:#fff;border-radius:18px}.empty mat-icon{font-size:54px;width:54px;height:54px;color:#6d4ed1}@media(max-width:850px){.stats{grid-template-columns:repeat(2,1fr)}.list-heading{display:none}.enrollment-row{grid-template-columns:1fr 1fr}.progress{grid-column:1/-1}}@media(max-width:520px){.admin-shell{padding:24px 14px 50px}header{padding:28px 22px}header h1{font-size:27px}header>mat-icon{display:none}.stats{grid-template-columns:1fr 1fr}.enrollment-row{grid-template-columns:1fr}.progress{grid-column:auto}}
  `],
})
export class EnrollmentAdminComponent implements OnInit {
  enrollments: EnrollmentSummary[] = [];
  loading = true;
  constructor(private readonly courses: CourseService) {}
  ngOnInit(): void { this.courses.getEnrollments().subscribe({
    next: enrollments => { this.enrollments = enrollments; this.loading = false; },
    error: () => { this.loading = false; },
  }); }
  get uniqueStudents(): number { return new Set(this.enrollments.map(item => item.studentId)).size; }
  get completedCount(): number { return this.enrollments.filter(item => item.progressPercent === 100).length; }
  get averageProgress(): number { return this.enrollments.length ? Math.round(this.enrollments.reduce((sum, item) => sum + item.progressPercent, 0) / this.enrollments.length) : 0; }
  initials(name: string): string { return name.split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase(); }
}
