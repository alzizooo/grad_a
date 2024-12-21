package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.entity.Exam;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataMigrationService {

    @Autowired
    private ExamRepository examRepository; // MongoDB
    @Autowired
    private UserRepository userRepository; // MySQL

    public void migrateData() {
        List<User> users = userRepository.findAll();
        users.forEach(user -> {
            Exam exam = new Exam();
            exam.setMadeBy(user.getName());
            exam.setGrade(user.getId());
            examRepository.save(exam);
        });
    }
}
