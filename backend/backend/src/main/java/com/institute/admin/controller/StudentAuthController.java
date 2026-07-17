package com.institute.admin.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.institute.admin.dto.StudentDashboardResponse;
import com.institute.admin.dto.EnrollmentResponse;
import com.institute.admin.model.Student;
import com.institute.admin.repository.StudentRepository;
import com.institute.admin.services.EnrollmentService;
import com.institute.admin.services.StudentAuthService;
import com.institute.admin.services.StudentAuthService.LoginResult;

@RestController
@RequestMapping("/api/student")
public class StudentAuthController {
    private final StudentAuthService authService;
    private final StudentRepository studentRepository;
    private final EnrollmentService enrollmentService;

    public StudentAuthController(StudentAuthService authService, StudentRepository studentRepository,
                                 EnrollmentService enrollmentService) {
        this.authService = authService;
        this.studentRepository = studentRepository;
        this.enrollmentService = enrollmentService;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<LoginResult> login(@RequestBody LoginRequest request) {
        try {
            return ResponseEntity.ok(authService.login(request.email(), request.password()));
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping("/auth/logout")
    public ResponseEntity<Void> logout(@RequestHeader(value = "Authorization", required = false) String authorization) {
        authService.logout(extractToken(authorization));
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/dashboard")
    public ResponseEntity<StudentDashboardResponse> dashboard(
            @RequestHeader(value = "Authorization", required = false) String authorization) {
        try {
            Long studentId = authService.requireStudentId(extractToken(authorization));
            Student student = studentRepository.findById(studentId)
                    .orElseThrow(() -> new IllegalArgumentException("Student not found"));
            return ResponseEntity.ok(StudentDashboardResponse.from(student,
                    enrollmentService.getStudentEnrollments(studentId)));
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.status(401).build();
        }
    }

    @PostMapping("/courses/{courseId}/enroll")
    public ResponseEntity<EnrollmentResponse> enrollInCourse(
            @PathVariable Long courseId,
            @RequestHeader(value = "Authorization", required = false) String authorization) {
        try {
            Long studentId = authService.requireStudentId(extractToken(authorization));
            return ResponseEntity.ok(EnrollmentResponse.from(
                    enrollmentService.enrollExistingStudent(courseId, studentId)));
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.status(401).build();
        }
    }

    private String extractToken(String authorization) {
        return authorization != null && authorization.startsWith("Bearer ") ? authorization.substring(7) : null;
    }

    public record LoginRequest(String email, String password) {}
}
