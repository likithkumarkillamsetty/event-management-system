package com.likith.eventManagementSystem.dto;

import com.likith.eventManagementSystem.entity.RegistrationStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RegistrationDto {
    private Long id;
    private Long eventId;
    private Long studentId;
    private LocalDateTime registrationDate;
    private RegistrationStatus status;
}
