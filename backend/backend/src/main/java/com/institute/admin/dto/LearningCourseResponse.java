package com.institute.admin.dto;

import java.time.Instant;

import com.institute.admin.model.Course;
import com.institute.admin.model.Enrollment;

public record LearningCourseResponse(Course course, String studentName, Instant enrolledAt,
                                     Integer progressPercent, Instant completedAt) {
    public static LearningCourseResponse from(Enrollment enrollment) {
        return new LearningCourseResponse(enrollment.getCourse(), enrollment.getStudent().getName(),
                enrollment.getEnrolledAt(), enrollment.getProgressPercent(), enrollment.getCompletedAt());
    }
}
