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
      <div
        *ngIf="!loading && courses.length === 0 && featuredCourses.length === 0"
        class="no-data"
      >
        No courses found.
      </div>

      <!-- Cards -->
      <div class="card-grid" *ngIf="!loading">
        <!-- Featured courses -->
        <mat-card class="course-card" *ngFor="let course of featuredCourses">
          <div class="course-image">
            <mat-icon>{{ course.icon }}</mat-icon>
          </div>

          <mat-card-content>
            <h3>{{ course.name }}</h3>
            <p>{{ course.description }}</p>

            <div class="course-meta">
              <span>
                <mat-icon>schedule</mat-icon>
                {{ course.duration || "6 months" }}
              </span>
              <span>
                <mat-icon>trending_up</mat-icon>
                {{ course.level || "Beginner" }}
              </span>
            </div>
          </mat-card-content>

          <mat-card-actions>
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
      .page-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 24px;
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        width: 100%;
        margin: 40px 0;
      }

      .header h1 {
        flex: 1;
        font-size: 21.4px;
        font-weight: 600;
        color: #ffffff;
        margin: 0;
        letter-spacing: 0.8px;
        padding: 0 18px;
        height: 50px;
        display: flex;
        align-items: center;
        background: #3f51b5;
        border-radius: 8px;
        box-shadow:
          0 2px 4px rgba(0, 0, 0, 0.2),
          0 4px 8px rgba(0, 0, 0, 0.15);
        transition:
          transform 0.25s ease,
          box-shadow 0.25s ease,
          background 0.25s ease;
      }

      .header h1:hover,
      .add-course-btn:hover {
        transform: translateY(-2px);
        box-shadow:
          0 6px 12px rgba(0, 0, 0, 0.25),
          0 12px 24px rgba(0, 0, 0, 0.2);
        background: #303f9f;
      }

      .add-course-btn {
        height: 50px;
        padding: 0 28px;
        font-size: 18px;
        font-weight: 600;
        border-radius: 8px;
        display: flex;
        align-items: center;
      }

      .loading-spinner {
        display: flex;
        justify-content: center;
        padding: 40px;
      }

      .no-data {
        text-align: center;
        padding: 32px;
        color: #666;
      }

      .card-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 30px;
      }

      .course-card {
        display: flex;
        flex-direction: column;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      }

      .course-image {
        height: 200px;
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
      }

      .course-image mat-icon {
        font-size: 4rem !important;
        width: 4rem !important;
        height: 4rem !important;
      }

      mat-card-content {
        padding: 24px;
      }

      mat-card-content h3 {
        font-size: 1.3rem;
        font-weight: 600;
        margin: 0 0 12px 0;
        color: #333;
      }

      mat-card-content p {
        color: #666;
        line-height: 1.5;
        margin: 0 0 16px 0;
      }

      .course-meta {
        display: flex;
        justify-content: space-between;
        margin-bottom: 6px;
      }

      .course-meta span {
        display: flex;
        align-items: center;
        gap: 5px;
        color: #666;
        font-size: 0.9rem;
      }

      .course-meta mat-icon {
        font-size: 1.2rem !important;
        width: 1.2rem !important;
        height: 1.2rem !important;
      }

      mat-card-actions {
        padding: 6px 24px 12px;
        display: flex;
        justify-content: space-between;
        gap: 12px;
      }

      .card-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        row-gap: 48px;
        column-gap: 45px;
      }
      .course-card {
        position: relative;
      }

      .admin-actions {
        position: absolute;
        top: 8px;
        right: 8px;
        display: flex;
        gap: 4px;
        z-index: 2;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 20px;
      }

      .user-actions {
        padding: 8px 24px 16px;
        display: flex;
        justify-content: space-between;
      }

      @media (max-width: 1024px) {
        .card-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 640px) {
        .card-grid {
          grid-template-columns: 1fr;
        }

        .page-container {
          padding: 0 16px;
        }
      }
    `,
  ],
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  loading = false;

  featuredCourses = [
    {
      name: "Full Stack Web Development",
      description:
        "Master modern frontend and backend development technologies.",
      icon: "code",
      duration: "6 months",
      level: "Intermediate",
    },
    {
      name: "Data Science & Analytics",
      description:
        "Learn Python, machine learning, and real-world data analysis.",
      icon: "analytics",
      duration: "8 months",
      level: "Advanced",
    },
    {
      name: "Digital Marketing",
      description: "SEO, social media marketing, and performance analytics.",
      icon: "campaign",
      duration: "4 months",
      level: "Beginner",
    },
  ];

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
