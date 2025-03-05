package com.example.demo.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "grouped_questions")
public class GroupedQuestions {
    @Id
    private String id;
    private String questionID;
    private String groupName;
    private Integer questionGrade;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getQuestionID() {
        return questionID;
    }

    public void setQuestionID(String questionID) {
        this.questionID = questionID;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public Integer getQuestionGrade() {
        return questionGrade;
    }

    public void setQuestionGrade(Integer questionGrade) {
        this.questionGrade = questionGrade;
    }
}
