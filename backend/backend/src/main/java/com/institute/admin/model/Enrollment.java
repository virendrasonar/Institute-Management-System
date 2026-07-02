package com.institute.admin.model;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "enrollments", uniqueConstraints =
        @UniqueConstraint(columnNames = {"course_id", "student_id"}))
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(nullable = false, unique = true, length = 64)
    private String accessToken;

    @Column(nullable = false)
    private Instant enrolledAt;

    @Column(nullable = false)
    private Integer progressPercent = 0;

    private Instant completedAt;

    protected Enrollment() {}

    public Enrollment(Course course, Student student, String accessToken) {
        this.course = course;
        this.student = student;
        this.accessToken = accessToken;
        this.enrolledAt = Instant.now();
    }

    public Long getId() { return id; }
    public Course getCourse() { return course; }
    public Student getStudent() { return student; }
    public String getAccessToken() { return accessToken; }
    public Instant getEnrolledAt() { return enrolledAt; }
    public Integer getProgressPercent() { return progressPercent == null ? 0 : progressPercent; }
    public Instant getCompletedAt() { return completedAt; }

    public void setProgressPercent(Integer progressPercent) { this.progressPercent = progressPercent; }
    public void setCompletedAt(Instant completedAt) { this.completedAt = completedAt; }
}
