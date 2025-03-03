package c24_71_ft_webapp.nexcognifix.domain.gamesession.dto;

import c24_71_ft_webapp.nexcognifix.domain.gamesession.enums.GameStatus;

import java.util.UUID;

public record GameSessionCancelDTO(
        UUID idSession,
        String patientName,
        String boardGameName,
        GameStatus previousStatus,
        GameStatus newStatus,
        String observation
) {}

