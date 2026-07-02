package com.institute.admin.dto;

import java.time.Instant;

import com.institute.admin.model.Enrollment;

public record EnrollmentSummaryResponse(
        Long enrollmentId,
        Long studentId,
        String studentName,
        String studentEmail,
        Long courseId,
        String courseName,
        Instant enrolledAt,
        Integer progressPercent,
        Instant completedAt) {

    public static EnrollmentSummaryResponse from(Enrollment enrollment) {
        return new EnrollmentSummaryResponse(enrollment.getId(), enrollment.getStudent().getId(),
                enrollment.getStudent().getName(), enrollment.getStudent().getEmail(),
                enrollment.getCourse().getId(), enrollment.getCourse().getName(), enrollment.getEnrolledAt(),
                enrollment.getProgressPercent(), enrollment.getCompletedAt());
    }
}
