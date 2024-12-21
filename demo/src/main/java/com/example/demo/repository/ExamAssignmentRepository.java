package com.example.demo.repository;

import com.example.demo.entity.ExamAssignment;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ExamAssignmentRepository extends MongoRepository<ExamAssignment, String> { }
