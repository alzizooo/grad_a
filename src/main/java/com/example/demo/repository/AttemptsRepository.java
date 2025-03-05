package com.example.demo.repository;

import com.example.demo.entity.Attempts;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AttemptsRepository extends MongoRepository<Attempts, String> { }
