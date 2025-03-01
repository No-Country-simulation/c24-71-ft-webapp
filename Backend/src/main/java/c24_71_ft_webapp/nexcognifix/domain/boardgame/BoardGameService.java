package c24_71_ft_webapp.nexcognifix.domain.boardgame;

import c24_71_ft_webapp.nexcognifix.domain.boardgame.dto.BoardGameDTO;
import c24_71_ft_webapp.nexcognifix.domain.boardgame.dto.BoardGameFiltersDTO;
import c24_71_ft_webapp.nexcognifix.domain.boardgame.enums.GameCategory;
import c24_71_ft_webapp.nexcognifix.domain.boardgame.enums.GameType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardGameService {

    private final BoardGameRepository boardGameRepository;

    @Transactional(readOnly = true)
    public List<BoardGameDTO> getBoardGames(String category, String type) {
        return boardGameRepository.findAll().stream()
                .filter(boardGame -> Optional.ofNullable(category)
                        .map(c -> boardGame.getCategory().toString().equalsIgnoreCase(c))
                        .orElse(true))
                .filter(boardGame -> Optional.ofNullable(type)
                        .map(t -> boardGame.getType().toString().equalsIgnoreCase(t))
                        .orElse(true))
                .map(this::toBoardGameDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public BoardGameFiltersDTO getGameCategoriesAndTypes() {

        List<String> categories = Arrays.stream(GameCategory.values())
                .map(GameCategory::toString)
                .toList();

        List<String> types = Arrays.stream(GameType.values())
                .map(GameType::toString)
                .toList();

        return new BoardGameFiltersDTO(categories, types);
    }

    private BoardGameDTO toBoardGameDTO(BoardGame boardGame) {
        return new BoardGameDTO(
                boardGame.getIdGame(),
                boardGame.getName(),
                boardGame.getDescription(),
                boardGame.getRules(),
                boardGame.getCategory(),
                boardGame.getType(),
                boardGame.getStatus()
        );
    }
}