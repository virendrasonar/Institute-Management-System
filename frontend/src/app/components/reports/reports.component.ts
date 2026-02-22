import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { CourseService } from "../../services/course.service";
import { StudentService } from "../../services/student.service";
import { MessageService } from "../../services/message.service";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-reports",
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  template: `
    <div class="reports-container">
      <h1 class="page-title">System Overview</h1>
      <p class="page-subtitle">
        Consolidated metrics and operational status of the institute
      </p>

      <!-- KPI GRID -->
      <div class="reports-grid">
        <mat-card class="report-card">
          <div class="card-icon">
            <mat-icon>school</mat-icon>
          </div>
          <h3>Total Courses</h3>
          <p class="report-value">{{ courseCount }}</p>
        </mat-card>

        <mat-card class="report-card">
          <div class="card-icon">
            <mat-icon>people</mat-icon>
          </div>
          <h3>Total Students</h3>
          <p class="report-value">{{ studentCount }}</p>
        </mat-card>

        <mat-card class="report-card">
          <div class="card-icon">
            <mat-icon>mail</mat-icon>
          </div>
          <h3>Total Messages</h3>
          <p class="report-value">{{ messageCount }}</p>
        </mat-card>

        <mat-card class="report-card status-card">
          <div class="card-icon">
            <mat-icon>monitor_heart</mat-icon>
          </div>
          <h3>System Status</h3>
          <p class="status-badge" [ngClass]="statusClass">
            {{ systemStatus }}
          </p>
        </mat-card>
      </div>

      <!-- ACTION -->
      <div class="action-section">
        <button mat-raised-button color="primary">
          <mat-icon>download</mat-icon>
          Export Summary
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 60px 20px;
        background: #f5f7ff;
        min-height: 100vh;
      }

      .reports-container {
        max-width: 1200px;
        margin: 0 auto;
        text-align: center;
      }

      .page-title {
        font-size: 2.4rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 10px;
      }

      .page-subtitle {
        color: #6b7280;
        font-size: 1rem;
        margin-bottom: 50px;
      }

      .reports-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 30px;
        margin-bottom: 60px;
      }

      .report-card {
        padding: 32px 24px;
        border-radius: 16px;
        background: #ffffff;
        border: 1px solid #e5e7eb;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        transition: box-shadow 0.25s ease;
      }

      .report-card:hover {
        box-shadow: 0 16px 35px rgba(0, 0, 0, 0.08);
      }

      .card-icon {
        margin-bottom: 16px;
      }

      .card-icon mat-icon {
        font-size: 36px !important;
        width: 36px !important;
        height: 36px !important;
        color: #4338ca;
      }

      .report-card h3 {
        font-size: 1rem;
        font-weight: 600;
        color: #4b5563;
        margin-bottom: 12px;
      }

      .report-value {
        font-size: 2.2rem;
        font-weight: 700;
        color: #111827;
      }

      /* STATUS CARD */
      .status-card {
        background: #ffffff;
      }

      .status-badge {
        display: inline-block;
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 600;
        margin-top: 6px;
      }

      .status-operational {
        background: #dcfce7;
        color: #166534;
      }

      .status-warning {
        background: #fef9c3;
        color: #854d0e;
      }

      .status-error {
        background: #fee2e2;
        color: #991b1b;
      }

      .action-section {
        margin-top: 20px;
      }

      .action-section button {
        padding: 10px 28px !important;
        border-radius: 8px !important;
        font-weight: 600 !important;
        text-transform: none !important;
      }

      @media (max-width: 768px) {
        :host {
          padding: 40px 16px;
        }

        .page-title {
          font-size: 1.8rem;
        }

        .report-value {
          font-size: 1.8rem;
        }
      }
    `,
  ],
})
export class ReportsComponent implements OnInit {
  courseCount = 0;
  studentCount = 0;
  messageCount = 0;

  systemStatus = "Loading...";
  statusClass = "";

  constructor(
    private courseService: CourseService,
    private studentService: StudentService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.loadReportData();
  }

  private loadReportData(): void {
    forkJoin({
      courses: this.courseService.getAllCourses(),
      students: this.studentService.getAllStudents(),
      messages: this.messageService.getAllMessages(),
    }).subscribe({
      next: (data: any) => {
        this.courseCount = data.courses.length;
        this.studentCount = data.students.length;
        this.messageCount = data.messages.length;

        if (this.courseCount === 0) {
          this.systemStatus = "No Courses Configured";
          this.statusClass = "status-warning";
        } else {
          this.systemStatus = "Operational";
          this.statusClass = "status-operational";
        }
      },
      error: () => {
        this.systemStatus = "Service Error";
        this.statusClass = "status-error";
      },
    });
  }
}
