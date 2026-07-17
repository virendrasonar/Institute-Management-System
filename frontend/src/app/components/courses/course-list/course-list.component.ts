import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar";
import { Router, RouterModule } from "@angular/router";
import { CourseService } from "../../../services/course.service";
import { Course } from "../../../models/course.model";
import { AdminAuthService } from "../../../services/admin-auth.service";

@Component({
  selector: "app-course-list",
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    RouterModule,
  ],
  template: `
    <main class="courses-page">
      <section class="course-hero">
        <div class="hero-copy">
          <span class="eyebrow">Course Catalog</span>
          <h1>Explore Learning Programs</h1>
          <p>
            Browse available courses, review course details, and enroll in the
            program that matches your learning goals.
          </p>
        </div>

        <button
          *ngIf="auth.isAuthenticated()"
          mat-raised-button
          color="primary"
          routerLink="/courses/new"
          class="add-course-btn"
        >
          <mat-icon>add</mat-icon>
          Add Course
        </button>
      </section>

      <div *ngIf="loading" class="loading-spinner">
        <mat-spinner diameter="52"></mat-spinner>
      </div>

      <section *ngIf="!loading && courses.length === 0" class="empty-state">
        <mat-icon>school</mat-icon>
        <h2>No Courses Available</h2>
        <p>
          {{
            auth.isAuthenticated()
              ? "Start by creating your first course for students."
              : "New courses are coming soon."
          }}
        </p>

        <button
          *ngIf="auth.isAuthenticated()"
          mat-raised-button
          color="primary"
          routerLink="/courses/new"
        >
          <mat-icon>add</mat-icon>
          Create Course
        </button>
      </section>

      <section class="card-grid" *ngIf="!loading && courses.length > 0">
        <mat-card class="course-card" *ngFor="let course of courses">
          <div class="admin-actions" *ngIf="auth.isAuthenticated()">
            <button
              mat-icon-button
              color="primary"
              [routerLink]="['/courses/edit', course.id]"
              aria-label="Edit course"
            >
              <mat-icon>edit</mat-icon>
            </button>

            <button
              mat-icon-button
              color="warn"
              (click)="deleteCourse(course)"
              aria-label="Delete course"
            >
              <mat-icon>delete</mat-icon>
            </button>
          </div>

          <div class="course-image">
            <img
              *ngIf="course.thumbnailUrl; else courseIcon"
              [src]="course.thumbnailUrl"
              [alt]="course.name + ' course cover'"
              loading="lazy"
            />
            <ng-template #courseIcon>
              <mat-icon>{{ course.icon || "school" }}</mat-icon>
            </ng-template>
            <span class="popular-badge" *ngIf="(course.studentsEnrolled || 0) >= 1800">
              <mat-icon>local_fire_department</mat-icon>
              Popular
            </span>
          </div>

          <mat-card-content>
            <div class="course-heading">
              <span class="course-level">{{ course.level || "Course" }}</span>
              <h3>{{ course.name }}</h3>
            </div>

            <p>{{ course.description }}</p>

            <div class="course-meta">
              <span>
                <mat-icon>schedule</mat-icon>
                {{ course.duration || "Not specified" }}
              </span>
              <span>
                <mat-icon>trending_up</mat-icon>
                {{ course.level || "Not specified" }}
              </span>
            </div>
          </mat-card-content>

          <mat-card-actions>
            <button mat-stroked-button color="primary" (click)="learnMore(course)">
              Learn More
            </button>

            <button mat-raised-button color="primary" (click)="enrollNow(course)">
              Enroll Now
            </button>
          </mat-card-actions>
        </mat-card>
      </section>
    </main>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
        background: #f5f7ff;
        padding-bottom: 64px;
      }

      .courses-page {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 24px;
      }

      .course-hero {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 24px;
        margin: 36px 0 32px;
        padding: 34px;
        background: linear-gradient(135deg, #1d4ed8 0%, #4338ca 48%, #7c3aed 100%);
        border: 1px solid rgba(255, 255, 255, 0.28);
        border-radius: 22px;
        box-shadow: 0 18px 42px rgba(67, 56, 202, 0.26);
      }

      .hero-copy {
        max-width: 760px;
      }

      .eyebrow {
        display: inline-flex;
        align-items: center;
        padding: 6px 12px;
        margin-bottom: 14px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.16);
        color: #ffffff;
        font-size: 0.78rem;
        font-weight: 800;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }

      h1 {
        margin: 0;
        color: #ffffff;
        font-size: clamp(2rem, 4vw, 3.2rem);
        font-weight: 800;
        letter-spacing: 0;
        line-height: 1.05;
      }

      .course-hero p {
        margin: 14px 0 0;
        color: #dbeafe;
        font-size: 1.02rem;
        line-height: 1.7;
      }

      .add-course-btn {
        height: 48px;
        padding: 0 22px;
        border-radius: 12px;
        font-weight: 700;
        white-space: nowrap;
      }

      .loading-spinner {
        min-height: 360px;
        display: grid;
        place-items: center;
      }

      .card-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 28px;
      }

      .course-card {
        position: relative;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border-radius: 18px !important;
        background: #ffffff;
        border: 1px solid #e5e7eb;
        box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
        transition:
          transform 0.25s ease,
          box-shadow 0.25s ease,
          border-color 0.25s ease;
      }

      .course-card:hover {
        border-color: #c7d2fe;
        box-shadow: 0 12px 30px rgba(15, 23, 42, 0.1);
      }

      .admin-actions {
        position: absolute;
        top: 12px;
        right: 12px;
        z-index: 2;
        display: flex;
        gap: 4px;
        padding: 4px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.94);
        box-shadow: 0 10px 24px rgba(15, 23, 42, 0.14);
      }

      .course-image {
        height: 190px;
        display: grid;
        place-items: center;
        position: relative;
        overflow: hidden;
        background: linear-gradient(135deg, #4338ca, #818cf8);
        color: #ffffff;
      }

      .course-image img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }

      .course-image mat-icon {
        width: 52px !important;
        height: 52px !important;
        font-size: 52px !important;
      }

      .popular-badge {
        position: absolute;
        left: 14px;
        bottom: 14px;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 7px 11px;
        border-radius: 999px;
        background: rgba(17, 24, 39, 0.86);
        color: #ffffff;
        font-size: 12px;
        font-weight: 800;
        backdrop-filter: blur(8px);
      }

      .popular-badge mat-icon {
        width: 16px !important;
        height: 16px !important;
        font-size: 16px !important;
        color: #fbbf24;
      }

      mat-card-content {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        padding: 22px;
      }

      .course-heading {
        margin-bottom: 12px;
      }

      .course-level {
        display: inline-flex;
        margin-bottom: 8px;
        padding: 4px 10px;
        border-radius: 999px;
        background: #eef2ff;
        color: #4338ca;
        font-size: 0.75rem;
        font-weight: 800;
      }

      h3 {
        margin: 0;
        color: #111827;
        font-size: 1.18rem;
        font-weight: 800;
        line-height: 1.35;
      }

      mat-card-content p {
        flex: 1 1 auto;
        margin: 0 0 16px;
        color: #64748b;
        line-height: 1.65;
      }

      .course-meta {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        color: #475569;
        font-size: 0.9rem;
        font-weight: 650;
      }

      .course-meta span {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }

      .course-meta mat-icon {
        width: 18px !important;
        height: 18px !important;
        font-size: 18px !important;
        color: #4338ca;
      }

      mat-card-actions {
        display: flex;
        gap: 10px;
        padding: 0 22px 22px !important;
        margin: 0;
      }

      mat-card-actions button {
        flex: 1 1 0;
        min-width: 0;
        height: 44px;
        border-radius: 10px !important;
        font-weight: 700;
        white-space: nowrap;
      }

      .empty-state {
        text-align: center;
        padding: 80px 20px;
        background: #ffffff;
        border-radius: 18px;
        border: 1px solid #e5e7eb;
        box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
      }

      .empty-state > mat-icon {
        width: 56px !important;
        height: 56px !important;
        font-size: 56px !important;
        color: #818cf8;
      }

      .empty-state h2 {
        margin: 14px 0 10px;
        color: #111827;
        font-size: 1.6rem;
      }

      .empty-state p {
        margin: 0 0 24px;
        color: #64748b;
      }

      @media (max-width: 1024px) {
        .card-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 768px) {
        .courses-page {
          padding: 0 18px;
        }

        .course-hero {
          align-items: flex-start;
          flex-direction: column;
          padding: 24px;
          margin: 24px 0;
        }

        .add-course-btn {
          width: 100%;
        }

        .card-grid {
          grid-template-columns: 1fr;
          gap: 22px;
        }

        .course-image {
          height: 165px;
        }

        .course-meta {
          flex-direction: column;
          gap: 8px;
        }
      }
    `,
  ],
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  loading = false;

  constructor(
    private courseService: CourseService,
    private snackBar: MatSnackBar,
    public readonly auth: AdminAuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.loading = true;
    this.courseService.getAllCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open("Error loading courses", "Close", {
          duration: 3000,
        });
        this.loading = false;
      },
    });
  }

  deleteCourse(course: Course): void {
    if (!confirm(`Delete course "${course.name}"?`)) return;

    this.courseService.deleteCourse(course.id!).subscribe({
      next: () => {
        this.snackBar.open("Course deleted", "Close", { duration: 3000 });
        this.loadCourses();
      },
      error: () => {
        this.snackBar.open("Error deleting course", "Close", {
          duration: 3000,
        });
      },
    });
  }

  learnMore(course: Course): void {
    this.router.navigate(["/courses", course.id]);
  }

  enrollNow(course: Course): void {
    this.router.navigate(["/courses", course.id], {
      queryParams: { enroll: true },
    });
  }
}
