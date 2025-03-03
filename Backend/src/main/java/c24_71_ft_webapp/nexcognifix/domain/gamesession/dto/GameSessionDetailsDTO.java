package c24_71_ft_webapp.nexcognifix.domain.gamesession.dto;

import c24_71_ft_webapp.nexcognifix.domain.boardgame.dto.BoardGameSummaryDTO;
import c24_71_ft_webapp.nexcognifix.domain.gamesession.enums.GameStatus;

import java.util.UUID;

public record GameSessionDetailsDTO(
        UUID id,
        String patientName,
        BoardGameSummaryDTO game,
        Integer estimatedAttempts,
        Integer gameChips,
        Integer estimatedTime,
        GameStatus status
) {
}
