package com.example.demo.controller;

import com.example.demo.entity.Attempts;
import com.example.demo.repository.AttemptsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attempts")
public class AttemptsController {

    @Autowired
    private AttemptsRepository attemptsRepository;

    @GetMapping
    public List<Attempts> getAllAttempts() {
        return attemptsRepository.findAll();
    }

    @PostMapping
    public Attempts createAttempt(@RequestBody Attempts attempt) {
        return attemptsRepository.save(attempt);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Attempts> getAttemptById(@PathVariable String id) {
        return attemptsRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttempt(@PathVariable String id) {
        attemptsRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
