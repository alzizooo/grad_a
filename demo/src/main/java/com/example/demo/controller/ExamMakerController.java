package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.ExamMaker;
import com.example.demo.repository.ExamMakerRepository;

import java.util.List;

@RestController
@RequestMapping("/api/exam-makers")
public class ExamMakerController {

    @Autowired
    private ExamMakerRepository repository;

    @PostMapping
    public ExamMaker createExamMaker(@RequestBody ExamMaker examMaker) {
        return repository.save(examMaker);
    }

    @GetMapping
    public List<ExamMaker> getAllExamMakers() {
        return repository.findAll();
    }
}

