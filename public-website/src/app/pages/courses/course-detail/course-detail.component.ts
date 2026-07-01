import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Course, parseFeatures, parsePrerequisites } from '../../../models/course.model';
import { ApiService } from '../../../services/api.service';
import { LoadingService } from '../../../services/loading.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { parseMaterials } from '../../../models/course.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly apiService = inject(ApiService);
  private readonly loadingService = inject(LoadingService);
  private readonly errorHandler = inject(ErrorHandlerService);
  private readonly sanitizer = inject(DomSanitizer);

  course: Course | null = null;
  courseId: number | null = null;
  isLoading = false;
  error: string | null = null;

  // Course features for display
  courseFeatures: string[] = [];
  coursePrerequisites: string[] = [];
  courseMaterials: string[] = [];
  youtubeEmbedUrl: SafeResourceUrl | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.courseId = parseInt(id, 10);
      this.loadCourse();
    } else {
      this.error = 'Invalid course ID';
    }
  }

  loadCourse() {
    if (!this.courseId) return;

    this.isLoading = true;
    this.error = null;
    this.loadingService.show('Loading course details...');

    this.apiService.getCourse(this.courseId).subscribe({
      next: (courseData) => {
        this.course = courseData || null;
        if (this.course) {
          // Parse string-based features and prerequisites to arrays
          this.courseFeatures = parseFeatures(this.course.features);
          this.coursePrerequisites = parsePrerequisites(this.course.prerequisites);
          this.courseMaterials = parseMaterials(this.course.materials);
          this.youtubeEmbedUrl = this.createYoutubeEmbedUrl(this.course);
        } else {
          this.error = 'Course not found';
        }
        this.isLoading = false;
        this.loadingService.hide();
      },
      error: (error) => {
        this.error = error instanceof Error ? error.message : 'Failed to load course';
        this.errorHandler.showError(this.error);
        console.error('Error loading course:', error);
        this.isLoading = false;
        this.loadingService.hide();
      }
    });
  }

  goBack() {
    this.router.navigate(['/courses']);
  }

  enrollInCourse() {
    // This would typically open an enrollment form or redirect to enrollment page
    // For now, we'll show an alert
    alert(`Enrollment for "${this.course?.name}" will be available soon. Please contact us for more information.`);
  }

  contactAboutCourse() {
    // Navigate to contact page with course pre-filled
    this.router.navigate(['/contact'], { 
      queryParams: { 
        course: this.course?.name,
        subject: `Inquiry about ${this.course?.name}` 
      } 
    });
  }

  getStarArray(): number[] {
    return [1, 2, 3, 4, 5];
  }

  isStarFilled(star: number): boolean {
    return star <= (this.course?.rating || 0);
  }

  formatPrice(price: number | undefined): string {
    if (!price || price === 0) return 'Free';
    return `$${price.toLocaleString()}`;
  }

  getLevelClass(): string {
    if (!this.course?.level) return '';
    return `level-${this.course.level.toLowerCase()}`;
  }

  isWebLink(value: string): boolean {
    return /^https?:\/\//i.test(value);
  }

  private createYoutubeEmbedUrl(course: Course): SafeResourceUrl | null {
    if (course.videoType !== 'YOUTUBE') return null;

    const videoId = course.videoId || this.extractYoutubeId(course.videoUrl);
    if (!videoId || !/^[A-Za-z0-9_-]{11}$/.test(videoId)) return null;

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`
    );
  }

  private extractYoutubeId(value?: string): string | null {
    if (!value) return null;
    const match = value.match(/(?:youtube\.com\/watch\?(?:[^#\s]*&)?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/i);
    return match?.[1] || null;
  }
}
