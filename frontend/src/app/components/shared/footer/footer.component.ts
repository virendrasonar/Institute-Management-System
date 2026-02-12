import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule],
  template: `
    <footer class="main-footer">
      <div class="footer-content">
        <div class="container">
          <div class="footer-sections">
            <!-- Company Info -->
            <div class="footer-section">
              <div class="footer-logo">
                <mat-icon>school</mat-icon>
                <span>Ignite Institute</span>
              </div>
              <p class="footer-description">
                Empowering minds and shaping futures through world-class
                education and innovative learning experiences.
              </p>

              <div class="social-links">
                <p class="reach">Follow Us</p>
                <a
                  href="https://www.linkedin.com/in/virendra-sonar"
                  target="_blank"
                  rel="noopener"
                >
                  <button mat-icon-button class="social-btn">
                    <i class="fa-brands fa-linkedin-in"></i>
                  </button>
                </a>

                <a href="https://twitter.com" target="_blank" rel="noopener">
                  <button mat-icon-button class="social-btn">
                    <i class="fa-brands fa-x-twitter"></i>
                  </button>
                </a>

                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener"
                >
                  <button mat-icon-button class="social-btn">
                    <i class="fa-brands fa-instagram"></i>
                  </button>
                </a>

                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener"
                >
                  <button mat-icon-button class="social-btn">
                    <i class="fa-brands fa-facebook-f"></i>
                  </button>
                </a>
              </div>
            </div>

            <!-- Quick Links -->
            <div class="footer-section">
              <h3>Quick Links</h3>
              <ul class="footer-links">
                <li><a routerLink="/home">Home</a></li>
                <li><a routerLink="/about">About Us</a></li>
                <li><a routerLink="/courses">Courses</a></li>
                <li><a routerLink="/contact">Contact</a></li>
                <li><a href="#" (click)="scrollToTop()">Back to Top</a></li>
              </ul>
            </div>

            <!-- Programs -->
            <div class="footer-section">
              <h3>Popular Programs</h3>
              <ul class="footer-links">
                <li><a routerLink="/courses">Web Development</a></li>
                <li><a routerLink="/courses">Data Science</a></li>
                <li><a routerLink="/courses">Digital Marketing</a></li>
                <li><a routerLink="/courses">Mobile Development</a></li>
                <li><a routerLink="/courses">AI & Machine Learning</a></li>
              </ul>
            </div>

            <!-- Contact Info -->
            <div class="footer-section">
              <h3>Contact Info</h3>
              <div class="contact-info">
                <div class="contact-item">
                  <mat-icon>location_on</mat-icon>
                  <span>123 Education Street<br />Learning City, VS 55385</span>
                </div>
                <div class="contact-item">
                  <mat-icon>phone</mat-icon>
                  <span>+91 (999) 123-4567</span>
                </div>

                <div class="contact-item">
                  <mat-icon>email</mat-icon>
                  <a href="mailto:info@igniteinstitute.com" class="email-link">
                    info&#64;igniteinstitute.com
                  </a>
                </div>

                <div class="contact-item">
                  <mat-icon>schedule</mat-icon>
                  <span>Mon-Fri: 9AM-6PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="container">
          <div class="footer-bottom-content">
            <div class="copyright">
              <p>
                &copy; {{ currentYear }} Ignite - Institute of Excellence
                Institute. All rights reserved.
              </p>
            </div>
            <div class="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
              <a routerLink="/dashboard">Admin Portal</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .main-footer {
        background: #1a1a2e;
        color: white;
        margin-top: auto;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
      }

      .footer-content {
        padding: 60px 0 40px 0;
      }

      .footer-sections {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1.5fr;
        gap: 40px;
      }

      .footer-section h3 {
        font-size: 1.3rem;
        font-weight: 600;
        margin: 0 0 25px 0;
        color: #667eea;
      }

      /* Company Info Section */
      .footer-logo {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 20px;
      }

      .footer-logo mat-icon {
        font-size: 2rem !important;
        width: 2rem !important;
        height: 2rem !important;
        color: #667eea;
      }

      .footer-logo span {
        font-size: 1.5rem;
        font-weight: 700;
        font-family: "Poppins", sans-serif;
      }

      .footer-description {
        line-height: 1.6;
        margin: 0 0 20px 0;
        color: #b0b0b0;
      }

      .reach {
        font-size: 15px;
        line-height: 1.5;
        margin: 0px 0px 0px 5px;
        color: #b0b0b0;
      }

      .social-links {
        display: flex;
        align-items: center;
        gap: 20px;
        margin: 20px 30px 10px 0px;
      }

      .social-btn {
        background: rgba(102, 126, 234, 0.1) !important;
        color: #667eea !important;
        transition: all 0.3s ease !important;
      }

      .social-btn i {
        font-size: 1.25rem;
      }

      .social-btn:hover {
        background: #667eea !important;
        color: white !important;
        transform: translateY(-2px);
      }

      /* Links Sections */
      .footer-links {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .footer-links li {
        margin-bottom: 12px;
      }

      .footer-links a {
        color: #b0b0b0;
        text-decoration: none;
        transition: color 0.3s ease;
        display: flex;
        align-items: center;
      }

      .footer-links a:hover {
        color: #667eea;
      }

      /* Contact Info Section */
      .contact-info {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }

      .contact-item {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        color: #b0b0b0;
      }

      .contact-item mat-icon {
        color: #667eea;
        font-size: 1.2rem !important;
        width: 1.2rem !important;
        height: 1.2rem !important;
        margin-top: 2px;
      }

      .contact-item span {
        line-height: 1.4;
      }

      .email-link {
        color: #b0b0b0;
        text-decoration: none;
        font-weight: 500;
      }

      .email-link:hover {
        text-decoration: underline;
      }

      /* Footer Bottom */
      .footer-bottom {
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding: 25px 0;
        background: rgba(0, 0, 0, 0.2);
      }

      .footer-bottom-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px;
      }

      .copyright p {
        margin: 0;
        color: #b0b0b0;
        font-size: 0.9rem;
      }

      .footer-bottom-links {
        display: flex;
        gap: 25px;
        flex-wrap: wrap;
      }

      .footer-bottom-links a {
        color: #b0b0b0;
        text-decoration: none;
        font-size: 0.9rem;
        transition: color 0.3s ease;
      }

      .footer-bottom-links a:hover {
        color: #667eea;
      }

      /* Responsive Design */
      @media (max-width: 768px) {
        .footer-sections {
          grid-template-columns: 1fr;
          gap: 30px;
          text-align: center;
        }

        .footer-logo {
          justify-content: center;
        }

        .social-links {
          justify-content: center;
        }

        .contact-info {
          align-items: center;
        }

        .contact-item {
          justify-content: center;
          text-align: center;
        }

        .footer-bottom-content {
          flex-direction: column;
          text-align: center;
        }

        .footer-bottom-links {
          justify-content: center;
        }
      }

      @media (max-width: 768px) {
        /* Layout */
        .footer-sections {
          grid-template-columns: 1fr;
          gap: 28px;
          text-align: center;
        }

        /* Branding */
        .footer-logo {
          justify-content: center;
        }

        .footer-description {
          max-width: 340px;
          margin: 0 auto 18px;
        }

        /* Social – horizontal & centered */
        .social-links {
          justify-content: center;
          gap: 14px;
          margin: 16px 0 0;
          flex-wrap: wrap;
        }

        .reach {
          width: 100%;
          text-align: center;
          margin-bottom: 6px;
        }

        /* Links */
        .footer-links a {
          justify-content: center;
        }

        /* Contact */
        .contact-info {
          align-items: center;
        }

        .contact-item {
          justify-content: center;
          text-align: center;
        }

        /* Footer bottom */
        .footer-bottom-content {
          flex-direction: column;
          text-align: center;
          gap: 14px;
        }

        .footer-bottom-links {
          justify-content: center;
          gap: 18px;
        }
      }
      @media (max-width: 480px) {
        /* Headings */
        .footer-section h3 {
          font-size: 1.15rem;
          margin-bottom: 16px;
        }

        /* Social buttons – touch friendly */
        .social-btn {
          width: 38px;
          height: 38px;
        }

        /* Text comfort */
        .footer-description {
          font-size: 0.95rem;
        }

        /* Bottom links stack */
        .footer-bottom-links {
          flex-direction: column;
          gap: 12px;
        }
      }
    `,
  ],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
