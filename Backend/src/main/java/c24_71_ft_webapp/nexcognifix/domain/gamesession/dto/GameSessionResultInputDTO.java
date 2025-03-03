package c24_71_ft_webapp.nexcognifix.domain.gamesession.dto;

import jakarta.validation.constraints.NotNull;

public record GameSessionResultInputDTO(
        @NotNull(message = "Los intentos realizados por el paciente no deben ser nulos")
        int attemptsMade,
        @NotNull(message = "El tiempo del paciente no debe ser nulo")
        int timePlayed
) {
}
