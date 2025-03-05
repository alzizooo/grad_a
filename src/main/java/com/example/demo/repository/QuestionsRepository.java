package com.example.demo.repository;

import com.example.demo.entity.Questions;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuestionsRepository extends MongoRepository<Questions, String> { }