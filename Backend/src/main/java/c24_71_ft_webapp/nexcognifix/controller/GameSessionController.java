package c24_71_ft_webapp.nexcognifix.controller;

import c24_71_ft_webapp.nexcognifix.domain.gamesession.GameSessionService;
import c24_71_ft_webapp.nexcognifix.domain.gamesession.dto.*;
import io.swagger.v3.oas.annotations.Operation;
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

public class GameSessionController {

    private final GameSessionService gameSessionService;

    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Crear una nueva sesión de juego", description = "Crea una nueva sesión de juego y envía un correo al paciente con los detalles.")
    @PostMapping("/create")
    public ResponseEntity<GameSessionDTO> createGameSession(@RequestBody @Valid GameSessionRequestDTO data) {
        return ResponseEntity.status(HttpStatus.CREATED).body(gameSessionService.createGameSession(data));
    }

    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Reenviar correo de sesión", description = "Reenvía un correo con la información de la sesión de juego.")
    @PostMapping("/{sessionId}/email/resend")
    public ResponseEntity<GameSessionDTO> resendGameSessionEmail(@PathVariable UUID sessionId) {
        GameSessionDTO gameSession = gameSessionService.resendGameSessionEmail(sessionId);
        return ResponseEntity.ok(gameSession);
    }

    @Operation(summary = "Obtener sesión de juego por ID", description = "Devuelve los detalles de una sesión de juego específica.")
    @GetMapping("/patient/join/{sessionId}")
    public ResponseEntity<GameSessionDetailsDTO> getGameSessionById(@PathVariable UUID sessionId) {
        GameSessionDetailsDTO gameSession = gameSessionService.getGameSessionById(sessionId);
        return ResponseEntity.ok(gameSession);
    }

    @Operation(summary = "Iniciar una sesión de juego", description = "Cambia el estado de la sesión de juego a 'En progreso'.")
    @PatchMapping("/patient/join/{sessionId}/start")
    public ResponseEntity<GameSessionDTO> startGameSession(@PathVariable UUID sessionId) {
        var gameSession = gameSessionService.startGameSession(sessionId);
        return ResponseEntity.ok(gameSession);
    }

    @Operation(summary = "Cancelar sesión de juego", description = "Cambia el estado de la sesión de juego a 'Cancelada'.")
    @PatchMapping("/patient/join/{sessionId}/cancel")
    public ResponseEntity<GameSessionCancelDTO> cancelGameSession(@PathVariable UUID sessionId, @RequestBody @Valid GameSessionCancelInputDTO observation) {
        var gameCancelDto = gameSessionService.cancelGameSession(sessionId, observation);
        return ResponseEntity.ok(gameCancelDto);
    }

    @Operation(summary = "Enviar resultados de la partida", description = "Guarda los resultados de la sesión de juego en la base de datos y los envía al profesional correspondiente.")
    @PostMapping("/patient/join/{sessionId}/results")
    public ResponseEntity<GameSessionResultDTO> submitGameResults(@PathVariable UUID sessionId, @RequestBody @Valid GameSessionResultInputDTO resultDTO) {
        var gameResultDto = gameSessionService.submitGameResults(sessionId, resultDTO);
        return ResponseEntity.ok(gameResultDto);
    }


    /*

    @Operation(summary = "Listar las últimas sesiones de juego del profesional autenticado", description = "Obtiene las últimas sesiones de juego creadas por el profesional autenticado.")
    @GetMapping("/professional/latest")
    public ResponseEntity<Void> getLatestGameSessionsByAuthenticatedProfessional() {
        // TODO: Implementar la obtención de las últimas 10 sesiones de juego creadas por el profesional autenticado
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

    @Operation(summary = "Listar todas las partidas de un paciente", description = "Devuelve todas las sesiones de juego asociadas a un paciente específico.")
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<Void> getGameSessionsByPatient(@PathVariable UUID patientId) {
        // TODO: Implementar la obtención de todas las partidas de un paciente
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }

    */

}
