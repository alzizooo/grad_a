package com.example.demo.controller;

import com.example.demo.entity.Exam;
import com.example.demo.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exams")
public class ExamController {

    @Autowired
    private ExamRepository examRepository;

    @GetMapping
    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    @PostMapping
    public Exam createExam(@RequestBody Exam exam) {
        return examRepository.save(exam);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exam> getExamById(@PathVariable String id) {
        return examRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Exam> updateExam(@PathVariable String id, @RequestBody Exam updatedExam) {
        return examRepository.findById(id)
                .map(exam -> {
                    exam.setName(updatedExam.getName());
                    exam.setGrade(updatedExam.getGrade());
                    exam.setMadeBy(updatedExam.getMadeBy());
                    return ResponseEntity.ok(examRepository.save(exam));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExam(@PathVariable String id) {
        examRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
