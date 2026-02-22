import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

@Component({
  selector: "app-homepage",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatSnackBarModule,
  ],
  template: `
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-background">
        <div class="floating-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>

        <!-- Particle Effects -->
        <div class="particles">
          <div
            class="particle"
            *ngFor="let i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
            [style.animation-delay]="i * 0.5 + 's'"
          ></div>
        </div>
      </div>

      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">Ignite - Institute of Excellence (IIE)</h1>
          <p class="hero-subtitle">Where Excellence Is Ignited With Passion</p>
          <p class="hero-description">
            We cultivate talent through rigorous learning, strong values, and
            industry-relevant expertise. Our programs are designed to build
            professionals who lead with skill, character, and purpose.
          </p>

          <div class="hero-actions">
            <button
              mat-raised-button
              color="primary"
              class="cta-button"
              routerLink="/courses"
            >
              <mat-icon>school</mat-icon>
              Explore Courses
            </button>
            <button mat-button class="secondary-button" routerLink="/contact">
              <mat-icon>contact_mail</mat-icon>
              Get in Touch
            </button>
          </div>
        </div>

        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-number">
              {{ instituteInfo?.statistics?.totalStudents || 1500 }}
            </div>
            <div class="stat-label">Happy Students</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">
              {{ instituteInfo?.statistics?.totalCourses || 25 }}
            </div>
            <div class="stat-label">Expert Courses</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">
              {{ instituteInfo?.statistics?.yearsOfExperience || 15 }}
            </div>
            <div class="stat-label">Years Experience</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">
              {{ instituteInfo?.statistics?.successRate || 95 }}%
            </div>
            <div class="stat-label">Success Rate</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <div class="section-header">
          <h2>Why Choose Ignite Institute of Excellence ?</h2>
          <p>
            We Provide Comprehensive education powered by modern teaching and
            real-world expertise.
          </p>
        </div>

        <div class="features-grid">
          <div class="feature-card" *ngFor="let feature of features">
            <div class="feature-icon">
              <mat-icon>{{ feature.icon }}</mat-icon>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Courses Preview Section -->
    <section class="courses-preview-section">
      <div class="container">
        <div class="section-header">
          <h2>Popular Courses</h2>
          <p>
            Discover our most sought-after programs designed for career success
          </p>
        </div>

        <div class="courses-grid">
          <mat-card class="course-card" *ngFor="let course of popularCourses">
            <div class="course-image">
              <mat-icon>{{ course.icon }}</mat-icon>
            </div>
            <mat-card-content>
              <h3>{{ course.name }}</h3>
              <p>{{ course.shortDescription }}</p>
              <div class="course-meta">
                <span class="duration">
                  <mat-icon>schedule</mat-icon>
                  {{ course.duration }}
                </span>
                <span class="level">
                  <mat-icon>trending_up</mat-icon>
                  {{ course.level }}
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
        </div>

        <div class="view-all-courses">
          <button
            mat-raised-button
            color="primary"
            routerLink="/courses"
            class="view-all-btn"
          >
            <mat-icon>library_books</mat-icon>
            View All Courses
          </button>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section">
      <div class="container">
        <div class="section-header">
          <h2>What Our Students Say</h2>
          <p>Real stories from our successful graduates</p>
        </div>

        <div class="testimonials-grid">
          <div
            class="testimonial-card"
            *ngFor="let testimonial of testimonials"
          >
            <div class="testimonial-content">
              <p>"{{ testimonial.content }}"</p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">
                <mat-icon>person</mat-icon>
              </div>
              <div class="author-info">
                <h4>{{ testimonial.name }}</h4>
                <span>{{ testimonial.course }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to Start Your Journey?</h2>
          <p>
            Join thousands of students who have transformed their careers with
            us
          </p>
          <div class="cta-actions">
            <button
              mat-raised-button
              color="primary"
              class="cta-button"
              routerLink="/contact"
            >
              <mat-icon>rocket_launch</mat-icon>
              Get Started Today
            </button>
            <button mat-button class="secondary-button" routerLink="/courses">
              <mat-icon>explore</mat-icon>
              Browse Courses
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      /* Hero Section */
      .hero-section {
        position: relative;
        min-height: 84vh;
        display: flex;
        align-items: center;
        overflow: hidden;
        background: linear-gradient(135deg, #4338ca, #818cf8);
        animation: gradientShift 20s ease-in-out infinite;
        color: #ffffff;
      }

      /* Smooth Indigo Animation */
      @keyframes gradientShift {
        0%,
        100% {
          background: linear-gradient(135deg, #4338ca, #818cf8);
        }
        50% {
          background: linear-gradient(135deg, #3730a3, #a5b4fc);
        }
      }

      .hero-background {
        position: absolute;
        inset: 0;
        z-index: 1;
      }

      .hero-content {
        position: relative;
        z-index: 2;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
        display: grid;
        grid-template-columns: 1.4fr 1fr;
        gap: 60px;
        align-items: center;
      }

      .hero-title {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 20px;
        font-family: "Poppins", sans-serif;
        line-height: 1.35;
      }

      .hero-subtitle {
        font-size: 1.5rem;
        margin-bottom: 20px;
        font-weight: 400;
        opacity: 0.95;
      }

      .hero-description {
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 40px;
        opacity: 0.9;
      }

      .hero-actions {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
      }

      /* Primary Button */
      .cta-button {
        padding: 12px 32px !important;
        font-size: 1rem !important;
        border-radius: 24px !important;
        font-weight: 600 !important;
        text-transform: none !important;
        background-color: #ffffff !important;
        color: #4338ca !important;
      }

      /* Secondary Button */
      .secondary-button {
        padding: 12px 32px !important;
        font-size: 1rem !important;
        border-radius: 24px !important;
        font-weight: 600 !important;
        text-transform: none !important;
        border: 1px solid rgba(255, 255, 255, 0.6) !important;
        color: #ffffff !important;
      }

      .hero-stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 28px;
      }

      .stat-item {
        text-align: center;
        padding: 26px 20px;
        background: rgba(255, 255, 255, 0.12);
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.25);
        backdrop-filter: blur(8px);
        transition:
          transform 0.3s ease,
          background 0.3s ease;
      }

      .stat-item:hover {
        transform: translateY(-6px);
        background: rgba(255, 255, 255, 0.18);
      }

      .stat-number {
        font-size: 2.6rem;
        font-weight: 700;
        margin-bottom: 8px;
      }

      .stat-label {
        font-size: 0.95rem;
        opacity: 0.9;
      }

      .cta-button {
        padding: 12px 32px !important;
        font-size: 1.1rem !important;
        border-radius: 25px !important;
        font-weight: 600 !important;
        text-transform: none !important;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3) !important;
      }

      .secondary-button {
        padding: 12px 32px !important;
        font-size: 1.1rem !important;
        border-radius: 25px !important;
        font-weight: 600 !important;
        text-transform: none !important;
        border: 2px solid rgba(255, 255, 255, 0.3) !important;
        color: white !important;
      }

      .hero-stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
      }

      .stat-item {
        text-align: center;
        padding: 30px 20px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        backdrop-filter: blur(15px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        position: relative;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
      }

      .stat-item::before {
        content: "";
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(
          45deg,
          transparent,
          rgba(255, 255, 255, 0.1),
          transparent
        );
        transform: rotate(45deg);
        transition: all 0.6s ease;
        opacity: 0;
      }

      .stat-item:hover {
        transform: translateY(-10px) scale(1.05);
        background: rgba(255, 255, 255, 0.2);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
      }

      .stat-item:hover::before {
        opacity: 1;
        animation: sweep 1.5s ease-in-out;
      }

      @keyframes sweep {
        0% {
          transform: translateX(-100%) translateY(-100%) rotate(45deg);
        }
        100% {
          transform: translateX(100%) translateY(100%) rotate(45deg);
        }
      }

      .stat-number {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 10px;
        font-family: "Poppins", sans-serif;
      }

      .stat-label {
        font-size: 1rem;
        opacity: 0.8;
      }
      .features-section {
        padding: 100px 0;
        background: #f5f7ff;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
      }

      .section-header {
        text-align: center;
        margin-bottom: 60px;
      }

      .section-header h2 {
        font-size: 2.5rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 20px;
      }

      .section-header p {
        font-size: 1.2rem;
        font-weight: 400;
        color: #4b5563;
        margin: 0;
      }

      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 40px;
      }

      .feature-card {
        text-align: center;
        padding: 45px 30px;
        background: #ffffff;
        border-radius: 20px;
        border: 1px solid #e5e7eb;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
        transition:
          transform 0.3s ease,
          box-shadow 0.3s ease;
      }

      .feature-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);
      }

      .feature-icon {
        width: 90px;
        height: 90px;
        margin: 0 auto 30px auto;
        background: linear-gradient(135deg, #4338ca, #818cf8);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
      }

      .feature-icon mat-icon {
        font-size: 36px !important;
        width: 36px !important;
        height: 36px !important;
        line-height: 36px !important;
      }

      .feature-card:hover .feature-icon {
        transform: scale(1.08);
      }

      .feature-card h3 {
        font-size: 1.5rem;
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 18px;
      }

      .feature-card p {
        color: #4b5563;
        line-height: 1.6;
        font-size: 0.98rem;
      }

      /* ================= COURSES PREVIEW SECTION ================= */

      .courses-preview-section {
        padding: 110px 0;
        background: linear-gradient(to bottom, #f5f7ff, #ffffff);
      }

      .courses-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 40px;
        margin-bottom: 50px;
      }

      /* ================= COURSE CARD ================= */

      .course-card {
        border-radius: 20px !important;
        border: 1px solid #eef2ff;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06) !important;
        transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        background: #ffffff;
        position: relative;
        overflow: hidden !important;
      }

      /* Top Accent Strip */
      .course-card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 4px;
        width: 100%;
        background: linear-gradient(135deg, #4338ca, #818cf8);
      }

      /* Hover Effect */
      .course-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 25px 50px rgba(67, 56, 202, 0.15) !important;
      }

      /* ================= IMAGE ================= */

      .course-image {
        height: 200px;
        background: linear-gradient(135deg, #4338ca, #818cf8);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
      }

      .course-image mat-icon {
        font-size: 50px !important;
        width: 50px !important;
        height: 50px !important;
        transition: transform 0.3s ease;
      }

      /* Icon Hover Animation */
      .course-card:hover .course-image mat-icon {
        transform: scale(1.15);
      }

      /* ================= CONTENT ================= */

      .course-card h3 {
        font-size: 1.4rem;
        font-weight: 600;
        color: #1f2937;
        margin: 18px 0 14px 0;
      }

      .course-card p {
        color: #4b5563;
        line-height: 1.6;
        margin: 14px 0 22px 0;
        font-size: 0.95rem;
        text-align: justify;
      }

      /* ================= META ================= */

      .course-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        margin-bottom: 24px;
      }

      .course-meta span {
        display: flex;
        align-items: center;
        gap: 6px;
        color: #6b7280;
        font-size: 0.9rem;
        font-weight: 500;
      }

      .course-meta mat-icon {
        font-size: 18px !important;
        width: 18px !important;
        height: 18px !important;
      }

      /* ================= ACTIONS ================= */

      .course-card mat-card-actions {
        padding: 18px 24px !important;
        display: flex !important;
        justify-content: space-between !important;
        gap: 12px !important;
      }

      .course-card button {
        border-radius: 8px !important;
        font-weight: 500 !important;
        text-transform: none !important;
        transition: transform 0.2s ease !important;
      }

      .course-card button:hover {
        transform: translateY(-2px);
      }

      .course-card button:active {
        transform: scale(0.98);
      }

      /* ================= VIEW ALL BUTTON ================= */

      .view-all-courses {
        text-align: center;
      }

      .view-all-btn {
        padding: 14px 36px !important;
        font-size: 1rem !important;
        border-radius: 22px !important;
        font-weight: 600 !important;
        text-transform: none !important;
      }

      mat-card.course-card {
        border: none !important;
      }

      /* ================= TESTIMONIALS SECTION ================= */

      .testimonials-section {
        padding: 100px 0;
        background: #f5f7ff;
      }

      .testimonials-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 30px;
      }

      .testimonial-card {
        background: #ffffff;
        padding: 40px 30px;
        border-radius: 20px;
        border: 1px solid #e5e7eb;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
        transition:
          transform 0.3s ease,
          box-shadow 0.3s ease;
      }

      .testimonial-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 18px 38px rgba(0, 0, 0, 0.08);
      }

      .testimonial-content {
        margin-bottom: 30px;
      }

      .testimonial-content p {
        font-size: 1.05rem;
        line-height: 1.7;
        color: #4b5563;
        font-style: italic;
        margin: 0;
      }

      .testimonial-author {
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .author-avatar {
        width: 52px;
        height: 52px;
        background: linear-gradient(135deg, #4338ca, #818cf8);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
      }

      .author-avatar mat-icon {
        font-size: 22px !important;
        width: 22px !important;
        height: 22px !important;
      }

      .author-info h4 {
        margin: 0 0 5px 0;
        color: #1f2937;
        font-weight: 600;
      }

      .author-info span {
        color: #6b7280;
        font-size: 0.9rem;
      }

      /* ================= CTA SECTION ================= */

      .cta-section {
        padding: 110px 0;
        background: linear-gradient(135deg, #4338ca, #3730a3);
        color: #ffffff;
        text-align: center;
      }

      .cta-content {
        max-width: 900px;
        margin: 0 auto;
        padding: 0 20px;
      }

      .cta-content h2 {
        font-size: 2.6rem;
        font-weight: 700;
        margin-bottom: 20px;
      }

      .cta-content p {
        font-size: 1.15rem;
        margin-bottom: 45px;
        opacity: 0.95;
      }

      .cta-actions {
        display: flex;
        gap: 22px;
        justify-content: center;
        flex-wrap: wrap;
      }

      .features-section {
        background: #f5f7ff;
      }

      .courses-preview-section {
        background: #ffffff;
      }

      .testimonials-section {
        background: #f5f7ff;
      }

      /* ================= RESPONSIVE ================= */

      /* Tablet */
      @media (max-width: 900px) {
        .hero-content {
          grid-template-columns: 1fr;
          text-align: center;
        }
      }

      /* Small Tablet / Large Mobile */
      @media (max-width: 600px) {
        .hero-title {
          font-size: 2rem;
        }
        .hero-subtitle {
          font-size: 1.2rem;
        }
        .hero-description {
          font-size: 0.95rem;
        }

        .hero-stats {
          grid-template-columns: 1fr; /* Better mobile layout */
        }

        .hero-actions,
        .cta-actions {
          flex-direction: column;
          align-items: center;
        }

        .cta-button,
        .secondary-button {
          width: 100%;
          max-width: 260px;
        }
      }

      /* Very Small Mobile */
      @media (max-width: 360px) {
        .section-header h2 {
          font-size: 1.6rem;
        }
        .stat-number {
          font-size: 1.8rem;
        }
      }
    `,
  ],
})
export class HomepageComponent implements OnInit {
  instituteInfo: any = null;

