package com.example.demo.repository;

import com.example.demo.entity.Package;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PackageRepository extends MongoRepository<Package, String> { }
