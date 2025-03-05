package c24_71_ft_webapp.nexcognifix.domain.dashboard.dto;

import c24_71_ft_webapp.nexcognifix.domain.gamesession.GameSession;
import c24_71_ft_webapp.nexcognifix.domain.gamesession.enums.GameStatus;

import java.time.LocalDateTime;

public record RecentResultsDTO(
        String patientName,
        String gameName,
        GameStatus status,
        LocalDateTime createdAt
) {
    public RecentResultsDTO(GameSession gameSession) {
        this(
            gameSession.getPatient().getName(),
            gameSession.getBoardGame().getName(),
			gameSession.getStatus(),
            gameSession.getCreatedAt()
        );
    }
}
