package com.likith.eventManagementSystem.controller;

import com.likith.eventManagementSystem.dto.CreateUserRequest;
import com.likith.eventManagementSystem.dto.UserDto;
import com.likith.eventManagementSystem.entity.Role;
import com.likith.eventManagementSystem.entity.User;
import com.likith.eventManagementSystem.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final ModelMapper modelMapper;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<UserDto> create(@Valid @RequestBody CreateUserRequest req) {
        Role role = Role.valueOf(req.getRole().toUpperCase());
        User user = userService.createUser(req.getName(), req.getEmail(), role);

        UserDto dto = modelMapper.map(user, UserDto.class);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> get(@PathVariable Long id) {
        User user = userService.findById(id);
        return ResponseEntity.ok(modelMapper.map(user, UserDto.class));
    }
}
