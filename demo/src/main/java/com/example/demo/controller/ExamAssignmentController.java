package com.example.demo.controller;

import com.example.demo.entity.ExamAssignment;
import com.example.demo.repository.ExamAssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exam-assignments")
public class ExamAssignmentController {

    @Autowired
    private ExamAssignmentRepository examAssignmentRepository;

    @GetMapping
    public List<ExamAssignment> getAllExamAssignments() {
        return examAssignmentRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExamAssignment> getExamAssignmentById(@PathVariable String id) {
        return examAssignmentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ExamAssignment createExamAssignment(@RequestBody ExamAssignment examAssignment) {
        return examAssignmentRepository.save(examAssignment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExamAssignment> updateExamAssignment(@PathVariable String id, @RequestBody ExamAssignment updated) {
        return examAssignmentRepository.findById(id)
                .map(existing -> {
                    existing.setUserID(updated.getUserID());
                    existing.setSessions(updated.getSessions());
                    return ResponseEntity.ok(examAssignmentRepository.save(existing));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExamAssignment(@PathVariable String id) {
        if (examAssignmentRepository.existsById(id)) {
            examAssignmentRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
