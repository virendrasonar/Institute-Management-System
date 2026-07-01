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
  hasVideo?: boolean;
  materialsPreview?: string[];
}

export interface EnrollmentResult {
  accessToken: string;
  courseId: number;
  courseName: string;
  studentName: string;
  enrolledAt: string;
}

export interface LearningCourse {
  course: Course;
  studentName: string;
  enrolledAt: string;
}
