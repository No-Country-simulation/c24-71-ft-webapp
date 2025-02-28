package c24_71_ft_webapp.nexcognifix.controller;

import c24_71_ft_webapp.nexcognifix.domain.gamesession.GameSessionService;
import c24_71_ft_webapp.nexcognifix.domain.gamesession.dto.GameSessionDTO;
import c24_71_ft_webapp.nexcognifix.domain.gamesession.dto.GameSessionRequestDTO;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(value = "/game-sessions", produces = "application/json")
@RequiredArgsConstructor
@Tag(name = "Game Sessions", description = "Endpoints para gestionar sesiones de juego, incluyendo su creación, actualización de estados y envío de resultados.")
@SecurityRequirement(name = "Bearer Authentication")
public class GameSessionController {

    private final GameSessionService gameSessionService;


    //  Crea una nueva sesión de juego y envía un correo al paciente con los detalles.
    @PostMapping("/create")
    public ResponseEntity<GameSessionDTO> createGameSession(@RequestBody @Valid GameSessionRequestDTO data) {
        return ResponseEntity.status(HttpStatus.CREATED).body(gameSessionService.createGameSession(data));
    }

    // Reenviar correo con información de la sesión de juego
    @PostMapping("/{sessionId}/email/resend")
    public ResponseEntity<GameSessionDTO> resendGameSessionEmail(@PathVariable UUID sessionId) {
        GameSessionDTO gameSession = gameSessionService.resendGameSessionEmail(sessionId);
        return ResponseEntity.ok(gameSession);
    }

    /*

    // Obtener una sesión de juego por ID
    @GetMapping("/{sessionId}")
    public ResponseEntity<Void> getGameSessionById(@PathVariable UUID sessionId) {
        // TODO: Implementar la obtención de una sesión de juego por ID
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

    // Iniciar una sesión de juego
    @PatchMapping("/{sessionId}/start")
    public ResponseEntity<Void> startGameSession(@PathVariable UUID sessionId) {
        // TODO: Implementar lógica para marcar la sesión como "En progreso"
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

    // Cancelar una sesión de juego
    @PatchMapping("/{sessionId}/cancel")
    public ResponseEntity<Void> cancelGameSession(@PathVariable UUID sessionId) {
        // TODO: Implementar lógica para marcar la sesión como "Cancelada"
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

    // Enviar resultados de la partida
    @PostMapping("/{sessionId}/results")
    public ResponseEntity<Void> submitGameResults(@PathVariable UUID sessionId) {
        // TODO: Implementar el almacenamiento de resultados de la partida
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

    */

}
