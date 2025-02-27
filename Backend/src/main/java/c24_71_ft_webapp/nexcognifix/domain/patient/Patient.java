
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
@Setter
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

    @Column(name ="status", nullable = false)
    private Boolean status = true;

    @Column(name = "created_at", updatable = false, nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    public Patient(Long dni, String name, Integer age, String email, Professional professional, String diagnosis) {
        this.dni = dni;
        this.name = name;
        this.age = age;
        this.email = email;
        this.professional = professional;
        this.diagnosis = diagnosis;
        this.status = true;
        this.createdAt = LocalDateTime.now();
    }

    public void disablePatient() {
        this.status = false;
    }

    public void updatePatient(String name, Integer age, String email, String diagnosis) {
        if (name != null && !name.isEmpty()) this.name = name;
        if (age != null && age >= 0) this.age = age;
        if (email != null && !email.isEmpty()) this.email = email;
        if (diagnosis != null) this.diagnosis = diagnosis;
    }


    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

}
