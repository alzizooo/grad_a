package com.example.demo.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "exam")
public class Exam {
    @Id
    private String id;

    private String name;
    private Integer grade;
    private String madeBy; // Changed to camelCase
    private String description;
    private Integer groupedQuestionId; // Changed to camelCase
    private Integer topicId; // Changed to camelCase
    private String packageId; // Changed to camelCase

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getGrade() { return grade; }
    public void setGrade(Integer grade) { this.grade = grade; }

    public String getMadeBy() { return madeBy; }
    public void setMadeBy(String madeBy) { this.madeBy = madeBy; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getGroupedQuestionId() { return groupedQuestionId; }
    public void setGroupedQuestionId(Integer groupedQuestionId) { this.groupedQuestionId = groupedQuestionId; }

    public Integer getTopicId() { return topicId; }
    public void setTopicId(Integer topicId) { this.topicId = topicId; }

    public String getPackageId() { return packageId; }
    public void setPackageId(String packageId) { this.packageId = packageId; }
}
