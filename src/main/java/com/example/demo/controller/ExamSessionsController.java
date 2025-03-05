package com.example.demo.controller;

import com.example.demo.entity.ExamSessions;
import com.example.demo.repository.ExamSessionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exam-sessions")
public class ExamSessionsController {

    @Autowired
    private ExamSessionsRepository examSessionsRepository;

    @GetMapping
    public List<ExamSessions> getAllExamSessions() {
        return examSessionsRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExamSessions> getExamSessionById(@PathVariable String id) {
        return examSessionsRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ExamSessions createExamSession(@RequestBody ExamSessions examSession) {
        return examSessionsRepository.save(examSession);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExamSessions> updateExamSession(@PathVariable String id, @RequestBody ExamSessions updatedSession) {
        return examSessionsRepository.findById(id)
                .map(existing -> {
                    existing.setExamID(updatedSession.getExamID());
                    existing.setStart(updatedSession.getStart());
                    existing.setEnd(updatedSession.getEnd());
                    existing.setAttempts(updatedSession.getAttempts());
                    existing.setPassword(updatedSession.getPassword());
                    return ResponseEntity.ok(examSessionsRepository.save(existing));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExamSession(@PathVariable String id) {
        if (examSessionsRepository.existsById(id)) {
            examSessionsRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
