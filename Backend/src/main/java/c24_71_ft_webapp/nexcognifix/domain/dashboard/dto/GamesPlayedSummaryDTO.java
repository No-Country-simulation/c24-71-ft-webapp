package c24_71_ft_webapp.nexcognifix.domain.dashboard.dto;

public record GamesPlayedSummaryDTO(
        Long totalPlayed,
        Long completed,
        Long inProgress,
        Long canceled
) {
}
