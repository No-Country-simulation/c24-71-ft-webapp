package c24_71_ft_webapp.nexcognifix.domain.boardgame.dto;

import java.util.List;

public record BoardGameFiltersDTO(
        List<String> gameCategory,
        List<String> gameType
) { }
