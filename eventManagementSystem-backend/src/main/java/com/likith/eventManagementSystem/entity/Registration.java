package com.likith.eventManagementSystem.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "registrations",
        uniqueConstraints = @UniqueConstraint(columnNames = {"event_id", "student_id"}))
@Builder
public class Registration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JsonBackReference
    @JoinColumn(name = "event_id")
    private Event event;

    @ManyToOne(optional = false)
    @JsonBackReference
    @JoinColumn(name = "student_id")
    private User student;

    private LocalDateTime registrationDate;

    @Enumerated(EnumType.STRING)
    private RegistrationStatus status;

    @PrePersist
    public void prePersist() {
        if (registrationDate == null) registrationDate = LocalDateTime.now();
        if (status == null) status = RegistrationStatus.REGISTERED;
    }
}
