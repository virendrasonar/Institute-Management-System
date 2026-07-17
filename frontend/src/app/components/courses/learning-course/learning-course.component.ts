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

interface CourseModule {
  title: string;
  videoUrl?: string;
}

@Component({
  selector: "app-learning-course",
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule],
  template: `
    <main class="learning-shell">
      <div *ngIf="loading" class="state"><mat-spinner diameter="48"></mat-spinner></div>
      <div *ngIf="error" class="state error-state">
        <mat-icon>lock</mat-icon>
        <h1>This learning link is not available</h1>
        <p>Enroll in the course again or use your original learning link.</p>
        <a mat-raised-button color="primary" routerLink="/courses">Browse Courses</a>
      </div>

      <ng-container *ngIf="learning as data">
        <header class="course-header">
          <div>
            <span class="eyebrow">Student course dashboard</span>
            <h1>{{ data.course.name }}</h1>
            <p>Welcome, {{ data.studentName }}. Continue module by module and track your progress.</p>
          </div>
          <div class="header-actions">
            <div class="enrollment-status">
              <mat-icon>verified</mat-icon>
              <div><strong>Enrolled</strong><small>Since {{ data.enrolledAt | date:'mediumDate' }}</small></div>
            </div>
            <a mat-stroked-button routerLink="/courses"><mat-icon>library_books</mat-icon> All Courses</a>
          </div>
        </header>

        <section class="learning-layout">
          <div class="player-column">
            <section class="player-card">
              <div class="responsive-player" *ngIf="activeEmbedUrl">
                <iframe [src]="activeEmbedUrl" [title]="activeModuleTitle"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
              <div class="responsive-player" *ngIf="!activeEmbedUrl && isUploadedVideo(data.course)">
                <video [src]="data.course.videoUrl" controls playsinline preload="metadata"></video>
              </div>
              <div class="no-video" *ngIf="!activeEmbedUrl && !isUploadedVideo(data.course)">
                <mat-icon>ondemand_video</mat-icon>
                <h2>Video coming soon</h2>
                <p>You can continue with the course information and materials below.</p>
              </div>
            </section>

            <section class="module-panel">
              <mat-card class="module-card">
                <div class="module-header">
                  <div>
                    <span class="eyebrow">Course modules</span>
                    <h2>Lessons</h2>
                  </div>
                  <strong>{{ completedModuleCount }}/{{ modules.length }}</strong>
                </div>

                <div class="module-list">
                  <button
                    type="button"
                    class="module-row"
                    *ngFor="let module of modules; let index = index"
                    [class.active]="index === activeModuleIndex"
                    [class.complete]="completedModuleIndexes.has(index)"
                    (click)="selectModule(index)"
                  >
                    <span class="module-number">{{ index + 1 }}</span>
                    <span class="module-title">{{ module.title }}</span>
                    <mat-icon>{{ completedModuleIndexes.has(index) ? 'check_circle' : 'play_circle' }}</mat-icon>
                  </button>
                </div>
              </mat-card>
            </section>

            <section class="completion-panel">
              <div class="completion-copy">
                <span class="completion-icon">
                  <mat-icon>{{ data.progressPercent === 100 ? 'verified' : 'trending_up' }}</mat-icon>
                </span>
                <div>
                  <span class="eyebrow">Course progress</span>
                  <h2>{{ data.progressPercent }}% complete</h2>
                  <p>{{ completedModuleCount }} of {{ modules.length }} modules completed.</p>
                </div>
              </div>
              <button mat-raised-button color="primary" (click)="toggleActiveModule()" [disabled]="updatingProgress">
                <mat-spinner *ngIf="updatingProgress" diameter="20"></mat-spinner>
                <mat-icon *ngIf="!updatingProgress">{{ isActiveModuleComplete ? 'restart_alt' : 'task_alt' }}</mat-icon>
                {{ isActiveModuleComplete ? 'Mark Module Incomplete' : 'Mark Module Complete' }}
              </button>
            </section>
          </div>
        </section>

        <div class="learning-grid">
          <section class="main-content">
            <mat-card class="content-card">
              <h2>About this course</h2>
              <p>{{ data.course.description }}</p>
              <div class="meta">
                <span><mat-icon>person</mat-icon>{{ data.course.instructor || 'Expert instructor' }}</span>
                <span><mat-icon>schedule</mat-icon>{{ data.course.duration || 'Self-paced' }}</span>
                <span><mat-icon>trending_up</mat-icon>{{ data.course.level || 'All levels' }}</span>
              </div>
            </mat-card>
            <mat-card class="content-card" *ngIf="data.course.features">
              <h2>What you will learn</h2>
              <p class="preserve-lines">{{ data.course.features }}</p>
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
          </aside>
        </div>
      </ng-container>
    </main>
  `,
  styles: [`
    :host{display:block;min-height:100vh;background:#f5f7ff}.learning-shell{max-width:1180px;margin:auto;padding:38px 22px 70px}.state{min-height:60vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:12px}.error-state>mat-icon{font-size:58px;width:58px;height:58px;color:#4338ca}
    .course-header{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;margin-bottom:24px;padding:30px 34px;border-radius:22px;background:linear-gradient(135deg,#1d4ed8,#4338ca 52%,#7c3aed);color:#fff;box-shadow:0 18px 42px rgba(67,56,202,.26)}.eyebrow{text-transform:uppercase;letter-spacing:1.2px;color:#dbeafe;font-weight:800;font-size:11px}.course-header h1{font-size:36px;margin:8px 0;letter-spacing:0}.course-header p{margin:0;color:#dbeafe}.header-actions{display:flex;flex:0 0 auto;align-items:center;gap:12px}.course-header a{border-color:#bfdbfe;color:#fff;white-space:nowrap}.enrollment-status{display:flex;align-items:center;gap:9px;padding:8px 12px;border:1px solid rgba(255,255,255,.26);border-radius:12px;background:rgba(255,255,255,.12)}.enrollment-status div{display:grid;gap:1px}.enrollment-status strong{font-size:13px}.enrollment-status small{color:#dbeafe;font-size:10px;white-space:nowrap}
    .learning-layout{display:block}.player-card{overflow:hidden;border-radius:20px;background:#0f172a;box-shadow:0 18px 42px rgba(15,23,42,.24)}.responsive-player{position:relative;width:100%;padding-top:56.25%}.responsive-player iframe,.responsive-player video{position:absolute;inset:0;width:100%;height:100%;border:0;background:#000}.no-video{min-height:390px;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}.no-video mat-icon{font-size:62px;width:62px;height:62px;color:#93c5fd}.no-video h2{margin:10px 0 4px}.no-video p{color:#cbd5e1}
    .completion-panel{display:flex;align-items:center;justify-content:space-between;gap:24px;margin-top:20px;padding:22px 24px;border:1px solid #e0e7ff;border-radius:18px;background:#fff;box-shadow:0 9px 28px rgba(15,23,42,.07)}.completion-copy{display:flex;align-items:center;gap:15px}.completion-copy h2{margin:3px 0;color:#111827;font-size:20px}.completion-copy p{margin:0;color:#64748b}.completion-icon{display:grid;flex:0 0 48px;width:48px;height:48px;place-items:center;border-radius:14px;background:#eef2ff;color:#4338ca}.completion-panel>button{min-width:220px;height:48px;border-radius:10px;font-weight:800}.completion-panel mat-spinner{display:inline-block;margin-right:7px}
    .module-panel{margin-top:20px}.module-card{padding:20px;border:1px solid #e0e7ff;border-radius:18px!important;box-shadow:0 10px 28px rgba(15,23,42,.07)}.module-header{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:14px}.module-header h2{margin:4px 0 0;color:#111827}.module-header strong{padding:7px 10px;border-radius:999px;background:#eef2ff;color:#4338ca}.module-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px}.module-row{width:100%;display:grid;grid-template-columns:34px minmax(0,1fr) 24px;align-items:center;gap:10px;padding:12px;border:1px solid #e5e7eb;border-radius:14px;background:#fff;color:#334155;text-align:left;cursor:pointer;transition:.2s ease}.module-row:hover,.module-row.active{border-color:#93c5fd;background:#eff6ff}.module-row.complete{border-color:#bbf7d0;background:#f0fdf4}.module-number{display:grid;width:30px;height:30px;place-items:center;border-radius:10px;background:#eef2ff;color:#4338ca;font-weight:850}.module-title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:750}.module-row mat-icon{color:#4338ca}.module-row.complete mat-icon{color:#16a34a}
    .learning-grid{display:grid;grid-template-columns:1fr 355px;gap:25px;margin-top:25px}.main-content{display:grid;gap:20px;align-content:start}.content-card{border-radius:17px!important;padding:25px;border:1px solid #e0e7ff;box-shadow:0 9px 28px rgba(15,23,42,.07)}.content-card h2{color:#111827;margin:0 0 13px}.content-card>p{line-height:1.7;color:#526173}.preserve-lines{white-space:pre-line}.meta{display:flex;flex-wrap:wrap;gap:18px;margin-top:23px;padding-top:18px;border-top:1px solid #e5e7eb}.meta span{display:flex;align-items:center;gap:7px;color:#475569}.meta mat-icon{color:#4338ca;font-size:19px;width:19px;height:19px}
    aside{display:grid;gap:18px;align-content:start}.materials-card h2{display:flex;align-items:center;gap:9px}.material{display:flex;align-items:center;gap:10px;padding:12px 0;border-top:1px solid #e5e7eb}.material mat-icon{color:#4338ca}.material a{color:#2563eb;text-decoration:none;font-weight:700;overflow-wrap:anywhere}.muted{color:#777!important}
    @media(max-width:900px){.course-header{align-items:start;flex-direction:column}.course-header h1{font-size:29px}.header-actions{width:100%;justify-content:space-between}.learning-grid{grid-template-columns:1fr}.completion-panel{align-items:stretch;flex-direction:column}.completion-panel>button{width:100%}.no-video{min-height:250px}}@media(max-width:480px){.learning-shell{padding:25px 14px 50px}.header-actions{align-items:stretch;flex-direction:column}.enrollment-status{justify-content:center}.completion-copy{align-items:flex-start}.content-card{padding:20px}.meta{display:grid;gap:10px}.module-list{grid-template-columns:1fr}}
  `],
})
export class LearningCourseComponent implements OnInit {
  learning?: LearningCourse;
  activeEmbedUrl?: SafeResourceUrl;
  activeModuleTitle = "";
  modules: CourseModule[] = [];
  materials: Array<{ label: string; url?: string }> = [];
  completedModuleIndexes = new Set<number>();
  activeModuleIndex = 0;
  loading = true;
  error = false;
  updatingProgress = false;
  private accessToken = "";

