package com.likith.eventManagementSystem.controller;

import com.likith.eventManagementSystem.dto.CreateEventRequest;
import com.likith.eventManagementSystem.dto.EventDto;
import com.likith.eventManagementSystem.entity.Event;
import com.likith.eventManagementSystem.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/events")
public class EventController {
    private final EventService eventService;
    private final ModelMapper modelMapper;

    @PreAuthorize("hasRole('ORGANIZER')")
    @PostMapping
    public ResponseEntity<EventDto> create(@Valid @RequestBody CreateEventRequest req) {
        Event event = eventService.createEvent(req.getTitle(), req.getDescription(),
                req.getEventDate(), req.getVenue(), req.getMaxParticipants(), req.getOrganizerId());
        EventDto dto = modelMapper.map(event, EventDto.class);
        dto.setRegisteredCount(eventService.getRegisteredCount(event));
        dto.setAvailableSeats(eventService.getAvailableSeats(event));
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<List<EventDto>> list() {
        List<Event> events = eventService.getAll();
        List<EventDto> dtoList = events.stream().map(event -> {
            EventDto dto = modelMapper.map(event, EventDto.class);
            dto.setRegisteredCount(eventService.getRegisteredCount(event));
            dto.setAvailableSeats(eventService.getAvailableSeats(event));
            return dto;
        }).toList();
        return ResponseEntity.ok(dtoList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDto> get(@PathVariable Long id) {
        Event event = eventService.getById(id);
        EventDto dto = modelMapper.map(event, EventDto.class);
        dto.setRegisteredCount(eventService.getRegisteredCount(event));
        dto.setAvailableSeats(eventService.getAvailableSeats(event));
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/{id}/available-seats")
    public ResponseEntity<Long> available(@PathVariable Long id) {
        Event e = eventService.getById(id);
        return ResponseEntity.ok(eventService.getAvailableSeats(e));
    }
}
