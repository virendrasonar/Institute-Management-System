package com.institute.admin.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class CourseTest {

    @Test
    void testDefaultConstructor() {
        Course course = new Course();
        assertNotNull(course);
        assertNull(course.getId());
        assertNull(course.getName());
        assertNull(course.getDescription());
    }

    @Test
    void testParameterizedConstructor() {
        String name = "Java Programming";
        String description = "Learn Java fundamentals";
        
        Course course = new Course(name, description);
        
        assertNotNull(course);
        assertNull(course.getId()); // ID should be null until persisted
        assertEquals(name, course.getName());
        assertEquals(description, course.getDescription());
    }

    @Test
    void testGettersAndSetters() {
        Course course = new Course();
        Long id = 1L;
        String name = "Spring Boot";
        String description = "Advanced Spring Boot concepts";
        
        // Test setters
        course.setId(id);
        course.setName(name);
        course.setDescription(description);
        course.setThumbnailUrl("https://example.com/thumb.jpg");
        course.setVideoType("YOUTUBE");
        course.setVideoUrl("https://youtu.be/dQw4w9WgXcQ");
        course.setVideoId("dQw4w9WgXcQ");
        course.setMaterials("Workbook");
        
        // Test getters
        assertEquals(id, course.getId());
        assertEquals(name, course.getName());
        assertEquals(description, course.getDescription());
        assertEquals("https://example.com/thumb.jpg", course.getThumbnailUrl());
        assertEquals("YOUTUBE", course.getVideoType());
        assertEquals("https://youtu.be/dQw4w9WgXcQ", course.getVideoUrl());
        assertEquals("dQw4w9WgXcQ", course.getVideoId());
        assertEquals("Workbook", course.getMaterials());
    }

    @Test
    void testSettersWithNullValues() {
        Course course = new Course("Initial Name", "Initial Description");
        
        course.setId(null);
        course.setName(null);
        course.setDescription(null);
        
        assertNull(course.getId());
        assertNull(course.getName());
        assertNull(course.getDescription());
    }
}
