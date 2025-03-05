package com.example.demo.DAO;

import com.example.demo.entity.User;
import com.example.demo.exception.UserNotFoundException;
import org.springframework.stereotype.Repository;

@Repository
public class UserDAO extends BaseDAO<User, Long> {
    public UserDAO() {
        super(User.class);
    }

    @Override
    public User findById(Long id) {
        User user = super.findById(id);
        if (user == null) {
            throw new UserNotFoundException("User with ID " + id + " not found");
        }
        return user;
    }
}
