package com.likith.eventManagementSystem.repository;

import com.likith.eventManagementSystem.entity.Event;
import com.likith.eventManagementSystem.entity.Registration;
import com.likith.eventManagementSystem.entity.RegistrationStatus;
import com.likith.eventManagementSystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RegistrationRepository extends JpaRepository<Registration,Long> {
    long countByEventAndStatus(Event event, RegistrationStatus status);
    Optional<Registration> findByEventAndStudent(Event event, User student);
}
