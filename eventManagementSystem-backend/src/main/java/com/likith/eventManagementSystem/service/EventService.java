package com.likith.eventManagementSystem.service;

import com.likith.eventManagementSystem.entity.Event;
import com.likith.eventManagementSystem.entity.RegistrationStatus;
import com.likith.eventManagementSystem.entity.Role;
import com.likith.eventManagementSystem.entity.User;
import com.likith.eventManagementSystem.exception.BadRequestException;
import com.likith.eventManagementSystem.exception.ResourceNotFoundException;
import com.likith.eventManagementSystem.repository.EventRepository;
import com.likith.eventManagementSystem.repository.RegistrationRepository;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final UserService userService;
    private final RegistrationRepository registrationRepository;

    public Event createEvent(@NotBlank String title, String description, @NotNull LocalDateTime eventDate, @NotBlank String venue, @Min(1) int maxParticipants, @NotNull Long organizerId) {
        User organizer = userService.findById(organizerId);
        if (organizer.getRole() != Role.ORGANIZER && organizer.getRole() != Role.ADMIN)
            throw new BadRequestException("User is not an organizer");

        Event e = Event.builder()
                .title(title)
                .description(description)
                .eventDate(eventDate)
                .venue(venue)
                .maxParticipants(maxParticipants)
                .organizer(organizer)
                .build();

        return eventRepository.save(e);
    }

    public List<Event> getAll() {
        return eventRepository.findAll();
    }

    public Event getById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found: " + id));
    }

    @Transactional(readOnly = true)
    public long getRegisteredCount(Event event) {
        return registrationRepository.countByEventAndStatus(event, RegistrationStatus.REGISTERED);
    }

    @Transactional(readOnly = true)
    public Long getAvailableSeats(Event event) {
        return event.getMaxParticipants() - getRegisteredCount(event);
    }
}