  constructor(
    private readonly route: ActivatedRoute,
    private readonly courseService: CourseService,
    private readonly sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    const accessToken = this.route.snapshot.paramMap.get("accessToken");
    if (!accessToken) {
      this.loading = false;
      this.error = true;
      return;
    }

    this.accessToken = accessToken;
    this.courseService.getLearningCourse(accessToken).subscribe({
      next: (learning) => {
        this.learning = learning;
        this.modules = this.parseModules(learning.course);
        this.materials = this.parseMaterials(learning.course.materials);
        this.restoreCompletedModules(learning.progressPercent);
        this.selectModule(0);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
    });
  }

  get completedModuleCount(): number {
    return this.completedModuleIndexes.size;
  }

  get isActiveModuleComplete(): boolean {
    return this.completedModuleIndexes.has(this.activeModuleIndex);
  }

  selectModule(index: number): void {
    this.activeModuleIndex = index;
    const module = this.modules[index];
    this.activeModuleTitle = module?.title || this.learning?.course.name || "Course video";
    this.activeEmbedUrl = module?.videoUrl ? this.createYouTubeEmbed(module.videoUrl) : this.createCourseEmbed(this.learning?.course);
  }

  toggleActiveModule(): void {
    if (!this.accessToken || this.modules.length === 0) return;

    const nextCompleted = new Set(this.completedModuleIndexes);
    if (nextCompleted.has(this.activeModuleIndex)) {
      nextCompleted.delete(this.activeModuleIndex);
    } else {
      nextCompleted.add(this.activeModuleIndex);
    }

    const progressPercent = Math.round((nextCompleted.size / this.modules.length) * 100);
    this.updatingProgress = true;
    this.courseService.updateLearningProgress(this.accessToken, progressPercent).subscribe({
      next: (learning) => {
        this.learning = learning;
        this.completedModuleIndexes = nextCompleted;
        this.updatingProgress = false;
      },
      error: () => {
        this.updatingProgress = false;
      },
    });
  }

  isUploadedVideo(course: Course): boolean {
    return course.videoType === "UPLOADED" && !!course.videoUrl;
  }

  private restoreCompletedModules(progressPercent: number): void {
    this.completedModuleIndexes.clear();
    const completedCount = Math.round((progressPercent / 100) * this.modules.length);
    for (let index = 0; index < completedCount; index++) {
      this.completedModuleIndexes.add(index);
    }
  }

  private parseModules(course: Course): CourseModule[] {
    const configuredModules = (course.modules || "")
      .split(/\r?\n/)
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((entry) => {
        const [title, videoUrl] = entry.split("|").map((part) => part.trim());
        return { title: title || "Course module", videoUrl };
      });

    if (configuredModules.length > 0) return configuredModules;

    return [{
      title: course.name || "Course video",
      videoUrl: course.videoUrl,
    }];
  }

  private createCourseEmbed(course?: Course): SafeResourceUrl | undefined {
    if (!course || course.videoType !== "YOUTUBE") return undefined;
    return this.createYouTubeEmbed(course.videoUrl || course.videoId || "");
  }

  private createYouTubeEmbed(value: string): SafeResourceUrl | undefined {
    const videoId = this.extractYouTubeId(value);
    if (!videoId) return undefined;
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`,
    );
  }

  private extractYouTubeId(value: string): string | undefined {
    if (/^[A-Za-z0-9_-]{11}$/.test(value)) return value;
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
