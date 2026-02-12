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
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Full Name</mat-label>
              <input matInput formControlName="name" />
              <mat-icon matSuffix>person</mat-icon>
            </mat-form-field>

            <!-- Email -->
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email Address</mat-label>
              <input matInput formControlName="email" />
              <mat-icon matSuffix>email</mat-icon>
            </mat-form-field>

            <!-- Status -->
            <mat-form-field appearance="outline" class="full-width">
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
      .container {
        padding: 30px;
        text-align: center;
      }

      .container h1 {
        font-size: 36px;
        font-weight: 700;
        margin-bottom: 30px;
        color: #4e65c0;
      }

      .full-width {
        width: 100%;
      }

      .form-card {
        max-width: 500px;
        margin: 40px auto;
        padding: 25px;
      }

      table {
        width: 100%;
      }

      .form-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 75vh;
        margin: 40px;
      }

      .edit-card {
        width: 100%;
        max-width: 520px;
        padding: 35px;
        border-radius: 20px;
      }

      .form-header {
        text-align: center;
        margin-bottom: 25px;
      }

      .header-icon {
        font-size: 40px;
        width: 40px;
        height: 40px;
        color: #3f51b5;
        margin-bottom: 10px;
      }

      .form-header h2 {
        margin: 0;
        font-weight: 600;
      }

      .edit-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .full-width {
        width: 100%;
      }

      .form-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
      }
      .students-table {
        width: 100%;
        background: #ffffff;
        border-radius: 12px;
        overflow: hidden;
      }

      .students-table th {
        background: #f4f6fb;
        font-weight: 600;
        font-size: 14px;
        color: #3f51b5;
        letter-spacing: 0.5px;
      }

      .students-table td {
        font-size: 14px;
        color: #444;
      }

      .table-row {
        transition:
          background-color 0.2s ease,
          transform 0.15s ease;
      }

      .table-row:hover {
        background-color: #040f29;
        transform: scale(1.01);
      }

      .students-table th,
      .students-table td {
        padding: 16px 20px;
      }

      .mat-icon-button {
        transition: transform 0.15s ease;
      }

      .mat-icon-button:hover {
        transform: scale(1.15);
      }
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
