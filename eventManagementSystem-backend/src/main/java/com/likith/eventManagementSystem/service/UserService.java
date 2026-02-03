package com.likith.eventManagementSystem.service;

import com.likith.eventManagementSystem.entity.Role;
import com.likith.eventManagementSystem.entity.User;
import com.likith.eventManagementSystem.exception.BadRequestException;
import com.likith.eventManagementSystem.exception.ResourceNotFoundException;
import com.likith.eventManagementSystem.repository.UserRepository;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User createUser(@NotBlank String name, @Email @NotBlank String email, Role role) {
        userRepository.findByEmail(email)
                .ifPresent(u -> {
                    throw new BadRequestException("Email already used");
                });
        User u = User.builder().name(name).email(email).role(role).build();
        return userRepository.save(u);
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + id));
    }
}
