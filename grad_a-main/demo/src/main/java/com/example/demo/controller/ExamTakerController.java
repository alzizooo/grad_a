package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.ExamTaker;
import com.example.demo.repository.ExamTakerRepository;

import java.util.List;

@RestController
@RequestMapping("/api/exam-takers")
public class ExamTakerController {

    @Autowired
    private ExamTakerRepository repository;

    @PostMapping
    public ExamTaker createExamTaker(@RequestBody ExamTaker examTaker) {
        return repository.save(examTaker);
    }

    @GetMapping
    public List<ExamTaker> getAllExamTakers() {
        return repository.findAll();
    }
}

