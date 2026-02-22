import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar";
import { StudentService } from "../../../services/student.service";
import { Student } from "../../../models/student.model";

@Component({
  selector: "app-student-list",
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="creative-header fade-in">
      <h1>👥Student Directory👥</h1>
      <p>Explore and manage your institute's student community</p>
    </div>

    <div class="student-stats fade-in" style="animation-delay: 0.1s">
      <div class="stat-card">
        <div class="stat-icon">
          <mat-icon>people</mat-icon>
        </div>
        <div class="stat-info">
          <span class="stat-number">{{ students.length }}</span>
          <span class="stat-label">Total Students</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <mat-icon>school</mat-icon>
        </div>
        <div class="stat-info">
          <span class="stat-number">{{ getActiveStudents() }}</span>
          <span class="stat-label">Active Learners</span>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <mat-icon>email</mat-icon>
        </div>
        <div class="stat-info">
          <span class="stat-number">{{ getUniqueEmails() }}</span>
          <span class="stat-label">Email Contacts</span>
        </div>
      </div>
    </div>

    <div *ngIf="loading" class="loading-spinner fade-in">
      <mat-spinner diameter="60"></mat-spinner>
      <p class="loading-text">Loading student directory...</p>
    </div>

    <div *ngIf="!loading && students.length === 0" class="no-data fade-in">
      <mat-card class="empty-state-card">
        <mat-card-content>
          <div class="empty-state-content">
            <mat-icon class="no-data-icon">people_outline</mat-icon>
            <h3>No Students Registered</h3>
            <p>
              The student directory is currently empty. Students will appear
              here once they register through the system or are added by
              administrators.
            </p>
            <div class="info-note">
              <mat-icon>info</mat-icon>
              <span
                >This is a read-only view. Student registration is handled
                through separate enrollment processes.</span
              >
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>

    <div
      class="students-container fade-in"
      *ngIf="!loading && students.length > 0"
      style="animation-delay: 0.2s"
    >
      <!-- View Toggle -->
      <div class="view-controls">
        <h2 class="section-title">Student Database</h2>

        <button mat-button class="view-toggle-btn" (click)="toggleView()">
          <mat-icon>{{ showCards ? "table_view" : "view_module" }}</mat-icon>
          {{ showCards ? "Table View" : "Card View" }}
        </button>
      </div>

      <!-- Card View -->
      <div class="students-grid" *ngIf="showCards">
        <div
          class="student-card slide-in-left"
          *ngFor="let student of students; let i = index"
          [style.animation-delay]="i * 0.1 + 's'"
        >
          <div class="student-header">
            <div class="student-avatar">
              <mat-icon>person</mat-icon>
            </div>
            <div class="student-info">
              <h3>{{ student.name }}</h3>
              <span class="student-id">ID: {{ student.id }}</span>
            </div>
            <div class="student-status">
              <div class="status-indicator active"></div>
            </div>
          </div>

          <div class="student-details">
            <div class="detail-item">
              <mat-icon>email</mat-icon>
              <span>{{ student.email }}</span>
            </div>
            <div class="detail-item">
              <mat-icon>school</mat-icon>
              <span
                class="status"
                [ngClass]="{
                  'active-status': student.status === 'ACTIVE',
                  'inactive-status': student.status === 'INACTIVE',
                }"
              >
                {{ student.status }}
              </span>
            </div>
          </div>

          <div class="student-actions">
            <button mat-button class="action-btn">
              <mat-icon>visibility</mat-icon>
              View Profile
            </button>
            <button mat-button class="action-btn">
              <mat-icon>email</mat-icon>
              Contact
            </button>
          </div>
        </div>
      </div>

      <!-- Table View -->
      <mat-card class="table-container" *ngIf="!showCards">
        <mat-card-content>
          <table mat-table [dataSource]="students" class="students-table">
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>
                <div class="header-content">
                  <mat-icon>tag</mat-icon>
                  <span>Student ID</span>
                </div>
              </th>
              <td mat-cell *matCellDef="let student">
                <span class="student-id-badge">{{ student.id }}</span>
              </td>
            </ng-container>

            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>
                <div class="header-content">
                  <mat-icon>person</mat-icon>
                  <span>Full Name</span>
                </div>
              </th>
              <td mat-cell *matCellDef="let student">
                <div class="student-name-cell">
                  <div class="name-avatar">
                    <mat-icon>person</mat-icon>
                  </div>
                  <div class="name-info">
                    <span class="name">{{ student.name }}</span>
                    <span
                      class="status"
                      [ngClass]="{
                        'active-status': student.status === 'ACTIVE',
                        'inactive-status': student.status === 'INACTIVE',
                      }"
                    >
                      {{ student.status }}
                    </span>
                  </div>
                </div>
              </td>
            </ng-container>

            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef>
                <div class="header-content">
                  <mat-icon>email</mat-icon>
                  <span>Email Address</span>
                </div>
              </th>
              <td mat-cell *matCellDef="let student">
                <div class="email-cell">
                  <mat-icon>email</mat-icon>
                  <span>{{ student.email }}</span>
                </div>
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>
                <div class="header-content">
                  <mat-icon>settings</mat-icon>
                  <span>Actions</span>
                </div>
              </th>
              <td mat-cell *matCellDef="let student">
                <div class="table-actions">
                  <button mat-icon-button class="action-btn view-btn">
                    <mat-icon>visibility</mat-icon>
                  </button>
                  <button mat-icon-button class="action-btn contact-btn">
                    <mat-icon>email</mat-icon>
                  </button>
                </div>
              </td>
            </ng-container>

            <tr
              mat-header-row
              *matHeaderRowDef="displayedColumnsWithActions"
            ></tr>
            <tr
              mat-row
              *matRowDef="let row; columns: displayedColumnsWithActions"
              class="table-row"
            ></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
        background: #f5f7ff;
        padding: 30px 20px 60px;
        box-sizing: border-box;
      }

      /* ================= HEADER ================= */

      .creative-header {
        background: linear-gradient(135deg, #4338ca, #6366f1);
        border-radius: 22px;
        padding: 48px 30px;
        text-align: center;
        color: #ffffff;
        margin-bottom: 40px;
        box-shadow: 0 18px 45px rgba(67, 56, 202, 0.18);
        position: relative;
        overflow: hidden;
      }

      /* Optional subtle shine effect */
      .creative-header::after {
        content: "";
        position: absolute;
        top: -40%;
        right: -20%;
        width: 300px;
        height: 300px;
        background: radial-gradient(
          circle,
          rgba(255, 255, 255, 0.15),
          transparent 70%
        );
        transform: rotate(25deg);
      }

      /* Title */
      .creative-header h1 {
        font-size: 2.3rem;
        font-weight: 700;
        margin-bottom: 12px;
        letter-spacing: 0.5px;
        line-height: 1.2; /* better readability */
      }

      /* Subtitle */
      .creative-header p {
        font-size: 1.05rem;
        opacity: 0.9;
        margin: 0;
        line-height: 1.5;
      }

      /* ================= STATS ================= */

      .student-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 24px;
        margin-bottom: 40px;
      }

      .stat-card {
        position: relative;
        background: #ffffff;
        border-radius: 18px;
        padding: 26px 22px;
        display: flex;
        align-items: center;
        gap: 18px;
        border: 1px solid #e0e7ff;
        box-shadow: 0 12px 30px rgba(67, 56, 202, 0.08);
        transition: all 0.3s ease;
        overflow: hidden;
      }

      /* Bigger top accent line */
      .stat-card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 6px;
        width: 100%;
        background: linear-gradient(135deg, #4338ca, #6366f1);
      }

      .stat-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 45px rgba(67, 56, 202, 0.15);
      }

      .stat-icon {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: linear-gradient(135deg, #4338ca, #818cf8);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        flex-shrink: 0;
      }

      .stat-icon mat-icon {
        font-size: 22px !important;
      }

      /* Text wrapper */
      .stat-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .stat-number {
        font-size: 2.2rem;
        font-weight: 700;
        color: #1f2937;
        line-height: 1.1;
        margin: 0;
      }

      .stat-label {
        font-size: 0.9rem;
        color: #6b7280;
        font-weight: 600;
        margin-top: 6px; /* Clean spacing */
      }

      /* ===== NAME COLUMN CENTER ALIGN ===== */

      .student-name-cell {
        display: flex;
        align-items: center; /* vertical center */
        justify-content: flex-start;
        gap: 10px;
      }

      /* Icon circle */
      .name-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: linear-gradient(135deg, #4338ca, #818cf8);
        display: flex;
        align-items: center; /* center icon vertically */
        justify-content: center; /* center icon horizontally */
        flex-shrink: 0;
        color: white;
      }

      /* Icon size */
      .name-avatar mat-icon {
        font-size: 18px !important;
        width: 18px !important;
        height: 18px !important;
      }

      /* Name + status wrapper */
      .name-info {
        display: flex;
        align-items: center; /* this fixes vertical mismatch */
        gap: 8px;
      }

      /* Student name */
      .name {
        font-weight: 600;
        font-size: 0.95rem;
        color: #1f2937;
        line-height: 1; /* important for vertical centering */
      }

      /* ================= VIEW CONTROLS ================= */

      .view-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 25px;
      }

      .section-title {
        font-size: 1.7rem;
        font-weight: 600;
        color: #1f2937;
      }

      .view-toggle-btn {
        background: #ffffff !important;
        color: #4338ca !important;
        border-radius: 10px !important;
        padding: 8px 18px !important;
        font-weight: 500 !important;
        transition: 0.3s ease !important;
      }

      .view-toggle-btn:hover {
        background: #4338ca !important;
        color: white !important;
      }

      /* ================= TABLE ================= */

      .table-container {
        background: #ffffff !important;
        border-radius: 22px !important;
        border: 1px solid #e0e7ff;
        box-shadow: 0 15px 40px rgba(67, 56, 202, 0.08);
        overflow: hidden;
      }

      .students-table {
        width: 100%;
        border-collapse: collapse;
      }

      /* ================= CARD VIEW ================= */

      .students-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
        gap: 24px;
      }

      /* Card container */

      .student-card {
        background: #ffffff;
        border-radius: 20px;
        padding: 24px;
        border: 1px solid #e0e7ff;
        box-shadow: 0 12px 30px rgba(67, 56, 202, 0.08);
        transition: all 0.3s ease;
      }

      .student-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 20px 45px rgba(67, 56, 202, 0.15);
      }

      /* Header section */

      .student-header {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 20px;
      }

      .student-avatar {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        background: linear-gradient(135deg, #4338ca, #818cf8);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        flex-shrink: 0;
      }

      .student-avatar mat-icon {
        font-size: 22px !important;
      }

      .student-info {
        flex: 1;
      }

      .student-info h3 {
        margin: 0;
        font-size: 1.1rem;
        font-weight: 600;
        color: #1f2937;
      }

      .student-id {
        font-size: 0.85rem;
        color: #6b7280;
        font-weight: 500;
      }

      /* Status dot */

      .student-status {
        display: flex;
        align-items: center;
      }

      .status-indicator {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #22c55e;
        box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15);
      }

      /* Details section */

      .student-details {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 20px;
      }

      .detail-item {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.9rem;
        color: #374151;
      }

      .detail-item mat-icon {
        font-size: 18px !important;
        color: #6366f1;
      }

      /* Status text colors */

      .active-status {
        color: #15803d;
        font-weight: 600;
      }

      .inactive-status {
        color: #b91c1c;
        font-weight: 600;
      }

      .status {
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        border: 1px solid transparent;
      }

      /* ACTIVE */
      .active-status {
        background: rgba(34, 197, 94, 0.12);
        color: #15803d;
        border-color: #22c55e;
      }

      /* INACTIVE */
      .inactive-status {
        background: rgba(239, 68, 68, 0.12);
        color: #b91c1c;
        border-color: #ef4444;
      }
      /* Action buttons */

      .student-actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
      }

      .action-btn {
        border-radius: 10px !important;
        font-size: 0.85rem !important;
        padding: 6px 14px !important;
        transition: 0.3s ease !important;
      }

      .action-btn mat-icon {
        font-size: 18px !important;
      }

      .action-btn:hover {
        background: #4338ca !important;
        color: #ffffff !important;
      }

      /* ================= CARD FIELD FULL RECTANGLE ================= */

      .detail-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 14px;
        border: 1.5px solid #d1d5db; /* light grey border */
        border-radius: 8px; /* slightly rounded rectangle */
        background: #ffffff;
        font-size: 0.9rem;
        color: #374151;
        transition: all 0.25s ease;
      }

      /* Optional hover effect (like form focus) */
      .detail-item:hover {
        border-color: #4338ca;
        box-shadow: 0 0 0 2px rgba(67, 56, 202, 0.08);
      }
      .mat-mdc-header-row {
        background: linear-gradient(135deg, #4338ca, #6366f1);
      }

      .mat-mdc-header-cell {
        color: #ffffff !important;
        font-weight: 600 !important;
        padding: 16px !important;
        font-size: 0.95rem;
      }

      .mat-mdc-header-cell mat-icon {
        color: white !important;
      }

      /* Rows */

      .mat-mdc-row {
        transition: 0.25s ease;
      }

      .mat-mdc-row:nth-child(even) {
        background: #f8faff;
      }

      .mat-mdc-row:hover {
        background: rgba(99, 102, 241, 0.07);
        transform: translateY(-2px);
        box-shadow: 0 6px 18px rgba(67, 56, 202, 0.1);
      }

      .mat-mdc-cell {
        padding: 16px !important;
        font-size: 0.92rem;
        color: #374151;
      }

      /* ================= NAME COLUMN================= */

      .student-name-cell {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .name-avatar {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: linear-gradient(135deg, #4338ca, #818cf8);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        flex-shrink: 0;
      }

      .name-avatar mat-icon {
        font-size: 18px !important;
      }

      .name-info {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .name {
        font-weight: 600;
        color: #1f2937;
      }

      /* Status badges */

      .status-badge {
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
      }

      .active-badge {
        background: #dcfce7;
        color: #15803d;
      }

      .inactive-badge {
        background: #fee2e2;
        color: #b91c1c;
      }

      /* Student ID */

      .student-id-badge {
        background: linear-gradient(135deg, #4338ca, #818cf8);
        color: #ffffff;
        padding: 6px 14px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 0.85rem;
      }

      /* ================= CENTER FULL TABLE ================= */

      /* Header cells */
      .mat-mdc-header-cell {
        text-align: center !important;
        vertical-align: middle !important;
      }

      /* Center icon + text inside header */
      .mat-mdc-header-cell .header-content {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }

      /* Body cells */
      .mat-mdc-cell {
        text-align: center !important;
        vertical-align: middle !important;
      }

      /* Center Name column properly */
      .student-name-cell {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-left: 100px;
        gap: 20px;
        width: 100%;
      }

      /* Center email cell */
      .email-cell {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-left: 105px;
        gap: 8px;
        width: 100%;
      }

      /* ================= ACTION BUTTONS FIXED ================= */

      .table-actions {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
      }

      /* Override Angular Material icon button defaults */
      .view-btn,
      .contact-btn {
        width: 42px !important;
        height: 42px !important;

        display: flex !important;
        align-items: center !important;
        justify-content: center !important;

        padding: 0 !important;
        border-radius: 8px !important; /* rectangle */
        transition: 0.25s ease !important;
      }

      /* Perfectly center icon */
      .view-btn mat-icon,
      .contact-btn mat-icon {
        font-size: 20px !important;
        width: 20px !important;
        height: 20px !important;
        line-height: 20px !important;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* View button */
      .view-btn {
        background: rgba(67, 56, 202, 0.1) !important;
        color: #4338ca !important;
      }

      .view-btn:hover {
        background: #4338ca !important;
        color: white !important;
      }

      /* Contact button */
      .contact-btn {
        background: rgba(99, 102, 241, 0.1) !important;
        color: #6366f1 !important;
      }

      .contact-btn:hover {
        background: #6366f1 !important;
        color: white !important;
      }

      .students-table {
        width: 100%;
        table-layout: fixed;
      }

      /* Student ID column smaller */
      .mat-column-id {
        width: 100px;
      }

      /* Name column medium */
      .mat-column-name {
        width: 200px;
      }

      /* Email column controlled */
      .mat-column-email {
        width: 200px;
      }

      /* Actions column small */
      .mat-column-actions {
        width: 120px;
      }

      /* ================= RESPONSIVE ================= */

      @media (max-width: 768px) {
        .student-stats {
          grid-template-columns: 1fr;
        }

        .view-controls {
          flex-direction: column;
          gap: 15px;
        }

        .section-title {
          text-align: center;
        }

        .mat-mdc-cell,
        .mat-mdc-header-cell {
          padding: 12px !important;
          font-size: 0.85rem;
        }
      }
    `,
  ],
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  loading = false;
  showCards = false;
  displayedColumns: string[] = ["id", "name", "email"];
  displayedColumnsWithActions: string[] = ["id", "name", "email", "actions"];

  constructor(
    private studentService: StudentService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  toggleView(): void {
    this.showCards = !this.showCards;
  }

  getActiveStudents(): number {
    return this.students.length; // All students are considered active for now
  }

  getUniqueEmails(): number {
    const uniqueEmails = new Set(this.students.map((s) => s.email));
    return uniqueEmails.size;
  }

  loadStudents(): void {
    this.loading = true;
    this.studentService.getAllStudents().subscribe({
      next: (students: Student[]) => {
        this.students = students;
        this.loading = false;
      },
      error: (error: any) => {
        console.error("Error loading students:", error);
        this.snackBar.open("Error loading students", "Close", {
          duration: 3000,
        });
        this.loading = false;
      },
    });
  }
}
