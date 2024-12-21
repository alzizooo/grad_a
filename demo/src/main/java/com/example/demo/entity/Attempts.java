package com.example.demo.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "attempts")
public class Attempts {
    @Id
    private String id;
    private String sessionID;
    private String userID;
    private Integer attemptGrade;
    private String answers;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSessionID() {
        return sessionID;
    }

    public void setSessionID(String sessionID) {
        this.sessionID = sessionID;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public Integer getAttemptGrade() {
        return attemptGrade;
    }

    public void setAttemptGrade(Integer attemptGrade) {
        this.attemptGrade = attemptGrade;
    }

    public String getAnswers() {
        return answers;
    }

    public void setAnswers(String answers) {
        this.answers = answers;

    }
}
