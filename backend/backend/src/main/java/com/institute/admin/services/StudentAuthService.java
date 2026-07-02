package com.institute.admin.services;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.institute.admin.model.Student;
import com.institute.admin.repository.StudentRepository;

@Service
public class StudentAuthService {
    private final StudentRepository studentRepository;
    private final PasswordService passwordService;
    private final long sessionHours;
    private final Map<String, Session> sessions = new ConcurrentHashMap<>();

    public StudentAuthService(StudentRepository studentRepository, PasswordService passwordService,
                              @Value("${app.student.session-hours:24}") long sessionHours) {
        this.studentRepository = studentRepository;
        this.passwordService = passwordService;
        this.sessionHours = sessionHours;
    }

    public LoginResult login(String email, String password) {
        String cleanEmail = email == null ? "" : email.trim().toLowerCase();
        Student student = studentRepository.findByEmailIgnoreCase(cleanEmail)
                .orElseThrow(() -> new IllegalArgumentException("Invalid student credentials"));
        if (!"ACTIVE".equalsIgnoreCase(student.getStatus())
                || !passwordService.matches(password, student.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid student credentials");
        }
        String token = UUID.randomUUID().toString();
        Instant expiresAt = Instant.now().plus(sessionHours, ChronoUnit.HOURS);
        sessions.put(token, new Session(student.getId(), expiresAt));
        removeExpired();
        return new LoginResult(token, student.getId(), student.getEmail(), student.getName(), expiresAt);
    }

    public Long requireStudentId(String token) {
        Session session = token == null ? null : sessions.get(token);
        if (session == null || session.expiresAt().isBefore(Instant.now())) {
            if (token != null) sessions.remove(token);
            throw new IllegalArgumentException("Student authentication required");
        }
        return session.studentId();
    }

    public void logout(String token) {
        if (token != null) sessions.remove(token);
    }

    private void removeExpired() {
        Instant now = Instant.now();
        sessions.entrySet().removeIf(entry -> entry.getValue().expiresAt().isBefore(now));
    }

    private record Session(Long studentId, Instant expiresAt) {}
    public record LoginResult(String accessToken, Long studentId, String email, String name, Instant expiresAt) {}
}
