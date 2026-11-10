
package com.cario.backend.user;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserInfoService service;

    // Public welcome endpoint
    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome! This endpoint is not secure.";
    }

    // Register new user
    @PostMapping("/register")
    public ResponseEntity<UserInfo> addNewUser(
            @Valid @RequestBody UserInfo userInfo) {

        UserInfo savedUser = service.addUser(userInfo);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedUser);
    }

    // Login user
    @PostMapping("/login")
    public ResponseEntity<UserInfo> login(
            @Valid @RequestBody UserLoginRequest request) {

        UserInfo user = service.login(request);

        return ResponseEntity.ok(user);
    }

    // Get all users
    @GetMapping("/users")
    public ResponseEntity<List<UserInfo>> getAllUsers() {
        return ResponseEntity.ok(service.getAllUsers());
    }

    // Get user by ID
    @GetMapping("/users/{userId}")
    public ResponseEntity<UserInfo> getUserById(
            @PathVariable Integer userId) {

        return ResponseEntity.ok(service.getUserById(userId));
    }

    // Get user by email
    @GetMapping("/users/email/{email}")
    public ResponseEntity<UserInfo> getUserByEmail(
            @PathVariable String email) {

        return ResponseEntity.ok(service.getUserByEmail(email));
    }

    // Update user information
    @PutMapping("/users/{userId}")
    public ResponseEntity<UserInfo> updateUser(
            @PathVariable Integer userId,
            @Valid @RequestBody UserInfo userInfo) {

        return ResponseEntity.ok(
                service.updateUser(userId, userInfo)
        );
    }

    // Delete user
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Void> deleteUser(
            @PathVariable Integer userId) {

        service.deleteUser(userId);

        return ResponseEntity.noContent().build();
    }
}
