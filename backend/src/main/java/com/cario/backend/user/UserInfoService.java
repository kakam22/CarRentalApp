
package com.cario.backend.user;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import org.springframework.http.HttpStatus;

import java.util.List;

@Service
public class UserInfoService {

    private final UserInfoRepository repository;

    public UserInfoService(UserInfoRepository repository) {
        this.repository = repository;
    }

    // Register new user
    public UserInfo addUser(UserInfo userInfo) {

        if (repository.existsByEmail(userInfo.getEmail())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email is already registered"
            );
        }

        return repository.save(userInfo);
    }

    // Login user (plain-text password comparison)
    public UserInfo login(UserLoginRequest request) {

        UserInfo user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Invalid email or password"
                ));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid email or password"
            );
        }

        return user;
    }

    // Get all users
    public List<UserInfo> getAllUsers() {
        return repository.findAll();
    }

    // Get user by ID
    public UserInfo getUserById(Integer userId) {
        return repository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));
    }

    // Get user by email
    public UserInfo getUserByEmail(String email) {
        return repository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));
    }

    // Update user information
    @Transactional
    public UserInfo updateUser(
            Integer userId,
            UserInfo updatedUser
    ) {

        UserInfo existingUser = getUserById(userId);

        if (!existingUser.getEmail().equals(updatedUser.getEmail())
                && repository.existsByEmail(updatedUser.getEmail())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email is already registered"
            );
        }

        existingUser.setFirstName(updatedUser.getFirstName());
        existingUser.setLastName(updatedUser.getLastName());
        existingUser.setEmail(updatedUser.getEmail());

        return repository.save(existingUser);
    }

    // Delete user
    public void deleteUser(Integer userId) {
        UserInfo user = getUserById(userId);
        repository.delete(user);
    }
}
