package com.institute.admin.services;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Base64;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

import org.springframework.stereotype.Service;

@Service
public class PasswordService {
    private static final int ITERATIONS = 120_000;
    private static final int KEY_LENGTH = 256;
    private final SecureRandom secureRandom = new SecureRandom();

    public String hash(String password) {
        validate(password);
        byte[] salt = new byte[16];
        secureRandom.nextBytes(salt);
        byte[] digest = derive(password, salt, ITERATIONS);
        return ITERATIONS + ":" + Base64.getEncoder().encodeToString(salt) + ":"
                + Base64.getEncoder().encodeToString(digest);
    }

    public boolean matches(String password, String storedHash) {
        if (password == null || storedHash == null || storedHash.isBlank()) return false;
        try {
            String[] parts = storedHash.split(":", 3);
            int iterations = Integer.parseInt(parts[0]);
            byte[] salt = Base64.getDecoder().decode(parts[1]);
            byte[] expected = Base64.getDecoder().decode(parts[2]);
            return MessageDigest.isEqual(expected, derive(password, salt, iterations));
        } catch (RuntimeException exception) {
            return false;
        }
    }

    public void validate(String password) {
        if (password == null || password.length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters");
        }
        if (password.getBytes(StandardCharsets.UTF_8).length > 128) {
            throw new IllegalArgumentException("Password is too long");
        }
    }

    private byte[] derive(String password, byte[] salt, int iterations) {
        PBEKeySpec spec = new PBEKeySpec(password.toCharArray(), salt, iterations, KEY_LENGTH);
        try {
            return SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256").generateSecret(spec).getEncoded();
        } catch (Exception exception) {
            throw new IllegalStateException("Password hashing is unavailable", exception);
        } finally {
            spec.clearPassword();
        }
    }
}
