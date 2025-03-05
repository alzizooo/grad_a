package com.example.demo.entity;
import jakarta.persistence.*;

@Entity
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    private Boolean examDeletion;
    private Boolean examEdition;
    private Boolean userBan;
    private Boolean userCreation;
    private Boolean topicEdit;
    private Boolean topicDeletion;
    private Boolean examSessionCreation;
    private Boolean packageCreation;
    private Boolean packageDeletion;

    // Getters and Setters
    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

    public Boolean getExamDeletion() { return examDeletion; }
    public void setExamDeletion(Boolean examDeletion) { this.examDeletion = examDeletion; }

    public Boolean getExamEdition() { return examEdition; }
    public void setExamEdition(Boolean examEdition) { this.examEdition = examEdition; }

    public Boolean getUserBan() { return userBan; }
    public void setUserBan(Boolean userBan) { this.userBan = userBan; }

    public Boolean getUserCreation() { return userCreation; }
    public void setUserCreation(Boolean userCreation) { this.userCreation = userCreation; }

    public Boolean getTopicEdit() { return topicEdit; }
    public void setTopicEdit(Boolean topicEdit) { this.topicEdit = topicEdit; }

    public Boolean getTopicDeletion() { return topicDeletion; }
    public void setTopicDeletion(Boolean topicDeletion) { this.topicDeletion = topicDeletion; }

    public Boolean getExamSessionCreation() { return examSessionCreation; }
    public void setExamSessionCreation(Boolean examSessionCreation) { this.examSessionCreation = examSessionCreation; }

    public Boolean getPackageCreation() { return packageCreation; }
    public void setPackageCreation(Boolean packageCreation) { this.packageCreation = packageCreation; }

    public Boolean getPackageDeletion() { return packageDeletion; }
    public void setPackageDeletion(Boolean packageDeletion) { this.packageDeletion = packageDeletion; }
}
