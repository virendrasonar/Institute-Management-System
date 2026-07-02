package com.institute.admin.services;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class PasswordServiceTest {
    private final PasswordService passwordService = new PasswordService();

    @Test
    void hashesAndVerifiesStudentPassword() {
        String hash = passwordService.hash("Student@123");

        assertTrue(passwordService.matches("Student@123", hash));
        assertFalse(passwordService.matches("wrong-password", hash));
        assertFalse(hash.contains("Student@123"));
    }

    @Test
    void rejectsShortPasswords() {
        assertThrows(IllegalArgumentException.class, () -> passwordService.hash("short"));
    }
}
