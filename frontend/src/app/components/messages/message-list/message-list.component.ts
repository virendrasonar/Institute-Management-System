import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonModule } from "@angular/material/button";
import { MessageService } from "../../../services/message.service";
import { Message } from "../../../models/message.model";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-message-list",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <div class="page-wrapper">
      <!-- Header -->
      <div class="page-header">
        <h1>
          <mat-icon>mail_outline</mat-icon>
          Message Center
        </h1>

        <p>Manage student enquiries and communication</p>
      </div>

      <!-- Loading -->
      <div *ngIf="loading" class="loading">
        <mat-spinner diameter="60"></mat-spinner>
      </div>

      <!-- Empty -->
      <div *ngIf="!loading && messages.length === 0" class="empty-state">
        <mat-card>
          <mat-card-content>
            <h3>No Messages Found</h3>
            <p>All incoming messages will appear here.</p>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Messages -->
      <mat-accordion *ngIf="!loading && messages.length > 0">
        <mat-expansion-panel *ngFor="let message of messages">
          <mat-expansion-panel-header>
            <mat-panel-title>
              {{ message.senderName }}
            </mat-panel-title>
            <mat-panel-description>
              {{ message.email }}
            </mat-panel-description>
          </mat-expansion-panel-header>

          <div class="message-body">
            <p><strong>From:</strong> {{ message.senderName }}</p>
            <p><strong>Email:</strong> {{ message.email }}</p>

            <div class="message-text">
              {{ message.content }}
            </div>

            <div class="actions">
              <button
                mat-raised-button
                color="warn"
                (click)="deleteMessage(message.id!)"
              >
                Delete
              </button>
            </div>
          </div>
        </mat-expansion-panel>
      </mat-accordion>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
        background: #f5f7ff;
        padding: 50px 24px 80px;
      }

      /* ================= WRAPPER ================= */

      .page-wrapper {
        max-width: 1150px;
        margin: 0 auto;
      }

      /* ================= HEADER ================= */

      .page-header {
        background: linear-gradient(135deg, #9214d6, #1f8dd6);
        border-radius: 22px;
        padding: 45px 30px;
        color: white;
        margin-bottom: 40px;
        box-shadow: 0 18px 45px rgba(67, 56, 202, 0.18);
      }

      .page-header h1 {
        display: flex;
        align-items: center;
        gap: 25px;
        font-size: 2.2rem;
        font-weight: 700;
        margin: 0;
      }

      .page-header h1 mat-icon {
        font-size: 32px !important;
        width: 32px !important;
        height: 32px !important;
        line-height: 32px !important;
      }

      .page-header p {
        margin-top: 12px;
        opacity: 0.9;
        font-size: 1rem;
      }

      /* ================= LOADING ================= */

      .loading {
        display: flex;
        justify-content: center;
        padding: 60px 0;
      }

      /* ================= EMPTY STATE ================= */

      .empty-state mat-card {
        padding: 40px;
        border-radius: 20px !important;
        border: 1px solid #e0e7ff;
        box-shadow: 0 12px 30px rgba(67, 56, 202, 0.08);
        text-align: center;
      }

      /* ================= ACCORDION ================= */

      mat-expansion-panel {
        margin-bottom: 20px;
        border-radius: 18px !important;
        overflow: hidden;
        border: 1px solid #e0e7ff;
        box-shadow: 0 10px 30px rgba(67, 56, 202, 0.08);
        transition: all 0.25s ease;
      }

      mat-expansion-panel:hover {
        transform: translateY(-4px);
        box-shadow: 0 18px 40px rgba(67, 56, 202, 0.15);
      }

      /* Header inside expansion */
      mat-expansion-panel-header {
        padding: 20px 24px !important;
        font-weight: 600;
      }

      .mat-expansion-panel-header-title {
        font-weight: 600;
        color: #1f2937;
      }

      .mat-expansion-panel-header-description {
        color: #1f2937;
        font-weight: 500;
      }

      /* ================= MESSAGE BODY ================= */

      .message-body {
        padding: 24px;
        background: #ffffff;
      }

      .message-body strong {
        color: #1f2937;
      }

      /* Message text box */
      .message-text {
        background: #f3f4ff;
        border: 1px solid #e0e7ff;
        padding: 18px 20px;
        border-radius: 14px;
        margin-top: 16px;
        white-space: pre-wrap;
        line-height: 1.6;
        font-size: 0.95rem;
      }

      /* ================= ACTIONS ================= */

      .actions {
        margin-top: 25px;
        display: flex;
        justify-content: flex-end;
      }

      .actions button {
        border-radius: 10px !important;
        padding: 8px 24px !important;
        font-weight: 600 !important;
        text-transform: none !important;
        transition: 0.25s ease !important;
      }

      .actions button:hover {
        transform: translateY(-2px);
      }

      /* ================= MOBILE ================= */

      @media (max-width: 768px) {
        :host {
          padding: 40px 16px 60px;
        }

        .page-header {
          padding: 30px 20px;
        }

        .page-header h1 {
          font-size: 1.8rem;
        }

        .message-body {
          padding: 18px;
        }
      }
    `,
  ],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  loading = false;

  constructor(
    private messageService: MessageService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.loading = true;

    this.messageService.getAllMessages().subscribe({
      next: (data: Message[]) => {
        this.messages = data;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open("Error loading messages", "Close", {
          duration: 3000,
        });
        this.loading = false;
      },
    });
  }

  deleteMessage(id: number): void {
    if (!confirm("Delete this message?")) return;

    this.messageService.deleteMessage(id).subscribe({
      next: () => {
        this.messages = this.messages.filter((m) => m.id !== id);
        this.snackBar.open("Message deleted", "Close", {
          duration: 3000,
        });
      },
      error: () => {
        this.snackBar.open("Failed to delete message", "Close", {
          duration: 3000,
        });
      },
    });
  }
}
