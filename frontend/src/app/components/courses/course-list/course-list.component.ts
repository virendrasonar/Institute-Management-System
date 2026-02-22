import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar";
import { RouterModule } from "@angular/router";
import { CourseService } from "../../../services/course.service";
import { Course } from "../../../models/course.model";

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
    <div class="page-container">
      <div class="header">
        <h1>
          🎓 WELCOME TO THE LEARNING HUB 📚 ENROLL COURSES 🚀 START LEARNING NOW
        </h1>

        <button
          mat-raised-button
          color="primary"
          routerLink="/courses/new"
          class="add-course-btn"
        >
          <mat-icon>add</mat-icon>
          Add Course
        </button>
      </div>

      <!-- Loading -->
      <div *ngIf="loading" class="loading-spinner">
        <mat-spinner></mat-spinner>
      </div>

      <!-- No Data -->
      <div *ngIf="!loading && courses.length === 0" class="empty-state">
        <mat-icon>school</mat-icon>
        <h2>No Courses Available</h2>
        <p>Start by creating your first course for students.</p>

        <button mat-raised-button color="primary" routerLink="/courses/new">
          <mat-icon>add</mat-icon>
          Create Course
        </button>
      </div>

      <!-- Cards -->
      <div class="card-grid" *ngIf="!loading">
        <!-- Backend courses -->
        <mat-card class="course-card" *ngFor="let course of courses">
          <!-- ADMIN ACTIONS (TOP RIGHT) -->
          <div class="admin-actions">
            <button
              mat-icon-button
              color="primary"
              [routerLink]="['/courses/edit', course.id]"
            >
              <mat-icon>edit</mat-icon>
            </button>

            <button mat-icon-button color="warn" (click)="deleteCourse(course)">
              <mat-icon>delete</mat-icon>
            </button>
          </div>

          <!-- IMAGE -->
          <div class="course-image">
            <mat-icon>{{ course.icon || "school" }}</mat-icon>
          </div>

          <!-- CONTENT -->
          <mat-card-content>
            <h3>{{ course.name }}</h3>
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

          <mat-card-actions class="user-actions">
            <button mat-button color="primary" (click)="learnMore(course)">
              Learn More
            </button>

            <button
              mat-raised-button
              color="primary"
              (click)="enrollNow(course)"
            >
              Enroll Now
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        background: #f5f7ff;
        min-height: 100vh;
        padding-bottom: 60px;
      }

      .page-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 24px;
      }

      /* ================= HEADER ================= */

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin: 50px 0;
      }

      .header h1 {
        flex: 1;
        font-size: 22px;
        font-weight: 600;
        color: #ffffff;
        margin: 0;
        letter-spacing: 0.5px;
        padding: 0 20px;
        height: 52px;
        display: flex;
        align-items: center;
        background: linear-gradient(135deg, #5b21b6, #7c3aed);
        border-radius: 10px;
        box-shadow: 0 12px 28px rgba(67, 56, 202, 0.25);
      }

      .add-course-btn {
        height: 52px;
        padding: 0 24px;
        font-size: 16px;
        font-weight: 600;
        border-radius: 10px;
      }

      /* ================= GRID ================= */

      .card-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 40px;
      }

      /* ================= COURSE CARD ================= */

      .course-card {
        position: relative;
        display: flex;
        flex-direction: column;
        border-radius: 14px;
        overflow: hidden;
        background: #ffffff;
        border: 1px solid #e5e7eb;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
        transition:
          transform 0.25s ease,
          box-shadow 0.25s ease,
          border-color 0.25s ease;
        animation: fadeUp 0.6s ease forwards;
        opacity: 0;
        transform: translateY(20px);
        text-align: justify;
      }

      .course-card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 4px;
        width: 100%;
        background: linear-gradient(135deg, #4338ca, #818cf8);
      }

      .course-card {
        cursor: pointer;
        transition:
          transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
          box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .course-card:hover {
        transform: translateY(-6px) !important;
        box-shadow: 0 20px 45px rgba(0, 0, 0, 0.12);
      }

      .course-card button {
        border-radius: 8px !important;
      }

      @keyframes fadeUp {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* ================= IMAGE ================= */

      .course-image {
        height: 190px;
        background: linear-gradient(135deg, #4338ca, #818cf8);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
      }

      .course-image mat-icon {
        font-size: 48px !important;
        width: 48px !important;
        height: 48px !important;
      }

      /* ================= CONTENT ================= */

      mat-card-content {
        padding: 22px;
      }

      mat-card-content h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 12px;
        color: #1f2937;
      }

      mat-card-content p {
        color: #4b5563;
        line-height: 1.6;
        margin-bottom: 12px;
      }

      .course-meta {
        display: flex;
        justify-content: space-between;
        font-size: 0.9rem;
        color: #6b7280;
      }

      .course-meta span {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      /* ================= ACTIONS ================= */

      mat-card-actions {
        padding: 0px 22px 22px !important;
        display: flex;
        justify-content: space-between;
        gap: 10px;
      }

      /* ================= ADMIN ACTIONS ================= */

      .admin-actions {
        position: absolute;
        top: 8px;
        right: 8px;
        display: flex;
        gap: 4px;
        z-index: 2;
        background: rgba(255, 255, 255, 0.95);
        border-radius: 20px;
      }

      /* ================= EMPTY STATE ================= */

      .empty-state {
        text-align: center;
        padding: 80px 20px;
        background: #ffffff;
        border-radius: 16px;
        border: 1px solid #e5e7eb;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
      }

      .empty-state button {
        height: 44px;
        padding: 0 22px;
        font-size: 15px;
        font-weight: 600;
        border-radius: 8px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }

      .empty-state button mat-icon {
        font-size: 20px !important;
        width: 20px !important;
        height: 20px !important;
      }

      .empty-state h2 {
        font-size: 1.6rem;
        margin-bottom: 10px;
        color: #1f2937;
      }

      .empty-state p {
        color: #6b7280;
        margin-bottom: 25px;
      }

      /* ================= RESPONSIVE ================= */

      /* Tablet */
      @media (max-width: 1024px) {
        .card-grid {
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
        }
      }

      /* Mobile */
      @media (max-width: 768px) {
        .card-grid {
          grid-template-columns: 1fr;
          gap: 22px;
        }

        .page-container {
          padding: 0 18px;
        }

        .header {
          flex-direction: column;
          align-items: stretch;
          gap: 14px;
          margin: 30px 0;
        }

        .header h1 {
          font-size: 18px;
          padding: 14px 16px;
          height: auto;
          text-align: center;
          justify-content: center;
        }

        .add-course-btn {
          width: 100%;
        }

        .course-image {
          height: 160px;
        }

        mat-card-actions {
          flex-direction: column;
          gap: 12px;
        }

        mat-card-actions button {
          width: 100%;
        }

        .course-meta {
          flex-direction: column;
          gap: 6px;
        }
      }

      /* Small Phones */
      @media (max-width: 400px) {
        .page-container {
          padding: 0 14px;
        }

        .header h1 {
          font-size: 16px;
        }

        mat-card-content h3 {
          font-size: 1.05rem;
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
    this.snackBar.open(
      `📚 ${course.name} - ${course.duration || "N/A"} (${course.level || "N/A"})`,
      "Contact Us",
      { duration: 6000 },
    );
  }

  enrollNow(course: Course): void {
    this.snackBar.open(
      `🚀 Redirecting to enrollment for ${course.name}`,
      "OK",
      { duration: 3000 },
    );
  }
}
