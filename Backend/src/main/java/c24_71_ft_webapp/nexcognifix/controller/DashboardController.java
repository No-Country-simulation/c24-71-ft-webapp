package c24_71_ft_webapp.nexcognifix.controller;

import c24_71_ft_webapp.nexcognifix.domain.dashboard.DashboardService;
import c24_71_ft_webapp.nexcognifix.domain.dashboard.dto.*;
import c24_71_ft_webapp.nexcognifix.domain.gamesession.GameSessionRepository;
import c24_71_ft_webapp.nexcognifix.domain.gamesession.dto.GameSessionResultDTO;
import c24_71_ft_webapp.nexcognifix.domain.patient.PatientRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping(value = "/dashboard", produces = "application/json")
@RequiredArgsConstructor
@Tag(name = "Dashboard", description = "Endpoints para las estadisticas y el historial de juegos y pacientes.")
@SecurityRequirement(name = "Bearer Authentication")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private GameSessionRepository gameSessionRepository;

    @Autowired
    private PatientRepository patientRepository;

    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Listar las 10 últimas sesiones de juego del profesional autenticado", description = "Obtiene las últimas sesiones de juego creadas por el profesional autenticado.")
    @GetMapping("/latestgames")
    public ResponseEntity<List<RecentResultsDTO>> getLatestGameSessionsByAuthenticatedProfessional() {
            List<RecentResultsDTO> recentResults = dashboardService.recentResults();
            return ResponseEntity.ok(recentResults);
    }


    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "ver estadisticos totales", description = "Obtiene las últimas sesiones de juego creadas por el profesional autenticado.")
    @GetMapping("/statistics")
    public ResponseEntity<StatisticsDTO> getStatistics() {
        return ResponseEntity.ok(dashboardService.getMonthlyStatistics());
    }

    //
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Obtener sesiones de juegos de los últimos 7 días", description = "Obtiene un array de la cantidad de sesiones de juego que se han creado la semana")
    @GetMapping("/sessions-per-day")
    public ResponseEntity<List<SessionPerDayDTO>> getSessionsPerDay(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd");

        LocalDate start = (startDate != null) ? LocalDate.parse(startDate, formatter) : LocalDate.now().minusDays(7);
        LocalDate end = (endDate != null) ? LocalDate.parse(endDate, formatter) : LocalDate.now();

        System.out.println(start);
        List<SessionPerDayDTO> result = dashboardService.getSessionsPerDay(start,end);
        return ResponseEntity.ok(result);
    }

    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Obtener los juegos que han sido jugados en el mes", description = "Permite visualizar cuántos juegos han sido completados, cancelados y en progreso en el mes.")
    @GetMapping("/games-played-month")
    public ResponseEntity<GamesPlayedSummaryDTO> getGamesPlayedThisMonth() {
        return ResponseEntity.ok(dashboardService.getGamesPlayedThisMonth());
    }

    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Obtener los estadisticos de los totales de los juegos y pacientes activos", description = "Permite visualizar cuántos juegos han sido completados Vs Total Juegos o Juegos pendientes Vs Total Juegos, y total juegos jugados en el mes vs total Juegos , ademas de los pacientes activos en el mes VS pacientes del sistema .")
    @GetMapping("/summary-statistics")
    public ResponseEntity<List<DashboardStatisticsDTO>> getDashboardStatistics() {
        return ResponseEntity.ok(dashboardService.getDashboardStatistics());
    }




}
