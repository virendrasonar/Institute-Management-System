import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-about",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  template: `
    <!-- Hero Section -->
    <section class="about-hero">
      <div class="container">
        <div class="hero-content">
          <h1>About - Ignite Institute of Excellence(IIE)</h1>
          <p class="hero-subtitle">
            Empowering minds and shaping futures since 2010
          </p>
          <p class="hero-description">
            We are a leading educational institution dedicated to providing
            world-class education and fostering innovation in technology,
            business, and creative fields.
          </p>
        </div>
      </div>
    </section>

    <!-- Mission & Vision Section -->
    <section class="mission-vision-section">
      <div class="container">
        <div class="mission-vision-grid">
          <div class="mission-card">
            <div class="card-icon">
              <mat-icon>rocket_launch</mat-icon>
            </div>
            <h2>Our Mission</h2>
            <p>
              To provide world-class education and create leaders of tomorrow
              through innovative teaching methods, comprehensive skill
              development, and fostering a culture of continuous learning and
              Ignite - Institute of Excellence.
            </p>
          </div>

          <div class="vision-card">
            <div class="card-icon">
              <mat-icon>visibility</mat-icon>
            </div>
            <h2>Our Vision</h2>
            <p>
              To be the leading educational institution that transforms lives
              and contributes to society's progress by nurturing innovative
              thinkers, skilled professionals, and responsible global citizens.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="values-section">
      <div class="container">
        <div class="section-header">
          <h2>Our Core Values</h2>
          <p>The principles that guide everything we do</p>
        </div>

        <div class="values-grid">
          <div class="value-card" *ngFor="let value of values">
            <div class="value-icon">
              <mat-icon>{{ value.icon }}</mat-icon>
            </div>
            <h3>{{ value.title }}</h3>
            <p>{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <div class="container">
        <div class="section-header">
          <h2>Meet Our Leadership Team</h2>
          <p>Experienced professionals dedicated to your success</p>
        </div>

        <div class="team-grid">
          <div class="team-member" *ngFor="let member of teamMembers">
            <div class="member-photo">
              <mat-icon>{{ member.icon }}</mat-icon>
            </div>
            <div class="member-info">
              <h3>{{ member.name }}</h3>
              <p class="member-title">{{ member.title }}</p>
              <p class="member-bio">{{ member.bio }}</p>
              <div class="member-expertise">
                <span
                  *ngFor="let skill of member.expertise"
                  class="expertise-tag"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section class="statistics-section">
      <div class="container">
        <div class="section-header">
          <h2>Our Impact in Numbers</h2>
          <p>Measurable results that speak for themselves</p>
        </div>

        <div class="stats-grid">
          <div class="stat-item" *ngFor="let stat of statistics">
            <div class="stat-icon">
              <mat-icon>{{ stat.icon }}</mat-icon>
            </div>
            <div class="stat-number">{{ stat.number }}</div>
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-description">{{ stat.description }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- History Timeline -->
    <section class="history-section">
      <div class="container">
        <div class="section-header">
          <h2>Our Journey</h2>
          <p>Milestones in our educational Ignite - Institute of Excellence</p>
        </div>

        <div class="timeline">
          <div
            class="timeline-item"
            *ngFor="let event of timeline; let i = index"
            [class.timeline-left]="i % 2 === 0"
            [class.timeline-right]="i % 2 === 1"
          >
            <div class="timeline-content">
              <div class="timeline-year">{{ event.year }}</div>
              <h3>{{ event.title }}</h3>
              <p>{{ event.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to Join Our Community?</h2>
          <p>
            Become part of our success story and transform your future with us
          </p>
          <div class="cta-actions">
            <button
              mat-raised-button
              color="primary"
              routerLink="/courses"
              class="cta-button"
            >
              <mat-icon>school</mat-icon>
              Explore Courses
            </button>
            <button mat-button routerLink="/contact" class="secondary-button">
              <mat-icon>contact_mail</mat-icon>
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
      }

      /* ================= HERO ================= */

      .about-hero {
        background: linear-gradient(135deg, #4338ca, #818cf8);
        color: white;
        padding: 100px 0;
        text-align: center;
      }

      .hero-content h1 {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 20px;
        font-family: "Poppins", sans-serif;
      }

      .hero-subtitle {
        font-size: 1.4rem;
        margin-bottom: 25px;
        opacity: 0.9;
      }

      .hero-description {
        font-size: 1.1rem;
        line-height: 1.6;
        max-width: 800px;
        margin: 0 auto;
        opacity: 0.85;
      }

      /* ================= SECTION BACKGROUND SYSTEM ================= */

      /* Mission & Vision */
      .mission-vision-section {
        padding: 110px 0;
        background: #f8fafc; /* soft clean neutral */
      }

      /* Values */
      .values-section {
        padding: 110px 0;
        background: #eef2ff; /* soft indigo tint */
      }

      /* Statistics */
      .statistics-section {
        padding: 110px 0;
        background: #ffffff; /* clean white for clarity */
      }

      /* Timeline */
      .history-section {
        padding: 110px 0;
        background: #f3f4f8; /* soft corporate gray */
      }

      /* ================= MISSION & VISION ================= */

      .mission-vision-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 50px;
      }

      .mission-card,
      .vision-card {
        background: white;
        padding: 45px 35px;
        border-radius: 20px;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
        transition: transform 0.3s ease;
        text-align: center;
      }

      .mission-card:hover,
      .vision-card:hover {
        transform: translateY(-6px);
      }

      .card-icon {
        width: 90px;
        height: 90px;
        margin: 0 auto 25px auto;
        background: linear-gradient(135deg, #4338ca, #818cf8);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        overflow: visible;
      }

      .card-icon mat-icon {
        font-size: 36px !important;
        width: 36px !important;
        height: 36px !important;
        line-height: 1 !important;
        display: block;
      }

      .mission-card h2,
      .vision-card h2 {
        font-size: 1.8rem;
        margin-bottom: 18px;
        color: #1f2937;
      }

      .mission-card p,
      .vision-card p {
        color: #6b7280;
        line-height: 1.6;
      }

      /* ================= SECTION HEADER ================= */

      .section-header {
        text-align: center;
        margin-bottom: 60px;
      }

      .section-header h2 {
        font-size: 2.4rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 12px;
      }

      .section-header p {
        color: #6b7280;
      }

      /* ================= VALUES ================= */

      .values-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 35px;
      }

      .value-card {
        background: white;
        padding: 35px 25px;
        border-radius: 18px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
        transition: transform 0.3s ease;
        text-align: center;
      }

      .value-card:hover {
        transform: translateY(-5px);
      }

      .value-icon {
        width: 80px;
        height: 80px;
        margin: 0 auto 20px auto;
        background: linear-gradient(135deg, #4338ca, #818cf8);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        overflow: visible;
      }

      .value-icon mat-icon {
        font-size: 30px !important;
        width: 30px !important;
        height: 30px !important;
        line-height: 1 !important;
        display: block;
      }

      .value-card h3 {
        font-size: 1.3rem;
        margin-bottom: 12px;
        color: #1f2937;
      }

      .value-card p {
        color: #6b7280;
        line-height: 1.6;
      }

      /* ================= TEAM ================= */

      .team-section {
        padding: 110px 0;
        background: #f9fafb;
      }

      .team-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 40px;
      }

      /* Card */

      .team-member {
        background: #ffffff;
        border-radius: 22px;
        padding: 40px 30px;
        text-align: center;
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.06);
        transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
      }

      .team-member:hover {
        transform: translateY(-8px);
        box-shadow: 0 25px 50px rgba(67, 56, 202, 0.12);
      }

      /* Profile Circle */

      .member-photo {
        width: 115px;
        height: 115px;
        margin-bottom: 22px;
        background: linear-gradient(135deg, #4338ca, #818cf8);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
      }

      /* Icon inside circle */

      .member-photo mat-icon {
        font-size: 44px !important;
        width: 44px !important;
        height: 44px !important;
      }

      /* Name */

      .member-info h3 {
        font-size: 1.4rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 6px;
      }

      /* Title */

      .member-title {
        font-size: 0.95rem;
        font-weight: 600;
        color: #4338ca;
        margin-bottom: 18px;
      }

      /* Bio */

      .member-bio {
        font-size: 0.95rem;
        line-height: 1.7;
        color: #6b7280;
        max-width: 280px;
        margin: 0 auto 22px auto;
        min-height: 90px;
      }

      /* Expertise Tags */

      .member-expertise {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;
        margin-top: auto;
      }

      .expertise-tag {
        background: rgba(67, 56, 202, 0.1);
        color: #4338ca;
        padding: 6px 14px;
        border-radius: 30px;
        font-size: 0.8rem;
        font-weight: 500;
      }

      /* ================= STATISTICS ================= */

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 30px;
      }

      .stat-item {
        background: linear-gradient(135deg, #4338ca, #818cf8);
        color: white;
        padding: 35px 25px;
        border-radius: 20px;
        text-align: center;
        transition: transform 0.3s ease;
      }

      .stat-item:hover {
        transform: translateY(-6px);
      }

      .stat-icon {
        width: 70px;
        height: 70px;
        margin: 0 auto 15px auto;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: visible;
      }

      .stat-icon mat-icon {
        font-size: 28px !important;
        width: 28px !important;
        height: 28px !important;
        line-height: 1 !important;
        display: block;
      }

      .stat-number {
        font-size: 2.8rem;
        font-weight: 700;
        line-height: 1.2;
        margin-bottom: 8px;
        font-family: "Poppins", sans-serif;
      }

      /* ================= TIMELINE ================= */

      .timeline {
        position: relative;
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px 0;
      }

      /* Vertical Line */
      .timeline::before {
        content: "";
        position: absolute;
        left: 50%;
        width: 3px;
        background: linear-gradient(to bottom, #4338ca, #818cf8);
        top: 0;
        bottom: 0;
        transform: translateX(-50%);
      }

      /* Timeline Item */
      .timeline-item {
        position: relative;
        margin-bottom: 60px;
      }

      /* Dots on Timeline */
      .timeline-item::before {
        content: "";
        position: absolute;
        left: 50%;
        top: 20px;
        width: 16px;
        height: 16px;
        background: #ffffff;
        border: 4px solid #4338ca;
        border-radius: 50%;
        transform: translateX(-50%);
        z-index: 2;
        transition: all 0.3s ease;
      }

      /* Dot hover effect */
      .timeline-item:hover::before {
        background: #4338ca;
        box-shadow: 0 0 0 6px rgba(67, 56, 202, 0.15);
      }

      /* Card */
      .timeline-content {
        background: #ffffff;
        padding: 30px;
        border-radius: 18px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
        width: 45%;
        transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
      }

      /* Left side */
      .timeline-left .timeline-content {
        margin-right: auto;
      }

      /* Right side */
      .timeline-right .timeline-content {
        margin-left: auto;
      }

      /* Hover Highlight */
      .timeline-content:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 45px rgba(67, 56, 202, 0.15);
      }

      /* Year Badge */
      .timeline-year {
        background: linear-gradient(135deg, #4338ca, #6366f1);
        color: white;
        padding: 6px 14px;
        border-radius: 8px;
        display: inline-block;
        margin-bottom: 12px;
        font-weight: 600;
      }

      /* ================= CTA ================= */

      .cta-section {
        background: linear-gradient(135deg, #4338ca, #818cf8);
        padding: 100px 0;
        color: white;
        text-align: center;
      }

      .cta-content h2 {
        font-size: 2.6rem;
        font-weight: 700;
        margin-bottom: 20px;
        line-height: 1.3;
        letter-spacing: 0.5px;
        font-family: "Poppins", sans-serif;
      }

      .cta-content p {
        font-size: 1.15rem;
        margin-bottom: 45px;
        opacity: 0.95;
        line-height: 1.6;
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
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

      /* Button container */
      .cta-actions {
        display: flex;
        justify-content: center;
        gap: 20px;
        flex-wrap: wrap;
      }

      .mission-card p,
      .vision-card p,
      .value-card p,
      .member-bio {
        max-width: 420px;
        margin: 0 auto;
        line-height: 1.75;
        font-size: 0.98rem;
        letter-spacing: 0.2px;
      }

      .mission-card h2,
      .vision-card h2,
      .value-card h3,
      .member-info h3 {
        margin-bottom: 16px;
        letter-spacing: 0.3px;
      }

      .member-expertise {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
        margin-top: 16px;
      }

      .expertise-tag {
        background: rgba(67, 56, 202, 0.1);
        color: #4338ca;
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 500;
      }

      .mission-card,
      .vision-card,
      .value-card,
      .team-member {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      /* ================= MOBILE OPTIMIZATION ================= */

      @media (max-width: 768px) {
        /* General spacing */
        .container {
          padding: 0 16px;
        }

        /* Hero */
        .hero-content h1 {
          font-size: 2rem;
        }

        .hero-subtitle {
          font-size: 1.1rem;
        }

        .hero-description {
          font-size: 0.95rem;
        }

        /* Mission & Vision */
        .mission-vision-grid {
          grid-template-columns: 1fr;
          gap: 30px;
        }

        /* Team */
        .team-grid {
          grid-template-columns: 1fr;
          gap: 30px;
        }

        .team-member {
          padding: 30px 20px;
        }

        .member-photo {
          width: 90px;
          height: 90px;
        }

        .member-photo mat-icon {
          font-size: 36px !important;
        }

        /* Stats */
        .stats-grid {
          grid-template-columns: 1fr;
          gap: 25px;
        }

        /* Timeline */
        .timeline::before {
          left: 20px;
        }

        .timeline-item::before {
          left: 20px;
          transform: none;
        }

        .timeline-content {
          width: calc(100% - 60px);
          margin-left: 60px !important;
        }

        /* CTA buttons */
        .cta-actions {
          flex-direction: column;
          gap: 15px;
        }

        .cta-button,
        .secondary-button {
          width: 100%;
          max-width: 260px;
        }
      }
    `,
  ],
})
export class AboutComponent {
  values = [
    {
      icon: "school",
      title: "Ignite in Education",
      description:
        "We strive for the highest standards in teaching and learning, ensuring every student receives world-class education.",
    },
    {
      icon: "lightbulb",
      title: "Innovation",
      description:
        "We embrace new technologies and teaching methods to provide cutting-edge learning experiences.",
    },
    {
      icon: "diversity_3",
      title: "Inclusivity",
      description:
        "We welcome students from all backgrounds and create an environment where everyone can thrive.",
    },
    {
      icon: "handshake",
      title: "Integrity",
      description:
        "We maintain the highest ethical standards in all our interactions and educational practices.",
    },
    {
      icon: "psychology",
      title: "Student-Centered",
      description:
        "Every decision we make is focused on enhancing the student experience and success.",
    },
    {
      icon: "public",
      title: "Global Perspective",
      description:
        "We prepare students for success in an interconnected world with international standards.",
    },
  ];

  teamMembers = [
    {
      name: "Dr. Ananya Sharma",
      title: "Founder & Managing Director",
      bio: "With over 20 years of experience in education and academic leadership, Dr. Sharma leads the institute’s mission to deliver quality, industry-relevant education.",
      expertise: [
        "Academic Leadership",
        "Curriculum Design",
        "Educational Strategy",
      ],
      icon: "person",
    },
    {
      name: "Prof. Rahul Mehta",
      title: "Academic Director",
      bio: "A senior academician with deep expertise in computer science and data analytics, Prof. Mehta ensures our curriculum meets modern industry standards.",
      expertise: [
        "Computer Science",
        "Data Analytics",
        "Curriculum Development",
      ],
      icon: "person",
    },
    {
      name: "Ms. Neha Kulkarni",
      title: "Student Success Manager",
      bio: "Committed to student growth, Ms. Kulkarni provides personalized academic support and career guidance to help learners achieve their professional goals.",
      expertise: [
        "Student Mentorship",
        "Career Guidance",
        "Program Coordination",
      ],
      icon: "person",
    },
  ];

  statistics = [
    {
      icon: "people",
      number: "5,000+",
      label: "Graduates",
      description: "Successful alumni worldwide",
    },
    {
      icon: "school",
      number: "50+",
      label: "Courses",
      description: "Comprehensive programs",
    },
    {
      icon: "work",
      number: "95%",
      label: "Job Placement",
      description: "Within 6 months of graduation",
    },
    {
      icon: "star",
      number: "4.9/5",
      label: "Student Rating",
      description: "Average satisfaction score",
    },
  ];

  timeline = [
    {
      year: "2010",
      title: "Foundation",
      description:
        "Ignite - Institute of Excellence  was founded with a vision to provide world-class education in technology and business.",
    },
    {
      year: "2013",
      title: "First Campus",
      description:
        "Opened our flagship campus with state-of-the-art facilities and modern learning environments.",
    },
    {
      year: "2016",
      title: "Online Platform Launch",
      description:
        "Launched our comprehensive online learning platform, making education accessible globally.",
    },
    {
      year: "2019",
      title: "Industry Partnerships",
      description:
        "Established partnerships with leading tech companies for internships and job placements.",
    },
    {
      year: "2022",
      title: "AI Integration",
      description:
        "Integrated AI-powered learning tools to personalize education for each student.",
    },
    {
      year: "2025",
      title: "Global Expansion",
      description:
        "Expanding to serve students worldwide with localized programs and support.",
    },
  ];
}
