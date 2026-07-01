package com.institute.admin.services;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AdminAuthService {
    private final String adminEmail;
    private final String adminPassword;
    private final String adminName;
    private final long sessionHours;
    private final Map<String, Instant> sessions = new ConcurrentHashMap<>();

    public AdminAuthService(@Value("${app.admin.email}") String adminEmail,
                            @Value("${app.admin.password}") String adminPassword,
                            @Value("${app.admin.name:Administrator}") String adminName,
                            @Value("${app.admin.session-hours:8}") long sessionHours) {
        this.adminEmail = adminEmail.trim().toLowerCase();
        this.adminPassword = adminPassword;
        this.adminName = adminName;
        this.sessionHours = sessionHours;
    }

    public LoginResult login(String email, String password) {
        String cleanEmail = email == null ? "" : email.trim().toLowerCase();
        if (!secureEquals(adminEmail, cleanEmail) || !secureEquals(adminPassword, password == null ? "" : password)) {
            throw new IllegalArgumentException("Invalid admin credentials");
        }

        String token = UUID.randomUUID().toString();
        Instant expiresAt = Instant.now().plus(sessionHours, ChronoUnit.HOURS);
        sessions.put(token, expiresAt);
        removeExpiredSessions();
        return new LoginResult(token, adminEmail, adminName, expiresAt);
    }

    public boolean isValid(String token) {
        if (token == null || token.isBlank()) return false;
        Instant expiresAt = sessions.get(token);
        if (expiresAt == null || expiresAt.isBefore(Instant.now())) {
            sessions.remove(token);
            return false;
        }
        return true;
    }

    public void logout(String token) {
        if (token != null) sessions.remove(token);
    }

    private void removeExpiredSessions() {
        Instant now = Instant.now();
        sessions.entrySet().removeIf(entry -> entry.getValue().isBefore(now));
    }

    private boolean secureEquals(String expected, String actual) {
        return MessageDigest.isEqual(expected.getBytes(StandardCharsets.UTF_8), actual.getBytes(StandardCharsets.UTF_8));
    }

    public record LoginResult(String accessToken, String email, String name, Instant expiresAt) {}
}
