package com.likith.eventManagementSystem.repository;

import com.likith.eventManagementSystem.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event,Long> {
}
