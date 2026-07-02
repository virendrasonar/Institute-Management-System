package com.institute.admin.services;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.institute.admin.model.Course;
import com.institute.admin.model.Enrollment;
import com.institute.admin.model.Student;
import com.institute.admin.repository.CourseRepository;
import com.institute.admin.repository.EnrollmentRepository;
import com.institute.admin.repository.StudentRepository;

@Service
public class EnrollmentService {
    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;
    private final PasswordService passwordService;

    public EnrollmentService(EnrollmentRepository enrollmentRepository,
                             CourseRepository courseRepository,
                             StudentRepository studentRepository,
                             PasswordService passwordService) {
        this.enrollmentRepository = enrollmentRepository;
        this.courseRepository = courseRepository;
        this.studentRepository = studentRepository;
        this.passwordService = passwordService;
    }

    @Transactional
    public Enrollment enroll(Long courseId, String name, String email, String password) {
        String cleanName = name == null ? "" : name.trim();
        String cleanEmail = email == null ? "" : email.trim().toLowerCase();
        if (cleanName.length() < 2) throw new IllegalArgumentException("Student name is required");
        if (!cleanEmail.matches("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")) {
            throw new IllegalArgumentException("A valid email is required");
        }
        passwordService.validate(password);

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Course not found"));

        Student student = prepareStudent(cleanName, cleanEmail, password);
        return enrollmentRepository.findByCourseIdAndStudentEmailIgnoreCase(courseId, cleanEmail)
                .orElseGet(() -> createEnrollment(course, student));
    }

    @Transactional(readOnly = true)
    public Enrollment getByAccessToken(String token) {
        return enrollmentRepository.findByAccessToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Enrollment access not found"));
    }

    @Transactional(readOnly = true)
    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAllByOrderByEnrolledAtDesc();
    }

    @Transactional(readOnly = true)
    public List<Enrollment> getStudentEnrollments(Long studentId) {
        return enrollmentRepository.findByStudentIdOrderByEnrolledAtDesc(studentId);
    }

    @Transactional
    public Enrollment updateProgress(String token, Integer progressPercent) {
        if (progressPercent == null || progressPercent < 0 || progressPercent > 100) {
            throw new IllegalArgumentException("Progress must be between 0 and 100");
        }
        Enrollment enrollment = getByAccessToken(token);
        enrollment.setProgressPercent(progressPercent);
        enrollment.setCompletedAt(progressPercent == 100
                ? (enrollment.getCompletedAt() == null ? Instant.now() : enrollment.getCompletedAt())
                : null);
        return enrollmentRepository.save(enrollment);
    }

    private Student prepareStudent(String name, String email, String password) {
        return studentRepository.findByEmailIgnoreCase(email)
                .map(existing -> {
                    if (existing.getPasswordHash() != null && !passwordService.matches(password, existing.getPasswordHash())) {
                        throw new IllegalArgumentException("This email already has a different student password");
                    }
                    if (!existing.getName().equals(name)) existing.setName(name);
                    existing.setStatus("ACTIVE");
                    if (existing.getPasswordHash() == null) existing.setPasswordHash(passwordService.hash(password));
                    return studentRepository.save(existing);
                })
                .orElseGet(() -> {
                    Student student = new Student(name, email, "ACTIVE");
                    student.setPasswordHash(passwordService.hash(password));
                    return studentRepository.save(student);
                });
    }

    private Enrollment createEnrollment(Course course, Student student) {
        Enrollment enrollment = enrollmentRepository.save(
                new Enrollment(course, student, UUID.randomUUID().toString()));
        course.setStudentsEnrolled((course.getStudentsEnrolled() == null ? 0 : course.getStudentsEnrolled()) + 1);
        courseRepository.save(course);
        return enrollment;
    }
}
