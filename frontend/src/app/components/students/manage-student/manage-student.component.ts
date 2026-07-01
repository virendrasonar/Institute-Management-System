import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTooltipModule } from "@angular/material/tooltip";

import { StudentService } from "../../../services/student.service";
import { Student } from "../../../models/student.model";

@Component({
  selector: "app-manage-student",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],

  template: `
    <div class="container">
      <!-- HEADER -->
      <h1>Manage Students</h1>

      <!-- ================= LIST VIEW ================= -->
      <div *ngIf="viewMode === 'list'">
        <button mat-raised-button color="primary" (click)="addStudent()">
          <mat-icon>person_add</mat-icon>
          Add Student
        </button>

        <br /><br />

        <table
          mat-table
          [dataSource]="students"
          class="mat-elevation-z8 full-width"
        >
          <!-- ID -->
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>ID</th>
            <td mat-cell *matCellDef="let s">{{ s.id }}</td>
          </ng-container>

          <!-- Name -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let s">{{ s.name }}</td>
          </ng-container>

          <!-- Email -->
          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef>Email</th>
            <td mat-cell *matCellDef="let s">{{ s.email }}</td>
          </ng-container>

          <!-- Status -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let s">
              <span
                class="status-badge"
                [ngClass]="{
                  'active-badge': s.status === 'ACTIVE',
                  'inactive-badge': s.status === 'INACTIVE',
                }"
              >
                {{ s.status }}
              </span>
            </td>
          </ng-container>

          <!-- Actions -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let s">
              <button mat-icon-button color="primary" (click)="editStudent(s)">
                <mat-icon>edit</mat-icon>
              </button>

              <button
                mat-icon-button
                color="warn"
                (click)="deleteStudent(s.id!)"
              >
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </div>

      <!-- ================= FORM VIEW ================= -->
      <div *ngIf="viewMode === 'form'" class="form-wrapper">
        <mat-card class="edit-card mat-elevation-z12">
          <div class="form-header">
            <mat-icon class="header-icon">
              {{ isEditMode ? "edit" : "person_add" }}
            </mat-icon>
            <h2>{{ isEditMode ? "Edit Student" : "Add Student" }}</h2>
          </div>

          <form
            [formGroup]="studentForm"
            (ngSubmit)="saveStudent()"
            class="edit-form"
          >
            <!-- Name -->
            <mat-form-field class="full-width">
              <mat-label>Full Name</mat-label>
              <input matInput formControlName="name" />
              <mat-icon matSuffix>person</mat-icon>
            </mat-form-field>

            <!-- Email -->
            <mat-form-field class="full-width">
              <mat-label>Email Address</mat-label>
              <input matInput formControlName="email" />
              <mat-icon matSuffix>email</mat-icon>
            </mat-form-field>

            <!-- Status -->
            <mat-form-field class="full-width">
              <mat-label>Status</mat-label>
              <mat-select formControlName="status">
                <mat-option value="ACTIVE">ACTIVE</mat-option>
                <mat-option value="INACTIVE">INACTIVE</mat-option>
              </mat-select>
              <mat-icon matSuffix>toggle_on</mat-icon>
            </mat-form-field>

            <!-- Buttons -->
            <div class="form-actions">
              <button mat-stroked-button type="button" (click)="cancelForm()">
                Cancel
              </button>

              <button mat-raised-button color="primary" type="submit">
                {{ isEditMode ? "Update Student" : "Save Student" }}
              </button>
            </div>
          </form>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
        background: #f5f7ff;
        padding: 10px 20px 80px;
      }

      /* ================= LAYOUT ================= */

      .container {
        max-width: 1200px;
        margin: 0 auto;
      }

      .container h1 {
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 30px;
        color: #094cb1;
        text-align: center;
      }

      /* ================= BUTTON ================= */

      button[mat-raised-button] {
        display: block;
        border-radius: 8px !important;
        font-weight: 600 !important;
        text-transform: none !important;
        margin: 10px auto;
      }

      /* ================= TABLE ================= */

      table[mat-table] {
        width: 100%;
        background: #ffffff;
        border-radius: 14px;
        overflow: hidden;
        border: 1px solid #e5e7eb;
      }

      /* Header */
      .mat-mdc-header-row {
        background: #eef2ff;
      }

      .mat-mdc-header-cell {
        font-weight: 600 !important;
        font-size: 14px;
        color: #4338ca !important;
        letter-spacing: 0.5px;
        padding: 16px !important;
      }

      /* Body */
      .mat-mdc-cell {
        font-size: 14px;
        color: #374151;
        padding: 16px !important;
      }

      .mat-mdc-row {
        transition: background 0.2s ease;
      }

      .mat-mdc-row:hover {
        background: #f3f4ff;
      }

      /* Action buttons */
      .mat-mdc-icon-button {
        transition: transform 0.15s ease !important;
      }

      .mat-mdc-icon-button:hover {
        transform: scale(1.15);
      }

      /* ================= STATUS BADGES ================= */

      .status-badge {
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.5px;
        display: inline-block;
        min-width: 90px;
        text-align: center;
      }

      /* ACTIVE */
      .active-badge {
        background-color: #e6f4ea;
        color: #1b5e20;
        border: 1px solid #2e7d32;
      }

      /* INACTIVE */
      .inactive-badge {
        background-color: #fdecea;
        color: #b71c1c;
        border: 1px solid #d32f2f;
      }

      /* ================= FORM VIEW ================= */

      .form-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 75vh;
        padding: 20px 0;
      }

      .edit-card {
        width: 100%;
        max-width: 520px;
        padding: 40px 35px;
        border-radius: 20px;
        background: #ffffff;
        box-shadow: 0 20px 50px rgba(67, 56, 202, 0.12);
        border: 1px solid #e0e7ff;
        transition: 0.3s ease;
      }

      /* Header */
      .form-header {
        text-align: center;
        margin-bottom: 30px;
      }

      .header-icon {
        font-size: 42px !important;
        width: 42px !important;
        height: 42px !important;
        color: #4338ca;
        margin-bottom: 10px;
      }

      .form-header h2 {
        margin: 0;
        font-weight: 700;
        font-size: 1.4rem;
        color: #1f2937;
      }

      /* Form */
      .edit-form {
        display: flex;
        flex-direction: column;
        gap: 22px;
      }

      .full-width {
        width: 100%;
      }

      /* ================= FORM ACTIONS CLEAN ================= */

      .form-actions {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 24px;
        margin-top: 35px;
      }

      .form-actions button {
        width: 180px;
        height: 48px;
        border-radius: 12px !important;
        text-transform: none !important;
      }

      .form-actions button[mat-stroked-button] {
        width: 180px;
        margin-left: 18px;
        border-color: #4338ca !important;
        color: #4338ca !important;
      }
      /* ================= MOBILE IMPROVEMENTS ================= */

      @media (max-width: 768px) {
        :host {
          padding: 20px 12px 60px;
        }

        .container h1 {
          font-size: 22px;
          margin-bottom: 20px;
        }

        /* Make Add button full width */
        button[mat-raised-button] {
          width: 100%;
          margin: 15px 0;
        }

        /* ---------- TABLE FIX ---------- */

        /* Allow horizontal scroll */
        .container {
          overflow-x: auto;
        }

        table[mat-table] {
          min-width: 600px; /* keeps layout intact */
          font-size: 12px;
        }

        .mat-mdc-header-cell,
        .mat-mdc-cell {
          padding: 10px !important;
          font-size: 12px;
        }

        /* Smaller action buttons */
        .mat-mdc-icon-button {
          width: 32px !important;
          height: 32px !important;
        }

        .mat-mdc-icon-button mat-icon {
          font-size: 18px !important;
        }

        /* ---------- FORM FIX ---------- */

        .form-wrapper {
          margin-top: 20px;
          padding: 0 5px;
        }

        .edit-card {
          padding: 20px;
          border-radius: 14px;
        }

        .form-header h2 {
          font-size: 18px;
        }

        .header-icon {
          font-size: 30px !important;
        }

        .edit-form {
          gap: 16px;
        }

        .form-actions {
          flex-direction: column;
          gap: 10px;
        }

        .form-actions button {
          width: 100%;
        }
      }
    `,
  ],
})
export class ManageStudentComponent implements OnInit {
  students: Student[] = [];
  studentForm!: FormGroup;
  displayedColumns: string[] = ["id", "name", "email", "status", "actions"];

