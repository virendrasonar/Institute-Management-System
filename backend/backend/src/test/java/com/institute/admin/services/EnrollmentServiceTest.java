package com.institute.admin.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.institute.admin.model.Course;
import com.institute.admin.model.Enrollment;
import com.institute.admin.model.Student;
import com.institute.admin.repository.CourseRepository;
import com.institute.admin.repository.EnrollmentRepository;
import com.institute.admin.repository.StudentRepository;

@ExtendWith(MockitoExtension.class)
class EnrollmentServiceTest {
    @Mock private EnrollmentRepository enrollmentRepository;
    @Mock private CourseRepository courseRepository;
    @Mock private StudentRepository studentRepository;
    private EnrollmentService enrollmentService;

    @BeforeEach
    void setUp() {
        enrollmentService = new EnrollmentService(enrollmentRepository, courseRepository, studentRepository,
                new PasswordService());
    }

    @Test
    void completionIsStoredOnTheSpecificEnrollment() {
        Course course = new Course("Java", "Java course");
        Student student = new Student("Learner", "learner@example.com");
        Enrollment enrollment = new Enrollment(course, student, "learning-token");
        when(enrollmentRepository.findByAccessToken("learning-token")).thenReturn(Optional.of(enrollment));
        when(enrollmentRepository.save(enrollment)).thenReturn(enrollment);

        Enrollment updated = enrollmentService.updateProgress("learning-token", 100);

        assertEquals(100, updated.getProgressPercent());
        assertNotNull(updated.getCompletedAt());
        verify(enrollmentRepository).save(enrollment);
    }

    @Test
    void settingProgressBackToInProgressClearsCompletionDate() {
        Course course = new Course("Java", "Java course");
        Student student = new Student("Learner", "learner@example.com");
        Enrollment enrollment = new Enrollment(course, student, "learning-token");
        enrollment.setProgressPercent(100);
        when(enrollmentRepository.findByAccessToken("learning-token")).thenReturn(Optional.of(enrollment));
        when(enrollmentRepository.save(enrollment)).thenReturn(enrollment);

        Enrollment updated = enrollmentService.updateProgress("learning-token", 40);

        assertEquals(40, updated.getProgressPercent());
        assertEquals(null, updated.getCompletedAt());
    }
}
