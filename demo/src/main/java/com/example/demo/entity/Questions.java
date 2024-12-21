package com.example.demo.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "questions")
public class Questions {
    @Id
    private String id;
    private String topicID;
    private String type;
    private String question;
    private String description;
    private String imageSrc;
    private String answer;


    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTopicID() { return topicID; }
    public void setTopicID(String topicID) { this.topicID = topicID; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageSrc() { return imageSrc; }
    public void setImageSrc(String imageSrc) { this.imageSrc = imageSrc; }

    public String getAnswer() { return answer; }
    public void setAnswer(String answer) { this.answer = answer; }
}
