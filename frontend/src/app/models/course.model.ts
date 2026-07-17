export interface Course {
  id?: number;
  name: string;
  description: string;
  duration?: string;
  level?: string;
  icon?: string;
  category?: string;
  price?: number;
  prerequisites?: string;
  features?: string;
  instructor?: string;
  rating?: number;
  studentsEnrolled?: number;
  thumbnailUrl?: string;
  videoType?: "NONE" | "YOUTUBE" | "UPLOADED";
  videoUrl?: string;
  videoId?: string;
  materials?: string;
  modules?: string;
  hasVideo?: boolean;
  materialsPreview?: string[];
}

export interface EnrollmentResult {
  accessToken: string;
  courseId: number;
  courseName: string;
  studentName: string;
  enrolledAt: string;
  progressPercent: number;
}

export interface LearningCourse {
  course: Course;
  studentName: string;
  enrolledAt: string;
  progressPercent: number;
  completedAt?: string;
}

export interface EnrollmentSummary {
  enrollmentId: number;
  studentId: number;
  studentName: string;
  studentEmail: string;
  courseId: number;
  courseName: string;
  enrolledAt: string;
  progressPercent: number;
  completedAt?: string;
}

export interface StudentCourse {
  enrollmentId: number;
  courseId: number;
  courseName: string;
  description: string;
  thumbnailUrl?: string;
  instructor?: string;
  duration?: string;
  level?: string;
  accessToken: string;
  enrolledAt: string;
  progressPercent: number;
  completedAt?: string;
  hasVideo: boolean;
}

export interface StudentDashboard {
  studentId: number;
  studentName: string;
  email: string;
  courses: StudentCourse[];
}
