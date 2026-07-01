package com.institute.admin.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String duration;

    private String level;   // Beginner, Intermediate, Advanced

    private String icon;

    private String category;

    private BigDecimal price;

    @Column(columnDefinition = "TEXT")
    private String prerequisites;

    @Column(columnDefinition = "TEXT")
    private String features;

    private String instructor;

    private Double rating = 0.0;

    private Integer studentsEnrolled = 0;

    @Column(length = 2048)
    private String thumbnailUrl;

    private String videoType;

    @Column(length = 2048)
    private String videoUrl;

    private String videoId;

    @Column(columnDefinition = "TEXT")
    private String materials;

    public Course() {}

    public Course(String name, String description) {
        this.name = name;
        this.description = description;
    }

    // =========================
    // GETTERS
    // =========================

    public Long getId() { return id; }

    public String getName() { return name; }

    public String getDescription() { return description; }

    public String getDuration() { return duration; }

    public String getLevel() { return level; }

    public String getIcon() { return icon; }

    public String getCategory() { return category; }

    public BigDecimal getPrice() { return price; }

    public String getPrerequisites() { return prerequisites; }

    public String getFeatures() { return features; }

    public String getInstructor() { return instructor; }

    public Double getRating() { return rating; }

    public Integer getStudentsEnrolled() { return studentsEnrolled; }

    public String getThumbnailUrl() { return thumbnailUrl; }

    public String getVideoType() { return videoType; }

    public String getVideoUrl() { return videoUrl; }

    public String getVideoId() { return videoId; }

    public String getMaterials() { return materials; }

    // =========================
    // SETTERS
    // =========================

    public void setId(Long id) { this.id = id; }

    public void setName(String name) { this.name = name; }

    public void setDescription(String description) { this.description = description; }

    public void setDuration(String duration) { this.duration = duration; }

    public void setLevel(String level) { this.level = level; }

    public void setIcon(String icon) { this.icon = icon; }

    public void setCategory(String category) { this.category = category; }

    public void setPrice(BigDecimal price) { this.price = price; }

    public void setPrerequisites(String prerequisites) { this.prerequisites = prerequisites; }

    public void setFeatures(String features) { this.features = features; }

    public void setInstructor(String instructor) { this.instructor = instructor; }

    public void setRating(Double rating) { this.rating = rating; }

    public void setStudentsEnrolled(Integer studentsEnrolled) { this.studentsEnrolled = studentsEnrolled; }

    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }

    public void setVideoType(String videoType) { this.videoType = videoType; }

    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }

    public void setVideoId(String videoId) { this.videoId = videoId; }

    public void setMaterials(String materials) { this.materials = materials; }
}
