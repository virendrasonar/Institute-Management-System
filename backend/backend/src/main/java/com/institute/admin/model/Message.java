package com.institute.admin.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String senderName;

    @Column(nullable = false)
    private String email;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    public Message() {}

    public Message(String senderName, String email, String content) {
        this.senderName = senderName;
        this.email = email;
        this.content = content;
    }

    // Getters
    public Long getId() { return id; }

    public String getSenderName() { return senderName; }

    public String getEmail() { return email; }

    public String getContent() { return content; }

    // Setters
    public void setId(Long id) { this.id = id; }

    public void setSenderName(String senderName) { this.senderName = senderName; }

    public void setEmail(String email) { this.email = email; }

    public void setContent(String content) { this.content = content; }
}