  features = [
    {
      icon: "school",
      title: "Expert Instructors",
      description:
        "Learn from industry professionals with years of real-world experience and proven track records.",
    },
    {
      icon: "schedule",
      title: "Flexible Learning",
      description:
        "Study at your own pace with our flexible scheduling options and online learning platforms.",
    },
    {
      icon: "workspace_premium",
      title: "Industry Certification",
      description:
        "Earn recognized certifications that boost your career prospects and validate your skills.",
    },
    {
      icon: "support_agent",
      title: "24/7 Support",
      description:
        "Get help whenever you need it with our dedicated student support team available around the clock.",
    },
    {
      icon: "trending_up",
      title: "Career Growth",
      description:
        "Access our career services including job placement assistance and professional networking opportunities.",
    },
    {
      icon: "devices",
      title: "Modern Technology",
      description:
        "Learn using cutting-edge tools and technologies that are currently used in the industry.",
    },
  ];

  popularCourses = [
    {
      name: "Full Stack Web Development",
      shortDescription: "Master frontend, backend, databases, and deployment.",
      duration: "6 months",
      level: "Intermediate",
      icon: "code",
    },
    {
      name: "Data Science & Analytics",
      shortDescription:
        "Learn Python, machine learning, and data visualization for data-driven insights.",
      duration: "8 months",
      level: "Advanced",
      icon: "analytics",
    },
    {
      name: "Digital Marketing",
      shortDescription:
        "Comprehensive digital marketing including SEO, social media, and content strategy.",
      duration: "4 months",
      level: "Beginner",
      icon: "campaign",
    },
  ];

