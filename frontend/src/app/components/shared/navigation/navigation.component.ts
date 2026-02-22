import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDividerModule } from "@angular/material/divider";
import { RouterModule, Router } from "@angular/router";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

@Component({
  selector: "app-navigation",
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    RouterModule,
  ],
  template: `
    <mat-toolbar class="main-toolbar">
      <div class="toolbar-content">
        <!-- Logo -->
        <div class="logo" routerLink="/">
          <mat-icon class="logo-icon">school</mat-icon>
          <span class="logo-text">Ignite - Institute of Excellence </span>
        </div>

        <!-- Desktop Navigation -->
        <nav class="desktop-nav" *ngIf="!isMobile">
          <a
            mat-button
            routerLink="/"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            <mat-icon>home</mat-icon>
            Home
          </a>

          <a mat-button routerLink="/courses" routerLinkActive="active">
            <mat-icon>library_books</mat-icon>
            Courses
          </a>

          <a mat-button routerLink="/about" routerLinkActive="active">
            <mat-icon>info</mat-icon>
            About Us
          </a>

          <a mat-button routerLink="/contact" routerLinkActive="active">
            <mat-icon>contact_mail</mat-icon>
            Contact
          </a>

          <!-- Admin Menu -->
          <button
            mat-button
            [matMenuTriggerFor]="adminMenu"
            class="admin-menu-trigger"
          >
            <mat-icon>admin_panel_settings</mat-icon>
            Admin
            <mat-icon>arrow_drop_down</mat-icon>
          </button>

          <mat-menu #adminMenu="matMenu">
            <button mat-menu-item routerLink="/dashboard">
              <mat-icon>dashboard</mat-icon>
              Dashboard
            </button>

            <button mat-menu-item routerLink="/students">
              <mat-icon>people</mat-icon>
              Students
            </button>

            <button mat-menu-item routerLink="/messages">
              <mat-icon>message</mat-icon>
              Messages
            </button>

            <mat-divider></mat-divider>

            <button mat-menu-item routerLink="/students/manage">
              <mat-icon>manage_accounts</mat-icon>
              Manage Students
            </button>
          </mat-menu>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          mat-icon-button
          *ngIf="isMobile"
          (click)="toggleMobileMenu()"
          class="mobile-menu-btn"
        >
          <mat-icon>menu</mat-icon>
        </button>
      </div>
    </mat-toolbar>

    <!-- Mobile Navigation Drawer -->
    <mat-sidenav-container class="mobile-nav-container" *ngIf="isMobile">
      <mat-sidenav
        #drawer
        class="mobile-nav"
        mode="over"
        [opened]="mobileMenuOpen"
        (closed)="mobileMenuOpen = false"
      >
        <div class="mobile-nav-header">
          <div class="mobile-logo">
            <mat-icon>school</mat-icon>
            <span>Ignite - Institute of Excellence </span>
          </div>
          <button mat-icon-button (click)="drawer.close()">
            <mat-icon>close</mat-icon>
          </button>
        </div>

        <nav class="mobile-nav-links">
          <a
            mat-button
            routerLink="/"
            (click)="drawer.close()"
            class="mobile-nav-link"
          >
            <mat-icon>home</mat-icon>
            Home
          </a>

          <a
            mat-button
            routerLink="/courses"
            (click)="drawer.close()"
            class="mobile-nav-link"
          >
            <mat-icon>library_books</mat-icon>
            Courses
          </a>

          <a
            mat-button
            routerLink="/about"
            (click)="drawer.close()"
            class="mobile-nav-link"
          >
            <mat-icon>info</mat-icon>
            About Us
          </a>

          <a
            mat-button
            routerLink="/contact"
            (click)="drawer.close()"
            class="mobile-nav-link"
          >
            <mat-icon>contact_mail</mat-icon>
            Contact
          </a>

          <div class="mobile-admin-section">
            <div class="admin-section-title">
              <mat-icon>admin_panel_settings</mat-icon>
              Admin Panel
            </div>

            <a
              mat-button
              routerLink="/dashboard"
              (click)="drawer.close()"
              class="mobile-nav-link admin-link"
            >
              <mat-icon>dashboard</mat-icon>
              Dashboard
            </a>

            <a
              mat-button
              routerLink="/students"
              (click)="drawer.close()"
              class="mobile-nav-link admin-link"
            >
              <mat-icon>people</mat-icon>
              Students
            </a>

            <a
              mat-button
              routerLink="/messages"
              (click)="drawer.close()"
              class="mobile-nav-link admin-link"
            >
              <mat-icon>message</mat-icon>
              Messages
            </a>
          </div>
        </nav>
      </mat-sidenav>
    </mat-sidenav-container>
  `,
  styles: [
    `
      /* ================= MAIN TOOLBAR ================= */

      .main-toolbar {
        background: #ffffff !important;
        border-bottom: 1px solid #e5e7eb !important;
        position: sticky !important;
        top: 0 !important;
        z-index: 1000 !important;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04) !important;
      }

      /* ================= TOOLBAR CONTENT ================= */

      .toolbar-content {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
      }

      /* ================= LOGO ================= */

      .logo {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        text-decoration: none;
        color: #1f2937;
      }

      .logo-icon {
        font-size: 28px !important;
        width: 28px !important;
        height: 28px !important;
        color: #4338ca;
      }

      .logo-text {
        font-size: 1.3rem;
        font-weight: 700;
        font-family: "Poppins", sans-serif;
        color: #1f2937;
      }

      /* ================= DESKTOP NAV ================= */

      .desktop-nav {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .desktop-nav a,
      .desktop-nav button {
        display: flex !important;
        align-items: center !important;
        gap: 6px !important;
        padding: 8px 16px !important;
        border-radius: 8px !important;
        font-weight: 500 !important;
        text-transform: none !important;
        color: #374151 !important;
        transition: all 0.2s ease !important;
      }

      /* Hover */
      .desktop-nav a:hover,
      .desktop-nav button:hover {
        background: #f3f4ff !important;
        color: #4338ca !important;
      }

      /* Active Route */
      .desktop-nav a.active {
        background: #4338ca !important;
        color: #ffffff !important;
      }

      /* ================= ADMIN BUTTON ================= */

      .admin-menu-trigger {
        background: #f3f4ff !important;
        color: #4338ca !important;
        font-weight: 600 !important;
      }

      .admin-menu-trigger:hover {
        background: #e0e7ff !important;
      }

      /* ================= MOBILE MENU BUTTON ================= */

      .mobile-menu-btn {
        color: #4338ca !important;
      }

      /* ================= MOBILE SIDENAV ================= */

      .mobile-nav-container {
        position: fixed;
        top: 64px;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
      }

      .mobile-nav {
        width: 260px !important;
        background: #ffffff !important;
        box-shadow: 2px 0 20px rgba(0, 0, 0, 0.08) !important;
      }

      /* Mobile Header */
      .mobile-nav-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 18px;
        border-bottom: 1px solid #e5e7eb;
        background: #4338ca;
        color: white;
      }

      .mobile-logo {
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
      }

      /* Mobile Links */
      .mobile-nav-links {
        display: flex;
        flex-direction: column;
        padding: 10px 0;
      }

      .mobile-nav-link {
        display: flex !important;
        align-items: center !important;
        gap: 14px !important;
        padding: 14px 20px !important;
        justify-content: flex-start !important;
        color: #374151 !important;
        font-weight: 500 !important;
        text-transform: none !important;
      }

      .mobile-nav-link:hover {
        background: #f3f4ff !important;
        color: #4338ca !important;
      }

      /* Admin Section */
      .mobile-admin-section {
        margin-top: 10px;
        border-top: 1px solid #e5e7eb;
        padding-top: 10px;
      }

      .admin-section-title {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        font-weight: 600;
        color: #4338ca;
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .admin-link {
        padding-left: 40px !important;
      }

      /* ================= RESPONSIVE ================= */

      @media (max-width: 768px) {
        .logo-text {
          font-size: 1.1rem;
        }
      }

      @media (max-width: 480px) {
        .logo-text {
          display: none;
        }
      }
      @media (max-width: 480px) {
        .logo-text {
          display: none;
        }
      }
    `,
  ],
})
export class NavigationComponent {
  isMobile = false;
  mobileMenuOpen = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
        if (!this.isMobile) {
          this.mobileMenuOpen = false;
        }
      });
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