  viewMode: "list" | "form" = "list";
  isEditMode = false;
  studentId?: number;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      status: ["ACTIVE", Validators.required],
    });

    this.loadStudents();
  }

  // ================= LOAD =================
  loadStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (data) => (this.students = data),
      error: () =>
        this.snackBar.open("Error loading students", "Close", {
          duration: 3000,
        }),
    });
  }

  // ================= ADD =================
  addStudent(): void {
    this.isEditMode = false;
    this.studentForm.reset({ status: "ACTIVE" });
    this.viewMode = "form";
  }

  // ================= EDIT =================
  editStudent(student: Student): void {
    this.isEditMode = true;
    this.studentId = student.id;

    this.studentForm.patchValue(student);
    this.viewMode = "form";
  }

  // ================= SAVE =================
  saveStudent(): void {
    if (this.studentForm.invalid) return;

    const data: Student = this.studentForm.value;

    if (this.isEditMode && this.studentId) {
      this.studentService.updateStudent(this.studentId, data).subscribe(() => {
        this.snackBar.open("Student updated", "Close", { duration: 3000 });
        this.viewMode = "list";
        this.loadStudents();
      });
    } else {
      this.studentService.createStudent(data).subscribe(() => {
        this.snackBar.open("Student added", "Close", { duration: 3000 });
        this.viewMode = "list";
        this.loadStudents();
      });
    }
  }

  // ================= DELETE =================
  deleteStudent(id: number): void {
    if (confirm("Delete this student?")) {
      this.studentService.deleteStudent(id).subscribe(() => {
        this.snackBar.open("Student deleted", "Close", { duration: 3000 });
        this.loadStudents();
      });
    }
  }

  // ================= CANCEL =================
  cancelForm(): void {
    this.viewMode = "list";
  }
}
