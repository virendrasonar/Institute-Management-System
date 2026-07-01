package com.institute.admin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.EntityGraph;

import com.institute.admin.model.Enrollment;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    @EntityGraph(attributePaths = {"course", "student"})
    Optional<Enrollment> findByAccessToken(String accessToken);
    Optional<Enrollment> findByCourseIdAndStudentEmailIgnoreCase(Long courseId, String email);
}
