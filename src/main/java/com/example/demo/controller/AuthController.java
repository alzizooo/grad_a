//package com.example.demo.controller;
//
//import com.example.demo.entity.User;
//import com.example.demo.service.UserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/auth")
//public class AuthController {
//
//    @Autowired
//    private UserService userService;
//
//    // Register User
//    @PostMapping("/register")
//    public ResponseEntity<?> registerUser(@RequestBody User user) {
//        try {
//            User savedUser = userService.saveUser(user);
//            return ResponseEntity.ok(savedUser);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
//        }
//    }
//
//    // Login User
//    @PostMapping("/login")
//    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
//        try {
//            User user = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
//            return ResponseEntity.ok(user);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//        }
//    }
//
//    // Get All Users
//    @GetMapping("/users")
//    public ResponseEntity<List<User>> getAllUsers() {
//        return ResponseEntity.ok(userService.getAllUsers());
//    }
//
//    // Get a specific user by ID
//    @GetMapping("/{id}")
//    public ResponseEntity<?> getUser(@PathVariable Integer id) {
//        try {
//            User user = userService.getUserById(id);
//            return ResponseEntity.ok(user);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
//        }
//    }
//
//    // ✅ Update user by ID
//    @PutMapping("/{id}")
//    public ResponseEntity<?> updateUser(@PathVariable Integer id, @RequestBody User updatedUser) {
//        try {
//            User user = userService.updateUser(id, updatedUser);
//            return ResponseEntity.ok(user);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
//        }
//    }
//
//    // ✅ Soft Delete user by ID
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
//        try {
//            userService.deleteUserById(id);
//            return ResponseEntity.ok("User deleted successfully");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
//        }
//    }
//}
