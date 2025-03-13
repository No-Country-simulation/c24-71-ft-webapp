package c24_71_ft_webapp.nexcognifix.domain.patient.dto;

import java.util.UUID;

public record PatientDTO(
        UUID idPatient,
        Long dni,
        String name,
        String email,
        Integer age,
        UUID professionalId
) {
}
