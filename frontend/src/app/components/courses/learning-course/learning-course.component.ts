import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Course, LearningCourse } from "../../../models/course.model";
import { CourseService } from "../../../services/course.service";

@Component({
  selector: "app-learning-course",
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule],
  template: `
    <main class="learning-shell">
      <div *ngIf="loading" class="state"><mat-spinner diameter="48"></mat-spinner></div>
      <div *ngIf="error" class="state error-state">
        <mat-icon>lock</mat-icon><h1>This learning link is not available</h1>
        <p>Enroll in the course again or use your original learning link.</p>
        <a mat-raised-button color="primary" routerLink="/courses">Browse Courses</a>
      </div>

      <ng-container *ngIf="learning as data">
        <header class="course-header">
          <div>
            <span class="eyebrow">Student course dashboard</span>
            <h1>{{ data.course.name }}</h1>
            <p>Welcome, {{ data.studentName }}. Your enrolled content is ready below.</p>
          </div>
          <a mat-stroked-button routerLink="/courses"><mat-icon>library_books</mat-icon> All Courses</a>
        </header>

        <section class="player-card">
          <div class="responsive-player" *ngIf="youtubeEmbedUrl">
            <iframe [src]="youtubeEmbedUrl" [title]="data.course.name + ' video'"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
          <div class="responsive-player" *ngIf="isUploadedVideo(data.course)">
            <video [src]="data.course.videoUrl" controls playsinline preload="metadata"></video>
          </div>
          <div class="no-video" *ngIf="!youtubeEmbedUrl && !isUploadedVideo(data.course)">
            <mat-icon>ondemand_video</mat-icon><h2>Video coming soon</h2>
            <p>You can continue with the course information and materials below.</p>
          </div>
        </section>

        <div class="learning-grid">
          <section class="main-content">
            <mat-card class="content-card">
              <h2>About this course</h2><p>{{ data.course.description }}</p>
              <div class="meta">
                <span><mat-icon>person</mat-icon>{{ data.course.instructor || 'Expert instructor' }}</span>
                <span><mat-icon>schedule</mat-icon>{{ data.course.duration || 'Self-paced' }}</span>
                <span><mat-icon>trending_up</mat-icon>{{ data.course.level || 'All levels' }}</span>
              </div>
            </mat-card>
            <mat-card class="content-card" *ngIf="data.course.features">
              <h2>What you will learn</h2><p class="preserve-lines">{{ data.course.features }}</p>
            </mat-card>
          </section>

          <aside>
            <mat-card class="content-card materials-card">
              <h2><mat-icon>folder_open</mat-icon> Course materials</h2>
              <p *ngIf="materials.length === 0" class="muted">No additional materials have been added yet.</p>
              <div class="material" *ngFor="let material of materials">
                <mat-icon>{{ material.url ? 'link' : 'description' }}</mat-icon>
                <a *ngIf="material.url" [href]="material.url" target="_blank" rel="noopener noreferrer">{{ material.label }}</a>
                <span *ngIf="!material.url">{{ material.label }}</span>
              </div>
            </mat-card>
            <mat-card class="content-card enrolled-card">
              <mat-icon>verified</mat-icon>
              <div><strong>Enrolled</strong><small>{{ data.enrolledAt | date:'mediumDate' }}</small></div>
            </mat-card>
          </aside>
        </div>
      </ng-container>
    </main>
  `,
  styles: [`
    :host{display:block;min-height:100vh;background:linear-gradient(145deg,#f7f8ff,#f1edff)}.learning-shell{max-width:1180px;margin:auto;padding:38px 22px 70px}.state{min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:12px}.error-state>mat-icon{font-size:58px;width:58px;height:58px;color:#6d4ed1}
    .course-header{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;margin-bottom:24px}.eyebrow{text-transform:uppercase;letter-spacing:1.3px;color:#6d4ed1;font-weight:700;font-size:12px}.course-header h1{font-size:36px;color:#25205c;margin:8px 0}.course-header p{margin:0;color:#666}.course-header a{border-color:#6d4ed1;color:#5b21b6}
    .player-card{overflow:hidden;border-radius:22px;background:#17132f;box-shadow:0 20px 48px #312e8130}.responsive-player{position:relative;width:100%;padding-top:56.25%}.responsive-player iframe,.responsive-player video{position:absolute;inset:0;width:100%;height:100%;border:0;background:#000}.no-video{min-height:390px;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}.no-video mat-icon{font-size:62px;width:62px;height:62px;color:#a78bfa}.no-video h2{margin:10px 0 4px}.no-video p{color:#c7c1df}
    .learning-grid{display:grid;grid-template-columns:1fr 355px;gap:25px;margin-top:25px}.main-content{display:grid;gap:20px;align-content:start}.content-card{border-radius:17px;padding:25px;border:1px solid #e6e1ff;box-shadow:0 9px 28px #312e8110}.content-card h2{color:#25205c;margin:0 0 13px}.content-card>p{line-height:1.7;color:#56566a}.preserve-lines{white-space:pre-line}.meta{display:flex;flex-wrap:wrap;gap:18px;margin-top:23px;padding-top:18px;border-top:1px solid #ece9f8}.meta span{display:flex;align-items:center;gap:7px;color:#514d6d}.meta mat-icon{color:#6d4ed1;font-size:19px;width:19px;height:19px}
    aside{display:grid;gap:18px;align-content:start}.materials-card h2{display:flex;align-items:center;gap:9px}.material{display:flex;align-items:center;gap:10px;padding:12px 0;border-top:1px solid #eeeaf9}.material mat-icon{color:#6d4ed1}.material a{color:#4f46e5;text-decoration:none;font-weight:600;overflow-wrap:anywhere}.muted{color:#777!important}.enrolled-card{display:flex;align-items:center;gap:14px;background:#eeebff}.enrolled-card>mat-icon{font-size:38px;width:38px;height:38px;color:#5b21b6}.enrolled-card div{display:grid;gap:3px}.enrolled-card small{color:#68627d}
    @media(max-width:800px){.course-header{align-items:start;flex-direction:column}.course-header h1{font-size:29px}.learning-grid{grid-template-columns:1fr}.no-video{min-height:250px}}@media(max-width:480px){.learning-shell{padding:25px 14px 50px}.content-card{padding:20px}.meta{display:grid;gap:10px}}
  `],
})
export class LearningCourseComponent implements OnInit {
  learning?: LearningCourse;
  youtubeEmbedUrl?: SafeResourceUrl;
  materials: Array<{ label: string; url?: string }> = [];
  loading = true;
  error = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly courseService: CourseService,
    private readonly sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    const accessToken = this.route.snapshot.paramMap.get("accessToken");
    if (!accessToken) { this.loading = false; this.error = true; return; }
    this.courseService.getLearningCourse(accessToken).subscribe({
      next: (learning) => {
        this.learning = learning;
        this.youtubeEmbedUrl = this.createYouTubeEmbed(learning.course);
        this.materials = this.parseMaterials(learning.course.materials);
        this.loading = false;
      },
      error: () => { this.loading = false; this.error = true; },
    });
  }

  isUploadedVideo(course: Course): boolean {
    return course.videoType === "UPLOADED" && !!course.videoUrl;
  }

  private createYouTubeEmbed(course: Course): SafeResourceUrl | undefined {
    if (course.videoType !== "YOUTUBE") return undefined;
    const videoId = course.videoId || this.extractYouTubeId(course.videoUrl || "");
    if (!videoId) return undefined;
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`,
    );
  }

  private extractYouTubeId(value: string): string | undefined {
    const match = value.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/);
    return match?.[1];
  }

  private parseMaterials(value?: string): Array<{ label: string; url?: string }> {
    if (!value?.trim()) return [];
    return value.split(/[\n,]+/).map((entry) => entry.trim()).filter(Boolean).map((entry) => {
      if (/^https?:\/\//i.test(entry)) {
        const clean = entry.replace(/[?#].*$/, "");
        const lastPart = clean.substring(clean.lastIndexOf("/") + 1);
        return { label: decodeURIComponent(lastPart || "Open course resource").replace(/[-_]/g, " "), url: entry };
      }
      return { label: entry };
    });
  }
}
