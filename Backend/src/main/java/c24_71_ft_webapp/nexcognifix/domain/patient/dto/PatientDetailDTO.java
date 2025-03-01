package c24_71_ft_webapp.nexcognifix.domain.patient.dto;

import java.util.UUID;

public record PatientDetailDTO(
        UUID idPatient,
        Long dni,
        String name,
        Integer age,
        String email,
        String diagnosis,
        Boolean status,
        UUID professionalId,
        String professionalName
) {
}
