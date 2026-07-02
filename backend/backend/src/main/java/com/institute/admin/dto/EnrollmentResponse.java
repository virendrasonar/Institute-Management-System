package com.institute.admin.dto;

import java.time.Instant;

import com.institute.admin.model.Enrollment;

public record EnrollmentResponse(
        String accessToken,
        Long courseId,
        String courseName,
        String studentName,
        Instant enrolledAt,
        Integer progressPercent) {

    public static EnrollmentResponse from(Enrollment enrollment) {
        return new EnrollmentResponse(enrollment.getAccessToken(), enrollment.getCourse().getId(),
                enrollment.getCourse().getName(), enrollment.getStudent().getName(), enrollment.getEnrolledAt(),
                enrollment.getProgressPercent());
    }
}
