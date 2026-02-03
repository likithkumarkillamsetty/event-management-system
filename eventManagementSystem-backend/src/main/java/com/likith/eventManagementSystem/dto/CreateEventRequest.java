package com.likith.eventManagementSystem.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateEventRequest {
    @NotBlank
    private String title;

    private String description;

    @NotNull
    private LocalDateTime eventDate;

    @NotBlank
    private String venue;

    @Min(1)
    private int maxParticipants;

    @NotNull
    private Long organizerId;
}
