package com.institute.admin.services;

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

    public EnrollmentService(EnrollmentRepository enrollmentRepository,
                             CourseRepository courseRepository,
                             StudentRepository studentRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.courseRepository = courseRepository;
        this.studentRepository = studentRepository;
    }

    @Transactional
    public Enrollment enroll(Long courseId, String name, String email) {
        String cleanName = name == null ? "" : name.trim();
        String cleanEmail = email == null ? "" : email.trim().toLowerCase();
        if (cleanName.length() < 2) throw new IllegalArgumentException("Student name is required");
        if (!cleanEmail.matches("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")) {
            throw new IllegalArgumentException("A valid email is required");
        }

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalArgumentException("Course not found"));

        return enrollmentRepository.findByCourseIdAndStudentEmailIgnoreCase(courseId, cleanEmail)
                .orElseGet(() -> createEnrollment(course, cleanName, cleanEmail));
    }

    @Transactional(readOnly = true)
    public Enrollment getByAccessToken(String token) {
        return enrollmentRepository.findByAccessToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Enrollment access not found"));
    }

    private Enrollment createEnrollment(Course course, String name, String email) {
        Student student = studentRepository.findByEmailIgnoreCase(email)
                .map(existing -> {
                    if (!existing.getName().equals(name)) existing.setName(name);
                    existing.setStatus("ACTIVE");
                    return studentRepository.save(existing);
                })
                .orElseGet(() -> studentRepository.save(new Student(name, email, "ACTIVE")));

        Enrollment enrollment = enrollmentRepository.save(
                new Enrollment(course, student, UUID.randomUUID().toString()));
        course.setStudentsEnrolled((course.getStudentsEnrolled() == null ? 0 : course.getStudentsEnrolled()) + 1);
        courseRepository.save(course);
        return enrollment;
    }
}
