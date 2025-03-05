package com.example.demo.controller;

import com.example.demo.entity.Package;
import com.example.demo.repository.PackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/packages")
public class PackageController {

    @Autowired
    private PackageRepository packageRepository;

    @GetMapping
    public List<Package> getAllPackages() {
        return packageRepository.findAll();
    }

    @PostMapping
    public Package createPackage(@RequestBody Package pack) {
        return packageRepository.save(pack);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Package> getPackageById(@PathVariable String id) {
        return packageRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Package> updatePackage(@PathVariable String id, @RequestBody Package updatedPackage) {
        return packageRepository.findById(id)
                .map(pack -> {
                    pack.setName(updatedPackage.getName());
                    pack.setExamID(updatedPackage.getExamID());
                    return ResponseEntity.ok(packageRepository.save(pack));
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePackage(@PathVariable String id) {
        packageRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
