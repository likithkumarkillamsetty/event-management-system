package com.likith.eventManagementSystem.service;

import com.likith.eventManagementSystem.entity.*;
import com.likith.eventManagementSystem.exception.BadRequestException;
import com.likith.eventManagementSystem.exception.ResourceNotFoundException;
import com.likith.eventManagementSystem.repository.RegistrationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final EventService eventService;
    private final UserService userService;

    @Transactional
    public Registration registerStudent(Long eventId, Long studentId) {
        Event event = eventService.getById(eventId);
        User student = userService.findById(studentId);

        if (student.getRole() != Role.STUDENT) throw new BadRequestException("Only students can register");

        long registered = registrationRepository.countByEventAndStatus(event, RegistrationStatus.REGISTERED);
        if (registered >= event.getMaxParticipants()) throw new BadRequestException("Event is full");

        registrationRepository.findByEventAndStudent(event, student)
                .ifPresent(r -> {
                    if (r.getStatus() == RegistrationStatus.REGISTERED)
                        throw new BadRequestException("Already registered");

                    r.setStatus(RegistrationStatus.REGISTERED);
                    registrationRepository.save(r);
                });


        return registrationRepository.findByEventAndStudent(event, student)
                .map(r -> {
                    r.setStatus(RegistrationStatus.REGISTERED);
                    return registrationRepository.save(r);
                })
                .orElseGet(() -> {
                    Registration registration = Registration.builder()
                            .event(event)
                            .student(student)
                            .status(RegistrationStatus.REGISTERED)
                            .build();
                    return registrationRepository.save(registration);
                });
    }

    @Transactional
    public Registration cancelRegistration(Long registrationId, Long studentId) {
        Registration reg = registrationRepository.findById(registrationId)
                .orElseThrow(() -> new ResourceNotFoundException("Registration not found: " + registrationId));

        if (!(reg.getStudent().getId()==studentId))
            throw new BadRequestException("You can only cancel your own registration");

        reg.setStatus(RegistrationStatus.CANCELLED);
        return registrationRepository.save(reg);
    }
}
