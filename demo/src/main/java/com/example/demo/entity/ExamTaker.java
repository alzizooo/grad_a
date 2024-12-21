package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
public class ExamTaker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    private Integer orgId;
    private Float gpa;
    private String grade;
    private Boolean isDeleted;

    // Getters and Setters
    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

    public Integer getOrgId() { return orgId; }
    public void setOrgId(Integer orgId) { this.orgId = orgId; }

    public Float getGpa() { return gpa; }
    public void setGpa(Float gpa) { this.gpa = gpa; }

    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }

    public Boolean getIsDeleted() { return isDeleted; }
    public void setIsDeleted(Boolean isDeleted) { this.isDeleted = isDeleted; }
}
