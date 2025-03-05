package com.example.demo.controller;

import com.example.demo.entity.GroupedQuestions;
import com.example.demo.repository.GroupedQuestionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grouped-questions")
public class GroupedQuestionsController {

    @Autowired
    private GroupedQuestionsRepository groupedQuestionsRepository;

    @GetMapping
    public List<GroupedQuestions> getAllGroupedQuestions() {
        return groupedQuestionsRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GroupedQuestions> getGroupedQuestionsById(@PathVariable String id) {
        return groupedQuestionsRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public GroupedQuestions createGroupedQuestions(@RequestBody GroupedQuestions groupedQuestions) {
        return groupedQuestionsRepository.save(groupedQuestions);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GroupedQuestions> updateGroupedQuestions(@PathVariable String id, @RequestBody GroupedQuestions updated) {
        return groupedQuestionsRepository.findById(id)
                .map(existing -> {
                    existing.setQuestionID(updated.getQuestionID());
                    existing.setGroupName(updated.getGroupName());
                    existing.setQuestionGrade(updated.getQuestionGrade());
                    return ResponseEntity.ok(groupedQuestionsRepository.save(existing));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGroupedQuestions(@PathVariable String id) {
        if (groupedQuestionsRepository.existsById(id)) {
            groupedQuestionsRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
