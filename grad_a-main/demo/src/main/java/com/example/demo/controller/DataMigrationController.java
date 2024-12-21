package com.example.demo.controller;

import com.example.demo.service.DataMigrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DataMigrationController {

    @Autowired
    private DataMigrationService dataMigrationService;

    @PostMapping("/migrate")
    public String migrateData() {
        dataMigrationService.migrateData();
        return "Data migration completed!";
    }


}
