package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.ExamMaker;

public interface ExamMakerRepository extends JpaRepository<ExamMaker, Integer> {
}

