package com.example.demo.entity;
import jakarta.persistence.*;

@Entity
public class ExamMaker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    private String title;
    private Integer createdExamCount;
    private Boolean viewLogs;
    private Boolean topicDeletion;

    // Getters and Setters
    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Integer getCreatedExamCount() { return createdExamCount; }
    public void setCreatedExamCount(Integer createdExamCount) { this.createdExamCount = createdExamCount; }

    public Boolean getViewLogs() { return viewLogs; }
    public void setViewLogs(Boolean viewLogs) { this.viewLogs = viewLogs; }

    public Boolean getTopicDeletion() { return topicDeletion; }
    public void setTopicDeletion(Boolean topicDeletion) { this.topicDeletion = topicDeletion; }
}

