package c24_71_ft_webapp.nexcognifix.controller;

import c24_71_ft_webapp.nexcognifix.domain.boardgame.BoardGameService;
import c24_71_ft_webapp.nexcognifix.domain.boardgame.dto.BoardGameDTO;
import c24_71_ft_webapp.nexcognifix.domain.boardgame.dto.BoardGameFiltersDTO;
import c24_71_ft_webapp.nexcognifix.domain.gamesession.dto.GameSessionDTO;
import c24_71_ft_webapp.nexcognifix.domain.gamesession.dto.GameSessionRequestDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/board-games", produces = "application/json")
@RequiredArgsConstructor
@Tag(name = "Board Games", description = "Endpoints para consultar juegos, incluyendo la obtención de listas filtradas y la recuperación de categorías y tipos disponibles.")
@SecurityRequirement(name = "Bearer Authentication")
public class BoardGameController {

    private final BoardGameService boardGameService;

    @GetMapping
    @Operation(summary = "Obtener lista de juegos", description = "Devuelve una lista de juegos filtrada por categoría y/o tipo si se proporcionan parámetros.")
    public ResponseEntity<List<BoardGameDTO>> getBoardGames(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String type) {

        List<BoardGameDTO> boardGames = boardGameService.getBoardGames(category, type);
        return ResponseEntity.ok(boardGames);
    }

    @GetMapping("/filters")
    @Operation(summary = "Obtener filtros de juegos", description = "Recupera las categorías y tipos disponibles de juegos.")
    public ResponseEntity<BoardGameFiltersDTO> getGameCategoriesAndTypes() {
        return ResponseEntity.ok(boardGameService.getGameCategoriesAndTypes());
    }

}
