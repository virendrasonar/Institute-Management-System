package com.institute.admin.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String duration;
    private String level;          // Beginner, Intermediate, Advanced
    private String icon;           
    private String category;
    private Double price;
    private String prerequisites;
    private String features;
    private String instructor;
    private Double rating;
    private Integer studentsEnrolled;

    public Course() {}

    public Course(String name, String description) {
        this.name = name;
        this.description = description;
    }

    // =========================
    // GETTERS
    // =========================

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getDuration() {
        return duration;
    }

    public String getLevel() {
        return level;
    }

    public String getIcon() {      
        return icon;
    }

    public String getCategory() {
        return category;
    }

    public Double getPrice() {
        return price;
    }

    public String getPrerequisites() {
        return prerequisites;
    }

    public String getFeatures() {
        return features;
    }

    public String getInstructor() {
        return instructor;
    }

    public Double getRating() {
        return rating;
    }

    public Integer getStudentsEnrolled() {
        return studentsEnrolled;
    }

    // =========================
    // SETTERS
    // =========================

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public void setIcon(String icon) {   
        this.icon = icon;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public void setPrerequisites(String prerequisites) {
        this.prerequisites = prerequisites;
    }

    public void setFeatures(String features) {
        this.features = features;
    }

    public void setInstructor(String instructor) {
        this.instructor = instructor;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public void setStudentsEnrolled(Integer studentsEnrolled) {
        this.studentsEnrolled = studentsEnrolled;
    }
}
