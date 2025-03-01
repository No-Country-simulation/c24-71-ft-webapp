package c24_71_ft_webapp.nexcognifix.domain.patient.dto;

import jakarta.validation.constraints.*;

import java.util.UUID;

public record PatientCreateDTO(
        @NotNull(message = "El DNI es obligatorio")
        @Digits(integer = 20, fraction = 0, message = "DNI debe ser un número válido")
        Long dni,

        @NotBlank(message = "El Nombre del paciente es obligatorio")
        String name,

        @NotNull(message = "La Edad del paciente es obligatoria")
        @Min(value = 0, message = "La edad debe ser un número positivo")
        Integer age,

        @NotBlank(message = "El Email del paciente es obligatorio")
        @Email(message = "El formato de email no es correcto")
        String email,

        String diagnosis

) {
}
