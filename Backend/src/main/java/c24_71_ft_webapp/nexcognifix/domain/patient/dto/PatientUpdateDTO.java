package c24_71_ft_webapp.nexcognifix.domain.patient.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record PatientUpdateDTO(
        @NotBlank(message = "Name is required")
        String name,

        @Min(value = 0, message = "Age must be a positive number")
        Integer age,

        @Email(message = "Invalid email format")
        String email,

        String diagnosis
) {
}
