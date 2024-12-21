package com.example.demo.repository;

import com.example.demo.entity.ExamSessions;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ExamSessionsRepository extends MongoRepository<ExamSessions, String> { }
