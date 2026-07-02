package com.institute.admin.dto;

import java.time.Instant;
import java.util.List;

import com.institute.admin.model.Enrollment;
import com.institute.admin.model.Student;

public record StudentDashboardResponse(Long studentId, String studentName, String email,
                                       List<StudentCourse> courses) {
    public static StudentDashboardResponse from(Student student, List<Enrollment> enrollments) {
        return new StudentDashboardResponse(student.getId(), student.getName(), student.getEmail(),
                enrollments.stream().map(StudentCourse::from).toList());
    }

    public record StudentCourse(Long enrollmentId, Long courseId, String courseName, String description,
                                String thumbnailUrl, String instructor, String duration, String level,
                                String accessToken, Instant enrolledAt, Integer progressPercent,
                                Instant completedAt, boolean hasVideo) {
        static StudentCourse from(Enrollment enrollment) {
            var course = enrollment.getCourse();
            return new StudentCourse(enrollment.getId(), course.getId(), course.getName(),
                    course.getDescription(), course.getThumbnailUrl(), course.getInstructor(), course.getDuration(),
                    course.getLevel(), enrollment.getAccessToken(), enrollment.getEnrolledAt(),
                    enrollment.getProgressPercent(), enrollment.getCompletedAt(),
                    "YOUTUBE".equals(course.getVideoType()) || "UPLOADED".equals(course.getVideoType()));
        }
    }
}
