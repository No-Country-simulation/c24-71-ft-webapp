package c24_71_ft_webapp.nexcognifix.domain.gamesession.dto;

import c24_71_ft_webapp.nexcognifix.infrastructure.validation.evennumber.EvenNumber;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record GameSessionRequestDTO(

        @NotNull(message = "El ID del paciente no puede estar vacío")
        UUID patientId,

        @NotNull(message = "El ID del juego no puede estar vacío.")
        UUID gameId,

        @NotNull(message = "El número estimado de intentos no puede ser nulo.")
        @Min(value = 10, message = "El número estimado de intentos debe ser al menos 10.")
        Integer estimated_attempts,

        @NotNull(message = "El número de fichas de juego no puede ser nulo.")
        @Min(value = 10, message = "El número de fichas de juego debe ser al menos 10.")
        @Max(value = 50, message = "El número de fichas de juego no puede superar 50.")
        @EvenNumber(message = "El número de fichas de juego debe ser par.")
        Integer game_chips,

        @NotNull(message = "El tiempo estimado no puede ser nulo.")
        @Min(value = 10, message = "El tiempo estimado debe ser al menos 10 segundos.")
        Integer estimated_time

) { }
