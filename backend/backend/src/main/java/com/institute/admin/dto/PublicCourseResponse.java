package com.institute.admin.dto;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import com.institute.admin.model.Course;

public record PublicCourseResponse(
        Long id,
        String name,
        String description,
        String duration,
        String level,
        String icon,
        String category,
        BigDecimal price,
        String prerequisites,
        String features,
        String instructor,
        Double rating,
        Integer studentsEnrolled,
        String thumbnailUrl,
        boolean hasVideo,
        List<String> materialsPreview) {

    public static PublicCourseResponse from(Course course) {
        return new PublicCourseResponse(
                course.getId(), course.getName(), course.getDescription(), course.getDuration(),
                course.getLevel(), course.getIcon(), course.getCategory(), course.getPrice(),
                course.getPrerequisites(), course.getFeatures(), course.getInstructor(),
                course.getRating(), course.getStudentsEnrolled(), course.getThumbnailUrl(),
                "YOUTUBE".equals(course.getVideoType()) || "UPLOADED".equals(course.getVideoType()),
                previewMaterials(course.getMaterials()));
    }

    private static List<String> previewMaterials(String materials) {
        if (materials == null || materials.isBlank()) return List.of();
        return Arrays.stream(materials.split("[\\n,]+"))
                .map(String::trim)
                .filter(value -> !value.isBlank())
                .map(PublicCourseResponse::displayName)
                .toList();
    }

    private static String displayName(String value) {
        if (!value.matches("(?i)^https?://.*")) return value;
        String path = value.replaceFirst("[?#].*$", "");
        String lastPart = path.substring(path.lastIndexOf('/') + 1);
        return lastPart.isBlank() ? "Online course resource" : lastPart.replace('-', ' ');
    }
}
