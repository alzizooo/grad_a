package com.example.demo.controller;

import com.example.demo.entity.Questions;
import com.example.demo.repository.QuestionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionsController {

    @Autowired
    private QuestionsRepository questionsRepository;

    @GetMapping
    public List<Questions> getAllQuestions() {
        return questionsRepository.findAll();
    }

    @PostMapping
    public Questions createQuestion(@RequestBody Questions question) {
        return questionsRepository.save(question);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Questions> getQuestionById(@PathVariable String id) {
        return questionsRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Questions> updateQuestion(@PathVariable String id, @RequestBody Questions updatedQuestion) {
        return questionsRepository.findById(id)
                .map(question -> {
                    question.setType(updatedQuestion.getType());
                    question.setQuestion(updatedQuestion.getQuestion());
                    question.setDescription(updatedQuestion.getDescription());
                    question.setAnswer(updatedQuestion.getAnswer());
                    return ResponseEntity.ok(questionsRepository.save(question));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable String id) {
        questionsRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
