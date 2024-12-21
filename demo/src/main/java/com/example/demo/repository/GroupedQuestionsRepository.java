package com.example.demo.repository;

import com.example.demo.entity.GroupedQuestions;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GroupedQuestionsRepository extends MongoRepository<GroupedQuestions, String> { }
