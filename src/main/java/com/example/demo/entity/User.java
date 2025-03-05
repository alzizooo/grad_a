package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String name;
    private Integer phone;

    @Column(name = "role")
    private String role;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "is_del")
    private Boolean isDeleted;

    @Column(name="Address")
    private String Address;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPhone() {
        return phone;
    }

    public void setPhone(Integer phone) {
        this.phone = phone;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public Boolean getDeleted() {
        return isDeleted;
    }

    public void setDeleted(Boolean deleted) {
        isDeleted = deleted;
    }

    public String getAddress() {
        return Address;
    }

    public void setAddress(String address) {
        Address = address;
    }
}

//package com.example.demo.entity;
//
//import jakarta.persistence.*;
//import java.util.Date;
//
//@Entity
//@Table(name = "users")
//public class User {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Integer id;
//
//    @Column(nullable = false, length = 50, unique = true)
//    private String email;
//
//    @Column(nullable = false, length = 50)
//    private String password;
//
//    @Column(length = 100)
//    private String name;
//
//    private Integer phone;
//
//    @Column(length = 10)
//    private String role;
//
//    @Column(length = 255) // Added Address
//    private String address;
//
//    private Boolean isActive;
//    private Boolean isDeleted;
//
//    @Temporal(TemporalType.DATE)
//    private Date createdAt;
//
//    @Column(length = 100)
//    private String createdBy;
//
//    @Temporal(TemporalType.DATE)
//    private Date updatedAt;
//
//    @Column(length = 100)
//    private String updatedBy;
//
//    // Constructors
//    public User() {}
//
//    public User(String email, String password, String name, Integer phone, String role, String address, Boolean isActive, Date createdAt, String createdBy) {
//        this.email = email;
//        this.password = password;
//        this.name = name;
//        this.phone = phone;
//        this.role = role;
//        this.address = address;
//        this.isActive = isActive;
//        this.isDeleted = false;
//        this.createdAt = createdAt;
//        this.createdBy = createdBy;
//    }
//
//    // Getters and Setters
//    public Integer getId() { return id; }
//    public void setId(Integer id) { this.id = id; }
//
//    public String getEmail() { return email; }
//    public void setEmail(String email) { this.email = email; }
//
//    public String getPassword() { return password; }
//    public void setPassword(String password) { this.password = password; }
//
//    public String getName() { return name; }
//    public void setName(String name) { this.name = name; }
//
//    public Integer getPhone() { return phone; }
//    public void setPhone(Integer phone) { this.phone = phone; }
//
//    public String getRole() { return role; }
//    public void setRole(String role) { this.role = role; }
//
//    public String getAddress() { return address; } // Getter for Address
//    public void setAddress(String address) { this.address = address; } // Setter for Address
//
//    public Boolean getActive() { return isActive; }
//    public void setActive(Boolean active) { isActive = active; }
//
//    public Boolean getDeleted() { return isDeleted; }
//    public void setDeleted(Boolean deleted) { isDeleted = deleted; }
//
//    public Date getCreatedAt() { return createdAt; }
//    public void setCreatedAt(Date createdAt) { this.createdAt = createdAt; }
//
//    public String getCreatedBy() { return createdBy; }
//    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }
//
//    public Date getUpdatedAt() { return updatedAt; }
//    public void setUpdatedAt(Date updatedAt) { this.updatedAt = updatedAt; }
//
//    public String getUpdatedBy() { return updatedBy; }
//    public void setUpdatedBy(String updatedBy) { this.updatedBy = updatedBy; }
//}






