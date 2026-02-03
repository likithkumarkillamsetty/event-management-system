package com.likith.eventManagementSystem.controller;

import com.likith.eventManagementSystem.dto.RegistrationDto;
import com.likith.eventManagementSystem.entity.Registration;
import com.likith.eventManagementSystem.service.RegistrationService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/registrations")
public class RegistrationController {
    private final RegistrationService registrationService;
    private final ModelMapper modelMapper;

    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/events/{eventId}/students/{studentId}")
    public ResponseEntity<RegistrationDto> register(@PathVariable Long eventId, @PathVariable Long studentId) {
        Registration r = registrationService.registerStudent(eventId, studentId);
        RegistrationDto dto = modelMapper.map(r, RegistrationDto.class);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{registrationId}/students/{studentId}")
    public ResponseEntity<RegistrationDto> cancel(@PathVariable Long registrationId, @PathVariable Long studentId) {
        Registration reg = registrationService.cancelRegistration(registrationId, studentId);
        RegistrationDto dto = modelMapper.map(reg, RegistrationDto.class);
        return ResponseEntity.ok(dto);
    }
}