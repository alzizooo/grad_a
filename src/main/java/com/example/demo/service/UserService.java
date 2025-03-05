//package com.example.demo.service;
//
//import com.example.demo.entity.User;
//import com.example.demo.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class UserService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    public List<User> getAllUsers() {
//        return userRepository.findAll();
//    }
//
//    public User saveUser(User user) {
//        return userRepository.save(user);
//    }
//
//    public void deleteUserById(Long id) {
//        userRepository.findById(Math.toIntExact(id))
//                .orElseThrow(() -> new RuntimeException("User with ID " + id + " not found."));
//        userRepository.deleteById(Math.toIntExact(id));
//    }
//
//    public List<User> searchUsers(String searchQuery) {
//        return userRepository.findByNameContainingIgnoreCase(searchQuery);
//    }
//
//    public User getUserById(Long id) {
//        return userRepository.findById(Math.toIntExact(id))
//                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
//    }
//
//    public User updateUser(Long id, User updatedUser) {
//        User existingUser = userRepository.findById(Math.toIntExact(id))
//                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
//
//        // Update fields of the existing user with values from the updated user
//        existingUser.setName(updatedUser.getName());
//        existingUser.setEmail(updatedUser.getEmail());
//        existingUser.setPhone(updatedUser.getPhone());
//        existingUser.setAddress(updatedUser.getAddress());
//        // Add any additional fields here
//
//        return userRepository.save(existingUser);
//    }
//}


package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;  // Inject BCrypt Password Encoder

    // ✅ Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ Register a new user (Hash password before saving)
    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));  // Hash password
        return userRepository.save(user);
    }

    // ✅ Authenticate user (Compare entered password with stored hash)
    public boolean authenticateUser(String email, String rawPassword) {
        Optional<Object> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = (User) userOptional.get();
            return passwordEncoder.matches(rawPassword, user.getPassword()); // Compare passwords
        }
        return false;
    }

    // ✅ Get user by ID
    public User getUserById(Integer id) {
        return userRepository.findById(Math.toIntExact(id))
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    // ✅ Update user details (excluding password)
    public User updateUser(Integer id, User updatedUser) {
        User existingUser = userRepository.findById(Math.toIntExact(id))
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        existingUser.setName(updatedUser.getName());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPhone(updatedUser.getPhone());
        existingUser.setAddress(updatedUser.getAddress());

        return userRepository.save(existingUser);
    }

    // ✅ Delete user
    public void deleteUserById(Integer id) {
        userRepository.findById(Math.toIntExact(id))
                .orElseThrow(() -> new RuntimeException("User with ID " + id + " not found."));
        userRepository.deleteById(Math.toIntExact(id));
    }
}