  testimonials = [
    {
      name: "Raj Raman",
      course: "Full Stack Development Graduate",
      content:
        "The course completely transformed my career. I went from having no coding experience to landing a job as a full-stack developer at a tech startup. The instructors were amazing and the curriculum was very practical.",
    },
    {
      name: "Sneha Pawar",
      course: "Data Science Graduate",
      content:
        "Ignite - Institute of Excellence  provided me with the skills and confidence I needed to transition into data science. The hands-on projects and real-world applications made all the difference in my learning journey.",
    },
    {
      name: "Tilesh Sahu",
      course: "Digital Marketing Graduate",
      content:
        "I was able to start my own digital marketing agency after completing the course. The knowledge I gained about SEO, social media marketing, and analytics has been invaluable for my business success.",
    },
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadInstituteInfo();
  }

  loadInstituteInfo(): void {
    this.http.get("http://localhost:8080/api/public/institute-info").subscribe({
      next: (info) => {
        this.instituteInfo = info;
      },
      error: (error) => {
        console.error("Error loading institute info:", error);
        // Use default values if API fails
      },
    });
  }

  learnMore(course: any): void {
    // Show course information in a snackbar
    console.log("Learn more about:", course.name);
    this.snackBar
      .open(
        `📚 ${course.name} - ${course.duration} (${course.level}) | ${course.shortDescription}`,
        "Contact Us",
        {
          duration: 8000,
          horizontalPosition: "center",
          verticalPosition: "bottom",
          panelClass: ["course-info-snackbar"],
        },
      )
      .onAction()
      .subscribe(() => {
        this.router.navigate(["/contact"], {
          queryParams: {
            course: course.name,
            action: "learn-more",
          },
        });
      });
  }

  enrollNow(course: any): void {
    // Show enrollment confirmation and navigate to contact form
    console.log("Enroll in:", course.name);
    this.snackBar.open(
      `🚀 Great choice! Redirecting you to enrollment form for ${course.name}`,
      "OK",
      {
        duration: 3000,
        horizontalPosition: "center",
        verticalPosition: "top",
        panelClass: ["enrollment-snackbar"],
      },
    );

    // Navigate after a short delay for better UX
    setTimeout(() => {
      this.router.navigate(["/contact"], {
        queryParams: {
          course: course.name,
          action: "enroll",
        },
      });
    }, 1000);
  }
}
