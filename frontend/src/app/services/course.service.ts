import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Course, EnrollmentResult, EnrollmentSummary, LearningCourse } from "../models/course.model";

@Injectable({
  providedIn: "root",
})
export class CourseService {
  private apiUrl = `${environment.apiUrl}/admin/courses`;
  private publicApiUrl = `${environment.apiUrl}/api/public/courses`;

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.publicApiUrl);
  }

  getPublicCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.publicApiUrl}/${id}`);
  }

  enroll(id: number, name: string, email: string, password: string): Observable<EnrollmentResult> {
    return this.http.post<EnrollmentResult>(`${this.publicApiUrl}/${id}/enroll`, { name, email, password });
  }

  updateLearningProgress(accessToken: string, progressPercent: number): Observable<LearningCourse> {
    return this.http.put<LearningCourse>(
      `${environment.apiUrl}/api/public/learning/${encodeURIComponent(accessToken)}/progress`,
      { progressPercent },
    );
  }

  getEnrollments(): Observable<EnrollmentSummary[]> {
    return this.http.get<EnrollmentSummary[]>(`${environment.apiUrl}/admin/enrollments`);
  }

  getLearningCourse(accessToken: string): Observable<LearningCourse> {
    return this.http.get<LearningCourse>(
      `${environment.apiUrl}/api/public/learning/${encodeURIComponent(accessToken)}`,
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
