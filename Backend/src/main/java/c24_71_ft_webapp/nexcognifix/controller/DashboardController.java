package c24_71_ft_webapp.nexcognifix.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping(value = "/dashboard", produces = "application/json")
@RequiredArgsConstructor
@Tag(name = "Dashboard", description = "Endpoints para las estadisticas y el historial de juegos y pacientes.")
@SecurityRequirement(name = "Bearer Authentication")
public class DashboardController {


    @Operation(summary = "Listar las 10 últimas sesiones de juego del profesional autenticado", description = "Obtiene las últimas sesiones de juego creadas por el profesional autenticado.")
    @GetMapping("/latestgames")
    public ResponseEntity<Void> getLatestGameSessionsByAuthenticatedProfessional() {
        // TODO: Implementar la obtención de las últimas 10 sesiones de juego creadas por el profesional autenticado
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }


    //total de sesiones de juegos pendientes mensuales
    //total de sesiones de Juegos finalizados mensuales
    //total de sesiones mensuales porcetaje mensuales
    //numero total de pacientes activos mensuales
    @Operation(summary = "ver estadisticos totales", description = "Obtiene las últimas sesiones de juego creadas por el profesional autenticado.")
    @GetMapping("/statistics")
    public ResponseEntity<Void> getStatistics() {
        // TODO: Implementar la obtención de los totales
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).build();
    }




}
