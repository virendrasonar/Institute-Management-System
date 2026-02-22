import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-contact-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="contact-container">
      <div class="contact-header">
        <h1>📞Get in Touch</h1>
        <p>Ready to start your learning journey? We're here to help.</p>
      </div>

      <div class="contact-content">
        <!-- LEFT: INFO (35%) -->

        <div class="contact-info">
          <!-- 1. NEED HELP (TOP / SUMMARY) -->
          <div class="info-card top-info-card">
            <mat-icon>contact_support</mat-icon>
            <div>
              <h3>Need Help?</h3>
              <p>
                Have questions about courses, admissions, or support? <br />
                <span class="highlight-text">
                  Call or WhatsApp us at +91 93253 90860
                </span>
                <br />
              </p>
            </div>
          </div>

          <div class="info-card">
            <mat-icon>phone</mat-icon>
            <div>
              <h3>Office Phone</h3>
              <p>
                +91 (999) 123-4567 / +91 4522551466<br />
                <span class="highlight-text">
                  Call Timings: Mon-Fri, 10:00 AM – 5:00 PM
                </span>
              </p>
            </div>
          </div>

          <!-- 3. EMAIL US -->
          <div class="info-card">
            <mat-icon>email</mat-icon>
            <div>
              <h3>Email Us</h3>
              <p>
                <a href="mailto:info@igniteinstitute.com">
                  info&#64;igniteinstitute.com </a
                ><br />
                <a href="mailto:admissions@igniteinstitute.com">
                  admissions&#64;igniteinstitute.com
                </a>
              </p>
            </div>
          </div>

          <!-- 4. VISIT US -->
          <div class="info-card">
            <mat-icon>location_on</mat-icon>
            <div>
              <h3>Visit Us</h3>
              <p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=123+Education+Street+Learning+City+VS+55385"
                  target="_blank"
                  rel="noopener"
                >
                  123 Education Street<br />
                  Learning City, VS 55385
                </a>
              </p>
            </div>
          </div>

          <!-- 5. FAST SUPPORT (OPTIONAL / LAST) -->
          <div class="info-card highlight-card">
            <mat-icon>support_agent</mat-icon>
            <div>
              <h3>Fast Support</h3>
              <p>
                We usually respond within
                <span class="highlight-text"> 24 hours </span><br />
                on business days.
              </p>
            </div>
          </div>
        </div>

        <!-- RIGHT: FORM (65%) -->
        <mat-card class="contact-form-card">
          <mat-card-header>
            <mat-card-title>Send us a Message</mat-card-title>
            <mat-card-subtitle
              >We'll get back to you within 24 hours</mat-card-subtitle
            >
          </mat-card-header>

          <mat-card-content>
            <form
              [formGroup]="contactForm"
              (ngSubmit)="onSubmit()"
              class="contact-form"
            >
              <mat-form-field appearance="fill" class="full-width">
                <mat-label>Full Name</mat-label>
                <input matInput formControlName="name" />
                <mat-icon matSuffix>person</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="fill" class="full-width">
                <mat-label>Email Address</mat-label>
                <input matInput formControlName="email" />
                <mat-icon matSuffix>email</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="fill" class="full-width">
                <mat-label>Mobile Number</mat-label>
                <input matInput formControlName="phone" />
                <mat-icon matSuffix>phone</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="fill" class="full-width">
                <mat-label>Message</mat-label>
                <textarea
                  matInput
                  rows="5"
                  formControlName="message"
                ></textarea>
                <mat-icon matSuffix>message</mat-icon>
              </mat-form-field>

              <div class="form-actions">
                <button
                  mat-raised-button
                  color="primary"
                  type="submit"
                  [disabled]="contactForm.invalid || submitting"
                  class="submit-btn"
                >
                  <mat-spinner diameter="20" *ngIf="submitting"></mat-spinner>
                  <mat-icon *ngIf="!submitting">send</mat-icon>
                  {{ submitting ? "Sending..." : "Send Message" }}
                </button>
              </div>
            </form>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        background: linear-gradient(to bottom, #f5f7ff, #eef2ff);
        min-height: 100vh;
      }

      /* ================= CONTAINER ================= */

      .contact-container {
        max-width: 1200px;
        margin: 0 90px;
        padding: 60px 24px;
      }

      /* ================= HEADER ================= */

      .contact-header {
        text-align: center;
        margin-bottom: 70px;
        color: #4d4dab;
      }

      .contact-header h1 {
        font-size: 3rem;
        font-weight: 800;
        line-height: 1.1;
        letter-spacing: 1px;
      }

      .contact-header p {
        font-size: 1.25rem;
        color: #060e46;
        margin-top: 12px;
      }

      /* ================= GRID LAYOUT ================= */

      .contact-content {
        display: grid;
        grid-template-columns: 35% 65%;
        gap: 60px;
        align-items: stretch;
      }

      /* ================= LEFT COLUMN ================= */

      .contact-info {
        display: flex;
        flex-direction: column;
        gap: 28px;
      }

      .info-card {
        padding: 28px;
        border-radius: 18px;
        background: #ffffff;
        display: flex;
        align-items: flex-start;
        gap: 18px;
        box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
        border: 1px solid transparent;
        transition: all 0.25s ease;
      }

      .info-card mat-icon {
        width: 36px;
        height: 36px;
        font-size: 28px;
        line-height: 36px;
        color: #0072ff;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.25s ease;
      }

      .info-card h3 {
        margin: 0 0 6px 0;
        font-weight: 600;
        font-size: 1.05rem;
      }

      .info-card p {
        margin: 0;
        color: #1e1818;
        line-height: 1.5;
        font-size: 0.95rem;
      }

      .highlight-text {
        color: #6c1f9c;
        font-weight: 600;
      }

      /* Highlight card */
      .highlight-card {
        background: #ffffff;
        border: 1px solid rgba(63, 81, 181, 0.2);
      }

      /* Hover Effects */

      .info-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.12);
        border-color: rgba(63, 81, 181, 0.25);
      }

      .info-card:hover mat-icon {
        transform: scale(1.05);
        color: #3f51b5;
      }

      .info-card p a {
        text-decoration: none;
        color: #303f9f;
        font-weight: 500;
      }

      .info-card p a:hover {
        text-decoration: underline;
        color: #102bdd;
      }

      /* ================= RIGHT COLUMN ================= */

      .contact-form-card {
        border-radius: 22px;
        padding: 24px;
        box-shadow: 0 18px 50px rgba(0, 0, 0, 0.12);
        height: 100%;
        background: #ffffff;
      }

      .contact-form {
        display: flex;
        flex-direction: column;
        gap: 22px;
        margin-top: 20px;
      }

      .full-width {
        width: 100%;
      }

      .form-actions {
        display: flex;
        justify-content: center;
        margin-top: 35px;
      }

      .submit-btn {
        padding: 14px 48px;
        border-radius: 32px;
        font-size: 1.05rem;
        font-weight: 600;
      }

      /* ================= MOBILE ================= */

      @media (max-width: 900px) {
        .contact-container {
          padding: 60px 18px;
        }

        .contact-header h1 {
          font-size: 2.2rem;
        }

        .contact-header p {
          font-size: 1.05rem;
        }

        .contact-content {
          grid-template-columns: 1fr;
          gap: 50px;
        }

        .contact-info {
          gap: 22px;
        }

        .info-card {
          padding: 22px;
        }

        .contact-form-card {
          padding: 18px;
        }

        .submit-btn {
          width: 100%;
          max-width: 260px;
        }

        .form-actions {
          margin-top: 25px;
        }
      }
    `,
  ],
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) {
    this.contactForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", Validators.required],
      message: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.contactForm.invalid) return;

    this.submitting = true;

    const payload = {
      senderName: this.contactForm.value.name,
      email: this.contactForm.value.email,
      content: `${this.contactForm.value.message}\n\nPhone: ${this.contactForm.value.phone}`,
    };

    this.http.post(`${environment.apiUrl}/admin/messages`, payload).subscribe({
      next: () => {
        this.snackBar.open("Message sent successfully!", "Close", {
          duration: 4000,
        });
        this.contactForm.reset();
        this.submitting = false;
      },
      error: () => {
        this.snackBar.open("Unable to send message", "Close", {
          duration: 6000,
        });
        this.submitting = false;
      },
    });
  }
}
