package c24_71_ft_webapp.nexcognifix.domain.gamesession.dto;

import c24_71_ft_webapp.nexcognifix.domain.gamesession.enums.GameStatus;

import java.util.UUID;

public record GameSessionDTO(
        UUID id,
        String patientName,
        String gameName,
        Integer estimatedAttempts,
        Integer gameChips,
        Integer estimatedTime,
        GameStatus status,
        Integer attemptsMade,
        Integer timePlayed
) { }
