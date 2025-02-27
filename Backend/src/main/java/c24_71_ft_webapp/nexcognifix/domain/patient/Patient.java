package c24_71_ft_webapp.nexcognifix.domain.patient;


import c24_71_ft_webapp.nexcognifix.domain.professional.Professional;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;


@Table(name = "patients")
@Entity(name = "patient")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "idPatient")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID idPatient;

    @Column(nullable = false, unique = true)
    @NotNull(message = "DNI is required")
    @Digits(integer = 20, fraction = 0, message = "DNI must be a valid number")
    private Long dni;

    @Column(nullable = false, length = 100)
    @NotBlank(message = "Name is required")
    private String name;

    @Column(nullable = false)
    @Min(value = 0, message = "Age must be a positive number")
    private Integer age;

    @Column(nullable = false, unique = true, length = 320)
    @Email(message = "Invalid email format")
    private String email;

    @ManyToOne
    @JoinColumn(name = "professional_id", nullable = false)
    private Professional professional;

    private String diagnosis;

    @Column(nullable = false)
    private Boolean status = true;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();


}
