package c24_71_ft_webapp.nexcognifix.domain.boardgame.dto;

import c24_71_ft_webapp.nexcognifix.domain.boardgame.enums.GameCategory;
import c24_71_ft_webapp.nexcognifix.domain.boardgame.enums.GameType;

import java.util.UUID;

public record BoardGameSummaryDTO(
        UUID id,
        String name,
        String description,
        String rules,
        GameCategory category,
        GameType type
) {

}
