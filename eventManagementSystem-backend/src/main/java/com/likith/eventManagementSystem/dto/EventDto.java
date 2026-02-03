package com.likith.eventManagementSystem.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EventDto {
    private Long id;
    private String title;
    private String description;
    private LocalDateTime eventDate;
    private String venue;
    private int maxParticipants;
    private Long organizerId;
    private long registeredCount;
    private long availableSeats;
}
