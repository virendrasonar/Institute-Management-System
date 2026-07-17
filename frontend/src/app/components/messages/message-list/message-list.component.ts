import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar";
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
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <main class="page-wrapper">
      <header class="page-header">
        <div>
          <span>Admin communication</span>
          <h1><mat-icon>mail_outline</mat-icon> Message Center</h1>
          <p>Review incoming student enquiries and remove messages that are no longer needed.</p>
        </div>
        <strong>{{ messages.length }} total</strong>
      </header>

      <div *ngIf="loading" class="loading">
        <mat-spinner diameter="52"></mat-spinner>
      </div>

      <section *ngIf="!loading && messages.length === 0" class="empty-state">
        <mat-icon>mark_email_read</mat-icon>
        <h2>No Messages Found</h2>
        <p>All incoming messages will appear here.</p>
      </section>

      <mat-card class="table-card" *ngIf="!loading && messages.length > 0">
        <div class="table-toolbar">
          <div>
            <h2>Inbox</h2>
            <p>Latest enquiries from the website contact form</p>
          </div>
          <span class="status-pill">Open messages</span>
        </div>

        <div class="message-table">
          <div class="table-head">
            <span>Sender</span>
            <span>Email</span>
            <span>Message</span>
            <span>Action</span>
          </div>

          <div class="table-row" *ngFor="let message of messages">
            <div class="sender">
              <span>{{ initials(message.senderName) }}</span>
              <strong>{{ message.senderName }}</strong>
            </div>
            <a [href]="'mailto:' + message.email">{{ message.email }}</a>
            <p>{{ message.content }}</p>
            <button mat-stroked-button color="warn" (click)="deleteMessage(message.id!)">
              <mat-icon>delete</mat-icon>
              Delete
            </button>
          </div>
        </div>
      </mat-card>
    </main>
  `,
  styles: [`
    :host{display:block;min-height:100vh;background:#f5f7ff;padding:40px 22px 70px}.page-wrapper{max-width:1180px;margin:0 auto}.page-header{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:24px;padding:32px 36px;border-radius:22px;background:linear-gradient(135deg,#1d4ed8,#4338ca 52%,#7c3aed);color:#fff;box-shadow:0 18px 42px rgba(67,56,202,.26)}.page-header span{text-transform:uppercase;letter-spacing:1.2px;font-size:11px;font-weight:850;color:#dbeafe}.page-header h1{display:flex;align-items:center;gap:12px;margin:7px 0 8px;font-size:34px;letter-spacing:0}.page-header p{margin:0;color:#dbeafe}.page-header strong{padding:9px 13px;border-radius:999px;background:rgba(255,255,255,.14);white-space:nowrap}.loading{display:grid;place-items:center;min-height:45vh}
    .empty-state{text-align:center;padding:70px 20px;background:#fff;border:1px solid #e0e7ff;border-radius:18px;box-shadow:0 10px 28px rgba(15,23,42,.07)}.empty-state mat-icon{width:54px;height:54px;font-size:54px;color:#4338ca}.empty-state h2{margin:12px 0 8px;color:#111827}.empty-state p{margin:0;color:#64748b}
    .table-card{overflow:hidden;border:1px solid #e0e7ff;border-radius:18px!important;box-shadow:0 12px 32px rgba(15,23,42,.08)}.table-toolbar{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:22px 24px;border-bottom:1px solid #e5e7eb}.table-toolbar h2{margin:0;color:#111827}.table-toolbar p{margin:5px 0 0;color:#64748b}.status-pill{padding:8px 12px;border-radius:999px;background:#eef2ff;color:#4338ca;font-weight:850}
    .message-table{overflow-x:auto}.table-head,.table-row{display:grid;grid-template-columns:1.1fr 1.2fr minmax(360px,2fr  ) 120px;gap:20px;align-items:center;min-width:920px}.table-head{padding:13px 24px;background:#f8fafc;color:#64748b;text-transform:uppercase;letter-spacing:.06em;font-size:11px;font-weight:850}.table-row{padding:16px 24px;border-top:1px solid #eef2f7;background:#fff}.table-row:hover{background:#f8fafc}.sender{display:flex;align-items:center;gap:11px;min-width:0}.sender span{display:grid;flex:0 0 38px;width:38px;height:38px;place-items:center;border-radius:12px;background:#eef2ff;color:#4338ca;font-weight:850}.sender strong{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#111827}.table-row a{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#2563eb;font-weight:750;text-decoration:none}.table-row p{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin:0;color:#475569;line-height:1.5}.table-row button{height:38px;border-radius:10px!important;font-weight:750;text-transform:none!important}.table-row button mat-icon{width:18px;height:18px;font-size:18px}
    @media(max-width:620px){:host{padding:24px 14px 50px}.page-header{align-items:flex-start;flex-direction:column;padding:28px 22px}.page-header h1{font-size:27px}.table-toolbar{align-items:flex-start;flex-direction:column}}
  `],
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

  initials(name?: string): string {
    return (name || "NA").split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase();
  }
}
