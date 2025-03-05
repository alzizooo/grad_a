package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Admin;
import com.example.demo.repository.AdminRepository;

import java.util.List;

@RestController
@RequestMapping("/api/admins")
public class AdminController {

    @Autowired
    private AdminRepository repository;

    @PostMapping
    public Admin createAdmin(@RequestBody Admin admin) {
        return repository.save(admin);
    }

    @GetMapping
    public List<Admin> getAllAdmins() {
        return repository.findAll();
    }
}
